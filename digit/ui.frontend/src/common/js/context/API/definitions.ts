export type ApiData = {
  apiKey: string | null;
  setApiKey: (apiKey: string | null) => void;
  signature: string | null;
  setSignature: (signature: string | null) => void;
};
