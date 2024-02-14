import { isUndefined } from 'lodash';
import React, { useState } from 'react';

import { AEMProps } from '@/types/global/aem-definition';
import {
    ANALYTICS_NOT_APPLICABLE_URL, ANALYTICS_POSITION_FAQ, ANALYTICS_POSITION_INPAGE,
    getFormattedPageName, handleAnalyticsClick
} from '@/utility/helpers/analytics';

import Accordion from '../Accordion/Accordion';
import { FAQComponentProps } from './definitions';
import { FAQComponentElement, Tab, TabList, TabPanel, Tabs as StyledTabs } from './StyledFAQ';

const FAQ = ({ attributes }: AEMProps) => {
  if (attributes === '{}') {
    return null;
  }

  const [targetFAQIndex, setTargetFAQIndex] = useState<number | undefined>();

  const faqComponentJson: FAQComponentProps = JSON.parse(attributes);
  const generalFaqList = faqComponentJson?.faqList;
  const tab1List = faqComponentJson?.faqList1;
  const tab2List = faqComponentJson?.faqList2;
  const tab3List = faqComponentJson?.faqList3;
  const tab4List = faqComponentJson?.faqList4;
  const tab5List = faqComponentJson?.faqList5;

  const handleTabAnalytics = (e) => {
    const tabTitle = e.target.textContent;
    const data = {
      keyLink: {
        linkDestinationURL: ANALYTICS_NOT_APPLICABLE_URL,
        linkOriginationPage: getFormattedPageName(),
        linkPosition: ANALYTICS_POSITION_FAQ,
        linkTitle: tabTitle,
      },
    };

    handleAnalyticsClick('keyLinkInteraction', data);
    console.log(e.target.textContent);
  };

  return (
    <FAQComponentElement data-testid="faq-component">
      <StyledTabs
        selectedTabClassName="is-selected"
        selectedTabPanelClassName="is-selected"
      >
        {isUndefined(generalFaqList) && (
          <>
            <TabList>
              <Tab onClick={(e) => handleTabAnalytics(e)}>{faqComponentJson?.tabNameText1}</Tab>
              <Tab onClick={(e) => handleTabAnalytics(e)}>{faqComponentJson?.tabNameText2}</Tab>
              <Tab onClick={(e) => handleTabAnalytics(e)}>{faqComponentJson?.tabNameText3}</Tab>
              <Tab onClick={(e) => handleTabAnalytics(e)}>{faqComponentJson?.tabNameText4}</Tab>
              <Tab onClick={(e) => handleTabAnalytics(e)}>{faqComponentJson?.tabNameText5}</Tab>
            </TabList>

            <TabPanel>
              {tab1List?.map((item, index) => {
                return (
                  <Accordion
                    key={index}
                    index={index}
                    targetFAQIndex={targetFAQIndex}
                    setTargetFAQIndex={setTargetFAQIndex}
                    attributes={JSON.stringify(item)}
                  ></Accordion>
                );
              })}
            </TabPanel>
            <TabPanel>
              {tab2List?.map((item, index) => {
                return (
                  <Accordion
                    key={index}
                    index={index}
                    targetFAQIndex={targetFAQIndex}
                    setTargetFAQIndex={setTargetFAQIndex}
                    attributes={JSON.stringify(item)}
                  ></Accordion>
                );
              })}
            </TabPanel>
            <TabPanel>
              {tab3List?.map((item, index) => {
                return (
                  <Accordion
                    key={index}
                    index={index}
                    targetFAQIndex={targetFAQIndex}
                    setTargetFAQIndex={setTargetFAQIndex}
                    attributes={JSON.stringify(item)}
                  ></Accordion>
                );
              })}
            </TabPanel>
            <TabPanel>
              {tab4List?.map((item, index) => {
                return (
                  <Accordion
                    key={index}
                    index={index}
                    targetFAQIndex={targetFAQIndex}
                    setTargetFAQIndex={setTargetFAQIndex}
                    attributes={JSON.stringify(item)}
                  ></Accordion>
                );
              })}
            </TabPanel>
            <TabPanel>
              {tab5List?.map((item, index) => {
                return (
                  <Accordion
                    key={index}
                    index={index}
                    targetFAQIndex={targetFAQIndex}
                    setTargetFAQIndex={setTargetFAQIndex}
                    attributes={JSON.stringify(item)}
                  ></Accordion>
                );
              })}
            </TabPanel>
          </>
        )}
        {!isUndefined(generalFaqList) && (
          <TabPanel>
            {generalFaqList?.map((item, index) => {
              return (
                <Accordion
                  key={index}
                  index={index}
                  targetFAQIndex={targetFAQIndex}
                  setTargetFAQIndex={setTargetFAQIndex}
                  attributes={JSON.stringify(item)}
                ></Accordion>
              );
            })}
          </TabPanel>
        )}
      </StyledTabs>
    </FAQComponentElement>
  );
};

export default FAQ;
