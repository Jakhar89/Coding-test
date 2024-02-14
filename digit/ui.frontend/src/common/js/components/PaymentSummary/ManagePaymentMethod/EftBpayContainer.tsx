import React from 'react';

import {
  Container,
  Detail,
  HeadingWithSlimDivider,
  NoNextLineWrapper,
  Title,
  GridItemContainer,
  GridRowContainer,
} from '../StyledPaymentSummary';

const EftBpayContainer: React.FC<any> = ({ data, jsonData }) => {
  return (
    <Container>
      <GridRowContainer className="eftBpayContainer">
        <GridItemContainer
          className="eftBpayWrapper"
          config={{ col: { md: 2 } }}
        >
          <HeadingWithSlimDivider>{jsonData.eftTitle}</HeadingWithSlimDivider>
        </GridItemContainer>
        <GridItemContainer
          className="eftBpayWrapper"
          config={{ col: { md: 10 } }}
        >
          <NoNextLineWrapper>
            <Title>{jsonData.bsbNumber}</Title>
            <Detail>{data?.tfalOrgDomain?.tenancyAndBrandEntity?.brandEftTargetBsb}</Detail>
          </NoNextLineWrapper>
          <NoNextLineWrapper>
            <Title>{jsonData.accountNumber}</Title>
            <Detail>
              {data?.customerDomain?.financialTransactionAccount?.paymentMethod?.eftCustomerPaymentReferenceNumber
                ?.match(/.{1,4}/g)
                ?.join(' ')}
            </Detail>
          </NoNextLineWrapper>
        </GridItemContainer>
      </GridRowContainer>
      <GridRowContainer>
        <GridItemContainer
          className="eftBpayWrapper"
          config={{ col: { md: 2 } }}
        >
          <HeadingWithSlimDivider>{jsonData.bpayTitle}</HeadingWithSlimDivider>
        </GridItemContainer>
        <GridItemContainer
          className="eftBpayWrapper"
          config={{ col: { md: 10 } }}
        >
          <NoNextLineWrapper>
            <Title>{jsonData.billerCode}</Title>
            <Detail>{data?.tfalOrgDomain?.tenancyAndBrandEntity?.postBillPayBillerCode}</Detail>
          </NoNextLineWrapper>
          <NoNextLineWrapper>
            <Title>{jsonData.refNumber}</Title>
            <Detail>
              {data?.customerDomain?.financialTransactionAccount?.paymentMethod?.bpayReferencenumber
                ?.match(/.{1,4}/g)
                ?.join(' ')}
            </Detail>
          </NoNextLineWrapper>
        </GridItemContainer>
      </GridRowContainer>
    </Container>
  );
};

export default EftBpayContainer;
