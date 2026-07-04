export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  default_color: string;
  email?: string | null;
  website?: string | null;
  created_at: string;
}

export type ConditionRating = 'excellent' | 'good' | 'fair' | 'poor' | 'na';
export type ReportStatus = 'draft' | 'completed';
export type ReportType = 'VIN' | 'Plate';
export type PackageType = 'Basic' | 'Standard' | 'Premium';

export interface MOTRecord {
  year: string;
  result: string;
  dateOfTest: string;
  expiryDate: string;
  mileage: string;
  testNumber: string;
  advisorNote: string;
}

export interface LegalCheck {
  label: string;
  status: string;
}

export interface SafetyFeatureItem {
  label: string;
  status: 'Equipped' | 'Not Equipped';
}

export interface TitleCheckItem {
  label: string;
  value: boolean;
}

export interface ReportData {
  // Header/summary stats
  hiddenFields?: string[];
  searchDate: string;
  accidentsCount: number;
  recallsCount: number;
  titleRecordsCount: number;
  junkSalvageCount: number;
  totalLossCount: number;
  problemChecksCount: number;

  // Executive Summary fields
  vehicleDisplay: string;
  plateNumber: string;
  currentMileage: string;
  titleRecordsStatus: string;
  accidentsStatus: string;
  junkSalvageStatus: string;
  totalLossStatus: string;
  problemChecksStatus: string;
  recallsStatus: string;
  greatNewsMessage: string;

  // Legal Checks
  financialLegalStatus: string;
  insuranceWriteoffStatus: string;
  accidentRecordsStatus: string;
  theftStolenStatus: string;

  // MOT History
  motHistory: MOTRecord[];

  // Core Vehicle Specifications
  colour: string;
  engine: string;
  maxTorque: string;
  topSpeed: string;
  gearbox: string;
  marketValue: string;
  motStatus: string;
  lastReportedMileage: string;
  estimatedMileage: string;

  // Caravan specific details
  caravanType: string;
  chassisNumber: string;
  axleCount: string;
  caravanLength: string;
  caravanWidth: string;
  caravanHeight: string;
  caravanWeight: string;
  maxTowWeight: string;
  payloadCapacity: string;
  berths: string;
  waterTankCapacity: string;
  wasteTankCapacity: string;
  gasCapacity: string;
  solarPanel: boolean;
  airConditioning: boolean;
  microwave: boolean;
  fridge: boolean;
  shower: boolean;
  toilet: boolean;
  currencyType: string;

  // Premium caravan history fields
  vinVerification: string;
  manufacturerDetails: string;
  productionDate: string;
  modelTrim: string;
  countryOfManufacture: string;
  serialNumberVerification: string;
  numberOfPreviousOwners: string;
  ownershipTimeline: string;
  registrationHistory: string;
  registrationStatus: string;
  exportImportHistory: string;
  registrationGaps: string;
  cleanTitleVerification: string;
  salvageRebuiltCheck: string;
  floodTitleCheck: string;
  fireDamageTitle: string;
  theftRecordCheck: string;
  financeLienCheck: string;
  writeOffHistory: string;
  accidentHistory: string;
  structuralDamage: string;
  frameDamage: string;
  floodDamageHistory: string;
  fireDamageHistory: string;
  hailDamageHistory: string;
  stormDamageHistory: string;
  insuranceClaims: string;
  odometerRecords: string;
  serviceHistory: string;
  maintenanceRecords: string;
  inspectionHistory: string;
  motAnnualInspection: string;
  roadworthinessStatus: string;
  openSafetyRecalls: string;
  recallRepairsCompleted: string;
  manufacturerCampaigns: string;
  auctionRecords: string;
  previousSaleListings: string;
  salePriceHistory: string;
  auctionImages: string;
  manufacturerName: string;
  modelYear: string;
  bodyType: string;
  colourSpec: string;
  weightGvwr: string;
  lengthSpec: string;
  widthSpec: string;
  heightSpec: string;
  axleCountSpec: string;
  sleepingCapacity: string;
  waterTankCapacitySpec: string;
  freshWaterTankSize: string;
  greyWaterTankSize: string;
  blackWaterTankSize: string;
  hitchType: string;
  brakingSystem: string;
  heatingSystem: string;
  batterySystem: string;
  awning: string;
  kitchenEquipment: string;
  bathroomFacilities: string;
  refrigerator: string;
  waterHeater: string;
  entertainmentSystem: string;
  overallRiskScore: string;
  theftRisk: string;
  floodRisk: string;
  accidentRisk: string;
  titleRisk: string;
  estimatedMarketValueRisk: string;
  depreciationEstimate: string;
  manufacturerImages: string;
  auctionImagesDocs: string;
  inspectionPhotos: string;
  titleDocuments: string;
  registrationDocuments: string;
  overallVehicleRating: string;
  keyFindings: string;
  recommendedActions: string;
  reportGenerationDate: string;
  dataSourceSummary: string;

