import { isAuthorMode } from '@/utility/aem';

export const apiErrorRedirect = (url: string) => {
  // Error redirecting disabled in Author Mode
  if (!url || isAuthorMode()) return;

  window.location.href = url;
};
