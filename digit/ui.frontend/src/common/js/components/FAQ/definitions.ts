export type FAQComponentProps = {
  faqList?: ListProps;
  faqList1?: ListProps;
  faqList2?: ListProps;
  faqList3?: ListProps;
  faqList4?: ListProps;
  faqList5?: ListProps;
  tabNameText1?: string;
  tabNameText2?: string;
  tabNameText3?: string;
  tabNameText4?: string;
  tabNameText5?: string;
};

export type ListProps =
  | Array<{
      title?: string;
      description?: string;
    }>
  | undefined;
