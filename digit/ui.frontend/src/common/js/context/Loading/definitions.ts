export type LoadingData = {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  pageComponents: string[];
  addToPageComponents: (components: string[]) => void;
};
