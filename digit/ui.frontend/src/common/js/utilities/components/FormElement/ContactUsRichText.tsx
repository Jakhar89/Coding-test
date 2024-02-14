import React, { useEffect, useRef } from 'react';

import { analyticsStore } from '@/context/Analytics/Analytics';

import RichText from '@/utility/components/RichText';
import { getFormattedPageName, handleAnalyticsClick } from '@/utility/helpers/analytics';

const ContactUsRichText = ({ children }) => {
  const contactUsRef = useRef<HTMLDivElement>(null);
  const { journeyFlow } = analyticsStore();

  useEffect(() => {
    const ref = contactUsRef?.current;

    if (ref) {
      const linkElements = [...ref?.querySelectorAll<HTMLAnchorElement>('[href*="tel:"]')];
      linkElements?.forEach((element) => {
        const { href, innerText } = element;
        element.onclick = () => {
          handleAnalyticsClick('keyLinkInteraction', {
            keyLink: {
              linkDestinationURL: href,
              linkOriginationPage: getFormattedPageName(),
              linkPosition: journeyFlow,
              linkTitle: innerText,
            },
          });
        };
      });
    }
  }, []);

  return (
    <div ref={contactUsRef}>
      <RichText>{children}</RichText>
    </div>
  );
};

export default ContactUsRichText;
