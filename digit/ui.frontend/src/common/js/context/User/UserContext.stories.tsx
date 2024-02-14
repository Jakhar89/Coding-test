import React, { useEffect } from 'react';
import { THEMES } from '@/storybook/preview';

import { userStore } from '@/context/User/User';

export default {
  title: 'Foundations/Global state',
};

const Component: React.FC<any> = () => {
  const { isFetchingSplitToken, setIsFetchingSplitToken } = userStore();

  return (
    <div style={{ margin: '30px', border: '1px dashed black', padding: '30px' }}>
      <h1>Example User context</h1>

      <button onClick={() => setIsFetchingSplitToken(true)}>Set isFetchingSplitToken to 'true'</button>
      <br />
      <br />
      <button onClick={() => setIsFetchingSplitToken(false)}>Set isFetchingSplitToken to 'false'</button>
      <br />
      <br />
      <p>isFetchingSplitToken: {isFetchingSplitToken ? 'true' : 'false'} </p>
    </div>
  );
};
export const UserStory = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;

  return (
    <Theme>
      <Component />
    </Theme>
  );
};

UserStory.storyName = 'User State';
