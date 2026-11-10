export type VehicleType = 'car' | 'motorcycle' | 'heavy';

export type CarparkAgency = 'HDB' | 'URA' | 'LTA' | 'Commercial';

export type CarparkType =
  | 'Multi-Storey Carpark (MSCP)'
  | 'Surface Carpark'
  | 'Basement Carpark'
  | 'Mechanised Carpark';

export type SingaporeRegion = 'All' | 'Central' | 'East' | 'West' | 'North' | 'North-East';

export interface LotInfo {
  total: number;
  available: number;
}

export interface EVChargerInfo {
  total: number;
  available: number;
  provider: string; // e.g. "SP Mobility", "Shell Recharge", "CDG ENGIE"
  powerKw?: number;
}

export interface CarparkRates {
  weekdayDay: string; // e.g. "$1.20 / 30 mins" or "$0.60 / 30 mins"
  weekdayNight: string; // e.g. "$0.60 / 30 mins (max $5.00)"
  weekendDay: string;
  weekendNight: string;
  gracePeriodMinutes: number; // typically 15 mins for HDB/URA
  freeParkingInfo?: string; // e.g. "Sundays & PH 7am - 10.30pm"
}

export interface Carpark {
  id: string;
  carparkNumber: string; // Official Singapore ID, e.g. "ACB", "TH20", "BE47"
  name: string;
  address: string;
  estate: string;
  region: SingaporeRegion;
  agency: CarparkAgency;
  carparkType: CarparkType;
  parkingSystem: 'Electronic Parking System (EPS)' | 'Coupon / Barrier-less';
  coordinates: {
    lat: number;
    lng: number;
  };
  gantryHeightMeters: number; // e.g. 2.15, 2.0, 1.9, 4.5
  nightParking: boolean;
  freeParking: string;
  rates: CarparkRates;
  lots: {
    car: LotInfo;
    motorcycle?: LotInfo;
    heavy?: LotInfo;
  };
  evChargers?: EVChargerInfo;
  lastUpdated: string; // ISO string or relative time
  trend: 'increasing' | 'decreasing' | 'stable';
  isFavorite?: boolean;
}

export interface CarparkFilterState {
  searchQuery: string;
  region: SingaporeRegion;
  agency: 'All' | CarparkAgency;
  vehicleType: VehicleType;
  minAvailableLots: number;
  hasEvCharging: boolean;
  minClearance: number; // 0 for any, 2.0 for >= 2.0m
  freeParkingOnly: boolean;
  sortBy: 'availability' | 'occupancy' | 'name' | 'clearance';
  sortOrder: 'asc' | 'desc';
}

export interface RealtimeSyncStats {
  lastSyncTime: Date | null;
  source:
    | 'Data.gov.sg Live API'
    | 'LTA DataMall v2 (Serverless)'
    | 'Data.gov.sg Open Data (LTA Ready)'
    | 'Simulated Live Stream'
    | 'Custom Backend'
    | string;
  totalCarparksTracked: number;
  totalLotsAvailable: number;
  totalCapacity: number;
  isLoading: boolean;
  error?: string | null;
}
