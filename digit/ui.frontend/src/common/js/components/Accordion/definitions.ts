export type AccordionProps = {
  attributes?: any;
  index?: any;
  targetFAQIndex?: undefined | number;
  setTargetFAQIndex?: Function;
};

export type AccordionParsedProps = {
  title?: string;
  description?: string;
};

export interface AccordionStylingProps {
  isActive?: boolean;
}
