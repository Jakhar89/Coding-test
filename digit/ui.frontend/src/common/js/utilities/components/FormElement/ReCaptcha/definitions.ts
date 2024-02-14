import { ReCaptchaCallback } from '@forgerock/javascript-sdk';

export type RecaptchaProps = {
  isLoading?: boolean;
  reCaptchaCallback: ReCaptchaCallback;
};
