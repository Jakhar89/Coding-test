import React, { useEffect, useState } from 'react';

import { analyticsStore } from '@/context/Analytics/Analytics';

import DataList from '@/utility/components/DataList';
import { handleAnalyticsClick } from '@/utility/helpers/analytics';
import ActionButton from '@/utility/components/FormElement/ActionButton';
import EditableSectionActions from '@/utility/components/EditableSection/EditableSectionActions';
import EditableSectionContainer from '@/utility/components/EditableSection/EditableSectionContainer';
import { HeadingWithButtonWrapper, HeadingWithDivider } from '@/utility/components/FormElement/StyledFormSection';

import ManageAddress from '../ManageAddress/ManageAddress';

export const MAILING_ADDRESS_SECTION_NAME = 'Mailing Address';

const MailingAddress = ({
  addressDetailsJson,
  data,
  errorPagePath,
  handleFormSubmit,
  initialData,
  isEditing,
  isLoading,
  isApiLoading,
  isResidentialMailingAddressSame,
  setIsEditing,
}) => {
  const { setModalTitle, setSectionType } = analyticsStore();
  // TODO: Update modal title once BED intergration for header is complete
  const modalTitle = 'Mailing Address';

  useEffect(() => {
    if (!isEditing) {
      setModalTitle(undefined);
      setSectionType(undefined);
    }
  }, [isEditing]);

  return (
    <>
      <HeadingWithButtonWrapper>
        <HeadingWithDivider>{addressDetailsJson.mailingAddressTitle}</HeadingWithDivider>
        <ActionButton
          onClick={() => {
            handleAnalyticsClick('updateClick', { updateSection: MAILING_ADDRESS_SECTION_NAME });
            setIsEditing(true);
            setModalTitle(modalTitle);
            setSectionType(MAILING_ADDRESS_SECTION_NAME);
          }}
          icon="edit"
        />
      </HeadingWithButtonWrapper>
      <DataList
        data={data}
        shouldHideEmptyValues={isLoading}
      />

      <EditableSectionContainer
        isEditing={isEditing}
        // TODO: Update modal title once BED intergration for header is complete
        setIsEditing={setIsEditing}
      >
        {isEditing && (
          <ManageAddress
            addressDetailsJson={addressDetailsJson}
            errorPagePath={errorPagePath}
            handleFormSubmit={handleFormSubmit}
            initialData={initialData}
            isResidentialMailingAddressSame={isResidentialMailingAddressSame}
          >
            <EditableSectionActions
              cancelLabel={'cancel'}
              saveLabel={'save changes'}
              handleOnClickCancel={() => {
                setIsEditing(false);
              }}
              isLoading={isApiLoading}
            />
          </ManageAddress>
        )}
      </EditableSectionContainer>
    </>
  );
};

export default MailingAddress;
