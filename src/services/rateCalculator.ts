import { Carpark } from '../types/carpark';

export interface ParkingFeeEstimate {
  durationMinutes: number;
  durationFormatted: string;
  estimatedCost: number;
  isGracePeriod: boolean;
  isFreeParking: boolean;
  breakdown: string[];
}

export function calculateEstimatedFee(
  carpark: Carpark,
  entryDate: Date,
  exitDate: Date
): ParkingFeeEstimate {
  const diffMs = exitDate.getTime() - entryDate.getTime();
  const durationMinutes = Math.max(0, Math.round(diffMs / (1000 * 60)));

  const hours = Math.floor(durationMinutes / 60);
  const mins = durationMinutes % 60;
  const durationFormatted = `${hours > 0 ? `${hours}h ` : ''}${mins}m`;

  const gracePeriod = carpark.rates.gracePeriodMinutes || 15;

  if (durationMinutes <= gracePeriod) {
    return {
      durationMinutes,
      durationFormatted,
      estimatedCost: 0,
      isGracePeriod: true,
      isFreeParking: false,
      breakdown: [
        `Exited within ${gracePeriod}-minute grace period`,
        'Total Fee: $0.00',
      ],
    };
  }

  // Check if Sunday and carpark has Sunday free parking
  const dayOfWeek = entryDate.getDay(); // 0 = Sunday
  const entryHour = entryDate.getHours();
  const exitHour = exitDate.getHours();

  if (
    dayOfWeek === 0 &&
    carpark.freeParking.toLowerCase().includes('sunday') &&
    entryHour >= 7 &&
    exitHour < 22.5
  ) {
    return {
      durationMinutes,
      durationFormatted,
      estimatedCost: 0,
      isGracePeriod: false,
      isFreeParking: true,
      breakdown: [
        'HDB / URA Free Parking Scheme active (Sunday 7:00 AM – 10:30 PM)',
        'Total Fee: $0.00',
      ],
    };
  }

  // HDB or URA rate calculation
  if (carpark.agency === 'HDB' || carpark.agency === 'URA') {
    const isCentral = carpark.region === 'Central';
    const ratePerHalfHour = isCentral ? 1.2 : 0.6;
    const blocksOf30 = Math.ceil(durationMinutes / 30);
    let total = blocksOf30 * ratePerHalfHour;

    // Check night parking cap ($5.00) if parked overnight
    if (durationMinutes > 360 && carpark.nightParking) {
      total = Math.min(total, 5.0 + Math.max(0, (durationMinutes - 480) / 30) * ratePerHalfHour);
    }

    return {
      durationMinutes,
      durationFormatted,
      estimatedCost: Number(total.toFixed(2)),
      isGracePeriod: false,
      isFreeParking: false,
      breakdown: [
        `${carpark.agency} standard electronic rate: $${ratePerHalfHour.toFixed(2)} per 30 mins`,
        `${blocksOf30} billable 30-min block(s)`,
        carpark.nightParking ? 'Night parking cap ($5.00 max 10.30pm-7am) applicable' : '',
        `Estimated Total: $${total.toFixed(2)}`,
      ].filter(Boolean),
    };
  }

  // Commercial / Mall carparks
  // Simplified realistic mall parking simulation
  const billableHours = Math.ceil(durationMinutes / 60);
  let total = 0;
  if (billableHours <= 1) {
    total = 2.4;
  } else if (billableHours <= 3) {
    total = 2.4 + (billableHours - 1) * 1.5;
  } else {
    total = 5.4 + (billableHours - 3) * 2.0;
  }

  // Cap at daily rate
  total = Math.min(total, 35.0);

  return {
    durationMinutes,
    durationFormatted,
    estimatedCost: Number(total.toFixed(2)),
    isGracePeriod: false,
    isFreeParking: false,
    breakdown: [
      `Commercial mall rate applied (${carpark.name})`,
      `First hour baseline: ~$2.40`,
      billableHours > 1 ? `Subsequent ${billableHours - 1} hr(s): ~$${(total - 2.4).toFixed(2)}` : '',
      `Estimated Total: $${total.toFixed(2)}`,
    ].filter(Boolean),
  };
}
