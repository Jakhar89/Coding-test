import React, { useRef, useState } from 'react';

import FormLabel from '@/utility/components/FormElement/Label';
import Icon from '@/utility/components/Icon';

import { AccordionContainer, ChildContainer, IconWrapper } from './StyledAccordionXS';

type AccordionXSProps = {
  title: string;
  children: any;
  maxHeight?: number;
};

const AccordionXS: React.FC<AccordionXSProps> = ({ title, children, maxHeight = 600 }) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleClick = () => {
    setCollapsed((preHeight) => !preHeight);
  };

  return (
    <AccordionContainer collapsed={collapsed}>
      <FormLabel
        className="collapseLabel"
        onClick={handleClick}
        htmlFor="accordionLabel"
      >
        {title}
        <IconWrapper>
          <Icon
            isFunctional={true}
            aria-label="presentation"
            name={collapsed ? 'expand' : 'collapse'}
          />
        </IconWrapper>
      </FormLabel>
      <ChildContainer
        maxHeight={maxHeight}
        collapsed={collapsed}
      >
        {children}
      </ChildContainer>
    </AccordionContainer>
  );
};

export default AccordionXS;
