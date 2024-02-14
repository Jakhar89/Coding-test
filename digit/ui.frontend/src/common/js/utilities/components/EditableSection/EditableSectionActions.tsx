import React, { useEffect } from 'react';

import { analyticsStore } from '@/context/Analytics/Analytics';

import { handleAnalyticsClick } from '@/utility/helpers/analytics';

import { EditableSectionActionsProps } from './definitions';
import { CancelButton, SaveButton, SectionAction } from './StyledEditableSection';
import ActionButton from '../FormElement/ActionButton';

const EditableSectionActions: React.FC<EditableSectionActionsProps> = ({
  cancelLabel,
  handleOnClickCancel,
  handleOnClickSave,
  saveLabel,
  isSaveDisabled,
  isLoading,
}) => {
  const { modalTitle, sectionType } = analyticsStore();

  return (
    <SectionAction>
      {cancelLabel && handleOnClickCancel && (
        <CancelButton
          aria-label={cancelLabel}
          onClick={(e) => {
            handleOnClickCancel(e);
            // Analytics click event
            if (sectionType && modalTitle) {
              handleAnalyticsClick('cancelUpdate', { cancelSection: sectionType, modalTitle: modalTitle });
            }
          }}
          type="reset"
        >
          {cancelLabel}
        </CancelButton>
      )}
      {saveLabel && (
        <ActionButton
          aria-label={saveLabel}
          onClick={handleOnClickSave ? handleOnClickSave : undefined}
          type={'submit'}
          disabled={isSaveDisabled || isLoading ? true : undefined}
          buttonType={'primary'}
          isLoading={isLoading}
          label={saveLabel}
        />
      )}
    </SectionAction>
  );
};

export default EditableSectionActions;
