import React, { useEffect, useRef, useState } from 'react';

import Icon from '@/utility/components/Icon';
import InPageAnnouncement from '@/utility/components/InPageAnnouncement';
import { disableBodyScroll, enableBodyScroll } from '@/utility/helpers/bodyScrollLock';
import { QUEST_ERROR_MSG_DISPLAY_DURATION } from '@/utility/helpers/constants';
import { questApiErrorMessage } from '@/utility/helpers/validation';

import { ModalOverlayProps } from './definitions';
import {
    ButtonWrapper, CloseButton, CloseSectionOverlay, ContentWrapper, Descriptions,
    DISABLE_OVERLAY_BODY_SCROLL, GridContainer, GridItemContainer, GridRowContainer, Heading,
    IconWrapper, OverlayContainer, SHOW_MODAL_OVERLAY
} from './StyledModalOverlay';

// prettier-ignore
const ModalOverlay: React.FC<ModalOverlayProps> = ({
  description,
  heading = 'Thank you!',
  hasQuestApiError,
  iconName = 'receipt-approved',
  redirectURL,
  setShouldShowModal,
  setTimer = 3000,
  shouldTimeout = true,
  shouldRedirectUserOnSuccessful = false,
  shouldShowModalOverlay,
  ...props
}) => {
  const ref = useRef();
  const section = ref?.current;
  const [shouldRedirectUser, setShouldRedirectUser] = useState(false);

  // Handle ESC key (key 'Escape)
  document.addEventListener('keyup', function (e) {
    if (e.key === 'Escape') {
      setShouldShowModal(false);
      setShouldRedirectUser(false);
    }
  });

  useEffect(() => {
    let timer;

    if (shouldShowModalOverlay) {
      disableBodyScroll(section);
      document.body.classList.add(DISABLE_OVERLAY_BODY_SCROLL);

      if (!shouldTimeout) return;
      timer = setTimeout(() => {
        setShouldShowModal(false);
        setShouldRedirectUser(true);
      }, hasQuestApiError ? QUEST_ERROR_MSG_DISPLAY_DURATION : setTimer);

    } else {
      enableBodyScroll(section);
      document.body.classList.remove(DISABLE_OVERLAY_BODY_SCROLL);
      setTimeout(timer);
    };

  }, [shouldShowModalOverlay]);

  if (shouldRedirectUserOnSuccessful && shouldRedirectUser) {
    // fallback to root path and dispatcher rule can handle from there
    window.location.href = redirectURL ? `${redirectURL}.html` : '/';
  }

  const ButtonWrapperInner = () => (
    <>
      <CloseButton
        aria-label="close"
        onClick={() => {
          setShouldShowModal(false);
        }}
        type="reset"
      >
        close
      </CloseButton>
      <span
        onClick={() => {
          setShouldShowModal(false);
        }}
      >
        <Icon
          name={'close'}
          isFunctional={true}
        />
      </span>
    </>
  );

  return (
    <OverlayContainer
      ref={ref}
      className={shouldShowModalOverlay ? SHOW_MODAL_OVERLAY : null}
      {...props}
    >
      <GridContainer>
        <ContentWrapper className="content-wrapper">
          <GridRowContainer>
            <GridItemContainer config={{ col: { md: 12 } }} >
              { !shouldTimeout && 
                <ButtonWrapper>
                  <ButtonWrapperInner />
                </ButtonWrapper>
              }
              <IconWrapper>
                <Icon
                  aria-label="presentation"
                  name={iconName}
                />
              </IconWrapper>
              <Heading>{heading}</Heading>
              {description && <Descriptions>{description}</Descriptions>}

              {/* Quest api error message  */}
              {hasQuestApiError && (
                <GridItemContainer config={{ col: { md: 8 } }} style={{justifyContent: 'flex-start'}}>
                  <InPageAnnouncement text={questApiErrorMessage} />
                </GridItemContainer>
              )}

            </GridItemContainer>
          </GridRowContainer>
        </ContentWrapper>
        <CloseSectionOverlay onClick={() => setShouldShowModal(false)} />
      </GridContainer>
    </OverlayContainer>
  );
};

export default ModalOverlay;
