import { ValidatedCreatePasswordCallback, FRStep } from '@forgerock/javascript-sdk';
import React, { useEffect, useRef, useState } from 'react';

import ErrorMessage from '../../ErrorMessage';
import FormLabel from '../../Label';
import PasswordInput from '../../PasswordInput';
import { Field } from '../../StyledFormSection';

/**
 * Collects data for a ForgeRock Platform Password node when "Validate password"
 * is checked.
 *
 * When characters are entered into the field, input is sent to ForgeRock for
 * validation. The response is translated into a prompt for any violated
 * policies to be displayed to the user.
 *
 * @param passwordCallback the ForgeRock callback to collect data for
 * @param step reference to the current journey step
 * @param softNextStep function to call the next step without reloading UI
 */
export const ValidatedCreatePassword: React.FC<{
  confirmLabel?: string;
  id: string;
  label?: string;
  handleBlur?: (e) => void;
  handleChange?: (e) => void;
  passwordCallback: ValidatedCreatePasswordCallback;
  step?: FRStep;
  softNextStep: (step?: FRStep) => void;
}> = ({
  //prettier-ignore
  confirmLabel = 'Confirm password',
  handleBlur,
  handleChange,
  id,
  label = 'Password',
  passwordCallback,
  step,
  softNextStep,
}) => {
  const isPasswordConfirmedTouched = useRef<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  const handleFRChange = (newPassword: string) => {
    setPassword(newPassword);
    passwordCallback.setPassword(newPassword);

    timer && clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        passwordCallback.setValidateOnly(true);
        softNextStep(step);
      }, 100),
    );
  };

  useEffect(() => {
    // after the password is submitted for validation we get a new callback
    // which we need to update with inputted data
    passwordCallback.setPassword(password);
    passwordCallback.setValidateOnly(false);
  }, [password, passwordCallback]);

  const generatePolicyViolationPrompt = () => {
    const prompt = passwordCallback.getFailedPolicies().map((policy, i) => {
      const policyJSON = JSON.parse(policy as unknown as string);
      const requirement = policyJSON.policyRequirement;
      switch (requirement) {
        case 'LENGTH_BASED':
          return policyJSON.params['min-password-length'] && policyJSON.params['max-password-length'] ? (
            <li
              key={i}
            >{`Must be between ${policyJSON.params['max-password-length']} and ${policyJSON.params['min-password-length']} characters long`}</li>
          ) : policyJSON.params['min-password-length'] ? (
            <li key={i}>{`Must be at least ${policyJSON.params['min-password-length']} characters long`}</li>
          ) : policyJSON.params['max-password-length'] ? (
            <li key={i}>{`Must be less than ${policyJSON.params['max-password-length']} characters long`}</li>
          ) : null;

        case 'CHARACTER_SET':
          const charSets: string[] = policyJSON.params['character-sets'];
          const charSetDescriptions: string[] = charSets.map((charSetRaw) => {
            const charSet = charSetRaw.split(':', 2)[1];
            return (
              charSet &&
              (charSet.includes('A')
                ? 'UPPER CASE character'
                : charSet.includes('a')
                ? 'lower case character'
                : charSet.includes('~')
                ? 'special character'
                : charSet.includes('0')
                ? 'number'
                : '')
            );
          });
          const minCharSets = parseInt(policyJSON.params['min-character-sets']);
          const policyMessage = charSetDescriptions.map((charSetDescription) => `one ${charSetDescription}`).join(', ');
          // add a prefix depending on the min number of required sets
          return (
            <li key={i}>
              {'Must include' +
                (charSetDescriptions.length > minCharSets
                  ? ` at least ${minCharSets} of the following: ${policyMessage}`
                  : `: ${policyMessage}`)}
            </li>
          );

        case 'REPEATED_CHARACTERS':
          return (
            <li
              key={i}
            >{`Cannot contain more than ${policyJSON.params['max-consecutive-length']} repeated consecutive characters`}</li>
          );

        case 'DICTIONARY':
          return <li key={i}>{`Cannot include commonly-used passwords e.g. 12345678`}</li>;

        default:
          return null;
      }
    });

    return (
      <ErrorMessage>
        <ul>{prompt}</ul>
      </ErrorMessage>
    );
  };
  return (
    <>
      <Field>
        <FormLabel>{label}</FormLabel>
        <PasswordInput
          autoComplete="false"
          id={id}
          name={id}
          handleBlur={handleBlur}
          handleChange={(e) => {
            const target = e?.target as HTMLInputElement;
            handleFRChange(target?.value);
            if (handleChange) {
              handleChange(e);
            }
          }}
        />
        {password && generatePolicyViolationPrompt()}
      </Field>
      <Field>
        <FormLabel>{confirmLabel}</FormLabel>
        <PasswordInput
          autoComplete="false"
          id={`confirm-${id}`}
          name={`confirm-${id}`}
          handleBlur={handleBlur}
          handleChange={(e) => {
            isPasswordConfirmedTouched.current = true;
            if (handleChange) {
              handleChange(e);
            }
          }}
        />
      </Field>
    </>
  );
};
