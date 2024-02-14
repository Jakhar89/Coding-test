export interface Icon {
  category: string;
  class: string;
  prefix: string;
  refName: string;
  suffix: string;
  usable: boolean;
}

export interface CustomIcon extends Icon {
  path: string;
  size: string;
}
