export type AccountDetails = {
  customerDomain: CustomerDomain;
  productDomain: ProductDomain;
  dealerDomain: DealerDomain;
};

interface DealerDomain {
  dealer: Dealer;
}

interface Dealer {
  dealershipName: string;
}

interface ProductDomain {
  product: Product;
}

interface Product {
  productTitle: string;
}

interface CustomerDomain {
  customer: Customer;
  contract: Contract;
  paymentMethod: PaymentMethod;
  financeAccountChargesAndCredits: FinanceAccountChargesAndCredits;
  financeAccount: FinanceAccount;
  financialDetailRetailFinance: FinancialDetailRetailFinance;
}

interface FinancialDetailRetailFinance {
  balloonAmount: number;
}

interface FinanceAccount {
  balanceOutstanding: number;
  totalAmountFinanced: number;
}

interface FinanceAccountChargesAndCredits {
  creditAmountOnAccount: number;
}

interface PaymentMethod {
  paymentMethod: string;
}

interface Contract {
  contractId: string;
  contractStartDate: string;
  contractStatus: string;
  contractEndDate: string;
  contractTerm: number;
  contractRate: number;
}

interface Customer {
  customerId: string;
}
