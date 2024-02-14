import { CallbackType, FRStep, TextOutputCallback } from '@forgerock/javascript-sdk';
import { FormikValues } from 'formik';

import { AEMErrorMap } from '@/types/global/aem-definition';

export type ForgerockCallbackType = {
  callback: CallbackType;
};

export type GlobalConfigProps = {
  forgerockClientId?: string;
  forgerockRealm?: string;
  forgerockUrl?: string;
};

export type LoginInputProps = { type?: 'text' | 'hidden'; value?: string };

export type CallbackComponentsProps = {
  brand?: string;
  errorField?: string;
  errorMap: AEMErrorMap;
  errors?: any;
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

export type TextOutputCallbackComponentProps = {
  errorComponent?: TextOutputCallback | null;
  errorMap: AEMErrorMap;
  shouldDisplayTextOutput?: boolean;
};
