import React from 'react';

import Icon from '@/utility/components/Icon';
import RichText from '@/utility/components/RichText';

import { PaymentAccountInfoProps, PaymentMethodsCardProps } from './definitions';
import {
  AccountInfoWrapper,
  Content,
  ContentContainer,
  Detail,
  HeadingWithSlimDivider,
  IconWrapper,
  NoNextLineWrapper,
  Title,
} from './StyledPaymentMethodsCard';

const PaymentAccountInfo: React.FC<PaymentAccountInfoProps> = ({ title, detail, testAttribute }) => {
  return (
    <NoNextLineWrapper>
      <Title data-testid={testAttribute + '-title'}>{title}</Title>
      {detail && <Detail data-testid={testAttribute + '-number'}>{detail}</Detail>}
    </NoNextLineWrapper>
  );
};

const PaymentMethodsCard: React.FC<PaymentMethodsCardProps> = ({
  accountNumber,
  billerCode,
  bsb,
  description,
  iconName,
  info,
  referenceNumber,
  title,
  testAttribute,
}) => {
  return (
    <ContentContainer data-testid={testAttribute + '-container'}>
      {iconName && (
        <IconWrapper data-testid={testAttribute + '-icon'}>
          <Icon
            name={iconName}
            role="presentation"
          />
        </IconWrapper>
      )}
      <HeadingWithSlimDivider data-testid={testAttribute + '-title'}>{title}</HeadingWithSlimDivider>
      <AccountInfoWrapper>
        {info && <Title data-testid={testAttribute + '-subheading'}>{info}</Title>}
        {bsb && (
          <PaymentAccountInfo
            testAttribute={testAttribute + '-bsb'}
            title="BSB:"
            detail={bsb}
          />
        )}
        {accountNumber && (
          <PaymentAccountInfo
            testAttribute={testAttribute + '-account'}
            title="Account:"
            detail={accountNumber}
          />
        )}
        {billerCode && (
          <PaymentAccountInfo
            testAttribute={testAttribute + '-billerCode'}
            title="Biller Code:"
            detail={billerCode}
          />
        )}
        {referenceNumber && (
          <PaymentAccountInfo
            testAttribute={testAttribute + '-reference'}
            title="Ref:"
            detail={referenceNumber}
          />
        )}
      </AccountInfoWrapper>
      <Content data-testid={testAttribute + '-description'}>
        <RichText>{description}</RichText>
      </Content>
    </ContentContainer>
  );
};

export default PaymentMethodsCard;
