import { Form, Formik, FormikErrors } from 'formik';
import React, { useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';

import { errorMessageStore } from '@/context/ErrorMessage/ErrorMessage';
import { userStore } from '@/context/User/User';
import ActionButton from '@/utility/components/FormElement/ActionButton';
import FormLabel from '@/utility/components/FormElement/Label';
import Radio from '@/utility/components/FormElement/Radio';
import Select from '@/utility/components/FormElement/Select';
import { Field } from '@/utility/components/FormElement/StyledFormSection';
import TextInput from '@/utility/components/FormElement/TextInput';
import InPageAnnouncement from '@/utility/components/InPageAnnouncement';
import ModalOverlay from '@/utility/components/ModalOverlay';
import RichText from '@/utility/components/RichText';
import { emitTrackEvent } from '@/utility/helpers/analytics';
import { getCallAPI, loginFlow, postCallAPI } from '@/utility/helpers/api';
import { API_PROFILE_DATA, SET_LOADING_OBJ } from '@/utility/helpers/constants';
// import { handleClientValidationErrors } from '@/utility/helpers/analytics';
import {
  getAEMErrorMessageByCode,
  questApiErrorMessage,
  validAusMobilePhoneFormat,
} from '@/utility/helpers/validation';

import { enquiries, getComplaintsCategory } from './dataMapping';
import { ContactUsParsedProps, ContactUsProps } from './definitions';
import { ContactUsContainer, FormLabelWrapper, FormUrl, RadioLabel, YourMessageText } from './StyledContactUsForm';

const ContactUsForm: React.FC<ContactUsProps> = ({ attributes, errorSuccessMap }) => {
  const contactUsFormJson: ContactUsParsedProps = JSON.parse(attributes);
  const errorMap = errorSuccessMap?.errorMap;

  const questApiKey = localStorage?.getItem('apiKey') ?? contactUsFormJson?.globalConfig?.questApiKey;
  const baseApiUrl = localStorage?.getItem('baseApiUrl') ?? contactUsFormJson?.globalConfig?.baseApiUrl;

  const { enquiryTypeList } = contactUsFormJson;

  const { apiResponse, addToAPIResponse, selectedContract, setSelectedContract } = userStore();
  const { contractsData, loginInfo, profileData: profileDataApi } = apiResponse || {};

  const [shouldShowModal, setShouldShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState(contactUsFormJson?.successMessageDescription);
  const [isNewHardship, setIsNewHardship] = useState(false);
  const [accountOptions, setAccountOptions]: any[] = useState([]);

  // Get customer profile function
  function getProfileDataFromApi() {
    addToAPIResponse(API_PROFILE_DATA, SET_LOADING_OBJ);

    return getCallAPI('customer-profile', `${baseApiUrl}`, `${questApiKey}`, errorSuccessMap).then((response) => {
      addToAPIResponse(API_PROFILE_DATA, response?.data);
    });
  }

  useEffect(() => {
    if (!loginInfo && baseApiUrl && questApiKey) {
      loginFlow(baseApiUrl, questApiKey, errorSuccessMap, apiResponse, addToAPIResponse, true);
    }
  }, []);

  useEffect(() => {
    if (!profileDataApi) {
      getProfileDataFromApi();
      return;
    }
  }, [loginInfo, profileDataApi]);

  useEffect(() => {
    const options: any[] = [{ label: 'Not applicable', value: null }];
    contractsData?.contracts?.map((contract, index) => {
      const contractId = contract?.customerDomain?.contract?.contractId;
      const vehicleDescription = contract?.vehicleDomain?.vehicleSpecification?.vehicleDescription;

      const option = `${contractId} - ${vehicleDescription}`;

      options.push({
        label: option,
        value: contractId,
      });
    });
    /**Attaching accounts to select box */
    setAccountOptions([...options]);
  }, [contractsData]);

  const { errorMessage, setErrorMessage } = errorMessageStore();

  const contactReasonOptions = enquiryTypeList.map((enquiryType) => {
    return {
      label: enquiryType?.enquiryItem?.trim(),
      value: enquiryType?.enquiryItem?.trim(),
    };
  });

  // validation with error config from AEM
  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        contactReason: Yup.string().required('Please select an enquiry type'),
        contactMessage: Yup.string().required('Please provide the details of your enquiry'),
        contactRelatedTo: Yup.string().when('contactReason', {
          is: (contactReason: string) => {
            return [enquiries.GENERAL_ENQUIRY, enquiries.COMPLAINTS].includes(contactReason?.toLowerCase());
          },
          then: Yup.string().required('Please select what this best relates to'),
        }),
        complainAddressInfo: Yup.string().when('contactReason', {
          is: (contactReason: string) => {
            return contactReason?.toLowerCase() === enquiries.COMPLAINTS;
          },
          then: Yup.string().required(`Please let us know how you'd prefer us to resolve this`),
        }),
      }),
    [],
  );

  // TODO: Post data to api when available
  const handleFormSubmit = (values) => {
    if (!values) return;
    switch (values?.responseMethod.toLowerCase()) {
      case 'email':
        values.preferredPhone = '';
        break;
      case 'phone':
        values.preferredEmail = '';
        break;
      case 'n/a':
        values.preferredPhone = '';
        values.preferredEmail = '';
        break;
      default:
        break;
    }

    let postAPIKey = 'contact-us-enquiry';
    let eventLabel = 'Online Enquiry';
    let harshipFinanceType = ''; // only for Hardship and New/Refinance

    // Remove unwanted data based on enquiry type
    switch (values?.contactReason?.toLowerCase()) {
      case enquiries.GENERAL_ENQUIRY:
        delete values?.financeType;
        delete values?.hardshipType;
        delete values?.complainAddressInfo;
        break;
      case enquiries.COMPLAINTS:
        postAPIKey = 'contact-us-complaints';
        eventLabel = 'Complaints';

        delete values?.financeType;
        delete values?.hardshipType;
        break;
      case enquiries.HARDSHIP:
        harshipFinanceType = values?.hardshipType;

        delete values?.contactRelatedTo;
        delete values?.financeType;
        delete values?.complainAddressInfo;
        break;
      case enquiries.NEW_RE_FINANCE:
        harshipFinanceType = values?.financeType;

        delete values?.contactRelatedTo;
        delete values?.hardshipType;
        delete values?.complainAddressInfo;
        break;
      default:
        delete values?.contactRelatedTo;
        delete values?.financeType;
        delete values?.hardshipType;
        delete values?.complainAddressInfo;
        break;
    }

    postContactFormData(postAPIKey, eventLabel, harshipFinanceType, values);
  };

  const postContactFormData = (postAPIKey, eventLabel, harshipFinanceType, values) => {
    const contactInfo = {
      preferredContactMethod: values?.responseMethod,
      telephoneNumber: values?.preferredPhone,
      emailAddress: values?.preferredEmail,
    };

    const contract = {
      contractId: values?.accountRelatedTo,
    };

    // only for Hardship and New/Refinance
    const enquiryOptions = [
      {
        optionName: harshipFinanceType,
        value: true,
      },
    ];

    let postData: any;

    if (values?.contactReason?.toLowerCase() !== enquiries.COMPLAINTS) {
      postData = {
        customerDomain: {
          contract,
          crmCaseManagement: {
            customerEnquiryEventLabel: eventLabel,
            customerEnquiryType: values?.contactReason,
            customerGeneralEnquirySubType: values?.contactRelatedTo ?? '',
            customerEnquiryDetails: values?.contactMessage,
            ...contactInfo,
            ...(harshipFinanceType && { enquiryOptions }),
          },
        },
      };
    }

    if (values?.contactReason?.toLowerCase() === enquiries.COMPLAINTS) {
      postData = {
        customerDomain: {
          contract,
          idrCaseManagement: {
            complaintEnquiryEventLabel: eventLabel,
            complaintEnquiryType: values?.contactReason,
            complaintsIssueCategory: getComplaintsCategory(values?.contactRelatedTo),
            customerMessage: values?.contactMessage,
            customerPreferredOutcome: values?.complainAddressInfo,
            ...contactInfo,
          },
        },
      };
    }

    const addMethod = {
      setErrorCode: (errorCode) => {
        setIsLoading(false);
        setErrorMessage(errorCode);
      },
      redirect: false,
    };

    setIsLoading(true);

    postCallAPI(postAPIKey, `${baseApiUrl}`, `${questApiKey}`, postData, errorSuccessMap, 'post', addMethod).then(
      (response) => {
        if (response) {
          if (values?.hardshipType === 'ExperienceHardship') {
            setIsNewHardship(true);
            setDescription(contactUsFormJson?.successMessageDescriptionNewHardship);
          } else {
            setIsNewHardship(false);
            setDescription(contactUsFormJson?.successMessageDescription);
          }
          setIsLoading(false);
          setShouldShowModal(true);

          // Track successful submit
          emitTrackEvent({
            name: 'contactUsSubmit',
            data: {
              enquiryType: values?.contactReason,
              enquiryMethod: values?.responseMethod,
            },
          });
        } else {
          throw 'Contact us error';
        }
      },
    );
  };

  let selectedEmail;
  let selectedPhone;

  const emailOptions = profileDataApi?.customerDomain?.contactEmailAddress?.map((emailObj) => {
    if (emailObj?.primaryEmail) {
      selectedEmail = emailObj?.email;
    }
    return {
      label: emailObj?.email,
      value: emailObj?.email,
    };
  });

  const phoneOptions = profileDataApi?.customerDomain?.contactTelephone?.map((phoneObj) => {
    if (phoneObj?.primaryTelephoneNumber) {
      selectedPhone = phoneObj?.telephoneNumber;
    }

    return {
      label: phoneObj?.telephoneNumber,
      value: phoneObj?.telephoneNumber,
    };
  });

  const hardshipLabel = {
    existingHardship: { label: contactUsFormJson?.hardshipRadio1, value: 'ExistingHardshipRequest' },
    newHardship: { label: contactUsFormJson?.hardshipRadio2, value: 'ExperienceHardship' },
  };

  const financeOptionLabel = {
    newFinance: { label: contactUsFormJson?.refinanceRadio1, value: 'FinanceQuote' },
    refinance: { label: contactUsFormJson?.refinanceRadio2, value: 'Refinance' },
  };

  const getContactRelatedToOptions = (contactReason) => {
    if (contactReason.toLowerCase() === enquiries.GENERAL_ENQUIRY) {
      return contactUsFormJson?.generalRelatesToList?.map((item) => {
        return {
          label: item?.generalRelatesItem,
          value: item?.generalRelatesItem,
        };
      });
    }

    if (contactReason.toLowerCase() === enquiries.COMPLAINTS) {
      return contactUsFormJson?.complaintRelatesToList?.map((item) => {
        return {
          label: item?.complaintRelatesItem,
          value: item?.complaintRelatesItem,
        };
      });
    }

    return [];
  };

  const getYourMessageText = (contactReason) => {
    let selectedText = '';

    switch (contactReason) {
      case enquiries.COMPLAINTS:
        selectedText = contactUsFormJson?.yourMessageComplaintDisclaimer ?? '';
        break;
      case enquiries.HARDSHIP:
        selectedText = contactUsFormJson?.yourMessageHardshipDisclaimer ?? '';
        break;
      case enquiries.NEW_RE_FINANCE:
        selectedText = contactUsFormJson?.yourMessageRefinanceDisclaimer ?? '';
        break;
      case enquiries.INSURANCE:
        selectedText = contactUsFormJson?.yourMessageInsuranceDisclaimer ?? '';
        break;
      default:
        selectedText = '';
        break;
    }

    if (!selectedText) return null;

    return <YourMessageText>{selectedText}</YourMessageText>;
  };

  return (
    <ContactUsContainer data-testid="contact-us-form">
      <Formik
        enableReinitialize={true}
        initialValues={{
          contactReason: '',
          accountRelatedTo: '',
          contactMessage: '',
          responseMethod: 'Email',
          preferredEmail: selectedEmail,
          preferredPhone: selectedPhone,
          hardshipType: hardshipLabel?.existingHardship?.value,
          financeType: financeOptionLabel?.newFinance?.value,
          complainAddressInfo: '',
          contactRelatedTo: '',
        }}
        onSubmit={(values, { resetForm }) => {
          handleFormSubmit(values);
          // Reset form on submit
          resetForm();
        }}
        validateOnBlur={true}
        validateOnChange={true}
        validateOnMount={true}
        validationSchema={validationSchema}
      >
        {({ errors, handleBlur, handleChange, resetForm, setFieldValue, values }) => {
          useEffect(() => {
            if (values?.contactReason && errorMessage) {
              setErrorMessage(null);
            }
          }, [values?.contactReason]);

          const prefferedResponseMethodRadio = {
            name: 'responseMethod',
            items: [
              {
                htmlFor: 'emailRadio',
                isChecked: values?.responseMethod?.toLowerCase() === 'email',
                label: contactUsFormJson?.prefferedRadio1,
                onChange: (e) => {
                  setFieldValue('responseMethod', 'Email');
                },
                onBlur: handleBlur,
                value: 'Email',
              },
              {
                htmlFor: 'phoneRadio',
                isChecked: values?.responseMethod?.toLowerCase() === 'phone',
                label: contactUsFormJson?.prefferedRadio2,
                onChange: (e) => {
                  setFieldValue('responseMethod', 'Phone');
                },
                onBlur: handleBlur,
                value: 'Phone',
              },
              {
                htmlFor: 'naRadio',
                isChecked: values?.responseMethod?.toLowerCase() === 'n/a',
                label: contactUsFormJson?.prefferedRadio3,
                onChange: (e) => {
                  setFieldValue('responseMethod', 'N/A');
                },
                onBlur: handleBlur,
                value: 'N/A',
              },
            ],
          };

          const hardshipTypeRadio = {
            name: 'hardshipType',
            items: [
              {
                htmlFor: 'existingHardship',
                isChecked: values?.hardshipType === hardshipLabel?.existingHardship?.value,
                label: hardshipLabel?.existingHardship?.label,
                onChange: (e) => {
                  setFieldValue('hardshipType', hardshipLabel?.existingHardship?.value);
                },
                onBlur: handleBlur,
                value: hardshipLabel?.existingHardship?.value,
              },
              {
                htmlFor: 'newHardship',
                isChecked: values?.hardshipType === hardshipLabel?.newHardship?.value,
                label: hardshipLabel?.newHardship?.label,
                onChange: (e) => {
                  setFieldValue('hardshipType', hardshipLabel?.newHardship?.value);
                },
                onBlur: handleBlur,
                value: hardshipLabel?.newHardship?.value,
              },
            ],
          };

          const financeOptionRadio = {
            name: 'financeType',
            items: [
              {
                htmlFor: 'typeNewFinance',
                isChecked: values?.financeType === financeOptionLabel?.newFinance?.value,
                label: financeOptionLabel?.newFinance?.label,
                onChange: (e) => {
                  setFieldValue('financeType', financeOptionLabel?.newFinance?.value);
                },
                onBlur: handleBlur,
                value: financeOptionLabel?.newFinance?.value,
              },
              {
                htmlFor: 'typeRefinance',
                isChecked: values?.financeType === financeOptionLabel?.refinance?.value,
                label: financeOptionLabel?.refinance?.label,
                onChange: (e) => {
                  setFieldValue('financeType', financeOptionLabel?.refinance?.value);
                },
                onBlur: handleBlur,
                value: financeOptionLabel?.refinance?.value,
              },
            ],
          };

          const updateURLAlert = (e) => {
            if (
              !confirm(
                'You will be redirected to profile page, and the enquiry form will be cleared. Do you wish to continue?',
              )
            )
              e.preventDefault();
          };

          return (
            <Form>
              <Field>
                <FormLabel htmlFor="contactReason">{contactUsFormJson?.enquiryTypeLabelText}</FormLabel>
                <Select
                  name="contactReason"
                  options={contactReasonOptions}
                  value={values?.['contactReason']}
                  setFieldValue={setFieldValue}
                />
              </Field>

              {[enquiries.GENERAL_ENQUIRY, enquiries.COMPLAINTS].includes(values?.contactReason?.toLowerCase()) && (
                <Field>
                  <FormLabel htmlFor="contactRelatedTo">{contactUsFormJson?.relatesToTextField}</FormLabel>
                  <Select
                    name="contactRelatedTo"
                    options={getContactRelatedToOptions(values?.['contactReason'])}
                    value={values?.['contactRelatedTo']}
                    setFieldValue={setFieldValue}
                  />
                </Field>
              )}

              {values?.contactReason?.toLowerCase() === enquiries.HARDSHIP && (
                <Field>
                  <Radio
                    {...hardshipTypeRadio}
                    isFullWidth={true}
                  />
                </Field>
              )}

              {values?.contactReason?.toLowerCase() === enquiries.NEW_RE_FINANCE && (
                <Field>
                  <Radio
                    {...financeOptionRadio}
                    isFullWidth={true}
                  />
                </Field>
              )}

              <Field>
                <FormLabelWrapper>
                  <FormLabel htmlFor="accountRelatedTo">{contactUsFormJson?.accountsSelectorLabel}</FormLabel>
                  <FormLabel>(Optional)</FormLabel>
                </FormLabelWrapper>
                <Select
                  name="accountRelatedTo"
                  options={accountOptions}
                  value={values?.['accountRelatedTo']}
                  setFieldValue={setFieldValue}
                />
              </Field>

              <Field>
                <FormLabel htmlFor="contactMessage">{contactUsFormJson?.yourMessageLabel}</FormLabel>

                {getYourMessageText(values?.contactReason?.toLowerCase())}
                <TextInput
                  name="contactMessage"
                  type="text"
                  textArea={true}
                  placeholder={contactUsFormJson?.yourMessagePlaceholder ?? ''}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  breakWord={false}
                  value={values?.['contactMessage']}
                  isExtraSpacing={true}
                />
              </Field>

              {values?.contactReason?.toLowerCase() === enquiries.COMPLAINTS && (
                <Field>
                  <FormLabel htmlFor="complainAddressInfo">{contactUsFormJson?.complaintMessageBoxLabel}</FormLabel>
                  <TextInput
                    name="complainAddressInfo"
                    type="text"
                    textArea={true}
                    placeholder={contactUsFormJson?.complaintMessageBoxPlaceholder ?? ''}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    breakWord={false}
                    value={values?.['complainAddressInfo']}
                    isExtraSpacing={true}
                  />
                </Field>
              )}

              <Field>
                <RadioLabel htmlFor="responseMethod">{contactUsFormJson?.prefferedResponseLabel}</RadioLabel>
                <Radio
                  {...prefferedResponseMethodRadio}
                  verticalAlign={false}
                  gridChilds={3}
                />
              </Field>
              {values?.['responseMethod'] === 'Email' && (
                <Field>
                  <FormLabelWrapper>
                    <FormLabel htmlFor="preferredEmail">{contactUsFormJson?.prefferedEmail}</FormLabel>
                    <FormLabel>
                      <FormUrl
                        href={contactUsFormJson?.updateEmailPath}
                        onClick={(e) => updateURLAlert(e)}
                      >
                        {contactUsFormJson?.updateEmail}
                      </FormUrl>
                    </FormLabel>
                  </FormLabelWrapper>

                  <Select
                    name="preferredEmail"
                    options={emailOptions}
                    value={values?.['preferredEmail']}
                    setFieldValue={setFieldValue}
                  />
                </Field>
              )}

              {values?.['responseMethod'] === 'Phone' && (
                <Field>
                  <FormLabelWrapper>
                    <FormLabel htmlFor="preferredPhone">{contactUsFormJson?.prefferedPhone}</FormLabel>
                    <FormLabel>
                      <FormUrl
                        href={contactUsFormJson?.updatePhonePath}
                        onClick={(e) => updateURLAlert(e)}
                      >
                        {contactUsFormJson?.updatePhone}
                      </FormUrl>
                    </FormLabel>
                  </FormLabelWrapper>

                  <Select
                    name="preferredPhone"
                    options={phoneOptions}
                    value={values?.['preferredPhone']}
                    setFieldValue={setFieldValue}
                  />
                </Field>
              )}

              <ActionButton
                aria-label={'SendEnquiry'}
                onClick={(e) => {
                  console.log('errors', errors);
                }}
                type={'submit'}
                disabled={false}
                buttonType={'primary'}
                isLoading={isLoading}
                label={contactUsFormJson?.sendEnquiryButtonText}
              />

              {/* show timeout-type message */}
              {errorMessage && <InPageAnnouncement text={getAEMErrorMessageByCode(errorMessage, errorMap)} />}
            </Form>
          );
        }}
      </Formik>

      {/* THANK YOU MODAL OVERLAY*/}
      <ModalOverlay
        description={<RichText>{description}</RichText>}
        heading={contactUsFormJson?.thankYouText}
        iconName={'receipt-approved'}
        setShouldShowModal={setShouldShowModal}
        setTimer={3000}
        shouldTimeout={isNewHardship ? false : true}
        shouldShowModalOverlay={shouldShowModal}
      />
    </ContactUsContainer>
  );
};

export default ContactUsForm;
