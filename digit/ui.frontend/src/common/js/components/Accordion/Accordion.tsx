import React, { useEffect, useState } from 'react';

import { AEMProps } from '@/types/global/aem-definition';
import Icon from '@/utility/components/Icon';
import RichText from '@/utility/components/RichText';

import { AccordionParsedProps, AccordionProps } from './definitions';
import {
    AccordionContainer, AccordionContent, AccordionItem, AccordionTitle, AccordionTitleContainer,
    IconContainer
} from './StyledAccordion';

const Accordion: React.FC<AccordionProps> = ({ attributes, index, targetFAQIndex, setTargetFAQIndex }) => {
  if (attributes === '{}') {
    return null;
  }

  const accordionJson: AccordionParsedProps = JSON.parse(attributes);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (targetFAQIndex !== undefined && targetFAQIndex !== index && isActive === true) {
      setIsActive(false);
    }
  }, [targetFAQIndex]);

  return (
    <>
      <AccordionContainer>
        <AccordionItem
          id={index}
          onClick={() => {
            setTargetFAQIndex && setTargetFAQIndex(index);
            setIsActive(!isActive);
          }}
        >
          <AccordionTitleContainer>
            <AccordionTitle isActive={isActive}>{accordionJson?.title}</AccordionTitle>
          </AccordionTitleContainer>
          <IconContainer>
            {isActive ? (
              <Icon
                name={'remove'}
                isFunctional={true}
              />
            ) : (
              <Icon
                name={'add'}
                isFunctional={true}
              />
            )}
          </IconContainer>
        </AccordionItem>
        {isActive && (
          <AccordionContent>
            <RichText>{accordionJson?.description}</RichText>
          </AccordionContent>
        )}
      </AccordionContainer>
    </>
  );
};

export default Accordion;
