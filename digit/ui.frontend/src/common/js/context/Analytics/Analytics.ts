import create from 'zustand';

import { AnalyticsData } from './definitions';

export const analyticsStore = create<AnalyticsData>((set) => ({
  errorAPI: undefined,
  errorDetails: undefined,
  errorField: undefined,
  journeyFlow: undefined,
  modalTitle: undefined,
  sectionType: undefined,
  setErrorAPI: (errorAPI) =>
    set((state) => ({
      ...state,
      errorAPI,
    })),
  setErrorDetails: (errorDetails) =>
    set((state) => ({
      ...state,
      errorDetails,
    })),
  setErrorField: (errorField) =>
    set((state) => ({
      ...state,
      errorField,
    })),
  setJourneyFlow: (journeyFlow) =>
    set((state) => ({
      ...state,
      journeyFlow,
    })),
  setModalTitle: (modalTitle) =>
    set((state) => ({
      ...state,
      modalTitle,
    })),
  setSectionType: (sectionType) =>
    set((state) => ({
      ...state,
      sectionType,
    })),
}));
