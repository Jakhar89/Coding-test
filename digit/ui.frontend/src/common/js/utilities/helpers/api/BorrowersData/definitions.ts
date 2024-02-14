export type Borrowers = {
  contracts: Contract2[];
};

interface Contract2 {
  customerDomain: CustomerDomain;
  productDomain: ProductDomain;
  vehicleDomain: VehicleDomain;
}

interface VehicleDomain {
  vehicleSpecification: VehicleSpecification;
}

interface VehicleSpecification {
  vehicleDescription: string;
}

interface ProductDomain {
  product: Product;
}

interface Product {
  productTitle: string;
}

interface CustomerDomain {
  customer: Customer;
  customerRoleType: CustomerRoleType;
  contract: Contract;
  financialDetailRetailFinance: FinancialDetailRetailFinance;
}

interface FinancialDetailRetailFinance {
  customer: Customer2;
}

interface Customer2 {
  givenName1: string;
  givenName2: string;
  surname: string;
}

interface Contract {
  contractId: string;
  contractStartDate: string;
  contractStatus: string;
  contractEndDate: string;
}

interface CustomerRoleType {
  customerRole: string;
}

interface Customer {
  customerId: string;
}
