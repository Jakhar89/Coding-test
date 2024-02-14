export type BankAccountAPI = {
  customerDomain: CustomerDomain;
};

interface CustomerDomain {
  addressDependentEntity: AddressDependentEntity;
  bankAccounts: BankAccount[];
}

export type BankAccount = {
  bankAccountSequenceNumber: number;
  bsbNumber: string;
  bankAccountNumber: string;
  bankInstitution: string;
  bankAccountStatus: boolean;
  bankAccountName: string;
  bankAccountPrimary: boolean;
  defaultBankAccount: boolean;
  pegaQuestBankAccountIdentifier: string;
  bankAccountPegaSequenceNumber: string;
};

interface AddressDependentEntity {
  addressSequenceNumber: number;
}
