export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> &
  React.DOMAttributes<HTMLInputElement | HTMLTextAreaElement> & {
    hasError?: boolean;
    name: string;
    textArea?: boolean;
    type?: 'text' | 'hidden';
    breakWord?: boolean;
    isExtraSpacing?: boolean;
  };

export interface TextInputStylingProps {
  hasError?: boolean;
}
