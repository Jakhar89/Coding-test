import { GlobalConfigProps } from '@/types/global/aem-definition';

export type RecentMessageParsedProps = {
  globalConfig: GlobalConfigProps;
  recentMessagesTitle: string;
  buttonLabel: string;
  buttonPath: string;
  noMessageTitle: string;
  noMessageDescription: string;
};

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

export type MessageTextProps = {
  read?: boolean;
};

export type MessageProps = {
  mobile?: boolean;
};

export type NoMessages = {
  mobile?: boolean;
  noMessage?: boolean;
};
