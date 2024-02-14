import { useFormikContext } from 'formik';
import React from 'react';

import { ContentLabel, HeadingWithDividerH3, RadioSection } from '@/utility/components/FormElement/StyledFormSection';
import Radio from '@/utility/components/FormElement/Radio';
import InPageAnnouncement from '@/utility/components/InPageAnnouncement';
import RichText from '@/utility/components/RichText';

import { MarketingAndCommunicationsEditModeProps, MarketingAndCommunicationsValues } from './definitions';

import { No, preferredCorrespondenceTransform, Yes } from './MarketingAndCommunications';

const MarketingAndCommunicationsEditMode: React.FC<MarketingAndCommunicationsEditModeProps> = ({
  correspondenceMethodDescription,
  correspondenceMethodEmail,
  correspondenceMethodPaper,
  hasError,
  marketingAndCommunicationsEditTitle,
  marketingCommunicationsErrorDescription,
  marketingCommunicationsErrorTitle,
  marketingPreferenceDescription,
  marketingPreferenceNo,
  marketingPreferenceYes,
}) => {
  const { handleBlur, setFieldValue, values } = useFormikContext<MarketingAndCommunicationsValues>();

  const marketingPreferenceEditRadio = {
    name: 'customerMarketingPreference',
    items: [
      {
        id: 'marketingPreferenceEditYes',
        isChecked: values?.customerMarketingPreference === Yes,
        label: marketingPreferenceYes,
        onChange: (e) => setFieldValue('customerMarketingPreference', Yes),
        onBlur: handleBlur,
      },
      {
        id: 'marketingPreferenceEditNo',
        isChecked: values?.customerMarketingPreference === No,
        label: marketingPreferenceNo,
        onChange: (e) => setFieldValue('customerMarketingPreference', No),
        onBlur: handleBlur,
      },
    ],
  };

  const correspondenceMethodEditRadio = {
    name: 'customerCorrespondencePreference',
    items: [
      {
        id: 'customerCorrespondenceEditEmail',
        isChecked: values?.customerCorrespondencePreference === preferredCorrespondenceTransform.Email,
        label: correspondenceMethodEmail,
        onChange: (e) => setFieldValue('customerCorrespondencePreference', preferredCorrespondenceTransform.Email),
        onBlur: handleBlur,
      },
      {
        id: 'customerCorrespondenceEditPaper',
        isChecked: values?.customerCorrespondencePreference === preferredCorrespondenceTransform.Letter,
        label: correspondenceMethodPaper,
        onChange: (e) => setFieldValue('customerCorrespondencePreference', preferredCorrespondenceTransform.Letter),
        onBlur: handleBlur,
      },
    ],
  };

  return (
    <>
      <HeadingWithDividerH3>{marketingAndCommunicationsEditTitle}</HeadingWithDividerH3>
      <ContentLabel>
        <RichText>{marketingPreferenceDescription}</RichText>
      </ContentLabel>
      <RadioSection>
        <Radio {...marketingPreferenceEditRadio} />
      </RadioSection>
      <ContentLabel>
        <RichText>{correspondenceMethodDescription}</RichText>
      </ContentLabel>
      <RadioSection>
        <Radio {...correspondenceMethodEditRadio} />
      </RadioSection>
      {hasError && (
        <>
          <InPageAnnouncement
            heading={marketingCommunicationsErrorTitle}
            text={marketingCommunicationsErrorDescription ?? ''}
          />
        </>
      )}
    </>
  );
};

export default MarketingAndCommunicationsEditMode;
