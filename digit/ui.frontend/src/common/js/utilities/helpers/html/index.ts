import {
  API_PROFILE_DATA,
  API_LOGIN_INFO,
  API_ACCOUNTS_DATA,
  API_ACCOUNT_DETAILS,
  API_BORROWERS_DATA,
  API_REPAYMENTS_SUMMARY,
  API_VEHICLE_DETAILS,
  API_BILLING_SCHEDULE_DATA,
  API_REPAYMENT_DATA,
  API_PAYMENT_OPTIONS_DATA,
} from '@/utility/helpers/constants';

// Mapped onload apis per components
export const componentsOnLoadApisMap = {
  Header: [],
  NotificationBanner: [],
  LoadingOverlay: [],
  HeroBanner: [],
  AccountSelector: [API_LOGIN_INFO, API_ACCOUNTS_DATA],
  AccountDetails: [API_LOGIN_INFO, API_REPAYMENTS_SUMMARY, API_BORROWERS_DATA],
  VehicleDetails: [API_LOGIN_INFO, API_ACCOUNTS_DATA, API_VEHICLE_DETAILS],
  Footer: [],
  PaymentSummary: [
    API_LOGIN_INFO,
    API_ACCOUNTS_DATA,
    API_ACCOUNT_DETAILS,
    API_REPAYMENTS_SUMMARY,
    API_BILLING_SCHEDULE_DATA,
  ],
  AnnualInterest: [], // TODO: not yet mapped to API
  BillingSchedule: [API_LOGIN_INFO, API_ACCOUNTS_DATA, API_ACCOUNT_DETAILS, API_BILLING_SCHEDULE_DATA],
  ProfileName: [API_LOGIN_INFO, API_PROFILE_DATA],
  CustomerNumber: [API_LOGIN_INFO, API_PROFILE_DATA],
  AddressDetails: [API_LOGIN_INFO, API_PROFILE_DATA],
  EmailAddress: [API_LOGIN_INFO, API_PROFILE_DATA],
  PhoneNumber: [API_LOGIN_INFO, API_PROFILE_DATA],
  ManagePassword: [],
  MarketingAndCommunications: [API_LOGIN_INFO, API_PROFILE_DATA],
  PaymentMethods: [API_REPAYMENT_DATA, API_PAYMENT_OPTIONS_DATA],
};

// Generate a list of unique react components on the page
export const getReactComponents = () => {
  const reactComponents = [] as string[];

  document.querySelectorAll<HTMLElement>('[react-component]').forEach((rootElement) => {
    const componentName = rootElement.getAttribute('component-name');
    if (componentName && reactComponents.indexOf(componentName) < 0) {
      reactComponents.push(componentName);
    }
  });

  return reactComponents;
};

// Generate a list of Apis required on load for the page
export const getOnloadRequiredAPIsforPage = (pageComponents?: string[] | null) => {
  if (!pageComponents) pageComponents = getReactComponents();

  const apisToLoad = [] as string[];

  pageComponents.map((component) => {
    if (componentsOnLoadApisMap?.[component]?.length) {
      componentsOnLoadApisMap[component].map((api) => {
        if (apisToLoad.indexOf(api) < 0) {
          apisToLoad.push(api);
        }
      });
    }
  });

  return apisToLoad;
};
