export const ContentPath = (url: string) => {
  if (!url) {
    return false;
  }

  return url?.includes('/content') && !url?.includes('/dam') ? true : false;
};
