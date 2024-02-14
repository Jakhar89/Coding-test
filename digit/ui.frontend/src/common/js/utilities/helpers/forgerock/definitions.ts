import { CallbackType, FRStep } from '@forgerock/javascript-sdk';
import { FormikValues } from 'formik';

import { AEMErrorMap } from '@/types/global/aem-definition';

export type ForgerockCallbackType = {
  callback: CallbackType;
};

export type LoginInputProps = { type?: 'text' | 'hidden'; value?: string };

export type MapCallbacksToComponentsProps = {
  brand?: string;
  errorField?: string;
  errorMap: AEMErrorMap;
  handleBlur?: (e) => void;
  handleChange?: (e) => void;
  hiddenBooleanAttributeCallback?: boolean;
  isLoading?: boolean;
  journeyFlow?: string;
  loginButtonText?: string;
  loginEmailLabel?: string;
  modalTitle?: string;
  nextStep: any;
  setFieldValue?: (field: string, value: any) => void;
  shouldDisplayTextOutput?: boolean;
  shouldShowTextField?: boolean;
  step?: FRStep;
  termsOfUse?: string;
  textInputDisclaimerText?: string;
  values?: FormikValues;
};

export type JourneyType =
  | 'SSP-ChangeEmail'
  | 'SSP-ChangePassword'
  | 'SSP-ChangePhone'
  | 'SSP-Login'
  | 'SSP-Recover-Locked-Account'
  | 'SSP-Registration'
  | 'SSP-ResetPassword'
  | '';
