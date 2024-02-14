import React from 'react';

import { ContentPath } from '@/utility/helpers/content-path';

import { Nav } from '../StyledFooter';
import { Item, ItemWrapper, Label, Link } from './StyledFooterItem';

const FooterItem = ({ footerItems, isAuthorRunMode }) => {
  return (
    <Nav>
      <ItemWrapper>
        {footerItems?.map((item, index) => {
          return (
            <Item key={index}>
              <Link
                href={
                  isAuthorRunMode === 'true' && ContentPath(item?.url)
                    ? `${item?.url}.html`
                    : ContentPath(item?.url)
                    ? `${item.url.substring(item.url.lastIndexOf('/'))}.html`
                    : item?.url
                }
                target={item?.isNewTab === 'true' ? '_blank' : '_self'}
              >
                <Label>{item?.text}</Label>
              </Link>
            </Item>
          );
        })}
      </ItemWrapper>
    </Nav>
  );
};

export default FooterItem;
