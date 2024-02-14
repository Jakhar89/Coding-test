import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

import { analyticsStore } from '@/context/Analytics/Analytics';
import { apiStore } from '@/context/API/Api';
import { errorMessageStore } from '@/context/ErrorMessage/ErrorMessage';
import { userStore } from '@/context/User/User';
import { AEMErrorSuccessProps, GlobalConfigProps } from '@/types/global/aem-definition';
import { emitTrackEvent } from '@/utility/helpers/analytics';
// prettier-ignore
import {
    API_KEY_HEADER,
    AUTHORIZATION_HEADER,
    CORRELATION_ID_HEADER,
    errorHandler,
    SIGNATURE_COOKIE_NAME
} from '@/utility/helpers/api';
import { getCorrelationId } from '@/utility/helpers/correlation-id';
import { apiErrorRedirect } from '@/utility/helpers/error-handling';
import {
  getFirstCallbackByType,
  SSP_CHANGE_EMAIL_TREE,
  SSP_CHANGE_PASSWORD_TREE,
  SSP_CHANGE_PHONE_NUMBER_TREE,
  SSP_LOGIN_TREE,
  SSP_RECOVER_LOCKED_ACCOUNT_TREE,
  SSP_REGISTRATION_TREE,
  SSP_RESET_PASSWORD_TREE,
} from '@/utility/helpers/forgerock';
import { JourneyType } from '@/utility/helpers/forgerock/definitions';
import { toSentenceCase } from '@/utility/helpers/string';
import {
  CallbackType,
  FRAuth,
  FRLoginFailure,
  FRLoginSuccess,
  FRStep,
  StepType,
  TextOutputCallback,
  TokenManager,
} from '@forgerock/javascript-sdk';

type ForgerockHookProps = {
  errorSuccessMap?: AEMErrorSuccessProps;
  globalConfig?: GlobalConfigProps;
  tree: JourneyType;
};

declare global {
  interface Window {
    env?: {
      [key: string]: string;
    };
  }
}

/**
 * Mapping ForgeRock Journey flow to constants
 */
const JourneyStage = {
  FATAL: 'Fatal',
  USERNAME_PASSWORD: 'UsernamePassword',
  ERROR: 'Error',
};

/**
 * ForgeRock Journey
 * -----------------
 *
 * This component is used to render a full ForgeRock Journey. It will
 * introspect the ForgeRock object to determine what details from the user are
 * required and dynamically create the forms and accept the user's input.
 */
