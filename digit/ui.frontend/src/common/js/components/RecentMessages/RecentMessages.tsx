import React, { ReactComponentElement, useEffect, useState } from 'react';

import { userStore } from '@/context/User/User';
import { AEMProps } from '@/types/global/aem-definition';
import ActionButton from '@/utility/components/FormElement/ActionButton';
import Icon from '@/utility/components/Icon';
import { ANALYTICS_POSITION_INPAGE, getFormattedPageName, handleAnalyticsClick } from '@/utility/helpers/analytics';
import { getCallAPI2, loginFlow } from '@/utility/helpers/api';
import { API_CORRESPONDENCE_DATA } from '@/utility/helpers/constants';
import { formatDate } from '@/utility/helpers/dateTime';
import { BREAKPOINTS } from '@/utility/styles/mq';

import { MessagesProps, RecentMessageParsedProps } from './definitions';
import {
  ButtonContainer,
  GridContainer,
  GridItemContainer,
  GridRowContainer,
  IconContainer,
  IconContainer2,
  LeftContainer,
  LeftInnerWrapper,
  Message,
  MessageDateTime,
  MessageText,
  MessageWrapper,
  NoMessageSub,
  NoMessageText,
  Notifications,
  RecentMessageContainer,
  RightContainer,
  RightInnerWrapper,
  Title,
} from './StyledRecentMessage';

const RecentMessages = ({ attributes, errorSuccessMap }: AEMProps) => {
  if (attributes === '{}') {
    return null;
  }

  const recentMessageJson: RecentMessageParsedProps = JSON.parse(attributes);
  const [messages, setMessages] = useState<MessagesProps[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const { apiResponse, addToAPIResponse } = userStore();
  const { loginInfo, correspondenceData } = apiResponse;

  const questApiKey = localStorage?.getItem('apiKey') ?? recentMessageJson?.globalConfig?.questApiKey;
  const baseApiUrl = localStorage?.getItem('baseApiUrl') ?? recentMessageJson?.globalConfig?.baseApiUrl;

  const getCallParams = { baseUrl: baseApiUrl, apiKey: questApiKey, errorSuccessMap };

  const filteredContent = (data: any) => {
    const { customerInteractionCases } = data;
    return customerInteractionCases;
  };

  // Important: Initial release does not need API data
  // TODO: uncomment following useEffects when messages API ready to go live

  // useEffect(() => {
  //   if (correspondenceData) {
  //     const filterMessages = correspondenceData[0].customerDomain.map((data) => filteredContent(data));
  //     setMessages(filterMessages.slice(0, 5));
  //   }
  // }, [correspondenceData]);

  // useEffect(() => {
  //   if (!loginInfo && baseApiUrl && questApiKey) {
  //     loginFlow(baseApiUrl, questApiKey, errorSuccessMap, apiResponse, addToAPIResponse, true);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (loginInfo && !correspondenceData) {
  //     getCallAPI2({ ...getCallParams, apiName: 'recent-messages' }).then((res) => {
  //       addToAPIResponse(API_CORRESPONDENCE_DATA, res?.data);
  //     });
  //   }
  // }, [loginInfo]);

  useEffect(() => {
    DynamicCompResize();
  }, []);

  const unreadMessages = () => {
    const count = messages.filter((data) => data.readStatus === false).length;
    return <>{count}</>;
  };

  const Messages = (data) => {
    return (
      <Message mobile={data.device === 'xs' ? true : false}>
        {messages.length > 0 ? (
          messages.map((ele, i) => (
            <RightInnerWrapper
              key={i}
              mobile={data.device === 'xs' ? true : false}
            >
              {/* //Will be required as Per message type in future */}
              <IconContainer>
                <Icon
                  name={'mail-icon'}
                  isFunctional={false}
                  ariaLabelledBy={'mail'}
                />
              </IconContainer>

              <MessageWrapper
                onClick={() => {
                  handleAnalyticsClick('keyLinkInteraction', {
                    keyLink: {
                      linkOriginationPage: getFormattedPageName(),
                      linkPosition: ANALYTICS_POSITION_INPAGE,
                      linkTitle: 'All Messages',
                    },
                  });
                }}
              >
                <MessageDateTime>{formatDate(new Date(ele?.createDate))}</MessageDateTime>
                <MessageText read={ele.readStatus}>{ele?.subject}</MessageText>
              </MessageWrapper>
            </RightInnerWrapper>
          ))
        ) : (
          <RightInnerWrapper
            noMessage={true}
            mobile={data.device === 'xs' ? true : false}
          >
            <IconContainer2>
              <Icon
                name={'message-icon'}
                isFunctional={false}
                ariaLabelledBy={'mail'}
              />
            </IconContainer2>
            <MessageWrapper noMessage={true}>
              <NoMessageText>{recentMessageJson.noMessageTitle}</NoMessageText>
              <NoMessageSub>{recentMessageJson.noMessageDescription}</NoMessageSub>
            </MessageWrapper>
          </RightInnerWrapper>
        )}
      </Message>
    );
  };

  const handleOnClick = (title, path) => {
    handleAnalyticsClick('keyLinkInteraction', {
      keyLink: {
        linkDestinationURL: path,
        linkOriginationPage: getFormattedPageName(),
        linkPosition: ANALYTICS_POSITION_INPAGE,
        linkTitle: title,
      },
    });
    window.location.href = `${path}.html`;
  };

  const DynamicCompResize = () => {
    window.addEventListener('resize', DynamicCompResize);
    const mobileCheck = window.innerWidth < BREAKPOINTS.md ? true : false;
    setIsMobile(mobileCheck);
  };

  const cardWidthConfig = { col: { xs: 12, md: 12, lg: 12 } };

  return (
    <RecentMessageContainer data-id="recent-messages">
      <GridContainer>
        <GridRowContainer>
          <GridItemContainer config={cardWidthConfig}>
            <LeftContainer>
              <LeftInnerWrapper>
                <IconContainer>
                  <Icon
                    name={'recent-messages'}
                    isFunctional={false}
                    ariaLabelledBy={'recent-messages'}
                  />
                </IconContainer>

                <Title>
                  {recentMessageJson.recentMessagesTitle
                    ? recentMessageJson.recentMessagesTitle
                    : recentMessageJson.noMessageTitle}
                </Title>
                {/* <Notifications>{unreadMessages()}</Notifications> */}
              </LeftInnerWrapper>

              {isMobile && (
                <RightContainer>
                  <Messages device={'xs'} />
                </RightContainer>
              )}

              {/* <ButtonContainer>
                <ActionButton
                  buttonType="secondary"
                  label={recentMessageJson.buttonLabel}
                  onClick={() => handleOnClick(recentMessageJson.buttonLabel, recentMessageJson.buttonPath)}
                />
              </ButtonContainer> */}
            </LeftContainer>

            {!isMobile && (
              <RightContainer>
                <Messages />
              </RightContainer>
            )}
          </GridItemContainer>
        </GridRowContainer>
      </GridContainer>
    </RecentMessageContainer>
  );
};

export default RecentMessages;
