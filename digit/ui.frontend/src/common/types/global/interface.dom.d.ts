interface Document {
  documentMode: unknown;
}

interface Window {
  _satellite: any;
  CQ: AEM.CQ;
  digitalData: AEM.DigitalData;
}
