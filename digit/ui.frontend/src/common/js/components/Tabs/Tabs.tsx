import { AEMProps } from '@/types/global/aem-definition';
import { Tabs as StyledTabs, TabList, Tab, TabPanel } from './StyledTabList';
import { tabParsedProps } from './definitions';

/*
    ****************

    IMPORTANT NOTE:

    - only use this component when integrating via AEM
    - direct use of React tabs can be done in FED via styled components - see example 2 in Storybook

    ****************
*/

const Tabs = ({ attributes }: AEMProps) => {
  if (attributes === '{}') {
    return null;
  }

  const tabJson: tabParsedProps = JSON.parse(attributes);

  return (
    <StyledTabs
      className={tabJson?.authorMode ? 'is-author-mode' : ''}
      selectedTabClassName="is-selected"
      selectedTabPanelClassName="is-selected"
    >
      <TabList>
        {tabJson?.tabs?.map((tab) => (
          <Tab>{tab?.tabTitle}</Tab>
        ))}
      </TabList>

      {tabJson?.tabs?.map(
        (tab) =>
          tab?.content && (
            <TabPanel
              key={tab?.id}
              dangerouslySetInnerHTML={{ __html: tab.content }}
            />
          ),
      )}
    </StyledTabs>
  );
};

export default Tabs;
