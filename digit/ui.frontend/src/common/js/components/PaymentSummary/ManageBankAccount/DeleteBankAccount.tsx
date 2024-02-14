import React, { useEffect, useState } from 'react';

import { errorMessageStore } from '@/context/ErrorMessage/ErrorMessage';
import EditableSectionActions from '@/utility/components/EditableSection/EditableSectionActions';
import Dropdown from '@/utility/components/FormElement/Dropdown';
import { DropdownItemData } from '@/utility/components/FormElement/Dropdown/definitions';
import Icon from '@/utility/components/Icon';
import InPageAnnouncement from '@/utility/components/InPageAnnouncement';
import RichText from '@/utility/components/RichText';
import { emitTrackEvent } from '@/utility/helpers/analytics';
import { postCallAPI } from '@/utility/helpers/api';
import { BankAccount, BankAccountAPI } from '@/utility/helpers/api/bankAccountsData/definition';
import { getAEMErrorMessageByCode } from '@/utility/helpers/validation';

import {
    ContentWrapper,
    Description,
    DropDownBanks,
    GridItemContainer,
    GridRowContainer,
    Heading,
    IconWrapper,
    IconWrapperLoading,
    NominateAccLabel
} from './StyledManageBankAccount';

const DeleteBankAccount = ({
  manageModalDetails,
  setShowManageModal,
  setManageModalDetails,
  jsonData,
  data,
  errorSuccessMap,
  getBankAccounts,
}) => {
  const [deleteState, setDeleteState] = useState('confirmation');

  const linkedAccountDefaultCopy = `<p>This bank account is linked to your loan account. <strong>If you delete this account, your payment method will revert to ‘EFT or BPAY’.</strong></p><p>If you would like to maintain Direct Debit payments, <strong>please first nominate another bank account for direct debit.</strong></p>`;

  const otherAccountDefaultCopy = `<p>You are about to remove your bank account. This process cannot be undone.</p>`;

  const questApiKey = localStorage?.getItem('apiKey') ?? jsonData?.globalConfig?.questApiKey;
  const baseApiUrl = localStorage?.getItem('baseApiUrl') ?? jsonData?.globalConfig?.baseApiUrl;
  /**Need Criteria to capture Linked Account */
  // isLinkedAccount = manageModalDetails?.details?.isDirectDebitAccount; --> This detail is not available.
  const isLinkedAccount = manageModalDetails?.details?.defaultBankAccount;
  const selectedBankAccount: BankAccount = manageModalDetails?.details;
  const { errorMessage, setErrorMessage } = errorMessageStore();

  const {
    deleteBankAccountTitle = 'Are you sure?',
    deleteLinkedBankAccountDescription = linkedAccountDefaultCopy,
    deleteOtherBankAccountDescription = otherAccountDefaultCopy,
    deleteBankAccountRemoveButtonText = 'Yes, Remove',
    deleteBankAccountCancelButtonText = 'No, cancel',
    deleteBankAccountSuccessTitle = 'Thank you!',
    deleteBankAccountSuccessDescription = 'Your bank account has been successfully removed',
  } = jsonData;

  /**Error Handling for Business Errors */
  const customErrorHandler = (apiError) => {
    /**Get Error Message based upon Error Code */
    const errorToPresent = getAEMErrorMessageByCode(
      apiError?.response?.data?.sourceErrorCode,
      errorSuccessMap ? errorSuccessMap : globalThis.errorJson,
    );
    setErrorMessage(errorToPresent);
    setDeleteState('confirmation');
  };
  const addMethod = { error: customErrorHandler, redirect: false };

  const deleteBankAccount = () => {
    setErrorMessage(null);
    const postData = {
      customerDomain: {
        addressDependentEntity: {
          addressSequenceNumber: data?.customerDomain?.addressDependentEntity?.addressSequenceNumber,
        },
        bankAccount: {
          accountName: `${selectedBankAccount?.bankAccountName}`,
          accountNumber: `${selectedBankAccount?.bankAccountNumber}`,
          bsbNumber: `${selectedBankAccount?.bsbNumber}`,
          bankAccountSequenceNumber: `${selectedBankAccount?.bankAccountSequenceNumber}`,
          bankIdentifier: `${selectedBankAccount?.pegaQuestBankAccountIdentifier}`,
          bankAccountPegaSequenceNumber: `${selectedBankAccount?.bankAccountPegaSequenceNumber}`,
          defaultBankAccount: `${selectedBankAccount?.bankAccountStatus}`,
        },
      },
    };
    postCallAPI('bankAccounts', `${baseApiUrl}`, `${questApiKey}`, postData, errorSuccessMap, 'delete', addMethod).then(
      (response) => {
        if (response?.status === 200) {
          setErrorMessage(null);
          setDeleteState('success');
          getBankAccounts();
        }
      },
    );
  };

  const handleDeleteAccount = () => {
    setDeleteState('removing');
    // Delete api call
    deleteBankAccount();
  };

  useEffect(() => {
    return () => {
      setErrorMessage(null);
    };
  }, []);

  // Reset error message on unmount
  useEffect(() => {
    if (deleteState === 'success') {
      setTimeout(() => {
        setShowManageModal(false);
        setManageModalDetails(null);
      }, 3000);
    }
  }, [deleteState]);

  /**Need to be integrated when BED is ready */
  const islinkedDel = `Select a new refund account`;
  const isLinkedSub = `The bank account you are removing is currently nominated at the bank account for any refunds. Before we can remove it, please nominate a new bank account for refunds.`;
  const nominateACC = `NOMINATE THE REFUND BANK ACCOUNT`;

  const onChange = (el) => {
    console.log(el);
  };
  const bankAccountsList = () => {
    const userBankAccounts: DropdownItemData[] = [];
    if (data?.length !== 0) {
      data?.customerDomain?.bankAccounts?.map((account, index) => {
        const bsb = account?.bsbNumber;
        const accountNumber = account?.bankAccountNumber;

        const optionLabel = `${bsb} - ${accountNumber}`;

        userBankAccounts.push({
          label: optionLabel,
          value: account,
          onClick: onChange,
        });
      });
    }
    return userBankAccounts;
  };

  return (
    <ContentWrapper
      className="content-wrapper"
      data-testid="delete-bank-account-modal"
    >
      <GridRowContainer>
        <GridItemContainer config={{ col: { md: 12 } }}>
          {deleteState === 'confirmation' && (
            <>
              <IconWrapper>
                <Icon
                  aria-label="presentation"
                  name={'delete-sign'}
                />
              </IconWrapper>
              {!isLinkedAccount ? (
                <>
                  <Heading>{deleteBankAccountTitle}</Heading>
                  <Description>
                    {/* You are about to remove your account {manageModalDetails?.details?.accountNumber}. This process cannot
                be undone. */}
                    <RichText>
                      {isLinkedAccount ? deleteLinkedBankAccountDescription : deleteOtherBankAccountDescription}
                    </RichText>
                  </Description>
                </>
              ) : (
                <>
                  <Heading>{islinkedDel}</Heading>
                  <Description>
                    {/* You are about to remove your account {manageModalDetails?.details?.accountNumber}. This process cannot
                be undone. */}
                    <RichText>{isLinkedSub}</RichText>
                    <DropDownBanks>
                      <NominateAccLabel>{nominateACC}</NominateAccLabel>

                      <Dropdown
                        className="bankListDropdown"
                        items={bankAccountsList()}
                        name={'banksList'}
                      ></Dropdown>
                    </DropDownBanks>
                  </Description>
                </>
              )}

              <EditableSectionActions
                cancelLabel={deleteBankAccountCancelButtonText}
                saveLabel={deleteBankAccountRemoveButtonText}
                handleOnClickCancel={(e) => {
                  setShowManageModal(false);
                  setManageModalDetails(null);
                  setErrorMessage(null);
                }}
                handleOnClickSave={() => {
                  setDeleteState('removing');
                  handleDeleteAccount();
                  emitTrackEvent({
                    name: 'bankAccountRemoved',
                  });
                }}
              />
              {errorMessage && <InPageAnnouncement text={errorMessage} />}
            </>
          )}
          {deleteState === 'removing' && (
            <>
              <IconWrapperLoading>
                <Icon
                  aria-label="presentation"
                  name={'stopwatch'}
                />
              </IconWrapperLoading>
              <Heading>Removing...</Heading>
            </>
          )}
          {deleteState === 'success' && (
            <>
              <IconWrapper>
                <Icon
                  aria-label="presentation"
                  name={'receipt-approved'}
                />
              </IconWrapper>
              <Heading>{deleteBankAccountSuccessTitle}</Heading>
              <Description>{deleteBankAccountSuccessDescription}</Description>
            </>
          )}
        </GridItemContainer>
      </GridRowContainer>
    </ContentWrapper>
  );
};

export default DeleteBankAccount;
