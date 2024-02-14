import React from 'react';
import { THEMES } from '@/storybook/preview';

import { errorMessageStore } from '@/context/ErrorMessage/ErrorMessage';

export default {
  title: 'Foundations/Global state',
};

const Component: React.FC<any> = ({ name, children }) => {
  const { errorMessage, setErrorMessage } = errorMessageStore();

  return (
    <div style={{ margin: '30px', border: '1px dashed black', padding: '30px' }}>
      {children}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};
export const ErrorMessage = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;
  const { setErrorMessage } = errorMessageStore();

  return (
    // temporary hack until AEM integration completed
    <Theme>
      <Component>
        <button onClick={() => setErrorMessage('Test')}>set error msg to 'Test'</button>
        <button onClick={() => setErrorMessage(null)}>set error msg to null</button>
      </Component>
    </Theme>
  );
};

ErrorMessage.args = {
  attributes: null,
};
ErrorMessage.storyName = 'Error Message State';
