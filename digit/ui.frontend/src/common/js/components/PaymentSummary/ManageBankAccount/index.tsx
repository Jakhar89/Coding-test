import React, { useEffect, useRef, useState } from 'react';

import DynamicDataList from '@/utility/components/DataList/dynamicList';
import ActionButton from '@/utility/components/FormElement/ActionButton';
import { HeadingWithButtonWrapper, HeadingWithDivider } from '@/utility/components/FormElement/StyledFormSection';
import Icon from '@/utility/components/Icon';
import { globalColors } from '@/utility/theme/global/colors';

import {
  BorderHr,
  ButtonContainer,
  ButtonWrapper,
  CloseButton,
  DirectDebitEmpty,
  DirectDebitIconWrapper,
  EditDeleteIconWrapper,
  IconWrapper,
} from '../StyledPaymentSummary';
import AddBankAccount from './AddBankAccount';
import DeleteBankAccount from './DeleteBankAccount';
import EditBankAccount from './EditBankAccount';

export const MAILING_ADDRESS_SECTION_NAME = 'Mailing Address';

const ManageBankAccount = ({
  jsonData,
  data,
  errorPagePath,
  handleFormSubmit,
  // initialData,
  isEditing,
  isLoading,
  setIsEditing,
  handleCloseEvent,
  errorSuccessMap,
  getBankAccounts,
}) => {
  // const { setModalTitle, setSectionType } = analyticsStore();

  const modalTitle = jsonData ? jsonData?.manageBankAccountTitle : '';
  /**Creating a copy of data to be rendered
   * To manipulate and attach Icons or JSX.Element
   * Add keeping original | data | prop intact
   * Need to change below based upon the API
   * const accountsToRender = data.customer;
   */
  const [dataToRender, setDataToRender] = useState();

  const [showManageModal, setShowManageModal] = useState(false);
  const [manageModalDetails, setManageModalDetails] = useState<any>();

  const DirectDebitIcon = () => (
    <DirectDebitIconWrapper>
      <Icon
        name={'check'}
        fill={globalColors['success-1'] as string}
        isFunctional={true}
      />
    </DirectDebitIconWrapper>
  );

  const EditDeleteIcons = ({ element }) => (
    <EditDeleteIconWrapper>
      <IconWrapper
        onClick={() => {
          setShowManageModal(true);
          setManageModalDetails({ actionType: 'edit', details: element });
        }}
      >
        <Icon
          name={'pencil'}
          fill="black"
          isFunctional={true}
        />
      </IconWrapper>
      <IconWrapper
        onClick={() => {
          setShowManageModal(true);
          setManageModalDetails({ actionType: 'delete', details: element });
        }}
      >
        <Icon
          name={'close'}
          fill="black"
          isFunctional={true}
        />
      </IconWrapper>
    </EditDeleteIconWrapper>
  );

  useEffect(() => {
    let accountsToRender = data?.customerDomain?.bankAccounts;
    if (accountsToRender && accountsToRender.length > 0) {
      accountsToRender = accountsToRender.map((ele) => {
        const directDebit = ele?.directDebit === 'Y';
        const bsbPart = ele?.bsbNumber.match(/.{1,3}/g);
        ele.bsbSplitted = bsbPart.join('-');
        /**Attaching Edit and Delete Icons to render in the Dynamic Data List */
        ele['editDelete'] = <EditDeleteIcons element={ele} />;
        return ele;
      });
    } else {
      accountsToRender = [{ bankAccountName: 'Enter a bank account' }];
    }

    setDataToRender(accountsToRender);
  }, [data]);

  /**
   * Generating List header for Manage Bank Account Modal
   * Attaching static header
   * Need to change when integrating for authoring
   */
  const listHead = {
    bankAccountName: jsonData ? jsonData.tableTitle1 : '',
    bsbSplitted: jsonData ? jsonData.tableTitle2 : '',
    bankAccountNumber: jsonData ? jsonData.tableTitle3 : '',
    editDelete: jsonData ? jsonData.tableTitle4 : '',
  };

  const listCustomColumnsWidth = [30, 20, 30, 20]; // In percentage (%)

  useEffect(() => {
    if (!isEditing) {
      // setModalTitle(undefined);
      // setSectionType(undefined);
    }
  }, [isEditing]);

  const ButtonWrapperInner = () => (
    <>
      <CloseButton
        aria-label="close"
        onClick={() => {
          {
            /**Use for Analytics Event Trigger */
          }
          handleCloseEvent();
          setIsEditing(false);
        }}
        type="reset"
      >
        close
      </CloseButton>
      <span
        onClick={() => {
          {
            /**Use for Analytics Event Trigger */
          }
          handleCloseEvent();
          setIsEditing(false);
        }}
      >
        <Icon
          name={'close'}
          isFunctional={true}
        />
      </span>
    </>
  );

  useEffect(() => {
    console.log(manageModalDetails);
  }, [manageModalDetails]);

  return (
    <>
      {!showManageModal && (
        <>
          <HeadingWithButtonWrapper>
            <HeadingWithDivider>{modalTitle}</HeadingWithDivider>

            <ButtonWrapper>
              <ButtonWrapperInner />
            </ButtonWrapper>
          </HeadingWithButtonWrapper>

          <DynamicDataList
            listHeaders={listHead}
            data={dataToRender}
            shouldHideEmptyValues={isLoading}
            listCustomColumnsWidth={listCustomColumnsWidth}
          />
          <ButtonContainer>
            <ActionButton
              onClick={() => {
                handleCloseEvent();
                setShowManageModal(true);
                setManageModalDetails({ actionType: 'add' });
              }}
              label={jsonData ? jsonData.addBankAccountText : ''}
            ></ActionButton>
          </ButtonContainer>
        </>
      )}

      {showManageModal && (
        <>
          {manageModalDetails?.actionType === 'add' && (
            <AddBankAccount
              jsonData={jsonData}
              manageModalDetails={manageModalDetails}
              setShowManageModal={setShowManageModal}
              setManageModalDetails={setManageModalDetails}
              errorSuccessMap={errorSuccessMap}
              getBankAccounts={getBankAccounts}
            />
          )}
          {manageModalDetails?.actionType === 'edit' && (
            <EditBankAccount
              data={data}
              jsonData={jsonData}
              manageModalDetails={manageModalDetails}
              setShowManageModal={setShowManageModal}
              setManageModalDetails={setManageModalDetails}
              errorSuccessMap={errorSuccessMap}
              getBankAccounts={getBankAccounts}
            />
          )}
          {manageModalDetails?.actionType === 'delete' && (
            <DeleteBankAccount
              data={data}
              manageModalDetails={manageModalDetails}
              setShowManageModal={setShowManageModal}
              setManageModalDetails={setManageModalDetails}
              jsonData={jsonData}
              errorSuccessMap={errorSuccessMap}
              getBankAccounts={getBankAccounts}
            />
          )}
        </>
      )}
    </>
  );
};

export default ManageBankAccount;
