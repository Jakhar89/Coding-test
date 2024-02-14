import { Form, Formik } from 'formik';
import React, { ReactElement, useState } from 'react';

import { errorMessageStore } from '@/context/ErrorMessage/ErrorMessage';
import { userStore } from '@/context/User/User';
import ActionButton from '@/utility/components/FormElement/ActionButton';
import Checkbox from '@/utility/components/FormElement/Checkbox';
import DropdownWithFilter from '@/utility/components/FormElement/DropdownWithFilter/DropdownWithFilter';
import FormLabel from '@/utility/components/FormElement/Label';
import { Field } from '@/utility/components/FormElement/StyledFormSection';
import Icon from '@/utility/components/Icon';
import RichText from '@/utility/components/RichText';
import { emitTrackEvent } from '@/utility/helpers/analytics';

import { DirectDebitWrapper, IconWrapper, PaymentMethodTextWrapper } from '../StyledPaymentSummary';

const DirectDebitContainer: React.FC<any> = ({
  data,
  jsonData,
  attributes,
  manageBankAccountsClick,
  setFieldValue,
  currentBankAccount,
}) => {
  const [isDisabled, setIsDisabled] = useState<any>(false);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [selectedOption, setSelectedOption] = useState<null>();

  const onChange = (option): void => {
    setSelectedOption(option);
    setFieldValue('directDebitAccount', option);

    if (option?.isSelected === true || option === null) {
      setSelectedOption(option?.label);
    } else {
      setSelectedOption(option?.label);
    }
  };

  const getOptionLabel = (e) => (
    <IconWrapper>
      <span className="icon">{e.icon}</span>
      <span className="label">{e.label}</span>
      {e.isSelected && <span className="subText">{e.subText}</span>}
    </IconWrapper>
  );

  const getBankAccounts = () => {
    const userBankAccounts: Object[] = [];

    if (currentBankAccount) {
      const { bsbNumber, bankAccountNumber } = currentBankAccount || {};

      userBankAccounts.push({
        label: `${bsbNumber} - ${bankAccountNumber}`,
        value: currentBankAccount,
        isSelected: true,
        icon: (
          <Icon
            name={'tick'}
            isFunctional={true}
          />
        ),
        subText: 'Current account',
        isDisabled: true,
      });
    }

    if (data?.length !== 0) {
      data?.customerDomain?.bankAccounts?.map((account, index) => {
        const bsb = account?.bsbNumber;
        const accountNumber = account?.bankAccountNumber;

        const optionLabel = `${bsb} - ${accountNumber}`;

        userBankAccounts.push({
          label: optionLabel,
          value: account,
        });
      });
    } else {
      setIsDisabled(true);
      return;
    }
    return userBankAccounts;
  };

  const requiredCheckboxLabel = (
    <PaymentMethodTextWrapper dangerouslySetInnerHTML={{ __html: jsonData?.paymentMethodDiscalimer }} />
  );

  return (
    <>
      <DirectDebitWrapper>
        <Field>
          <FormLabel
            htmlFor={'directDebitAccount'}
            optional={false}
          >
            {jsonData.directDebitSelect}
          </FormLabel>
          <DropdownWithFilter
            isClearable={true}
            isLoading={false}
            name={'directDebitAccount'}
            onOptionChange={onChange}
            options={getBankAccounts()}
            getOptionLabel={getOptionLabel}
            placeholder={jsonData.paymentMethodDirectDebitPlaceholderText}
            selectedOption={selectedOption}
            getIsOptionDisabled={(data) => data?.isDisabled == true}
            isDisabled={isDisabled}
          />
        </Field>

        <Field>
          <Checkbox
            htmlFor="directDebitTerms"
            richTextLabel={requiredCheckboxLabel}
            name="directDebitTerms"
            alignItems="start"
            onChange={(e) => {
              setFieldValue('directDebitTerms', e.target.checked);
            }}
          />
        </Field>

        <ActionButton
          buttonType="secondary"
          label={jsonData.paymentMethodAddManageBAButtonText}
          type="submit"
          handleOnClick={(e) => {
            e.preventDefault();
            emitTrackEvent({
              name: 'paymentMethodAMBA',
            });
            manageBankAccountsClick('paymentMethod');
          }}
        />
      </DirectDebitWrapper>
    </>
  );
};

export default DirectDebitContainer;
