export type VehicleData = {
  assets: Asset[];
};

interface Asset {
  customerDomain: CustomerDomain;
  vehicleDomain: VehicleDomain;
}

interface VehicleDomain {
  vehicleSpecification: VehicleSpecification;
  vehicleConditionDetail: VehicleConditionDetail;
  vehicle: Vehicle;
  vehicleRegistration: VehicleRegistration;
  vehicleEngine: VehicleEngine;
  vehicleCatalogue: VehicleCatalogue;
}

interface VehicleCatalogue {
  baseVehiclePrice: number;
  vehicleNVIC: string;
}

interface VehicleEngine {
  vehicleEngineNumber: string;
}

interface VehicleRegistration {
  vehicleRegistrationNumber: string;
  vehicleRegistrationState: string;
}

interface Vehicle {
  vehicleIdentificationNumber: string;
}

interface VehicleConditionDetail {
  vehicleCondition: string;
}

interface VehicleSpecification {
  vehicleDescription: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: number;
  vehicleModelVariant: string;
  vehicleExternalColour: string;
}

interface CustomerDomain {
  contract: Contract;
  financialDetailRetailFinance: FinancialDetailRetailFinance;
}

interface FinancialDetailRetailFinance {
  gfvDetail: GfvDetail;
}

interface GfvDetail {
  endOdometer: number;
}

interface Contract {
  contractId: string;
  contractedKMs: number;
}
