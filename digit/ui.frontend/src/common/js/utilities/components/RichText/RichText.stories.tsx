import { ComponentMeta } from '@storybook/react';
import { THEMES } from '@/storybook/preview';
import React from 'react';

import RichText from '.';
import mock from './mock.json';

export default {
  title: 'Foundations/Rich Text',
  component: RichText,
} as ComponentMeta<typeof RichText>;

export const Example = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;

  return (
    <Theme>
      <RichText>{mock.headingWithParagraph}</RichText>
      <RichText>{mock.orderedList}</RichText>
      <RichText>{mock.unorderedList}</RichText>
    </Theme>
  );
};

Example.storyName = 'Rich Text';