const useForgeRockJourney = ({ errorSuccessMap, globalConfig, tree }: ForgerockHookProps): any => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [shouldResetJourney, resetJourney] = useState<boolean>(false);
  const [step, setStep] = useState<FRStep>();
  const [hasSuccessfullyCompleted, setHasSuccessfullyCompleted] = useState(false);
  // global context
  const { errorField, journeyFlow, modalTitle, setErrorAPI, setErrorDetails } = analyticsStore();
  const { setSignature } = apiStore();
  const { setErrorMessage } = errorMessageStore();
  const { isAuthenticated, isFetchingSplitToken, setIsAuthenticated, setIsFetchingSplitToken } = userStore();

  useEffect(() => {
    async function oauthFlow() {
      console.log('inside oauth');
      if (!Cookies.get(SIGNATURE_COOKIE_NAME) && !isFetchingSplitToken) {
        try {
          setIsFetchingSplitToken(true);
          // get token from Forgerock
          const token = await TokenManager.getTokens();

          let splitterURL = `${globalConfig?.baseApiUrl}/c1/v1/split`;
          let apiKey = globalConfig?.questApiKey ?? '';

          if (token?.accessToken) {
            //  retrieve from local storage if dev env
            if (['4502', '6006'].includes(window.location.port)) {
              apiKey = localStorage.getItem('apiKey') ?? '';
              splitterURL = localStorage.getItem('splitterURL') ?? '';
            }

            if (splitterURL && apiKey) {
              console.log('calling split');
              // send token to split API endpoint
              await axios
                .get(splitterURL, {
                  // withCredentials: false,
                  headers: {
                    [API_KEY_HEADER]: apiKey,
                    [AUTHORIZATION_HEADER]: `Bearer ${token?.accessToken}`,
                    [CORRELATION_ID_HEADER]: getCorrelationId(),
                  },
                  withCredentials: true,
                })
                .then((response) => {
                  if (response?.data?.sig) {
                    Cookies.set(SIGNATURE_COOKIE_NAME, response?.data?.sig, { sameSite: 'strict' });
                    setIsFetchingSplitToken(false);
                    setSignature(response?.data?.sig);
                  } else {
                    errorHandler('No Signature: Split Res', 'split', errorSuccessMap);
                    apiErrorRedirect(`${errorSuccessMap?.errorPagePath}.html`);
                  }
                })
                .catch((error) => {
                  console.error(`Error: token split ${error}`);
                  errorHandler(error, 'split', errorSuccessMap);
                  setIsFetchingSplitToken(false);
                  apiErrorRedirect(`${errorSuccessMap?.errorPagePath}.html`);
                });
            }
          }
        } catch (error) {
          console.error(`Error: get token: ${error}`);
          errorHandler(error, 'C1-Token', errorSuccessMap);
          apiErrorRedirect(`${errorSuccessMap?.errorPagePath}.html`);
        }
      }
    }
    if (isAuthenticated) {
      oauthFlow().then(() => {
        // if journey matches one that logs user in, then set `hasSuccessfullyCompleted` to true
        if (
          //prettier-ignore
          [
            SSP_LOGIN_TREE,
            SSP_RECOVER_LOCKED_ACCOUNT_TREE,
            SSP_REGISTRATION_TREE,
            SSP_RESET_PASSWORD_TREE
          ].includes(tree)
        ) {
          setHasSuccessfullyCompleted(true);
        }
      });
    }
  }, [isAuthenticated]);

  /**
   * Moves to the next step in the journey
   *
   * @param step current ForgeRock step in journey
   */
  const nextStep = (step?: FRStep) => {
    setIsLoading(true);
    if (
      !isAuthenticated &&
      [SSP_CHANGE_EMAIL_TREE, SSP_CHANGE_PASSWORD_TREE, SSP_CHANGE_PHONE_NUMBER_TREE].includes(tree)
    ) {
      return;
    }
    FRAuth.next(step, tree !== undefined ? { tree } : undefined)
      .then(handleStep)
      .catch(handleFatalError);
  };

  /**
   * Creates a message for a fatal error
   *
   * @param err
   */
  const handleFatalError = (err: unknown) => {
    console.warn(`handleFatalError: ${err}`);
  };

  // Kick off the journey when this component is first loaded
  useEffect(() => {
    if (shouldResetJourney) {
      resetJourney(false);
    }

    nextStep();

    // Only run once. Next steps causes a recursive callback if in dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tree, shouldResetJourney, isAuthenticated]);

  /**
   * Handles a ForgeRock response and journey steps
   *
   * @param {unknown} step current ForgeRock step in journey
   */
  const handleStep = async (step: FRStep | FRLoginSuccess | FRLoginFailure) => {
    switch (step.type) {
      case StepType.LoginSuccess:
        setIsAuthenticated(true);
        break;

      case StepType.LoginFailure:
        // gets returned if:
        // 1. Registration flow: email already exists in brand or not valid for registration
        // 2. Session has timed out
        setIsLoading(false);
        setIsAuthenticated(false);
        const errorMsg = step.getMessage() || 'Invalid credentials, please try again';
        const detail: any = step?.getDetail(); // `any` because getDetail doesn't handle object
        let errorCode;
        let errorDetails;

        if (typeof detail === 'object') {
          errorCode = `E${detail?.errorCode}`;
          errorDetails = `API:${errorCode ?? errorMsg}`;
        } else {
          errorDetails = `API:${errorMsg}`;
        }

        emitTrackEvent({
          name: 'error',
          data: {
            error: {
              errorAPI: 'Forgerock',
              errorDetails: errorDetails,
              errorField: 'Email',
              errorFlow: journeyFlow ?? '',
              modalTitle: toSentenceCase(modalTitle),
            },
          },
        });

        // needs to persist because we restart the journey
        setErrorMessage(errorCode ?? errorMsg);
        nextStep();
        break;

      default:
        const stage = (step as FRStep).getStage();
        const header = step?.getHeader();
        setIsLoading(false);

        // redirect user to locked account page
        if (header === 'E18') {
          emitTrackEvent({
            name: 'error',
            data: {
              error: {
                errorAPI: 'Forgerock',
                errorDetails: `API:${header}`,
                errorField: 'Email|password',
                errorFlow: journeyFlow ?? '',
                modalTitle: toSentenceCase(modalTitle),
              },
            },
          });

          const textCallback: TextOutputCallback = step?.getCallbackOfType(CallbackType.TextOutputCallback);
          window.sessionStorage.setItem('userid', textCallback?.getMessage());
          window.location.href = errorSuccessMap?.lockedPagePath ? `${errorSuccessMap?.lockedPagePath}.html` : '/';
        }

        switch (stage) {
          case JourneyStage.ERROR:
          case JourneyStage.FATAL:
            const errorDetails = 'API:E15';
            emitTrackEvent({
              name: 'error',
              data: {
                error: {
                  errorAPI: 'Forgerock',
                  errorDetails: errorDetails,
                  errorField: errorField,
                  errorFlow: journeyFlow ?? '',
                  modalTitle: toSentenceCase(modalTitle),
                },
              },
            });
            break;
          default:
            // check for TextOutputCallback for analytics reporting
            const textCallback = getFirstCallbackByType(step?.callbacks) as TextOutputCallback;
            if (textCallback) {
              const message = textCallback?.getMessage();
              const messageType = textCallback.getMessageType();

              if (messageType === '2') {
                emitTrackEvent({
                  name: 'error',
                  data: {
                    error: {
                      errorAPI: 'Forgerock',
                      errorDetails: `API:${message}`,
                      errorField: errorField,
                      errorFlow: journeyFlow ?? '',
                      modalTitle: toSentenceCase(modalTitle),
                    },
                  },
                });
              }
            }
            setStep(step);
            break;
        }
    }
  };

  return {
    hasSuccessfullyCompleted: hasSuccessfullyCompleted || step?.getHeader() === 'Change-Successful',
    header: step?.getHeader(),
    isLoading,
    nextStep: (step) => nextStep(step),
    resetJourney,
    step: step,
  };
};

export default useForgeRockJourney;
