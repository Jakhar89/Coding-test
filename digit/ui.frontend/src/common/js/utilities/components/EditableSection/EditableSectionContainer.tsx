import React, { useEffect, useRef } from 'react';

import { analyticsStore } from '@/context/Analytics/Analytics';
import Icon from '@/utility/components/Icon';
import { emitTrackEvent } from '@/utility/helpers/analytics';
import { disableBodyScroll, enableBodyScroll } from '@/utility/helpers/bodyScrollLock';

import { EditableSectionContainerProps } from './definitions';
import {
  ButtonWrapper,
  CloseButton,
  CloseSectionOverlay,
  ContentContainer,
  ContentWrapper,
  DISABLE_OVERLAY_BODY_SCROLL,
  GridContainer,
  GridItemContainer,
  GridRowContainer,
  OverlayContainer,
  SectionContainer,
  SHOW_EDITABLE_SECTION_OVERLAY,
} from './StyledEditableSection';

const EditableSectionContainer: React.FC<EditableSectionContainerProps> = ({
  children,
  isEditing,
  resetJourneyFn,
  setIsEditing,
  handleCloseEvent,
  full, //Render Content full-width
  ...props
}) => {
  const { modalTitle, sectionType } = analyticsStore();
  const ref = useRef();
  const section = ref?.current;

  const analyticsClick = () => {
    if (handleCloseEvent) {
      handleCloseEvent();
      return;
    }
    if (sectionType) {
      emitTrackEvent({ name: 'cancelUpdate', data: { cancelSection: sectionType, modalTitle: modalTitle } });
    }
  };

  // Handle ESC key (key 'Escape)
  document.addEventListener('keyup', function (e) {
    if (e.key === 'Escape') {
      analyticsClick();
      setIsEditing(false);
    }
  });

  useEffect(() => {
    if (isEditing) {
      document.body.classList.add(DISABLE_OVERLAY_BODY_SCROLL);
    } else {
      document.body.classList.remove(DISABLE_OVERLAY_BODY_SCROLL);
    }
  }, [isEditing]);

  const ButtonWrapperInner = () => (
    <>
      <CloseButton
        aria-label="close"
        onClick={() => {
          analyticsClick();
          setIsEditing(false);
          if (resetJourneyFn) {
            resetJourneyFn();
          }
        }}
        type="reset"
      >
        close
      </CloseButton>
      <span
        onClick={() => {
          analyticsClick();
          setIsEditing(false);
          if (resetJourneyFn) {
            resetJourneyFn();
          }
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
    <SectionContainer
      className={isEditing ? SHOW_EDITABLE_SECTION_OVERLAY : null}
      ref={ref}
      {...props}
    >
      <OverlayContainer
        className="OverlayContainer"
        tabIndex={0}
      >
        <GridContainer>
          <GridRowContainer>
            <GridItemContainer config={{ col: { xs: 4, md: 'auto' } }}>
              <ContentContainer>
                <ContentWrapper full={full ? true : false}>{children}</ContentWrapper>
                {!full && (
                  <ButtonWrapper>
                    <ButtonWrapperInner />
                  </ButtonWrapper>
                )}
              </ContentContainer>
            </GridItemContainer>
          </GridRowContainer>
        </GridContainer>
      </OverlayContainer>
      <CloseSectionOverlay
        aria-label="close"
        type="reset"
        onClick={() => {
          analyticsClick();
          setIsEditing(false);
        }}
      />
    </SectionContainer>
  );
};

export default EditableSectionContainer;
