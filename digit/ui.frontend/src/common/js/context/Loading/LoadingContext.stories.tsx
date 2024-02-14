import React from 'react';
import { THEMES } from '@/storybook/preview';

import { loadingStore } from '@/context/Loading/Loading';
import LoadingOverlay from '@/components/LoadingOverlay/LoadingOverlay';

import mock from './mock.json';

const mockStringified = JSON.stringify(mock);

export default {
  title: 'Foundations/Global state',
};

const Component: React.FC<any> = ({ name, children }) => {
  const { isLoading } = loadingStore();

  return (
    <div style={{ margin: '30px', border: '1px dashed black', padding: '30px' }}>
      <h1>{name}</h1>
      {children}
      {isLoading ? (
        <p style={{ color: 'red' }}>Mocking calling the API</p>
      ) : (
        <p style={{ color: 'red' }}>Mock API has loaded</p>
      )}
    </div>
  );
};
export const Example = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;
  const { setLoading } = loadingStore();

  return (
    // temporary hack until AEM integration completed
    <Theme>
      <Component name={'Example of loading overlay is showing when calling the API'}>
        <button onClick={() => setLoading(true)}>Call Mock API</button>
      </Component>
      <LoadingOverlay {...args} />
    </Theme>
  );
};

Example.args = {
  attributes: mockStringified,
};
Example.storyName = 'Loading State';
