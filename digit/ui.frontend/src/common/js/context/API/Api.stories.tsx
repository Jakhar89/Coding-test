import React from 'react';
import { THEMES } from '@/storybook/preview';

import { apiStore } from '../API/Api';

export default {
  title: 'Foundations/Global state',
};

const Component: React.FC<any> = ({ name, children }) => {
  const { apiKey } = apiStore();

  return (
    <div style={{ margin: '30px', border: '1px dashed black', padding: '30px' }}>
      {children}
      <p>API KEY: {apiKey}</p>
    </div>
  );
};
export const Api = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;
  const { setApiKey } = apiStore();

  return (
    // temporary hack until AEM integration completed
    <Theme>
      <Component>
        <button onClick={() => setApiKey('1b671a64-40d5-491e-99b0-da01ff1f3341')}>
          set api key to '1b671a64-40d5-491e-99b0-da01ff1f3341'
        </button>
        <button onClick={() => setApiKey(null)}>set api key to null</button>
      </Component>
    </Theme>
  );
};

Api.args = {
  attributes: null,
};
Api.storyName = 'API';
