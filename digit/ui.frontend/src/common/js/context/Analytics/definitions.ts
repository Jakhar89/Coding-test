import { SectionType } from '@/utility/helpers/analytics/definitions';

export type APIType = 'Forgerock' | 'Quest';

export type AnalyticsData = {
  errorAPI?: APIType;
  errorDetails?: string;
  errorField?: string;
  journeyFlow?: string;
  modalTitle?: string;
  sectionType?: SectionType;
  setErrorAPI: (errorAPI?: APIType) => void;
  setErrorDetails: (errorDetails?: string) => void;
  setErrorField: (errorField?: string) => void;
  setJourneyFlow: (journeyFlow?: string) => void;
  setModalTitle: (modalTitle?: string | undefined) => void;
  setSectionType: (sectionType?: SectionType | undefined) => void;
};
