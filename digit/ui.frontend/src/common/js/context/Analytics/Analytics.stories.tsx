import React from 'react';
import { THEMES } from '@/storybook/preview';

import { analyticsStore } from '@/context/Analytics/Analytics';

export default {
  title: 'Foundations/Global state',
};

const Component: React.FC<any> = ({ name, children }) => {
  const { sectionType } = analyticsStore();

  return (
    <div style={{ margin: '30px', border: '1px dashed black', padding: '30px' }}>
      {children}
      {sectionType && <p style={{ color: 'red' }}>{sectionType}</p>}
    </div>
  );
};
export const Analytics = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;
  const { setSectionType } = analyticsStore();

  return (
    // temporary hack until AEM integration completed
    <Theme>
      <Component>
        <button onClick={() => setSectionType('Residential Address')}>set sectionType to 'Residential Address'</button>
        <button onClick={() => setSectionType('Mailing Address')}>set sectionType to 'Mailing Address'</button>
      </Component>
    </Theme>
  );
};

Analytics.args = {
  attributes: null,
};
Analytics.storyName = 'Analytics State';
