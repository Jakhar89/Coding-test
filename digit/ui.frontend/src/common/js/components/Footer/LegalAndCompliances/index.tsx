import React from 'react';

import { ContentPath } from '@/utility/helpers/content-path';

import {
  LegalCompliancesContent,
  LegalCompliancesContentItem,
  LegalCompliancesContentItemLink,
  LegalCompliancesContentItemWrapper,
  LegalCompliancesContentWrapper,
} from './StyledLegalAndCompliaces';

import RichText from '@/utility/components/RichText';

const LegalAndCompliances = ({ isAuthorRunMode, legalAndCompliances }) => {
  return (
    <LegalCompliancesContentWrapper>
      <LegalCompliancesContent>
        <RichText>{legalAndCompliances?.licenceDetails}</RichText>
      </LegalCompliancesContent>
      <LegalCompliancesContentItemWrapper>
        {legalAndCompliances?.bottomFooterMenuList?.map((item, index) => {
          return (
            <LegalCompliancesContentItem key={index}>
              <LegalCompliancesContentItemLink
                href={
                  isAuthorRunMode === 'true' && ContentPath(item?.url)
                    ? `${item?.url}.html`
                    : ContentPath(item?.url)
                    ? `${item.url.substring(item.url.lastIndexOf('/'))}.html`
                    : item?.url
                }
                target={item?.isNewTab === 'true' ? '_blank' : '_self'}
              >
                {item?.text}
              </LegalCompliancesContentItemLink>
            </LegalCompliancesContentItem>
          );
        })}
      </LegalCompliancesContentItemWrapper>
    </LegalCompliancesContentWrapper>
  );
};

export default LegalAndCompliances;
