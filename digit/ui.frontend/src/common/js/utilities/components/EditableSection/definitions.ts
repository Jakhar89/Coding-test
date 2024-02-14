export type EditableSectionActionsProps = React.HTMLProps<HTMLButtonElement> & {
  cancelLabel?: string;
  handleOnClickCancel: (e) => void;
  handleOnClickSave?: (e) => void;
  saveLabel?: string;
  isSaveDisabled?: boolean;
  isLoading?: boolean;
};

export type EditableSectionContainerProps = React.HTMLProps<HTMLDivElement> & {
  isEditing: boolean;
  resetJourneyFn?: () => void;
  setIsEditing: (e) => void;
  full?: boolean;
  handleCloseEvent?: () => void;
};

export type ContentWrapperProps = {
  full?: boolean;
};
