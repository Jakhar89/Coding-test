import React, { useEffect, useState } from 'react';

import { analyticsStore } from '@/context/Analytics/Analytics';
import { userStore } from '@/context/User/User';
import { AEMProps } from '@/types/global/aem-definition';
import DataList from '@/utility/components/DataList';
import EditableSectionActions from '@/utility/components/EditableSection/EditableSectionActions';
import EditableSectionContainer from '@/utility/components/EditableSection/EditableSectionContainer';
import ActionButton from '@/utility/components/FormElement/ActionButton';
import FormSection from '@/utility/components/FormElement/FormSection';
import { HeadingWithDivider } from '@/utility/components/FormElement/StyledFormSection';
import ModalOverlay from '@/utility/components/ModalOverlay';
import { emitTrackEvent } from '@/utility/helpers/analytics';
import { contractData, getCallAPI, loginFlow, postCallAPI } from '@/utility/helpers/api';
import { RestrictAccessData } from '@/utility/helpers/api/RestrictAccessData/definition';
import { API_BILLING_SCHEDULE_DATA, API_PAYMENT_OPTIONS_DATA, API_RESTRICT_DATA } from '@/utility/helpers/constants';
import { formatDate } from '@/utility/helpers/dateTime';
import { currencyFormatter } from '@/utility/helpers/string';

import { PaymentSummaryParsedProps } from './definitions';
import ManageBank from './ManageBankAccount';
import ManageBankAccount from './ManageBankAccount/index';
import NextDueDateEditMode from './ManageNextDueDate/NextDueDateEditMode';
import PaymentFrequencyEditMode from './ManagePaymentFrequency/PaymentFrequencyEditMode';
import ManagePaymentMethod from './ManagePaymentMethod/ManagePaymentMethod';
import ManageRepaymentAmount from './ManageRepaymentAmount/ManageRepaymentAmount';
import { ButtonContainer } from './StyledPaymentSummary';

