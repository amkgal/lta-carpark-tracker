import { Carpark } from '../types/carpark';

export const INITIAL_CARPARKS: Carpark[] = [
  // CENTRAL & CBD
  {
    id: 'sg-cp-mbs',
    carparkNumber: 'MBS',
    name: 'Marina Bay Sands Integrated Resort',
    address: '10 Bayfront Avenue, Singapore 018956',
    estate: 'Marina Bay',
    region: 'Central',
    agency: 'Commercial',
    carparkType: 'Basement Carpark',
    parkingSystem: 'Electronic Parking System (EPS)',
    coordinates: { lat: 1.2838, lng: 103.8591 },
    gantryHeightMeters: 2.0,
    nightParking: true,
    freeParking: 'No free parking (Sands Rewards rebate available)',
    rates: {
      weekdayDay: '$8.00 1st hr, $1.50/subsequent 30m',
      weekdayNight: '$8.00 flat entry after 7pm',
      weekendDay: '$12.00 1st hr, $2.00/subsequent 30m',
      weekendNight: '$12.00 flat entry after 7pm',
      gracePeriodMinutes: 10,
    },
    lots: {
      car: { total: 1200, available: 412 },
      motorcycle: { total: 150, available: 85 },
    },
    evChargers: { total: 12, available: 5, provider: 'SP Mobility', powerKw: 50 },
    lastUpdated: new Date().toLocaleTimeString(),
    trend: 'decreasing',
  },
  {
    id: 'sg-cp-suntec',
    carparkNumber: 'SUN1',
    name: 'Suntec City Mall & Convention Centre',
    address: '3 Temasek Boulevard, Singapore 038983',
    estate: 'Marina Centre',
    region: 'Central',
    agency: 'Commercial',
    carparkType: 'Basement Carpark',
    parkingSystem: 'Electronic Parking System (EPS)',
    coordinates: { lat: 1.2935, lng: 103.8572 },
    gantryHeightMeters: 2.0,
    nightParking: true,
    freeParking: 'Spend $50 for $2.80 parking coupon',
    rates: {
      weekdayDay: '$2.40 1st hr, $1.20/subsequent 30m',
      weekdayNight: '$3.20 per entry after 5pm',
      weekendDay: '$2.60 1st 4 hrs, $1.20/subsequent hr',
      weekendNight: '$3.20 per entry after 5pm',
      gracePeriodMinutes: 10,
    },
    lots: {
      car: { total: 3100, available: 948 },
      motorcycle: { total: 200, available: 110 },
    },
    evChargers: { total: 16, available: 8, provider: 'Shell Recharge', powerKw: 60 },
    lastUpdated: new Date().toLocaleTimeString(),
    trend: 'stable',
  },
  {
    id: 'sg-cp-ion',
    carparkNumber: 'ION',
    name: 'ION Orchard Carpark',
    address: '2 Orchard Turn, Singapore 238801',
    estate: 'Orchard',
    region: 'Central',
    agency: 'Commercial',
    carparkType: 'Basement Carpark',
    parkingSystem: 'Electronic Parking System (EPS)',
    coordinates: { lat: 1.304, lng: 103.8318 },
    gantryHeightMeters: 1.9,
    nightParking: true,
    freeParking: 'No free parking',
    rates: {
      weekdayDay: '$3.00 1st hr, $1.50/subsequent 30m',
      weekdayNight: '$4.50 per entry after 6pm',
      weekendDay: '$4.00 1st hr, $2.00/subsequent 30m',
      weekendNight: '$5.50 per entry after 6pm',
      gracePeriodMinutes: 10,
    },
    lots: {
      car: { total: 650, available: 89 },
      motorcycle: { total: 40, available: 14 },
    },
    evChargers: { total: 6, available: 2, provider: 'CDG ENGIE', powerKw: 22 },
    lastUpdated: new Date().toLocaleTimeString(),
    trend: 'decreasing',
  },
  {
    id: 'sg-cp-chinatown-ura',
    carparkNumber: 'ACB',
    name: 'Chinatown Complex URA Carpark',
    address: 'Block 335 Smith Street, Singapore 050335',
    estate: 'Chinatown',
    region: 'Central',
    agency: 'URA',
    carparkType: 'Basement Carpark',
    parkingSystem: 'Electronic Parking System (EPS)',
    coordinates: { lat: 1.2825, lng: 103.8432 },
    gantryHeightMeters: 1.95,
    nightParking: true,
    freeParking: 'Sundays & PH (7.00am to 10.30pm)',
    rates: {
      weekdayDay: '$1.20 / 30 mins (Central Area)',
      weekdayNight: '$0.60 / 30 mins (Cap $5.00)',
      weekendDay: '$1.20 / 30 mins',
      weekendNight: '$0.60 / 30 mins (Cap $5.00)',
      gracePeriodMinutes: 15,
      freeParkingInfo: 'Free on Sundays & PH: 7:00 AM - 10:30 PM',
    },
    lots: {
      car: { total: 420, available: 76 },
      motorcycle: { total: 60, available: 22 },
      heavy: { total: 10, available: 3 },
    },
    evChargers: { total: 4, available: 3, provider: 'SP Mobility', powerKw: 50 },
    lastUpdated: new Date().toLocaleTimeString(),
    trend: 'increasing',
  },
  {
    id: 'sg-cp-bugis-junc',
    carparkNumber: 'BJ1',
    name: 'Bugis Junction Multi-Storey Carpark',
    address: '200 Victoria Street, Singapore 188021',
    estate: 'Bugis',
    region: 'Central',
    agency: 'Commercial',
    carparkType: 'Multi-Storey Carpark (MSCP)',
    parkingSystem: 'Electronic Parking System (EPS)',
    coordinates: { lat: 1.3001, lng: 103.8554 },
    gantryHeightMeters: 2.05,
    nightParking: true,
    freeParking: 'CapitaStar Reward Vouchers Accepted',
    rates: {
      weekdayDay: '$2.20 1st hr, $0.60/subsequent 15m',
      weekdayNight: '$3.50 per entry after 6pm',
      weekendDay: '$2.60 1st 2 hrs, $0.70/subsequent 15m',
      weekendNight: '$3.80 per entry after 6pm',
      gracePeriodMinutes: 10,
    },
    lots: {
      car: { total: 600, available: 165 },
      motorcycle: { total: 80, available: 42 },
    },
    evChargers: { total: 8, available: 4, provider: 'SP Mobility', powerKw: 50 },
    lastUpdated: new Date().toLocaleTimeString(),
    trend: 'stable',
  },
  {
    id: 'sg-cp-tanjong-pagar',
    carparkNumber: 'TPM1',
    name: 'Tanjong Pagar Plaza MSCP',
    address: 'Block 1 Tanjong Pagar Plaza, Singapore 082001',
    estate: 'Tanjong Pagar',
    region: 'Central',
    agency: 'HDB',
    carparkType: 'Multi-Storey Carpark (MSCP)',
    parkingSystem: 'Electronic Parking System (EPS)',
    coordinates: { lat: 1.2768, lng: 103.8428 },
    gantryHeightMeters: 2.15,
    nightParking: true,
    freeParking: 'Sundays & PH (7.00am to 10.30pm)',
    rates: {
      weekdayDay: '$1.20 / 30 mins',
      weekdayNight: '$0.60 / 30 mins (Cap $5.00)',
      weekendDay: '$1.20 / 30 mins',
      weekendNight: '$0.60 / 30 mins (Cap $5.00)',
      gracePeriodMinutes: 15,
      freeParkingInfo: 'Sundays & PH free parking 7:00 AM - 10:30 PM',
    },
    lots: {
      car: { total: 540, available: 182 },
      motorcycle: { total: 50, available: 18 },
    },
    evChargers: { total: 4, available: 1, provider: 'CDG ENGIE', powerKw: 22 },
    lastUpdated: new Date().toLocaleTimeString(),
    trend: 'decreasing',
  },

  // EAST REGION
  {
    id: 'sg-cp-jewel',
    carparkNumber: 'JEWEL',
    name: 'Jewel Changi Airport (Carpark 2M / 3M)',
    address: '78 Airport Boulevard, Singapore 819666',
    estate: 'Changi',
    region: 'East',
    agency: 'Commercial',
    carparkType: 'Basement Carpark',
    parkingSystem: 'Electronic Parking System (EPS)',
    coordinates: { lat: 1.3602, lng: 103.9898 },
    gantryHeightMeters: 2.1,
    nightParking: true,
    freeParking: 'No free parking (Short term rates apply at 2M/3M)',
    rates: {
      weekdayDay: '$0.04/min (1st 90m), $5.00/subsequent 30m',
      weekdayNight: '$0.04/min (1st 90m), $5.00/subsequent 30m',
      weekendDay: '$0.04/min (1st 90m), $5.00/subsequent 30m',
      weekendNight: '$0.04/min (1st 90m), $5.00/subsequent 30m',
      gracePeriodMinutes: 10,
    },
    lots: {
      car: { total: 2500, available: 1140 },
      motorcycle: { total: 180, available: 95 },
    },
    evChargers: { total: 20, available: 12, provider: 'Shell Recharge', powerKw: 120 },
    lastUpdated: new Date().toLocaleTimeString(),
    trend: 'increasing',
  },
  {
    id: 'sg-cp-tamp-th20',
    carparkNumber: 'TH20',
    name: 'Tampines St 45 Blk 498 MSCP',
    address: '498 Tampines Street 45, Singapore 520498',
    estate: 'Tampines',
    region: 'East',
    agency: 'HDB',
    carparkType: 'Multi-Storey Carpark (MSCP)',
    parkingSystem: 'Electronic Parking System (EPS)',
    coordinates: { lat: 1.3615, lng: 103.9575 },
    gantryHeightMeters: 2.15,
    nightParking: true,
    freeParking: 'Sundays & PH (7.00am to 10.30pm)',
    rates: {
      weekdayDay: '$0.60 / 30 mins',
      weekdayNight: '$0.60 / 30 mins (Cap $5.00)',
      weekendDay: '$0.60 / 30 mins',
      weekendNight: '$0.60 / 30 mins (Cap $5.00)',
      gracePeriodMinutes: 15,
      freeParkingInfo: 'Sundays & PH 7am - 10:30pm',
    },
    lots: {
      car: { total: 407, available: 333 },
      motorcycle: { total: 40, available: 28 },
    },
    evChargers: { total: 3, available: 2, provider: 'SP Mobility', powerKw: 22 },
    lastUpdated: new Date().toLocaleTimeString(),
    trend: 'stable',
  },
  {
    id: 'sg-cp-tamp-mall',
    carparkNumber: 'TM1',
    name: 'Tampines Mall & One Basement Carpark',
    address: '4 Tampines Central 5, Singapore 529510',
    estate: 'Tampines',
    region: 'East',
    agency: 'Commercial',
    carparkType: 'Basement Carpark',
    parkingSystem: 'Electronic Parking System (EPS)',
    coordinates: { lat: 1.3532, lng: 103.9452 },
    gantryHeightMeters: 1.95,
    nightParking: true,
    freeParking: 'CapitaStar rewards apply',
    rates: {
      weekdayDay: '$1.80 1st hr, $0.60/subsequent 15m',
      weekdayNight: '$2.80 per entry after 6pm',
      weekendDay: '$2.40 1st 2 hrs, $0.70/subsequent 15m',
      weekendNight: '$2.80 per entry after 6pm',
      gracePeriodMinutes: 10,
    },
    lots: {
      car: { total: 720, available: 184 },
      motorcycle: { total: 90, available: 45 },
    },
    evChargers: { total: 6, available: 3, provider: 'SP Mobility', powerKw: 50 },
    lastUpdated: new Date().toLocaleTimeString(),
    trend: 'decreasing',
  },
  {
    id: 'sg-cp-bedok-be47',
    carparkNumber: 'BE47',
    name: 'Bedok North St 2 Blk 135 MSCP',
    address: '135 Bedok North Street 2, Singapore 460135',
    estate: 'Bedok',
    region: 'East',
    agency: 'HDB',
    carparkType: 'Multi-Storey Carpark (MSCP)',
    parkingSystem: 'Electronic Parking System (EPS)',
    coordinates: { lat: 1.3288, lng: 103.9351 },
    gantryHeightMeters: 2.15,
    nightParking: true,
    freeParking: 'Sundays & PH (7.00am to 10.30pm)',
    rates: {
      weekdayDay: '$0.60 / 30 mins',
      weekdayNight: '$0.60 / 30 mins (Cap $5.00)',
      weekendDay: '$0.60 / 30 mins',
      weekendNight: '$0.60 / 30 mins (Cap $5.00)',
      gracePeriodMinutes: 15,
      freeParkingInfo: 'Free on Sundays & PH: 7am - 10:30pm',
    },
    lots: {
      car: { total: 860, available: 591 },
      motorcycle: { total: 70, available: 42 },
    },
    evChargers: { total: 4, available: 4, provider: 'CDG ENGIE', powerKw: 22 },
    lastUpdated: new Date().toLocaleTimeString(),
    trend: 'stable',
  },
  {
    id: 'sg-cp-pasir-ris-p77l',
    carparkNumber: 'P77L',
    name: 'Pasir Ris Street 71 Blk 735 Surface Lot',
    address: '735 Pasir Ris Street 71, Singapore 510735',
    estate: 'Pasir Ris',
    region: 'East',
    agency: 'HDB',
    carparkType: 'Surface Carpark',
    parkingSystem: 'Electronic Parking System (EPS)',
    coordinates: { lat: 1.3785, lng: 103.9358 },
    gantryHeightMeters: 4.5,
    nightParking: true,
    freeParking: 'Sundays & PH (7.00am to 10.30pm)',
    rates: {
      weekdayDay: '$0.60 / 30 mins',
      weekdayNight: '$0.60 / 30 mins (Cap $5.00)',
      weekendDay: '$0.60 / 30 mins',
      weekendNight: '$0.60 / 30 mins (Cap $5.00)',
      gracePeriodMinutes: 15,
      freeParkingInfo: 'Free on Sundays & PH 7am - 10:30pm',
    },
    lots: {
      car: { total: 110, available: 72 },
      motorcycle: { total: 20, available: 14 },
      heavy: { total: 12, available: 6 },
    },
    evChargers: { total: 2, available: 1, provider: 'SP Mobility', powerKw: 50 },
    lastUpdated: new Date().toLocaleTimeString(),
    trend: 'stable',
  },

  // WEST REGION
  {
    id: 'sg-cp-jem-westgate',
    carparkNumber: 'JEM1',
    name: 'Jem & Westgate Integrated Carpark',
    address: '50 Jurong Gateway Road, Singapore 608549',
    estate: 'Jurong East',
    region: 'West',
    agency: 'Commercial',
    carparkType: 'Basement Carpark',
    parkingSystem: 'Electronic Parking System (EPS)',
    coordinates: { lat: 1.3331, lng: 103.7436 },
    gantryHeightMeters: 2.1,
    nightParking: true,
    freeParking: 'Lendlease Plus parking rebates apply',
    rates: {
      weekdayDay: '$1.75 1st hr, $0.50/subsequent 15m',
      weekdayNight: '$2.80 per entry after 6pm',
      weekendDay: '$2.20 1st 2 hrs, $0.60/subsequent 15m',
      weekendNight: '$2.80 per entry after 6pm',
      gracePeriodMinutes: 10,
    },
    lots: {
      car: { total: 920, available: 264 },
      motorcycle: { total: 110, available: 58 },
    },
    evChargers: { total: 10, available: 6, provider: 'Shell Recharge', powerKw: 50 },
    lastUpdated: new Date().toLocaleTimeString(),
    trend: 'decreasing',
  },
  {
    id: 'sg-cp-jurong-pt',
    carparkNumber: 'JP1',
    name: 'Jurong Point Shopping Centre MSCP',
    address: '1 Jurong West Central 2, Singapore 648886',
    estate: 'Jurong West',
    region: 'West',
    agency: 'Commercial',
    carparkType: 'Multi-Storey Carpark (MSCP)',
    parkingSystem: 'Electronic Parking System (EPS)',
    coordinates: { lat: 1.3402, lng: 103.7065 },
    gantryHeightMeters: 2.15,
    nightParking: true,
    freeParking: 'L Privileges loyalty parking incentives',
    rates: {
      weekdayDay: '$1.50 1st 2 hrs, $1.20/subsequent hr',
      weekdayNight: '$2.20 per entry after 5pm',
      weekendDay: '$2.20 1st 2 hrs, $1.40/subsequent hr',
      weekendNight: '$2.50 per entry after 5pm',
      gracePeriodMinutes: 10,
    },
    lots: {
      car: { total: 1150, available: 420 },
      motorcycle: { total: 120, available: 65 },
    },
    evChargers: { total: 8, available: 5, provider: 'CDG ENGIE', powerKw: 50 },
    lastUpdated: new Date().toLocaleTimeString(),
    trend: 'stable',
  },
  {
    id: 'sg-cp-clementi-clem',
    carparkNumber: 'CL32',
    name: 'Clementi Central Blk 447 MSCP',
    address: '447 Clementi Avenue 3, Singapore 120447',
    estate: 'Clementi',
    region: 'West',
    agency: 'HDB',
    carparkType: 'Multi-Storey Carpark (MSCP)',
    parkingSystem: 'Electronic Parking System (EPS)',
    coordinates: { lat: 1.3145, lng: 103.7652 },
    gantryHeightMeters: 2.15,
    nightParking: true,
    freeParking: 'Sundays & PH (7.00am to 10.30pm)',
    rates: {
      weekdayDay: '$0.60 / 30 mins',
      weekdayNight: '$0.60 / 30 mins (Cap $5.00)',
      weekendDay: '$0.60 / 30 mins',
      weekendNight: '$0.60 / 30 mins (Cap $5.00)',
      gracePeriodMinutes: 15,
      freeParkingInfo: 'Sundays & PH: 7am - 10:30pm',
    },
    lots: {
      car: { total: 480, available: 165 },
      motorcycle: { total: 40, available: 19 },
    },
    evChargers: { total: 3, available: 2, provider: 'SP Mobility', powerKw: 22 },
    lastUpdated: new Date().toLocaleTimeString(),
    trend: 'decreasing',
  },
  {
    id: 'sg-cp-bt-batok-bb',
    carparkNumber: 'BB21',
    name: 'Bukit Batok Central Blk 628 MSCP',
    address: '628 Bukit Batok Central, Singapore 650628',
    estate: 'Bukit Batok',
    region: 'West',
    agency: 'HDB',
    carparkType: 'Multi-Storey Carpark (MSCP)',
    parkingSystem: 'Electronic Parking System (EPS)',
    coordinates: { lat: 1.3496, lng: 103.7498 },
    gantryHeightMeters: 2.15,
    nightParking: true,
    freeParking: 'Sundays & PH (7.00am to 10.30pm)',
    rates: {
      weekdayDay: '$0.60 / 30 mins',
      weekdayNight: '$0.60 / 30 mins (Cap $5.00)',
      weekendDay: '$0.60 / 30 mins',
      weekendNight: '$0.60 / 30 mins (Cap $5.00)',
      gracePeriodMinutes: 15,
      freeParkingInfo: 'Sundays & PH free parking 7:00 AM - 10:30 PM',
    },
    lots: {
      car: { total: 520, available: 288 },
      motorcycle: { total: 50, available: 31 },
    },
    evChargers: { total: 4, available: 3, provider: 'SP Mobility', powerKw: 22 },
    lastUpdated: new Date().toLocaleTimeString(),
    trend: 'stable',
  },

  // NORTH REGION
  {
    id: 'sg-cp-woodlands-w567',
    carparkNumber: 'W567',
    name: 'Woodlands Ring Rd Blk 567 MSCP',
    address: '567 Woodlands Ring Road, Singapore 730567',
    estate: 'Woodlands',
    region: 'North',
    agency: 'HDB',
    carparkType: 'Multi-Storey Carpark (MSCP)',
    parkingSystem: 'Electronic Parking System (EPS)',
    coordinates: { lat: 1.4358, lng: 103.7925 },
    gantryHeightMeters: 2.15,
    nightParking: true,
    freeParking: 'Sundays & PH (7.00am to 10.30pm)',
    rates: {
      weekdayDay: '$0.60 / 30 mins',
      weekdayNight: '$0.60 / 30 mins (Cap $5.00)',
      weekendDay: '$0.60 / 30 mins',
      weekendNight: '$0.60 / 30 mins (Cap $5.00)',
      gracePeriodMinutes: 15,
      freeParkingInfo: 'Free on Sundays & PH: 7am - 10:30pm',
    },
    lots: {
      car: { total: 303, available: 188 },
      motorcycle: { total: 35, available: 21 },
    },
    evChargers: { total: 3, available: 2, provider: 'SP Mobility', powerKw: 22 },
    lastUpdated: new Date().toLocaleTimeString(),
    trend: 'stable',
  },
  {
    id: 'sg-cp-causeway-pt',
    carparkNumber: 'CP1',
    name: 'Causeway Point & Woodlands Civic Centre',
    address: '1 Woodlands Square, Singapore 738099',
    estate: 'Woodlands',
    region: 'North',
    agency: 'Commercial',
    carparkType: 'Basement Carpark',
    parkingSystem: 'Electronic Parking System (EPS)',
    coordinates: { lat: 1.4361, lng: 103.7865 },
    gantryHeightMeters: 2.0,
    nightParking: true,
    freeParking: 'Frasers Experience app rewards apply',
    rates: {
      weekdayDay: '$1.40 1st hr, $0.60/subsequent 30m',
      weekdayNight: '$2.40 per entry after 5pm',
      weekendDay: '$2.00 1st 2 hrs, $0.80/subsequent 30m',
      weekendNight: '$2.40 per entry after 5pm',
      gracePeriodMinutes: 10,
    },
    lots: {
      car: { total: 850, available: 312 },
      motorcycle: { total: 95, available: 48 },
    },
    evChargers: { total: 6, available: 3, provider: 'CDG ENGIE', powerKw: 50 },
    lastUpdated: new Date().toLocaleTimeString(),
    trend: 'decreasing',
  },
  {
    id: 'sg-cp-yishun-y84m',
    carparkNumber: 'Y84M',
    name: 'Yishun Ring Rd Blk 848 MSCP',
    address: '848 Yishun Ring Road, Singapore 760848',
    estate: 'Yishun',
    region: 'North',
    agency: 'HDB',
    carparkType: 'Multi-Storey Carpark (MSCP)',
    parkingSystem: 'Electronic Parking System (EPS)',
    coordinates: { lat: 1.4172, lng: 103.8345 },
    gantryHeightMeters: 2.15,
    nightParking: true,
    freeParking: 'Sundays & PH (7.00am to 10.30pm)',
    rates: {
      weekdayDay: '$0.60 / 30 mins',
      weekdayNight: '$0.60 / 30 mins (Cap $5.00)',
      weekendDay: '$0.60 / 30 mins',
      weekendNight: '$0.60 / 30 mins (Cap $5.00)',
      gracePeriodMinutes: 15,
      freeParkingInfo: 'Free on Sundays & PH 7am - 10:30pm',
    },
    lots: {
      car: { total: 567, available: 419 },
      motorcycle: { total: 45, available: 30 },
    },
    evChargers: { total: 4, available: 2, provider: 'SP Mobility', powerKw: 22 },
    lastUpdated: new Date().toLocaleTimeString(),
    trend: 'stable',
  },
  {
    id: 'sg-cp-northpoint',
    carparkNumber: 'NP1',
    name: 'Northpoint City (North & South Wing)',
    address: '930 Yishun Avenue 2, Singapore 769098',
    estate: 'Yishun',
    region: 'North',
    agency: 'Commercial',
    carparkType: 'Basement Carpark',
    parkingSystem: 'Electronic Parking System (EPS)',
    coordinates: { lat: 1.4294, lng: 103.8359 },
    gantryHeightMeters: 2.0,
    nightParking: true,
    freeParking: 'Frasers Experience parking vouchers',
    rates: {
      weekdayDay: '$1.50 1st hr, $0.60/subsequent 30m',
      weekdayNight: '$2.50 per entry after 5pm',
      weekendDay: '$2.20 1st 2 hrs, $0.80/subsequent 30m',
      weekendNight: '$2.50 per entry after 5pm',
      gracePeriodMinutes: 10,
    },
    lots: {
      car: { total: 1100, available: 395 },
      motorcycle: { total: 110, available: 52 },
    },
    evChargers: { total: 8, available: 4, provider: 'Shell Recharge', powerKw: 50 },
    lastUpdated: new Date().toLocaleTimeString(),
    trend: 'stable',
  },

  // NORTH-EAST REGION
  {
    id: 'sg-cp-nex',
    carparkNumber: 'NEX1',
    name: 'NEX Serangoon Shopping Mall Carpark',
    address: '23 Serangoon Central, Singapore 556083',
    estate: 'Serangoon',
    region: 'North-East',
    agency: 'Commercial',
    carparkType: 'Basement Carpark',
    parkingSystem: 'Electronic Parking System (EPS)',
    coordinates: { lat: 1.3508, lng: 103.8727 },
    gantryHeightMeters: 2.1,
    nightParking: true,
    freeParking: 'No standard free parking',
    rates: {
      weekdayDay: '$1.60 1st hr, $0.60/subsequent 15m',
      weekdayNight: '$2.60 per entry after 6pm',
      weekendDay: '$2.40 1st 2 hrs, $0.70/subsequent 15m',
      weekendNight: '$2.60 per entry after 6pm',
      gracePeriodMinutes: 10,
    },
    lots: {
      car: { total: 950, available: 215 },
      motorcycle: { total: 100, available: 42 },
    },
    evChargers: { total: 8, available: 3, provider: 'SP Mobility', powerKw: 50 },
    lastUpdated: new Date().toLocaleTimeString(),
    trend: 'decreasing',
  },
  {
    id: 'sg-cp-waterway-pt',
    carparkNumber: 'WWP1',
    name: 'Waterway Point Punggol MSCP & Basement',
    address: '83 Punggol Central, Singapore 828761',
    estate: 'Punggol',
    region: 'North-East',
    agency: 'Commercial',
    carparkType: 'Multi-Storey Carpark (MSCP)',
    parkingSystem: 'Electronic Parking System (EPS)',
    coordinates: { lat: 1.4067, lng: 103.9023 },
    gantryHeightMeters: 2.15,
    nightParking: true,
    freeParking: 'Frasers Experience loyalty redemptions',
    rates: {
      weekdayDay: '$1.40 1st hr, $0.60/subsequent 30m',
      weekdayNight: '$2.20 per entry after 6pm',
      weekendDay: '$2.00 1st 2 hrs, $0.70/subsequent 30m',
      weekendNight: '$2.20 per entry after 6pm',
      gracePeriodMinutes: 10,
    },
    lots: {
      car: { total: 1020, available: 468 },
      motorcycle: { total: 110, available: 62 },
    },
    evChargers: { total: 10, available: 6, provider: 'CDG ENGIE', powerKw: 50 },
    lastUpdated: new Date().toLocaleTimeString(),
    trend: 'stable',
  },
  {
    id: 'sg-cp-compass-one',
    carparkNumber: 'CO1',
    name: 'Compass One Sengkang Central Carpark',
    address: '1 Sengkang Square, Singapore 545078',
    estate: 'Sengkang',
    region: 'North-East',
    agency: 'Commercial',
    carparkType: 'Basement Carpark',
    parkingSystem: 'Electronic Parking System (EPS)',
    coordinates: { lat: 1.3917, lng: 103.8946 },
    gantryHeightMeters: 2.05,
    nightParking: true,
    freeParking: 'Spend $30 for 1 hr free parking',
    rates: {
      weekdayDay: '$1.50 1st hr, $0.50/subsequent 15m',
      weekdayNight: '$2.50 per entry after 5pm',
      weekendDay: '$2.20 1st 2 hrs, $0.60/subsequent 15m',
      weekendNight: '$2.50 per entry after 5pm',
      gracePeriodMinutes: 10,
    },
    lots: {
      car: { total: 680, available: 198 },
      motorcycle: { total: 75, available: 38 },
    },
    evChargers: { total: 6, available: 2, provider: 'SP Mobility', powerKw: 22 },
    lastUpdated: new Date().toLocaleTimeString(),
    trend: 'stable',
  },
  {
    id: 'sg-cp-amk-he12',
    carparkNumber: 'HE12',
    name: 'Ang Mo Kio Ave 3 Blk 324 MSCP',
    address: '324 Ang Mo Kio Avenue 3, Singapore 560324',
    estate: 'Ang Mo Kio',
    region: 'North-East',
    agency: 'HDB',
    carparkType: 'Multi-Storey Carpark (MSCP)',
    parkingSystem: 'Electronic Parking System (EPS)',
    coordinates: { lat: 1.3682, lng: 103.8475 },
    gantryHeightMeters: 2.15,
    nightParking: true,
    freeParking: 'Sundays & PH (7.00am to 10.30pm)',
    rates: {
      weekdayDay: '$0.60 / 30 mins',
      weekdayNight: '$0.60 / 30 mins (Cap $5.00)',
      weekendDay: '$0.60 / 30 mins',
      weekendNight: '$0.60 / 30 mins (Cap $5.00)',
      gracePeriodMinutes: 15,
      freeParkingInfo: 'Free on Sundays & PH 7am - 10:30pm',
    },
    lots: {
      car: { total: 105, available: 103 },
      motorcycle: { total: 15, available: 11 },
    },
    evChargers: { total: 2, available: 2, provider: 'SP Mobility', powerKw: 22 },
    lastUpdated: new Date().toLocaleTimeString(),
    trend: 'stable',
  },
  {
    id: 'sg-cp-bishan-b68',
    carparkNumber: 'B68',
    name: 'Bishan St 13 Blk 179 MSCP',
    address: '179 Bishan Street 13, Singapore 570179',
    estate: 'Bishan',
    region: 'Central',
    agency: 'HDB',
    carparkType: 'Multi-Storey Carpark (MSCP)',
    parkingSystem: 'Electronic Parking System (EPS)',
    coordinates: { lat: 1.3524, lng: 103.8512 },
    gantryHeightMeters: 2.15,
    nightParking: true,
    freeParking: 'Sundays & PH (7.00am to 10.30pm)',
    rates: {
      weekdayDay: '$0.60 / 30 mins',
      weekdayNight: '$0.60 / 30 mins (Cap $5.00)',
      weekendDay: '$0.60 / 30 mins',
      weekendNight: '$0.60 / 30 mins (Cap $5.00)',
      gracePeriodMinutes: 15,
      freeParkingInfo: 'Sundays & PH 7am - 10:30pm',
    },
    lots: {
      car: { total: 481, available: 370 },
      motorcycle: { total: 45, available: 32 },
    },
    evChargers: { total: 4, available: 3, provider: 'CDG ENGIE', powerKw: 22 },
    lastUpdated: new Date().toLocaleTimeString(),
    trend: 'stable',
  },
  {
    id: 'sg-cp-toa-payoh-tpmu',
    carparkNumber: 'TPMU',
    name: 'Toa Payoh Central Blk 79 MSCP',
    address: '79 Toa Payoh Central, Singapore 310079',
    estate: 'Toa Payoh',
    region: 'Central',
    agency: 'HDB',
    carparkType: 'Multi-Storey Carpark (MSCP)',
    parkingSystem: 'Electronic Parking System (EPS)',
    coordinates: { lat: 1.3343, lng: 103.8496 },
    gantryHeightMeters: 2.15,
    nightParking: true,
    freeParking: 'Sundays & PH (7.00am to 10.30pm)',
    rates: {
      weekdayDay: '$0.60 / 30 mins',
      weekdayNight: '$0.60 / 30 mins (Cap $5.00)',
      weekendDay: '$0.60 / 30 mins',
      weekendNight: '$0.60 / 30 mins (Cap $5.00)',
      gracePeriodMinutes: 15,
      freeParkingInfo: 'Free on Sundays & PH 7:00 AM - 10:30 PM',
    },
    lots: {
      car: { total: 470, available: 304 },
      motorcycle: { total: 60, available: 38 },
      heavy: { total: 8, available: 4 },
    },
    evChargers: { total: 4, available: 2, provider: 'SP Mobility', powerKw: 50 },
    lastUpdated: new Date().toLocaleTimeString(),
    trend: 'stable',
  },
];

