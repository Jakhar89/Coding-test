import React from 'react';

import { Context, ContextWrapper, Title, Wrapper } from './StyledContactUs';

import RichText from '@/utility/components/RichText';

const ContactUs = ({ contact }) => {
  return (
    <Wrapper>
      <Title>{contact?.contactUsText}</Title>
      <ContextWrapper>
        <Context>
          <RichText>{contact?.contactUsDetails}</RichText>
        </Context>
        <Context>
          <RichText>{contact?.postalAddress}</RichText>
        </Context>
      </ContextWrapper>
    </Wrapper>
  );
};

export default ContactUs;
