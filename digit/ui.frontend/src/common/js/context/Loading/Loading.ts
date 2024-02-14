import create from 'zustand';

import { LoadingData } from './definitions';

export const loadingStore = create<LoadingData>((set) => ({
  pageComponents: [],
  addToPageComponents: (components: string[]) =>
    set((state) => ({
      ...state,
      pageComponents: components,
    })),
  isLoading: true,
  setLoading: (isLoading: boolean) =>
    set((state) => ({
      ...state,
      isLoading,
    })),
}));
