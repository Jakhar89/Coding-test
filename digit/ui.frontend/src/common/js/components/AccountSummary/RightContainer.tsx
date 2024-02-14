import React, { useEffect, useState } from 'react';

import RecentTransactions from '@/components/RecentTransactions/RecentTransactions';

import { InnerContainer } from './StyledAccountSummary';

const RightContainer = ({ contract, accountSummaryJson, errorSuccessMap, isMulti }) => (
  <InnerContainer size={[50, 45]}>
    <RecentTransactions
      accountSummaryJson={accountSummaryJson}
      contract={contract}
      isMulti={isMulti}
      errorSuccessMap={errorSuccessMap}
    />
  </InnerContainer>
);

export default RightContainer;
