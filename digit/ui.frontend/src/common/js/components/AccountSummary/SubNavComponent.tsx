import React, { useEffect, useRef, useState } from 'react';

import {
  ANALYTICS_POSITION_ACTION_MENU,
  ANALYTICS_POSITION_INPAGE,
  getFormattedPageName,
  handleAnalyticsClick,
} from '@/utility/helpers/analytics';

import { Dropdown, SubNav, SubNavButton } from './StyledAccountSummary';

const SubNavComponent = ({ accountSummaryJson, contract }) => {
  const [dropdown, setDropdown] = useState(false);
  const subNavButton = useRef<any>();

  function handleClickOutside(event) {
    if (subNavButton.current && !subNavButton.current?.parentElement.contains(event.target)) {
      setDropdown(false);
    }
  }

  const contractId = contract?.customerDomain?.contract?.contractId;

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const DropdownMenu = ({ submenus }) => (
    <>
      {submenus?.map((submenu, index) => {
        const actionLink = submenu?.actionMenu?.toLowerCase().includes('transaction')
          ? `${submenu?.actionMenuLink}.html?contract=${contractId}`
          : submenu.actionMenuLink;

        return (
          <li
            key={index}
            className="menu-items"
          >
            <a
              onClick={() => {
                handleAnalyticsClick('keyLinkInteraction', {
                  keyLink: {
                    linkDestinationURL: actionLink,
                    linkOriginationPage: getFormattedPageName(),
                    linkPosition: ANALYTICS_POSITION_ACTION_MENU,
                    linkTitle: submenu.actionMenu,
                  },
                });
              }}
              href={actionLink}
            >
              {submenu.actionMenu}
            </a>
          </li>
        );
      })}
    </>
  );

  return (
    <SubNav>
      <SubNavButton
        aria-haspopup="menu"
        onClick={() => {
          setDropdown((prev) => !prev);
        }}
        role="button"
      >
        <span
          onClick={() => {
            handleAnalyticsClick('keyLinkInteraction', {
              keyLink: {
                linkOriginationPage: getFormattedPageName(),
                linkPosition: ANALYTICS_POSITION_INPAGE,
                linkTitle: 'Action Menu',
              },
            });
          }}
        >
          ...
        </span>
        {dropdown}
        <Dropdown
          ref={subNavButton}
          className={`${dropdown ? 'show' : ''}`}
        >
          <DropdownMenu submenus={accountSummaryJson?.actionMenuList} />
        </Dropdown>
      </SubNavButton>
    </SubNav>
  );
};

export default SubNavComponent;
