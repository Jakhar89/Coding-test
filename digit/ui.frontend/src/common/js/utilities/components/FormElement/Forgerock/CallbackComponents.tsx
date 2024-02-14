import ActionButton from '@/utility/components/FormElement/ActionButton';
import Checkbox from '@/utility/components/FormElement/Checkbox';
import {
    ValidatedCreatePassword
} from '@/utility/components/FormElement/Forgerock/ValidatedPassword';
import { ValidatedUsername } from '@/utility/components/FormElement/Forgerock/ValidatedUsername';
import FormLabel from '@/utility/components/FormElement/Label';
import { OTP_KEY } from '@/utility/components/FormElement/OneTimePassword/definitions';
import PasswordInput from '@/utility/components/FormElement/PasswordInput';
import PhoneInput from '@/utility/components/FormElement/PhoneInput';
import ReCaptcha from '@/utility/components/FormElement/ReCaptcha/ReCaptcha';
import ScrollableGradientWrapper from '@/utility/components/FormElement/ScrollableGradientWrapper';
import {
    ConfirmationCallbackWrapper, Field, TermsOfUseWrapper
} from '@/utility/components/FormElement/StyledFormSection';
import TextField from '@/utility/components/FormElement/TextInput';
import RichText from '@/utility/components/RichText';
import { getCorrelationId } from '@/utility/helpers/correlation-id';
import { getFinancialNameFromBrandSlug, sortCallbacksByType } from '@/utility/helpers/forgerock';
import {
    AttributeInputCallback, CallbackType, ConfirmationCallback, FRCallback, NameCallback,
    PasswordCallback, ReCaptchaCallback, TermsAndConditionsCallback,
    ValidatedCreatePasswordCallback, ValidatedCreateUsernameCallback
} from '@forgerock/javascript-sdk';

import { CallbackComponentsProps, LoginInputProps } from './definitions';

/**
 * Iterate through callbacks received from AM and map the callback to the
 * appropriate callback component, pushing that component
 * the StepComponent's array.
 */
