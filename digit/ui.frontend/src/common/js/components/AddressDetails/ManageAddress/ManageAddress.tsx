import { Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';

import { analyticsStore } from '@/context/Analytics/Analytics';

import { Field, HeadingWithDividerH3 } from '@/utility/components/FormElement/StyledFormSection';
import { Tabs, TabList, Tab, TabPanel } from '@/components/Tabs/StyledTabList';
import Checkbox from '@/utility/components/FormElement/Checkbox';
import { addressDetailsValidationSchema } from '../addressValidationSchema';
import PostalAddress from '../PostOfficeBox';
import StreetAddress from '../StreetAddress';
import { handleAnalyticsClick } from '@/utility/helpers/analytics';

const ManageAddress = ({
  addressDetailsJson,
  children,
  errorPagePath,
  handleFormSubmit,
  initialData,
  isResidentialMailingAddressSame,
  hasQuestApiError,
  setQuestDeleteOrPutApiError,
}) => {
  const questApiKey = localStorage?.getItem('apiKey') ?? addressDetailsJson?.globalConfig?.questApiKey;
  const [showManualResidentialAddress, setShowManualResidentialAddress] = useState<boolean | null>(null);
  const [showManualMailingAddress, setShowManualMailingAddress] = useState<boolean | null>(null);
  const [localDigitalData, setLocalDigitalData] = useState({});
  const usePoBoxAsMailingAddress = useRef<boolean | null>(null);

  const sectionType = analyticsStore((state) => state.sectionType);

  // Reset quest api error once update address modal closed
  useEffect(() => {
    return () => {
      if (hasQuestApiError) {
        setQuestDeleteOrPutApiError(false);
      }
    };
  });

  const handleAnalyticsOnSubmit = () => {
    const analyticsData = {
      mailingAddressSameAsResidential: isResidentialMailingAddressSame ? 'Yes' : 'No',
      mailingAddressInput: !showManualMailingAddress ? 'Look up' : 'Manual',
      residentialAddressInput: !showManualResidentialAddress ? 'Look up' : 'Manual',
      mailingAddressType: usePoBoxAsMailingAddress?.current ? 'Post office box' : 'Street type',
    };

    setLocalDigitalData((localDigitalData) => ({
      ...localDigitalData,
      ...analyticsData,
    }));

    // assign to const as `handleAnalyticsClick` fn firing before `setLocalDigitalData` action completed
    const updatedAnalyticsData = {
      ...localDigitalData,
      ...analyticsData,
    };

    handleAnalyticsClick('updateSuccess', {
      updateSuccessSection: sectionType ?? undefined,
      ...(updatedAnalyticsData as Record<string, unknown>),
    });

    // clear store local digital data once analytics click has dispatch
    setLocalDigitalData({});
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialData}
        onSubmit={(values) => {
          handleFormSubmit(values);
          handleAnalyticsOnSubmit();
        }}
        validationSchema={addressDetailsValidationSchema}
        validateOnBlur={true}
        validateOnChange={true}
        validateOnMount={false}
      >
        {({ errors, handleBlur, handleChange, setFieldError, setFieldValue, touched, values }) => {
          const mailSameAsResidential = {
            isChecked: !!values?.copyAddressTo,
            label: 'Mailing address is the same as above',
            name: 'copyAddressTo',
            onBlur: handleBlur,
            onChange: handleChange,
          };

          // copy residential to mailing when checkbox ticked
          useEffect(() => {
            setFieldValue('mailing', values?.copyAddressTo ? values?.residential : initialData?.mailing);
          }, [values?.copyAddressTo]);

          useEffect(() => {
            setFieldValue('residential-useNonStandardAddress', showManualResidentialAddress ? false : true);
          }, [showManualResidentialAddress]);

          useEffect(() => {
            setFieldValue('mailing-useNonStandardAddress', showManualMailingAddress || values?.isPoBox ? false : true);
          }, [showManualMailingAddress, values?.isPoBox]);

          return (
            <Form>
              <HeadingWithDividerH3 marginBottomSize={'micro2'}>Residential address</HeadingWithDividerH3>

              <Field marginBottomSize={'macro2'}>
                <StreetAddress
                  addressDetailsJson={addressDetailsJson}
                  initialData={initialData}
                  addressType={'residential'}
                  errorPagePath={errorPagePath}
                  questApiKey={questApiKey}
                  setShowManualMailingAddress={setShowManualMailingAddress}
                  setShowManualResidentialAddress={setShowManualResidentialAddress}
                />

                <Checkbox {...mailSameAsResidential} />
              </Field>

              {!values?.copyAddressTo && (
                <>
                  <HeadingWithDividerH3 marginBottomSize={'micro2'}>Mailing address</HeadingWithDividerH3>

                  <Tabs
                    defaultIndex={initialData?.isPoBox ? 1 : 0}
                    selectedTabClassName="is-selected"
                    selectedTabPanelClassName="is-selected"
                  >
                    <TabList>
                      <Tab
                        onClick={() => {
                          setFieldValue('isPoBox', false);
                          usePoBoxAsMailingAddress.current = false;
                        }}
                      >
                        Street address
                      </Tab>
                      <Tab
                        onClick={() => {
                          setFieldValue('isPoBox', true);
                          usePoBoxAsMailingAddress.current = true;
                        }}
                      >
                        Post office box
                      </Tab>
                    </TabList>
                    <TabPanel>
                      <StreetAddress
                        addressDetailsJson={addressDetailsJson}
                        initialData={initialData}
                        addressType={'mailing'}
                        errorPagePath={errorPagePath}
                        questApiKey={questApiKey}
                        setShowManualMailingAddress={setShowManualMailingAddress}
                        setShowManualResidentialAddress={setShowManualResidentialAddress}
                      />
                    </TabPanel>
                    <TabPanel>
                      <PostalAddress addressDetailsJson={addressDetailsJson} />
                    </TabPanel>
                  </Tabs>
                </>
              )}
              <>{children}</>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default ManageAddress;
