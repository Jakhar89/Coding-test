export type Contract =
  | {
      customerDomain: {
        customer: {
          customerId: string;
        };
        customerRoleType: {
          customerRole: string;
        };
        contract: {
          contractId: string;
          contractStartDate: string;
          contractStatus: string;
          contractEndDate: string;
        };
      };
      productDomain?: {
        product: {
          productTitle: string;
        };
      };
      vehicleDomain: {
        vehicleSpecification: {
          vehicleDescription: string;
        };
      };
    }
  | undefined;

export type ContractsData = {
  contracts?: Contract[];
  loading?: boolean;
};
