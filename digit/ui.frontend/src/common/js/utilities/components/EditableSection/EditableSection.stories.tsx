import { ComponentMeta } from '@storybook/react';
import { THEMES } from '@/storybook/preview';
import React, { useState } from 'react';

import { dummyText } from '@/utility/helpers/dev';

import ActionButton from '../FormElement/ActionButton';
import EditableSectionActions from './EditableSectionActions';
import EditableSectionContainer from './EditableSectionContainer';

export default {
  title: 'Foundations/Editable Section Overlay',
  component: EditableSectionContainer,
} as ComponentMeta<typeof EditableSectionContainer>;

export const Example = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Theme>
      {/* Example how we reuse EditableSectionContainer on form section */}
      <ActionButton
        handleOnClick={() => setIsEditing(true)}
        label="open editable section overlay"
      />
      <p>{dummyText.repeat(100)}</p>
      <EditableSectionContainer
        setIsEditing={setIsEditing}
        isEditing={isEditing}
        // temporary hack until AEM integration completed
        site={site?.toLowerCase().replace('-', '')}
        {...args}
      >
        <p>{dummyText.repeat(50)}</p>
        <EditableSectionActions
          cancelLabel="cancel"
          handleOnClickCancel={undefined}
          handleOnClickSave={undefined}
          saveLabel="save changes"
        />
      </EditableSectionContainer>
    </Theme>
  );
};
Example.storyName = 'Editable Section Overlay';
