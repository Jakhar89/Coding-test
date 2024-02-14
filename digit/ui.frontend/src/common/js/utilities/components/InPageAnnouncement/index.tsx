import React, { useEffect, useRef } from 'react';
import { elementScrollIntoViewPolyfill } from 'seamless-scroll-polyfill';

import { InPageAnnouncementProps } from './definitions';
import { Container, Content, Heading } from './StyledInPageAnnouncement';

const InPageAnnouncement: React.FC<InPageAnnouncementProps> = ({
  announcementType = 'error',
  text,
  heading,
  // If you wish to not apply for scrollToBottom behavior on error in page annoucement see below:
  // shouldNotApplyScrollToBottomBehavior should set to be true
  shouldNotApplyScrollIntoViewBehavior = false,
}) => {
  if (!text) {
    return null;
  }

  const ref = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    // Because safari and some others browser does not support ScrollIntoViewOptions
    // This function modify window.HTMLElement.prototype scrollIntoView properties when needed
    // see: https://github.com/magic-akari/seamless-scroll-polyfill/blob/master/src/scrollIntoView.polyfill.ts
    elementScrollIntoViewPolyfill();
  }, []);

  useEffect(() => {
    const element = ref?.current;
    if (element && announcementType === 'error' && !shouldNotApplyScrollIntoViewBehavior) {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [ref]);

  return (
    <Container
      className={announcementType}
      ref={ref}
    >
      {heading && <Heading>{heading}</Heading>}
      <Content>{text}</Content>
    </Container>
  );
};

export default InPageAnnouncement;
