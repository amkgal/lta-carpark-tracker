import type { Request, Response } from 'express';

const LTA_DATAMALL_ENDPOINT = 'https://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2';

export interface LtaCarparkRecord {
  CarParkID: string;
  Area: string;
  Development: string;
  Location: string; // e.g. "1.29375 103.85718"
  AvailableLots: number;
  LotType: 'C' | 'H' | 'Y'; // C: Cars, H: Heavy, Y: Motorcycles
  Agency: 'HDB' | 'LTA' | 'URA';
}

export interface LtaApiResponse {
  'odata.metadata'?: string;
  value: LtaCarparkRecord[];
}

/**
 * Serverless / Express endpoint to pull live carpark availability from LTA DataMall.
 * GET /api/carparkavailability
 *
 * Query Parameters:
 * - $skip or skip: (number) Optional offset for pagination (LTA returns 500 records per call)
 * - all: (boolean) If true or '1', automatically aggregates all pages from LTA DataMall
 */
export default async function handler(req: Request, res: Response) {
  // Set CORS and JSON headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, AccountKey');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // Retrieve AccountKey from environment (do not hardcode) or optional client override header
  const accountKey =
    process.env.LTA_DATAMALL_ACCOUNT_KEY ||
    process.env.LTA_ACCOUNT_KEY ||
    process.env.ACCOUNT_KEY ||
    (req.headers['accountkey'] as string | undefined);

  if (!accountKey || accountKey.trim() === '') {
    return res.status(401).json({
      success: false,
      configured: false,
      error: 'Missing LTA DataMall AccountKey. Please set LTA_DATAMALL_ACCOUNT_KEY in your environment variables or pass AccountKey header.',
      endpoint: LTA_DATAMALL_ENDPOINT,
      documentation: 'Register at https://datamall.lta.gov.sg/ to obtain your API key.',
      timestamp: new Date().toISOString(),
      value: [],
    });
  }

  const querySkip = req.query['$skip'] || req.query['skip'];
  const fetchAll = req.query['all'] === 'true' || req.query['all'] === '1';

  try {
    if (fetchAll) {
      // Aggregate all pages from LTA DataMall (each batch is 500 records)
      let allRecords: LtaCarparkRecord[] = [];
      let currentSkip = 0;
      let hasMore = true;
      const MAX_PAGES = 10; // Safety guard: up to 5,000 records
      let pageCount = 0;

      while (hasMore && pageCount < MAX_PAGES) {
        pageCount++;
        const pageUrl = `${LTA_DATAMALL_ENDPOINT}?$skip=${currentSkip}`;

        const pageRes = await fetch(pageUrl, {
          method: 'GET',
          headers: {
            AccountKey: accountKey.trim(),
            Accept: 'application/json',
          },
        });

        if (!pageRes.ok) {
          throw new Error(`LTA DataMall responded with HTTP ${pageRes.status} (${pageRes.statusText})`);
        }

        const pageData: LtaApiResponse = await pageRes.json();
        const records = pageData?.value || [];
        allRecords = allRecords.concat(records);

        // If returned fewer than 500, we've reached the end
        if (records.length < 500) {
          hasMore = false;
        } else {
          currentSkip += 500;
        }
      }

      res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=60');
      return res.status(200).json({
        success: true,
        configured: true,
        source: 'LTA_DATAMALL_v2',
        timestamp: new Date().toISOString(),
        totalRecords: allRecords.length,
        pagesFetched: pageCount,
        value: allRecords,
      });
    }

    // Single page fetch (default or explicit skip)
    const targetUrl = querySkip
      ? `${LTA_DATAMALL_ENDPOINT}?$skip=${encodeURIComponent(String(querySkip))}`
      : LTA_DATAMALL_ENDPOINT;

    const ltaResponse = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        AccountKey: accountKey.trim(),
        Accept: 'application/json',
      },
    });

    if (!ltaResponse.ok) {
      const errorText = await ltaResponse.text().catch(() => '');
      return res.status(ltaResponse.status).json({
        success: false,
        configured: true,
        status: ltaResponse.status,
        error: `LTA DataMall API error: HTTP ${ltaResponse.status}`,
        details: errorText,
        endpoint: targetUrl,
        timestamp: new Date().toISOString(),
      });
    }

    const data: LtaApiResponse = await ltaResponse.json();
    const records = data?.value || [];

    res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=60');
    return res.status(200).json({
      success: true,
      configured: true,
      source: 'LTA_DATAMALL_v2',
      timestamp: new Date().toISOString(),
      totalRecords: records.length,
      skip: querySkip ? Number(querySkip) : 0,
      value: records,
    });
  } catch (err: any) {
    console.error('[ParkSG Serverless] Error querying LTA DataMall:', err);
    return res.status(502).json({
      success: false,
      configured: true,
      error: 'Failed to communicate with LTA DataMall service',
      message: err.message || 'Unknown network error',
      endpoint: LTA_DATAMALL_ENDPOINT,
      timestamp: new Date().toISOString(),
    });
  }
}
