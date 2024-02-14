import { oneOfType, arrayOf, node, func /* number, shape, string */ } from 'prop-types';

export const ChildrenPropTypes = oneOfType([arrayOf(node), node, func]).isRequired;

declare let require: {
  <T>(path: string): T;
  (paths: string[], callback: (...modules: any[]) => void): void;
  ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};

declare let BASE_URL: string;

export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;