/**
 * Fetch real-time carpark availability directly from Singapore's official Data.gov.sg API.
 * Returns a map of carpark_number -> { available, total }
 */
export async function fetchGovAvailabilityMap(): Promise<Map<string, { car?: { available: number; total: number }; motorcycle?: { available: number; total: number }; heavy?: { available: number; total: number } }>> {
  const result = new Map();
  try {
    const res = await fetch('https://api.data.gov.sg/v1/transport/carpark-availability', {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Data.gov.sg returned HTTP ${res.status}`);
    }

    const data = await res.json();
    const items = data?.items?.[0]?.carpark_data;

    if (Array.isArray(items)) {
      for (const item of items) {
        const cpNum = item.carpark_number;
        const infoList = item.carpark_info;
        if (!cpNum || !Array.isArray(infoList)) continue;

        const cpLots: { car?: { available: number; total: number }; motorcycle?: { available: number; total: number }; heavy?: { available: number; total: number } } = {};

        for (const info of infoList) {
          const lotType = info.lot_type;
          const avail = parseInt(info.lots_available, 10);
          const total = parseInt(info.total_lots, 10);

          if (isNaN(avail) || isNaN(total)) continue;

          if (lotType === 'C') {
            cpLots.car = { available: avail, total };
          } else if (lotType === 'Y' || lotType === 'M') {
            cpLots.motorcycle = { available: avail, total };
          } else if (lotType === 'H') {
            cpLots.heavy = { available: avail, total };
          }
        }

        result.set(cpNum, cpLots);
      }
    }
  } catch (err) {
    console.warn('[ParkSG] Live Data.gov.sg API sync warning (will use resilient fallback):', err);
  }
  return result;
}

/**
 * Merge live API results or apply subtle live simulation tick.
 */
export function updateCarparkLots(
  currentCarparks: Carpark[],
  govMap: Map<string, { car?: { available: number; total: number }; motorcycle?: { available: number; total: number }; heavy?: { available: number; total: number } }>
): Carpark[] {
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return currentCarparks.map((cp) => {
    const govData = govMap.get(cp.carparkNumber);

    if (govData && govData.car) {
      const prevAvail = cp.lots.car.available;
      const newAvail = govData.car.available;
      const trend = newAvail > prevAvail ? 'increasing' : newAvail < prevAvail ? 'decreasing' : cp.trend;

      return {
        ...cp,
        lots: {
          ...cp.lots,
          car: {
            total: govData.car.total > 0 ? govData.car.total : cp.lots.car.total,
            available: Math.min(govData.car.available, govData.car.total > 0 ? govData.car.total : cp.lots.car.total),
          },
          ...(govData.motorcycle && cp.lots.motorcycle ? {
            motorcycle: {
              total: govData.motorcycle.total,
              available: Math.min(govData.motorcycle.available, govData.motorcycle.total),
            }
          } : {}),
          ...(govData.heavy && cp.lots.heavy ? {
            heavy: {
              total: govData.heavy.total,
              available: Math.min(govData.heavy.available, govData.heavy.total),
            }
          } : {})
        },
        lastUpdated: timeStr,
        trend,
      };
    }

    // Realistic minute-by-minute simulation fluctuation for carparks not in current gov subset (e.g. commercial malls)
    const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2
    const newCarAvail = Math.max(0, Math.min(cp.lots.car.total, cp.lots.car.available + delta));
    const trend = delta > 0 ? 'increasing' : delta < 0 ? 'decreasing' : cp.trend;

    return {
      ...cp,
      lots: {
        ...cp.lots,
        car: {
          ...cp.lots.car,
          available: newCarAvail,
        },
      },
      lastUpdated: timeStr,
      trend,
    };
  });
}
