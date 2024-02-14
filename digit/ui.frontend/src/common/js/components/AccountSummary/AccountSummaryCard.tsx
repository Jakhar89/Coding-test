import React from 'react';

import GraphicalLoanProgress from '@/components/GraphicalLoanProgress/GraphicalLoanProgress';

import LeftContainer from './LeftContainer';
import RightContainer from './RightContainer';
import { CardWrapper } from './StyledAccountSummary';
import SubNavComponent from './SubNavComponent';

const AccountSummaryCard = ({ contract, accountSummaryJson, errorSuccessMap, isMulti }) => {
  return (
    <>
      <SubNavComponent
        accountSummaryJson={accountSummaryJson}
        contract={contract}
      />
      <CardWrapper>
        <LeftContainer
          accountSummaryJson={accountSummaryJson}
          errorSuccessMap={errorSuccessMap}
          contract={contract}
        >
          <GraphicalLoanProgress
            contract={contract}
            accountSummaryJson={accountSummaryJson}
            errorSuccessMap={errorSuccessMap}
          />
        </LeftContainer>
        <RightContainer
          contract={contract}
          accountSummaryJson={accountSummaryJson}
          isMulti={isMulti}
          errorSuccessMap={errorSuccessMap}
        />
      </CardWrapper>
    </>
  );
};

export default AccountSummaryCard;
