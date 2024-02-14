import * as forgeRock from '@forgerock/javascript-sdk';
import { FRStep } from '@forgerock/javascript-sdk';
import React, { useEffect, useState } from 'react';
import TextField from '../../../FormElement/TextInput';
import ErrorMessage from '../../ErrorMessage';

/**
 * Collects data for a ForgeRock Platform Username node when "Validate username"
 * is checked.
 *
 * When characters are entered into the field, input is sent to ForgeRock for
 * validation. The response is translated into a prompt for any violated
 * policies to be displayed to the user.
 *
 * @param usernameCallback the ForgeRock callback to collect data for
 * @param step reference to the current journey step
 * @param softNextStep function to call the next step without reloading UI
 */
export const ValidatedUsername: React.FC<{
  id: string;
  usernameCallback: forgeRock.ValidatedCreateUsernameCallback;
  step?: FRStep;
  softNextStep: (step?: FRStep) => void;
}> = ({ id, usernameCallback, step, softNextStep }) => {
  const [userName, setUserName] = useState<string>('');
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  const handleChange = (newUserName: string) => {
    setUserName(newUserName);
    usernameCallback.setInputValue(newUserName);

    timer && clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        usernameCallback.setValidateOnly(true);
        softNextStep(step);
      }, 100),
    );
  };

  useEffect(() => {
    // after the username is submitted for validation we get a new callback
    // which we need to update with inputted data
    usernameCallback.setInputValue(userName);
    usernameCallback.setValidateOnly(false);
  }, [userName, usernameCallback]);

  const generatePolicyViolationPrompt = () => {
    const prompt = usernameCallback.getFailedPolicies().map((policy) => {
      const policyJSON = JSON.parse(policy as unknown as string);
      const requirement = policyJSON.policyRequirement;
      switch (requirement) {
        case 'CANNOT_CONTAIN_CHARACTERS':
          return <li>{`Cannot contain characters: ${policyJSON.params['forbiddenChars']}`}</li>;

        case 'MIN_LENGTH':
          return <li>{`Must be at least ${policyJSON.params['minLength']} characters long`}</li>;

        case 'MAX_LENGTH':
          return <li>{`Must be less than ${policyJSON.params['maxLength']} characters long`}</li>;

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
      <TextField
        id={id}
        name={id}
        onChange={(e) => {
          const target = e?.target as HTMLInputElement;
          handleChange(target?.value);
        }}
      />
      {userName && generatePolicyViolationPrompt()}
    </>
  );
};
