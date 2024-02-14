import React from 'react';

import Icon from '@/utility/components/Icon';

import { DataListProps } from './definitions';
import {
  BoldTitle,
  BoldValue,
  Container,
  ContentWrapper,
  DisclaimerText,
  IconWrapper,
  Title,
  Value,
} from './StyledDataList';

const DataList: React.FC<DataListProps> = ({ data, shouldHideEmptyValues }) => {
  if (!data) {
    return null;
  }

  return (
    <Container>
      {data?.map((item, index) => {
        const modifiedValue = !item?.value ? '' : item?.value;
        return (
          ((shouldHideEmptyValues && item?.value) || !shouldHideEmptyValues) && (
            <ContentWrapper key={index}>
              {item?.isBoldText ? (
                <>
                  <BoldTitle>
                    {item?.title}
                    {item?.disclaimer && <DisclaimerText>{item?.disclaimer}</DisclaimerText>}
                  </BoldTitle>
                  <BoldValue>{modifiedValue}</BoldValue>
                </>
              ) : (
                <>
                  <Title>
                    {item?.title}
                    {item?.disclaimer && <DisclaimerText>{item?.disclaimer}</DisclaimerText>}
                  </Title>
                  <Value isNegativeAmount={item?.isNegativeAmount}>{modifiedValue}</Value>
                </>
              )}
              {item.editable && (
                <IconWrapper
                  onClick={(e) => {
                    item?.actionItem?.handleOnClick && item?.actionItem?.handleOnClick(item?.actionItem?.item);
                  }}
                >
                  <Icon
                    isFunctional={true}
                    name="pencil"
                    fill="black"
                    fillOpacity="0.56"
                  ></Icon>
                </IconWrapper>
              )}
            </ContentWrapper>
          )
        );
      })}
    </Container>
  );
};

export default DataList;