const PaymentSummary = ({ attributes, errorSuccessMap }: AEMProps) => {
  if (attributes === '{}') {
    return null;
  }

  const { apiResponse, addToAPIResponse, selectedContract, setSelectedContract } = userStore();
  const {
    accountsData,
    contractsData,
    loginInfo,
    repaymentData,
    paymentOptionsData,
    billingScheduleApiData,
    bankAccountsData,
  } = apiResponse || {};
  const [shouldShowModal, setShouldShowModal] = useState(false);
  const [bankAccounts, setBankAccounts] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const defaultModalContent = {
    title: 'Thank you!',
    description: 'Successfully updated!',
  };

  const [modalOverlayContent, setModalOverlayContent] = useState(defaultModalContent);

  const {
    nextPaymentDate,
    nextPaymentType,
    scheduledPaymentDueDate,
    cycleDay,
    billedAmount,
    currentBalanceOutstanding,
    arrears,
    creditAmount,
    repaymentFrequency,
    balloonAmount,
    hasIrregularPayments,
  } = repaymentData?.customerDomain?.financeAccount || {};
  const [isEditing, setIsEditing] = useState(false);
  const [editComponent, setEditComponent] = useState<any>();
  const [reopenComponent, setReopenComponent] = useState<any>();

  const paymentSummaryJson: PaymentSummaryParsedProps = JSON.parse(attributes);

  const isArrearsAmount = arrears ? arrears > 0 : false;
  const arrearsAmount: string = isArrearsAmount ? currencyFormatter(arrears ? arrears : 0) : '';

  const negetiveToConvert = arrears === 0 ? 0 : -1;
  const advanceAmount: string =
    !isArrearsAmount && arrears !== undefined ? currencyFormatter(arrears * negetiveToConvert) : '';

  const scheduledAmount: number | null = repaymentData
    ? repaymentData?.customerDomain?.retailFinanceLoanItems
        ?.map((item) => item?.scheduledAmount)
        ?.reduce((partialSum, a) => partialSum + a, 0)
    : null;

  const questApiKey = localStorage?.getItem('apiKey') ?? paymentSummaryJson?.globalConfig?.questApiKey;
  const baseApiUrl = localStorage?.getItem('baseApiUrl') ?? paymentSummaryJson?.globalConfig?.baseApiUrl;

  const contractData = (contractID: string) => ({
    customerDomain: {
      contract: {
        contractId: contractID,
      },
    },
  });

  const getAccountDetailsApi = (contractId: string) => {
    const postData = contractData(contractId);

    !accountsData &&
      postCallAPI('account-details', `${baseApiUrl}`, `${questApiKey}`, postData, errorSuccessMap).then((response) => {
        if (response?.data) {
          addToAPIResponse('accountsData', response.data);
        }
      });
  };

  const getRepaymentsData = (contractId: string) => {
    const postData = contractData(contractId);

    postCallAPI('repayment', `${baseApiUrl}`, `${questApiKey}`, postData, errorSuccessMap).then((response) => {
      const data = response?.data;

      if (data) {
        addToAPIResponse('repaymentData', data);
      }
    });
  };

  const getPaymentsApiData = (contractId: string) => {
    const postData = contractData(contractId);

    postCallAPI('payment-options', `${baseApiUrl}`, `${questApiKey}`, postData, errorSuccessMap).then((response) => {
      const data = response?.data;

      if (data) {
        addToAPIResponse(API_PAYMENT_OPTIONS_DATA, data);
      }
    });
  };

  const getBankAccounts = () => {
    getCallAPI('bankAccounts', `${baseApiUrl}`, `${questApiKey}`, errorSuccessMap).then((response) => {
      setBankAccounts(response?.data);
    });
  };

  const getBillingData = (contractId: string) => {
    const postData = contractData(contractId);

    !billingScheduleApiData &&
      postCallAPI('billing-schedule', `${baseApiUrl}`, `${questApiKey}`, postData, errorSuccessMap).then((response) => {
        const data = response?.data;

        if (data) {
          addToAPIResponse(API_BILLING_SCHEDULE_DATA, data);
        }
      });
  };

  useEffect(() => {
    if (contractsData && !selectedContract) {
      setSelectedContract(contractsData?.contracts?.[0]);
    }
    if (selectedContract) {
      const contractID: string = selectedContract?.customerDomain?.contract?.contractId ?? '';
      getRepaymentsData(contractID);
      getAccountDetailsApi(contractID);
      getBankAccounts();
      getPaymentsApiData(contractID);
      getBillingData(contractID);
    }
  }, [contractsData, selectedContract]);

  useEffect(() => {
    if (!loginInfo && baseApiUrl && questApiKey) {
      loginFlow(baseApiUrl, questApiKey, errorSuccessMap, apiResponse, addToAPIResponse, true);
    }
  }, []);

  useEffect(() => {
    if (shouldShowModal === false) {
      setTimeout(() => {
        setModalOverlayContent(defaultModalContent);
      }, 1000);
    }
  }, [shouldShowModal]);

  const handleFormSubmit = (values) => {
    if (!values) {
      return;
    }
    setTimeout(() => {
      setIsEditing(false);
      setEditComponent(null);
      setShouldShowModal(true);
    }, 3000);
  };

  const triggerAnalyticsEvent = (type, event) => {
    let modalTitle;
    switch (type) {
      case 'managePaymentMethod':
        modalTitle = 'Payment Method';
        break;
      case 'managePaymentFrequency':
        modalTitle = 'Payment Frequency';
        break;
      case 'repaymentAmount':
        modalTitle = 'Repayment Amount';
        break;
      case 'nextPaymentDate':
        modalTitle = 'Next Due Date';
        break;
      case 'manageBankAccount':
        modalTitle = 'Manage Bank Account';
        break;
      default:
        modalTitle = null;
        break;
    }

    if (!modalTitle) return;

    // Track modal Opened
    emitTrackEvent({
      name: event ? event : 'modalOpened',
      data: {
        modalTitle,
      },
    });
  };

  const handleOnClick = (type) => {
    triggerAnalyticsEvent(type, 'modalOpened');

    setIsEditing(true);
    setEditComponent(type);
  };

  // Form action: Handle on click cancel
  const handleOnClickCancel = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setEditComponent(null);
    // setErrorMessage(null);
  };

  const handleCloseEvent = () => {
    triggerAnalyticsEvent(editComponent, 'modalClosed');
  };

  const [dataEditable, setDataEditable] = useState<RestrictAccessData>({
    isPayoutQuoteAccess: false,
    isPayFrequencyAccess: false,
    isPayDueDateAccess: false,
    isPayAmountAccess: false,
    isPaymentArrangementAccess: false,
    isOneTimePaymentAccess: false,
    isPayMethodAccess: false,
    isBankAccountAccess: false,
  });

  useEffect(() => {
    if (selectedContract && apiResponse?.restrictData) {
      const restrictApiRes: RestrictAccessData =
        apiResponse?.restrictData[selectedContract?.customerDomain?.contract?.contractId];

      setDataEditable({ ...restrictApiRes });
    }
  }, [apiResponse?.restrictData, selectedContract]);

  const data = [
    {
      title: isArrearsAmount ? paymentSummaryJson.arrearsAmountLabelText : paymentSummaryJson.advanceAmountLabelText,
      value: isArrearsAmount ? arrearsAmount : advanceAmount,
      disclaimer: isArrearsAmount
        ? paymentSummaryJson.arrearsAmountDisclaimerLabelText
        : paymentSummaryJson.advanceAmountDisclaimerLabelText,
      isNegativeAmount: isArrearsAmount,
    },
    {
      title: paymentSummaryJson.nominatedPaymentMethodLabelText,
      value: nextPaymentType,
      editable: dataEditable.isPayMethodAccess,
      actionItem: { handleOnClick, item: 'managePaymentMethod' },
    },
    {
      title: paymentSummaryJson.paymentFrequencyLabelText,
      disclaimer: hasIrregularPayments ? `* ${paymentSummaryJson.paymentFrequencyDisclaimerText}` : '',
      value: `${repaymentFrequency}${hasIrregularPayments ? '*' : ''}`,
      editable: dataEditable.isPayFrequencyAccess, // NOT required for First Release
      actionItem: { handleOnClick, item: 'managePaymentFrequency' },
    },
    // NOT required for MVP
    // {
    //   title: paymentSummaryJson.paymentFrequencyDueDateLabelText,
    //   value: '4th day of the month',
    // },
    {
      title: paymentSummaryJson.repaymentAmountLabelText,
      disclaimer: paymentSummaryJson.repaymentAmountDisclaimerLabelText,
      value: scheduledAmount ? currencyFormatter(scheduledAmount) : '',
      // editable: nextPaymentType === 'Direct Debit' ? true : false, // NOT required for First Release
      editable: dataEditable.isPayAmountAccess,
      actionItem: { handleOnClick, item: 'repaymentAmount' },
    },
    {
      title: paymentSummaryJson.nextDueDateLabelText,
      value: nextPaymentDate ? formatDate(new Date(nextPaymentDate)) : '',
      editable: dataEditable.isPayDueDateAccess,
      actionItem: { handleOnClick, item: 'nextPaymentDate' },
    },
    {
      title: paymentSummaryJson.nextRepaymentAmountLabelText,
      disclaimer: paymentSummaryJson.nextRepaymentAmountDisclaimerLabelText,
      value: billedAmount ? currencyFormatter(billedAmount) : '',
    },
    {
      title: paymentSummaryJson.outstandingBalanceLabelText,
      disclaimer: paymentSummaryJson.outstandingBalanceDisclaimerLabelText,
      value: currentBalanceOutstanding ? currencyFormatter(currentBalanceOutstanding) : '',
      isBoldText: true,
    },
  ];

  const isFull = (editComponent) => {
    switch (editComponent) {
      case 'nextPaymentDate':
        return false;
      case 'repaymentAmount':
        return isUpdating ? true : false;
      default:
        return true;
    }
  };

  const manageBankAccountsClick = (source = '') => {
    setIsEditing(true);
    handleOnClick('manageBankAccount');
    if (source === 'paymentMethod') {
      setReopenComponent('managePaymentMethod');
    }
  };

  useEffect(() => {
    if (editComponent === 'manageBankAccount' && reopenComponent === 'managePaymentMethod') {
      setIsEditing(true);
      handleOnClick('managePaymentMethod');
    }
  }, [isEditing]);

  return (
    <>
      <FormSection
        spacingSize="macro2"
        sectionWidth="halfwidth"
      >
        <HeadingWithDivider>{paymentSummaryJson.paymentSummaryLabelText}</HeadingWithDivider>
        <DataList data={data} />
        {dataEditable.isBankAccountAccess && (
          <ButtonContainer>
            <ActionButton // NOT required for First Release
              onClick={() => {
                manageBankAccountsClick();
                emitTrackEvent({
                  name: 'paymentMethodAMBA',
                });
              }}
              label={paymentSummaryJson?.addManageBankAccountButtonText}
            ></ActionButton>
          </ButtonContainer>
        )}
      </FormSection>
      <EditableSectionContainer
        isEditing={isEditing}
        // TODO: Update modal title once BED intergration for header is complete
        setIsEditing={setIsEditing}
        full={isFull(editComponent)}
        handleCloseEvent={handleCloseEvent}
      >
        {isEditing && editComponent === 'manageBankAccount' && (
          <ManageBankAccount
            jsonData={paymentSummaryJson}
            data={bankAccounts}
            errorPagePath={errorSuccessMap}
            handleFormSubmit={handleFormSubmit}
            isEditing={isEditing}
            isLoading={false}
            setIsEditing={setIsEditing}
            handleCloseEvent={handleCloseEvent}
            errorSuccessMap={errorSuccessMap}
            getBankAccounts={getBankAccounts}
          ></ManageBankAccount>
        )}
        {isEditing && editComponent === 'nextPaymentDate' && (
          <NextDueDateEditMode
            handleFormSubmit={handleFormSubmit}
            handleOnClickCancel={handleOnClickCancel}
            setShouldShowModal={setShouldShowModal}
            attributes={attributes}
            errorSuccessMap={errorSuccessMap}
            setIsEditing={setIsEditing}
            handleCloseEvent={handleCloseEvent}
            getRepaymentsData={getRepaymentsData}
          />
        )}
        {isEditing && editComponent === 'repaymentAmount' && (
          <ManageRepaymentAmount
            repaymentFrequency={repaymentFrequency}
            minimumRepaymentAmount={scheduledAmount}
            setIsUpdating={setIsUpdating}
            setIsEditing={setIsEditing}
            setEditComponent={setEditComponent}
            setShouldShowModal={setShouldShowModal}
            handleOnClickCancel={handleOnClickCancel}
            attributes={attributes}
            errorSuccessMap={errorSuccessMap}
            setModalOverlayContent={setModalOverlayContent}
            handleCloseEvent={handleCloseEvent}
          />
        )}
        {isEditing && editComponent === 'managePaymentFrequency' && (
          <PaymentFrequencyEditMode
            jsonData={paymentSummaryJson}
            handleFormSubmit={handleFormSubmit}
            handleOnClickCancel={handleOnClickCancel}
            selectedFrequency={repaymentFrequency}
            errorSuccessMap={errorSuccessMap}
            attributes={attributes}
            setIsEditing={setIsEditing}
            handleCloseEvent={handleCloseEvent}
            getRepaymentsData={getRepaymentsData}
          />
        )}
        {isEditing && editComponent === 'managePaymentMethod' && (
          <ManagePaymentMethod
            paymentOptionsData={paymentOptionsData}
            bankAccountsData={bankAccounts}
            jsonData={paymentSummaryJson}
            handleFormSubmit={handleFormSubmit}
            handleOnClickCancel={handleOnClickCancel}
            selectedPaymentType={nextPaymentType}
            reopenComponent={reopenComponent}
            setReopenComponent={setReopenComponent}
            errorSuccessMap={errorSuccessMap}
            attributes={attributes}
            setIsEditing={setIsEditing}
            handleCloseEvent={handleCloseEvent}
            manageBankAccountsClick={manageBankAccountsClick}
            baseApiUrl={baseApiUrl}
            questApiKey={questApiKey}
            selectedContract={selectedContract}
            getRepaymentsData={getRepaymentsData}
            currentBankAccount={repaymentData?.customerDomain?.bankAccount}
          />
        )}
      </EditableSectionContainer>
      {/* THANK YOU MODAL OVERLAY*/}
      <ModalOverlay
        description={modalOverlayContent?.description}
        // hasQuestApiError={questDeleteOrPutApiError}
        heading={modalOverlayContent?.title}
        iconName={'receipt-approved'}
        setShouldShowModal={setShouldShowModal}
        setTimer={3000}
        shouldShowModalOverlay={shouldShowModal}
      />
    </>
  );
};

export default PaymentSummary;
