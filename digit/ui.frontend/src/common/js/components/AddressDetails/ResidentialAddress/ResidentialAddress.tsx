import React, { useEffect, useRef } from 'react';

import { analyticsStore } from '@/context/Analytics/Analytics';

import DataList from '@/utility/components/DataList';
import InPageAnnouncement from '@/utility/components/InPageAnnouncement';
import { handleAnalyticsClick } from '@/utility/helpers/analytics';
import { questApiErrorMessage } from '@/utility/helpers/validation';
import ActionButton from '@/utility/components/FormElement/ActionButton';
import EditableSectionActions from '@/utility/components/EditableSection/EditableSectionActions';
import EditableSectionContainer from '@/utility/components/EditableSection/EditableSectionContainer';
import {
  AddressSection,
  HeadingWithButtonWrapper,
  HeadingWithDivider,
  SubHeading,
} from '@/utility/components/FormElement/StyledFormSection';

import ManageAddress from '../ManageAddress/ManageAddress';

const RESIDENTIAL_ADDRESS_SECTION_NAME = 'Residential Address';

const ResidentialAddress = ({
  addressDetailsJson,
  data,
  errorPagePath,
  handleFormSubmit,
  initialData,
  isEditing,
  isLoading,
  isResidentialMailingAddressSame,
  setIsEditing,
  setIsLoading,
  hasQuestApiError,
  setQuestDeleteOrPutApiError,
}) => {
  const { setModalTitle, setSectionType } = analyticsStore();
  // TODO: Update modal title once BED intergration for header is complete
  const modalTitle = 'Residential Address';

  const residentialRef = useRef();

  useEffect(() => {
    if (!isEditing) {
      setIsLoading(false);
      setModalTitle(undefined);
      setSectionType(undefined);
    }
  }, [isEditing]);

  return (
    <>
      <AddressSection isAddressSame={isResidentialMailingAddressSame}>
        <HeadingWithButtonWrapper>
          <HeadingWithDivider marginBottomSize={isResidentialMailingAddressSame ? 'micro4' : 'micro2'}>
            {addressDetailsJson.residentialAddressTitle}
          </HeadingWithDivider>
          <ActionButton
            onClick={() => {
              handleAnalyticsClick('updateClick', { updateSection: RESIDENTIAL_ADDRESS_SECTION_NAME });
              setIsEditing(true);
              setModalTitle(modalTitle);
              setSectionType(RESIDENTIAL_ADDRESS_SECTION_NAME);
            }}
            icon="edit"
          />
        </HeadingWithButtonWrapper>
        {isResidentialMailingAddressSame && <SubHeading>{addressDetailsJson.residentialAddressSubTitle}</SubHeading>}
        <DataList
          data={data}
          shouldHideEmptyValues={isLoading}
        />
      </AddressSection>

      <EditableSectionContainer
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      >
        {isEditing && (
          <ManageAddress
            addressDetailsJson={addressDetailsJson}
            errorPagePath={errorPagePath}
            handleFormSubmit={handleFormSubmit}
            initialData={initialData}
            isResidentialMailingAddressSame={isResidentialMailingAddressSame}
            hasQuestApiError={hasQuestApiError}
            setQuestDeleteOrPutApiError={setQuestDeleteOrPutApiError}
          >
            {/* PUT OR DELETE quest api error message  */}
            {hasQuestApiError && <InPageAnnouncement text={questApiErrorMessage} />}

            <EditableSectionActions
              cancelLabel={'cancel'}
              saveLabel={'save changes'}
              handleOnClickCancel={() => {
                setIsEditing(false);
              }}
              isLoading={isLoading}
            />
          </ManageAddress>
        )}
      </EditableSectionContainer>
    </>
  );
};

export default ResidentialAddress;