const CallbackComponents = ({
  brand = 'toyota-finance',
  errors,
  handleBlur,
  handleChange,
  hiddenBooleanAttributeCallback = false,
  isLoading,
  loginButtonText = undefined,
  loginEmailLabel = undefined,
  nextStep,
  setFieldValue,
  shouldShowTextField = true,
  step,
  termsOfUse,
  textInputDisclaimerText = undefined,
  values,
}: CallbackComponentsProps): any => {
  const callbacks = step?.callbacks ?? [];
  const resortedCallbacks = sortCallbacksByType(callbacks);

  return resortedCallbacks?.map((callback: FRCallback, i: number) => {
    switch (callback.getType()) {
      // Represents a callback used to collect a username.
      case CallbackType.NameCallback: {
        const nameCallback = callback as NameCallback;
        const attributeLabel = nameCallback.getPrompt();
        const id = attributeLabel.replace(' ', '-');

        return (
          <Field key={`name-${id}`}>
            <FormLabel htmlFor={id}>{attributeLabel}</FormLabel>
            <TextField
              id={id}
              name={id}
              onChange={(e) => {
                const target = e?.target as HTMLInputElement;
                nameCallback.setName(target?.value);
                handleChange;
              }}
            />
          </Field>
        );
      }

      // string attribute
      case CallbackType.StringAttributeInputCallback: {
        const attributeCallback = callback as AttributeInputCallback<string>;
        const defaultValue = (attributeCallback.getInputValue() as string) ?? '';
        const attributeLabel = attributeCallback.getPrompt();
        const id = attributeLabel.replace(' ', '-');
        const name = attributeCallback.getOutputByName('name', 'value');
        const convertedNameToLowerCase = name.toLowerCase();
        const loginEmailField = 'mail';
        const oldPasswordField = 'preferences/oldpassword';
        const phoneInputField = 'telephonenumber';
        const isNotLoginEmailField = convertedNameToLowerCase !== loginEmailField;
        const isNotOldPasswordInputField = convertedNameToLowerCase !== oldPasswordField;
        const isNotPhoneInputField = convertedNameToLowerCase !== phoneInputField;
        const replacedAttributeLabel = loginEmailLabel && loginEmailLabel ? loginEmailLabel : attributeLabel;
        //@ts-ignore
        if (name === OTP_KEY) {
          return;
        }

        // For hidden text input field
        if (!shouldShowTextField && values?.[name]) {
          attributeCallback.setInputValue(values?.[name]);
        }

        const handleChange = (e) => {
          const target = e.target as HTMLInputElement;
          attributeCallback.setInputValue(target?.value);
          if (setFieldValue) {
            setFieldValue(name, target?.value);
          }
        };

        const inputProps = {
          autoComplete: 'false',
          id: id,
          key: id,
          name: name,
          onBlur: handleBlur,
        };

        const loginInputProps: LoginInputProps = {
          type: shouldShowTextField ? 'text' : 'hidden',
          value: values?.[name],
        };

        return (
          <Field key={`string-${id}`}>
            {isNotOldPasswordInputField && isNotPhoneInputField && isNotLoginEmailField && (
              <>
                <FormLabel htmlFor={id}>{attributeLabel}</FormLabel>
                <TextField
                  defaultValue={defaultValue}
                  onChange={(e) => handleChange(e)}
                  {...inputProps}
                />
              </>
            )}
            {convertedNameToLowerCase === loginEmailField && (
              <>
                {shouldShowTextField && <FormLabel htmlFor={id}>{replacedAttributeLabel}</FormLabel>}
                <TextField
                  onChange={(e) => handleChange(e)}
                  {...inputProps}
                  {...loginInputProps}
                />
              </>
            )}
            {convertedNameToLowerCase === oldPasswordField && (
              <PasswordInput
                label={attributeLabel}
                handleChange={(e) => handleChange(e)}
                {...inputProps}
              />
            )}
            {convertedNameToLowerCase === phoneInputField && (
              <PhoneInput
                disclaimerText={textInputDisclaimerText}
                handleBlur={handleBlur}
                label={attributeLabel}
                name={name}
                setFieldValue={setFieldValue}
                values={values}
                handleChange={(e) => handleChange(e)}
              />
            )}
          </Field>
        );
      }

      case CallbackType.BooleanAttributeInputCallback: {
        const attributeCallback = callback as AttributeInputCallback<boolean>;
        const attributeLabel = attributeCallback?.getPrompt();
        const name = attributeCallback.getOutputByName('name', 'value');

        if (hiddenBooleanAttributeCallback) {
          attributeCallback.setInputValue(values?.[name]);
        }

        return (
          <Field key={`boolean-${name}`}>
            <Checkbox
              isChecked={values?.[name]}
              label={attributeLabel}
              name={name}
              onBlur={handleBlur}
              type={hiddenBooleanAttributeCallback ? 'hidden' : 'checkbox'}
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                attributeCallback.setInputValue(target.checked);
                if (setFieldValue) {
                  setFieldValue(name, target.checked);
                }
              }}
            />
          </Field>
        );
      }

      // Password
      case CallbackType.PasswordCallback: {
        const passwordCallback = callback as PasswordCallback;
        const passwordInputLabel = passwordCallback?.getPrompt();
        const id = passwordInputLabel.replace(' ', '-');
        const name = passwordCallback.getOutputByName('name', 'value');

        passwordCallback?.setPassword(values?.[passwordInputLabel]);
        return (
          <Field key={`password-${id}`}>
            <PasswordInput
              autoComplete="false"
              handleBlur={handleBlur}
              handleChange={(e) => {
                const target = e.target as HTMLInputElement;
                passwordCallback?.setPassword(target?.value);
                if (setFieldValue) {
                  setFieldValue(passwordInputLabel, target?.value);
                }
              }}
              id={id}
              label={passwordInputLabel}
              name={passwordInputLabel}
            />
          </Field>
        );
      }

      // Hidden value
      case CallbackType.HiddenValueCallback: {
        const attributeCallback = callback as AttributeInputCallback<string>;
        const name = attributeCallback.getOutputByName('id', 'hiddenCallback');
        const correlationId = getCorrelationId();

        const data = {
          [name]: getFinancialNameFromBrandSlug(brand),
          correlationId: correlationId,
          userid: window.sessionStorage.getItem('userid'),
        };

        if (Object.keys(data).includes(name)) {
          attributeCallback.setInputValue(data?.[name]);
        }

        return (
          <TextField
            defaultValue={data?.[name]}
            key={`hidden-${name?.replace(' ', '-')}`}
            name={name}
            type="hidden"
          />
        );
      }

      // ReCaptcha
      case CallbackType.ReCaptchaCallback:
        return (
          <Field key={'recaptcha'}>
            <ReCaptcha
              reCaptchaCallback={callback as ReCaptchaCallback}
              isLoading={isLoading}
            />
          </Field>
        );

      // Terms and Conditions
      case CallbackType.TermsAndConditionsCallback: {
        const TermsOfUseCallback = callback as TermsAndConditionsCallback;
        TermsOfUseCallback.setAccepted(true);
        return (
          <ScrollableGradientWrapper key={'terms'}>
            <TermsOfUseWrapper>
              <RichText>{termsOfUse}</RichText>
            </TermsOfUseWrapper>
          </ScrollableGradientWrapper>
        );
      }

      // Validated Password
      case CallbackType.ValidatedCreatePasswordCallback: {
        const passwordCallback = callback as ValidatedCreatePasswordCallback;
        const label = passwordCallback?.getPrompt();
        const id = label.replace(' ', '-')?.toLowerCase();

        if (!handleChange || !handleBlur) {
          return null;
        }

        return (
          <ValidatedCreatePassword
            id={id}
            label={label}
            handleBlur={handleBlur}
            handleChange={handleChange}
            passwordCallback={passwordCallback}
            step={step}
            softNextStep={(step) => nextStep(step)}
            key={`validated-create-password-${id}`}
          />
        );
      }

      // Validated Username
      case CallbackType.ValidatedCreateUsernameCallback: {
        const usernameCallback = callback as ValidatedCreateUsernameCallback;
        const label = usernameCallback?.getPrompt();
        const id = label.replace(' ', '-')?.toLowerCase();
        return (
          <Field key={`validated-password-${id}`}>
            <FormLabel htmlFor={id}>{label}</FormLabel>
            <ValidatedUsername
              id={id}
              softNextStep={(step) => nextStep(step)}
              step={step}
              usernameCallback={usernameCallback}
            />
          </Field>
        );
      }

      // TextOutput - usually error message
      case CallbackType.TextOutputCallback: {
        return;
      }

      case CallbackType.ConfirmationCallback: {
        const confirmationCallback = callback as ConfirmationCallback;
        const options = confirmationCallback.getOptions();

        return (
          <ConfirmationCallbackWrapper key={`confirmation-callback`}>
            {options.map((options: string, index: number) => {
              const handleOnClick = () => {
                nextStep(step);
              };
              return (
                <ActionButton
                  buttonType={index >= 1 ? 'secondary' : 'primary'}
                  key={index}
                  label={options === 'Continue' ? loginButtonText : options}
                  type="submit"
                  onClick={() => {
                    confirmationCallback.setOptionIndex(index);
                    nextStep(step);
                  }}
                />
              );
            })}
          </ConfirmationCallbackWrapper>
        );
      }
    }
  });
};

export default CallbackComponents;
