import * as forgeRock from '@forgerock/javascript-sdk';

export type PasswordInputProps = React.HTMLProps<HTMLInputElement> & {
  handleBlur?: (e: React.FocusEvent<any, Element>) => void;
  handleChange?: (e) => void;
  hasError?: boolean;
  name: string;
  passwordCallback?: forgeRock.PasswordCallback;
  passwordInputLabel?: string;
};

export type PasswordFormValues = {
  confirmPassword: string;
  newPassword: string;
};

export type PasswordInputStylingProps = {
  hasError?: boolean;
};
