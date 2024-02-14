export type SearchFieldProps = React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> &
  React.DOMAttributes<HTMLInputElement | HTMLTextAreaElement> & {
    name: string;
    type?: 'text';
    breakWord?: boolean;
    isExtraSpacing?: boolean;
    value: string;
    setFieldValue: Function;
  };
