export type Correspondence = {
  customerDomain: CustomerDomain[];
};

interface CustomerDomain {
  contract: Contract;
  customerInteractionCases: MessagesProps;
}

export type MessagesProps = {
  createDate: string;
  type: string;
  readStatus: boolean;
  caseID: number;
  subject: string;
  publishedStatus: string;
  file?: File;
  filename?: string;
};

interface File {
  filename: string;
}

interface Contract {
  contractId: number;
}
