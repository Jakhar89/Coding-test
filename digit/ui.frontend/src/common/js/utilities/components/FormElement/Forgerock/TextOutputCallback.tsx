import React from 'react';

import InPageAnnouncement from '@/utility/components/InPageAnnouncement';
import { getAEMErrorMessageByCode } from '@/utility/helpers/validation';
import { TextOutputCallbackComponentProps } from './definitions';

const TextOutput: React.FC<TextOutputCallbackComponentProps> = ({
  errorComponent,
  errorMap,
  shouldDisplayTextOutput = true,
}): React.ReactElement | null => {
  const message = errorComponent?.getMessage() ?? '';
  const messageType = errorComponent?.getMessageType();

  switch (messageType) {
    case '0':
      return shouldDisplayTextOutput ? (
        <InPageAnnouncement
          announcementType={'info'}
          text={getAEMErrorMessageByCode(message, errorMap)}
        />
      ) : null;
    case '2':
      return <InPageAnnouncement text={getAEMErrorMessageByCode(message, errorMap)} />;
    default:
      return <InPageAnnouncement text={`Unknown message type ${messageType} ${message}`} />;
  }
};

export default TextOutput;
