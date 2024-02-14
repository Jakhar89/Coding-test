import { ComponentMeta } from '@storybook/react';
import React from 'react';
import { THEMES } from '@/storybook/preview';

import { emitTrackEvent } from '@/utility/helpers/analytics';

export default {
  title: 'Analytics',
};

export const Example = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;

  window.digitalData = {
    page: {
      pageBrand: site,
      pageName: 'test',
      pageURL: window.parent.location.pathname,
    },
  };

  return (
    // temporary hack until AEM integration completed
    <Theme>
      <button
        type="button"
        onClick={() => emitTrackEvent({ name: 'updateClick', data: { updateSection: 'Email Address' } })}
        style={{ fontSize: '30px' }}
      >
        Update Click (email section)
      </button>

      <button
        type="button"
        onClick={() =>
          emitTrackEvent({
            name: 'cancelUpdate',
            data: { cancelSection: 'Email Address', modalTitle: 'Email Address' },
          })
        }
        style={{ fontSize: '30px' }}
      >
        Cancel Update (email section)
      </button>
    </Theme>
  );
};

Example.storyName = 'Utility';
