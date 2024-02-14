import React from 'react';

import { AEMProps } from '@/types/global/aem-definition';

import ContactUs from './ContactUs';
import { FooterParsedProps } from './definitions';
import FooterItem from './FooterItem';
import LegalAndCompliances from './LegalAndCompliances';
import { Divider, FooterWrapper, GridContainer, GridRow } from './StyledFooter';

const Footer = ({ attributes, isAuthorRunMode }: AEMProps) => {
  if (attributes === '{}') {
    return null;
  }

  const footerJson: FooterParsedProps = JSON.parse(attributes);

  return (
    <FooterWrapper>
      <GridContainer>
        <GridRow>
          <FooterItem
            footerItems={footerJson?.menuList}
            isAuthorRunMode={isAuthorRunMode}
          />
          <Divider></Divider>
          <ContactUs contact={footerJson} />
          <LegalAndCompliances
            legalAndCompliances={footerJson}
            isAuthorRunMode={isAuthorRunMode}
          />
        </GridRow>
      </GridContainer>
    </FooterWrapper>
  );
};

export default Footer;
