import React from 'react';
import { TabsProps } from 'react-tabs';

import { AEMProps } from '@/types/global/aem-definition';

import { THEMES } from '@/storybook/preview';
import { Story, Meta } from '@storybook/react/types-6-0';
import DataList from '@/utility/components/DataList';

import mock from './mock.json';
import { Tabs, TabList, Tab, TabPanel } from './StyledTabList';
import ContentTabs from './Tabs';

const mockStringified = JSON.stringify(mock);

export default {
  title: 'Components/Tabs',
  component: Tabs,
  argTypes: {},
} as Meta;

const Template: Story<AEMProps> = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;
  return (
    <Theme>
      <ContentTabs {...args} />
    </Theme>
  );
};

export const Example = Template.bind({});

const data = [
  {
    title: 'Address Line 1',
    value: '129 West Street',
  },
  {
    title: 'Address Line 2',
    value: 'Unit 5A',
  },
  {
    title: 'Suburb',
    value: 'Sydney',
  },
  {
    title: 'State',
    value: 'NSW',
  },
  {
    title: 'Postcode',
    value: '2000',
  },
  {
    title: 'Country',
    value: 'Australia',
  },
];

const data2 = [
  {
    title: 'Address Line 1',
    value: '130 North Street',
  },
  {
    title: 'Address Line 2',
    value: 'Unit 6B',
  },
  {
    title: 'Suburb',
    value: 'Sydney',
  },
  {
    title: 'State',
    value: 'NSW',
  },
  {
    title: 'Postcode',
    value: '2000',
  },
  {
    title: 'Country',
    value: 'Australia',
  },
];

Example.args = {
  attributes: mockStringified,
};
Example.storyName = 'Tabs - default theme';

const Template2: Story<TabsProps> = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;

  return (
    <Theme>
      <Tabs
        selectedTabClassName="is-selected"
        selectedTabPanelClassName="is-selected"
      >
        <TabList>
          <Tab>Street address</Tab>
          <Tab>Post office box</Tab>
        </TabList>
        <TabPanel>
          <DataList data={data} />
        </TabPanel>
        <TabPanel>
          <DataList data={data2} />
        </TabPanel>
      </Tabs>
    </Theme>
  );
};

export const Example2 = Template2.bind({});

Example2.storyName = 'Tabs - Components';