  // General Status
  vehicleClass: string;
  consumptionCity: string;
  motStatusGeneral: string;
  wheelPlan: string;

  // Engine & Transmission
  cylinders: string;
  camType: string;
  fuelInduction: string;
  fuelType: string;
  valves: string;
  maxHorsepower: string;
  totalMaxTorque: string;
  transmissionEngine: string;

  // Fuel Efficiency
  fuelGrade: string;
  cityEconomy: string;
  highwayEconomy: string;
  combinedEconomy: string;

  // Title Brand & Problem Checks
  // Damage & Salvage
  floodDamage: boolean;
  fireDamage: boolean;
  hailDamage: boolean;
  junkTitle: boolean;
  totaled: boolean;
  salvage: boolean;
  formerRental: boolean;

  // Title History
  priorTaxi: boolean;
  odometerNotActual: boolean;
  vandalism: boolean;
  rebuilt: boolean;
  dismantled: boolean;
  collision: boolean;
  priorPolice: boolean;

  // Warranty & Status
  warrantyReturn: boolean;
  partsOnly: boolean;
  recoveredTheft: boolean;
  undisclosedLien: boolean;
  antiqueClassic: boolean;
  agriculturalVehicle: boolean;
  reissuedVIN: boolean;

  // Safety & Defect
  manufacturerBuyBack: boolean;
  salvageStolen: boolean;
  crushed: boolean;
  inoperableVehicle: boolean;
  hazardous: boolean;
  exportOnlyVehicle: boolean;
  odometerTampering: boolean;
  grayMarket: boolean;

  // Odometer & Discrepancy
  odometerExceedsLimits: boolean;
  odometerAltered: boolean;
  odometerReplaced: boolean;
  odometerDiscrepancy: boolean;
  pendingJunk: boolean;
  junkAutomobile: boolean;

  // Recalls
  recallsMessage: string;

  // Safety Features
  frontAirbags: 'Equipped' | 'Not Equipped';
  sideAirbags: 'Equipped' | 'Not Equipped';
  sideCurtainAirbags: 'Equipped' | 'Not Equipped';
  abs: 'Equipped' | 'Not Equipped';
  brakingAssist: 'Equipped' | 'Not Equipped';
  electronicBrakeforceDistribution: 'Equipped' | 'Not Equipped';
  activeHeadRestraints: 'Equipped' | 'Not Equipped';
  childSafetyDoorLocks: 'Equipped' | 'Not Equipped';
  childSeatAnchors: 'Equipped' | 'Not Equipped';
  crumpleZones: 'Equipped' | 'Not Equipped';
  emergencyInteriorTrunkRelease: 'Equipped' | 'Not Equipped';

  // Security Features
  hillHolderControl: 'Equipped' | 'Not Equipped';
  stabilityControl: 'Equipped' | 'Not Equipped';
  tractionControl: 'Equipped' | 'Not Equipped';
  antiTheftSystem: 'Equipped' | 'Not Equipped';
  powerDoorLocks: 'Equipped' | 'Not Equipped';
  frontSeatbelts: 'Equipped' | 'Not Equipped';
  rearSeatbelts: 'Equipped' | 'Not Equipped';
  seatbeltPretensioners: 'Equipped' | 'Not Equipped';
  seatbeltWarningSensor: 'Equipped' | 'Not Equipped';

  // Auditing Summary
  auditSummaryText: string;
  marketValueSummary: string;
  motSummary: string;
  disclaimerText: string;

  // Contact
  email: string;
  website: string;
  tagline: string;
  securedBy: string;
}

export interface Report {
  id: string;
  user_id: string;
  brand_id: string;
  brand?: Brand;
  report_type: ReportType;
  package_type: PackageType;

  vin_number: string | null;
  plate_number: string | null;
  make: string | null;
  model: string | null;
  year: number | null;
  mileage: number | null;

  brand_color: string;
  logo_url: string | null;

  report_data: ReportData;

  client_name: string | null;
  vehicle_name: string | null;
  overall_score: number | null;
  status: ReportStatus;

  created_at: string;
  updated_at: string;
}
