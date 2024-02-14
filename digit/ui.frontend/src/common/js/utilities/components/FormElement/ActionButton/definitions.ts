import { validFunctionalIcons } from '@/utility/components/Icon/definitions';

export type ActionButtonProps = React.HTMLProps<HTMLButtonElement> &
  ActionButtonStyleProps & {
    handleOnClick?: (e) => void;
    icon?: validFunctionalIcons | null;
    label?: string;
  };

export type ActionButtonStyleProps = {
  buttonType?: 'primary' | 'secondary' | 'tertiary' | 'reversed';
  iconType?: validFunctionalIcons | null;
  isLoading?: boolean;
  icon?: validFunctionalIcons | null;
};
