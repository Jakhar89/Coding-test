import create from 'zustand';

import { ErrorMessageData } from './definitions';

export const errorMessageStore = create<ErrorMessageData>((set) => ({
  errorMessage: null,
  setErrorMessage: (errorMessage) =>
    set((state) => ({
      ...state,
      errorMessage,
    })),
}));
