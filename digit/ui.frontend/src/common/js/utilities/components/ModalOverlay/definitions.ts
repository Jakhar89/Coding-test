import { ReactElement } from 'react';

import { validIcons } from '@/utility/components/Icon/definitions';

export type ModalOverlayProps = React.HTMLProps<HTMLDivElement> & {
  description: string | ReactElement;
  hasQuestApiError?: boolean;
  heading?: string;
  iconName?: validIcons;
  redirectURL?: string;
  setShouldShowModal: (e) => void;
  setTimer?: number;
  shouldTimeout?: boolean;
  shouldRedirectUserOnSuccessful?: boolean;
  shouldShowModalOverlay: boolean;
};
