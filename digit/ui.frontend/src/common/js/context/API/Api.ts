import Cookies from 'js-cookie';
import create from 'zustand';
import { SIGNATURE_COOKIE_NAME } from '@/utility/helpers/api';

import { ApiData } from './definitions';

export const apiStore = create<ApiData>((set) => ({
  apiKey: localStorage.getItem('apiKey'),
  setApiKey: (apiKey) =>
    set((state) => ({
      ...state,
      apiKey,
    })),
  signature: Cookies.get(SIGNATURE_COOKIE_NAME),
  setSignature: (signature) =>
    set((state) => ({
      ...state,
      signature,
    })),
}));
