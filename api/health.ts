import type { Request, Response } from 'express';

export interface HealthResponse {
  status: 'ok' | 'degraded';
  service: string;
  timestamp: string;
  uptimeSeconds: number;
  environment: {
    nodeEnv: string;
    hasLtaAccountKey: boolean;
  };
  endpoints: {
    carparkAvailability: string;
    health: string;
  };
}

/**
 * Serverless / Express health check endpoint.
 * GET /api/health
 */
export default async function handler(req: Request, res: Response) {
  const hasKey = Boolean(
    process.env.LTA_DATAMALL_ACCOUNT_KEY ||
    process.env.LTA_ACCOUNT_KEY ||
    process.env.ACCOUNT_KEY
  );

  const payload: HealthResponse = {
    status: 'ok',
    service: 'ParkSG LTA Carpark Tracker API',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    environment: {
      nodeEnv: process.env.NODE_ENV || 'development',
      hasLtaAccountKey: hasKey,
    },
    endpoints: {
      carparkAvailability: '/api/carparkavailability',
      health: '/api/health',
    },
  };

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  return res.status(200).json(payload);
}
