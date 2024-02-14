import { validIcons } from '@/utility/components/Icon/definitions';

export type CommunicationsConfigProps = ManagePasswordConfigProps & VerifyEmailMobileThankYouConfigProps;

export type VerifyEmailMobileThankYouConfigProps = ThankYouConfigProps &
  VerifyEmailConfigProps &
  VerifyMobileConfigProps;

export type ManagePasswordConfigProps = {
  managePasswordDescription?: string;
  managePasswordEditTitle?: string;
};

export type ThankYouConfigProps = {
  thankYouOverlayTimer?: number;
  thankYouDescription: string;
  thankYouIcon?: validIcons;
  thankYouTitle?: string;
};

export type VerifyEmailConfigProps = {
  resendEmailText?: string;
  verifyEmailCancelButton?: string;
  verifyEmailContinueButton: string;
  verifyEmailDescription?: string;
  verifyEmailDisclaimer?: string;
  verifyEmailOTPText?: string;
  verifyEmailResendText?: string;
  verifyEmailTitle?: string;
};

export type VerifyMobileConfigProps = {
  resendSMSText?: string;
  verifyMobileCancelButton?: string;
  verifyMobileContinueButton: string;
  verifyMobileDescription?: string;
  verifyMobileDisclaimer?: string;
  verifyMobileOTPText?: string;
  verifyMobileResendText?: string;
  verifyMobileTitle?: string;
};
