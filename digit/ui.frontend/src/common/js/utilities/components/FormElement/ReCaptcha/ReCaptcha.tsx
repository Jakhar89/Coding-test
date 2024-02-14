import { useFormikContext, useField } from 'formik';
import React, { createRef, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import { RegistrationFormValues } from '@/components/Registration/definitions';

import ErrorMessage from '../ErrorMessage';
import { RecaptchaProps } from './definitions';
/**
 * Collects data for a ForgeRock CAPTCHA node
 *
 * @param reCaptchaCallback the ForgeRock callback to collect data for
 */

const ReCaptcha: React.FC<RecaptchaProps> = ({ reCaptchaCallback, isLoading }) => {
  const recaptchaRef = createRef<ReCAPTCHA>();
  const captchaKey = reCaptchaCallback.getSiteKey();

  const { setFieldValue, setTouched } = useFormikContext<RegistrationFormValues['Registration']>();

  const [, meta] = useField('recaptcha');
  const hasError = !!(meta?.error && (meta?.touched || meta?.initialTouched));

  const onChange = (value: string | null) => {
    setFieldValue('recaptcha', value);
    return reCaptchaCallback.setResult(value || '');
  };

  useEffect(() => {
    if (!isLoading) {
      recaptchaRef?.current?.reset();
      setTouched({ recaptcha: false }, false);
      setFieldValue('recaptcha', null);
    }
  }, [isLoading]);
  return (
    <>
      <ReCAPTCHA
        ref={recaptchaRef}
        onChange={onChange}
        onExpired={() => setFieldValue('recaptcha', null)}
        sitekey={captchaKey}
      />
      {hasError && <ErrorMessage>{meta?.error}</ErrorMessage>}
    </>
  );
};

export default ReCaptcha;
