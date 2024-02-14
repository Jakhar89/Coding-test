import * as React from 'react';

import PageNotification from '@/components/PageNotification/PageNotification';

import CallbackComponents from '@/utility/components/FormElement/Forgerock/CallbackComponents';

const ResetPasswordPrompt = ({
  // prettier-ignore
  errorComponent,
  errorMap,
  lockedAccountJson,
  loginButtonText,
  nextStep,
  site,
  step,
}) => {
  const props = {
    analyticsTrackEventName: lockedAccountJson?.eventName,
    description: lockedAccountJson?.unlockedDescription,
    icon: lockedAccountJson?.unlockedIcon,
    title: lockedAccountJson?.unlockedTitle,
  };

  return (
    <PageNotification
      attributes={JSON.stringify(props)}
      removeMarginTopSpacing={true}
    >
      <CallbackComponents
        brand={site}
        errorMap={errorMap}
        loginButtonText={loginButtonText}
        nextStep={nextStep}
        shouldDisplayTextOutput={false}
        step={step}
      />
    </PageNotification>
  );
};

export default ResetPasswordPrompt;
