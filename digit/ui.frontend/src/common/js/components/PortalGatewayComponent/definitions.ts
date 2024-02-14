import { AEMErrorMap, GlobalConfigProps } from '@/types/global/aem-definition';

export type PortalGatewayComponentParsedProps = {
  globalConfig?: GlobalConfigProps;
  vehicleRegoNumberLabel?: string;
  surnameLabel?: string;
  vehicleRegoNoPlaceholderText?: string;
  surnamePlaceholderText?: string;
  buttonLabel?: string;
  myPortalAlfaUri?: string;
  myPortalLtUri?: string;
};

export enum PortalGatewaySteps {
  'Hidden-Value-Collector' = 0,
  'Log-In' = 1,
}
