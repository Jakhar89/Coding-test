export type AEMProps = {
  attributes: string;
  errorSuccessMap?: AEMErrorSuccessProps;
  isAuthorRunMode?: string;
  site?: string;
  restricted?: boolean;
};

export type AEMErrorSuccessProps = {
  autoLogoutPagePath?: string;
  errorMap?: AEMErrorMap;
  errorPagePath?: string;
  lockedPagePath?: string;
  loginPagePath?: string;
  successPagePath?: string;
};

export type AEMErrorMap = {
  errorCode?: string;
  errorMessage?: string;
}[];

export type GlobalConfigProps = {
  baseApiUrl?: string;
  forgerockClientId?: string;
  forgerockRealm?: string;
  forgerockUrl?: string;
  questApiKey?: string;
};
