import { TabProps, Tabs } from 'react-tabs';

type Tabs = {
  id: string;
  tabTitle: string;
  content?: any;
};

export type tabParsedProps = {
  authorMode?: boolean;
  tabs?: TabProps[] | Tabs[];
};
