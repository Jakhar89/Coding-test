export type GraniteBaseFields<E = never> =
  | GraniteFieldIntermediate<GraniteFieldCheckbox, E>
  | GraniteFieldIntermediate<GraniteFieldFileUpload, E>
  | GraniteFieldIntermediate<GraniteFieldPathField, E>
  | GraniteFieldIntermediate<GraniteFieldRichText, E>
  | GraniteFieldIntermediate<GraniteFieldSelect, E>
  | GraniteFieldIntermediate<GraniteFieldSet<E>, E>
  | GraniteFieldIntermediate<GraniteFieldSwitch, E>
  | GraniteFieldIntermediate<GraniteFieldTextField, E>
  | GraniteFieldIntermediate<GraniteFieldTextArea, E>;

/**
 * Join the base type `T` with the extended type `E` to create a union type.
 */
export type GraniteFieldIntermediate<T, E> = T & E;

export interface GraniteField {
  /**
   * Indicates if the field is in disabled state.
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * The description of the component.
   */
  fieldDescription?: string;
  /**
   * The label of the component.
   */
  fieldLabel: string;
  /**
   * The name that identifies the field when submitting the form.
   */
  name: string;
  /**
   * Indicates if the field is mandatory to be filled.
   *
   * @default false
   */
  required?: boolean;
  /**
   * The position of the tooltip relative to the field. Only used when fieldDescription is set.
   *
   * @default left
   */
  tooltipPosition?: 'right' | 'left' | 'top' | 'bottom';
  /**
   * The class for the wrapper element.
   */
  wrapperClass?: string;
}

export interface GraniteFieldHints {
  /**
   * `true` to generate the `SlingPostServlet @Delete` hidden input based on the field name.
   * In case of a nested multifield (composite), only the deleteHint of the root multifield will be set.
   *
   * @default true
   * @see http://sling.apache.org/documentation/bundles/manipulating-content-the-slingpostservlet-servlets-post.html#delete
   */
  deleteHint?: boolean;
  /**
   * The value of `SlingPostServlet @TypeHint`.
   *
   * @see http://sling.apache.org/documentation/bundles/manipulating-content-the-slingpostservlet-servlets-post.html#typehint
   */
  typeHint?: string;
}

export interface GraniteFieldCheckbox extends Omit<GraniteField, 'tooltipPosition'>, Pick<GraniteFieldHints, 'deleteHint'> {
  fieldType: 'checkbox';
  /**
   * `true` to pre-check this field, `false` otherwise.
   */
  checked?: boolean;
  /**
   * If `false`, the checked state is based on matching the form values by `name` and `value` properties.
   * Otherwise, the form values are ignored, and the checked state is based on `checked` property specified.
   */
  ignoreData?: boolean;
  /**
   * Shows read-only version even when it is unchecked.
   */
  showEmptyInReadOnly?: boolean;
  /**
   * The text of the checkbox.
   */
  text: string;
  /**
   * The position of the tooltip relative to the field. Only used when fieldDescription is set.
   *
   * @default right
   */
  tooltipPosition?: 'left' | 'right' | 'top' | 'bottom';
  /**
   * The submit value of the field when it is unchecked. It is **recommended** that this property is set.
   */
  uncheckedValue?: string;
  /**
   * The value of the field.
   */
  value: string;
}

export interface GraniteFieldFileUpload extends GraniteField {
  fieldType: 'fileupload';
  /**
   * `true` to upload the files asynchronously.
   *
   * @default false
   */
  async?: boolean;
  /**
   * `true` to make the upload starts automatically once the file is selected.
   *
   * @default false
   */
  autoStart?: boolean;
  /**
   * A hint to the user of what can be entered in the field.
   */
  emptyText?: string;
  /**
   * Visually hide the text. It is **recommended** that every button has a text for a11y purpose.
   * Use this property to hide it visually, while still making it available for a11y.
   */
  hideText?: string;
  /**
   * The icon of the button.
   *
   * @see https://www.adobe.io/experience-manager/reference-materials/6-5/coral-ui/coralui3/Coral.Icon.html#availableIcons
   */
  icon?: string;
  /**
   * The size of the icon.
   */
  iconSize?: 'XS' | 'S' | 'M' | 'L';
  /**
   * The browse and selection filter for file selection.
   *
   * @example
   * image/svg+xml
   * @example
   * [".png",".jpg"]
   * @example
   * ["image/*"]
   */
  mimeTypes?: string | string[];
  /**
   * Indicates if multiple files can be uploaded.
   *
   * @default false
   */
  multiple?: boolean;
  /**
   * The size of the button.
   *
   * @default M
   */
  size?: 'M' | 'L';
  /**
   * The file size limit.
   */
  sizeLimit?: number;
  /**
   * The text of the button.
   */
  text?: number;
  /**
   * The URL to upload the file. This is only required when `autoStart` is `true`.
   */
  uploadUrl?: string;
  /**
   * The variant of the button.
   *
   * @default primary
   */
  variant?: 'primary' | 'warning' | 'quiet' | 'minimal' | 'actionBar';
}

export interface GraniteFieldMultiField<ItemsT> extends GraniteField, GraniteFieldHints {
  fieldType: 'multifield';
  /**
   * `true` to handle the form content value as composite.
   *
   * Composite multifield supports nesting another multifield (composite or not). However,
   * non-composite one doesn't support nesting.
   *
   * @default false
   */
  composite?: boolean;
  /**
   * The actual field of the Multifield. When set, `items` will be mapped to this value in the JCR.
   */
  field?: string;
  /**
   * Child items for the multifield.
   */
  items: ItemsT;
}

export interface GraniteFieldPathField extends GraniteField, Pick<GraniteFieldHints, 'deleteHint'> {
  fieldType: 'pathfield';
  /**
   * A hint to the user of what can be entered in the field.
   */
  emptyText?: string;
  /**
   * The filter applied to suggestion and picker.
   *
   * - folder            (Shows only nt:folder nodes.)
   * - hierarchy         (Shows only nt:hierarchyNode nodes.)
   * - hierarchyNotFile  (Shows only nt:hierarchyNode nodes that are not nt:file.)
   * - nosystem          (Shows non-system nodes: `!node.getName().startsWith("rep:") && !node.getName().equals("jcr:system")`.)
   *
   * @default hierarchyNotFile
   */
  filter: 'folder' | 'hierarchy' | 'hierarchyNotFile' | 'nosystem';
  /**
   * Indicates if the user must only select from the list of given options. If it is not
   * forced, the user can enter arbitrary value.
   *
   * @default false
   */
  forceSelection?: boolean;
  /**
   * Indicates if multiple files can be uploaded.
   *
   * @default false
   */
  multiple?: boolean;
  /**
   * The URI template that returns the picker markup.
   *
   * It supports the following variables:
   *  - value (The value of the first item.)
   */
  pickerSrc?: string;
  /**
   * The path of the root of the pathfield.
   *
   * @default /
   */
  rootPath: string;
  /**
   * The URI template that returns the suggestion markup.
   *
   * It supports the following variables:
   *  - limit   (The limit of the pagination.)
   *  - offset  (The offset of the pagination.)
   *  - query   (The query entered by the user.)
   */
  suggestionSrc?: string;
}

export interface GraniteFieldRichText extends Pick<GraniteField, 'name'> {
  /**
   * TODO: Add toolbar control
   * @see https://experienceleague.adobe.com/docs/experience-manager-64/administering/operations/rich-text-editor.html?lang=en
   */
  fieldType: 'richtext';
  /**
   * Set this to `true` to make RTE toolbar fixed instead of floating.
   */
  useFixedInlineToolbar?: boolean;
}

export interface GraniteFieldSelect extends GraniteField, Pick<GraniteFieldHints, 'deleteHint'> {
  fieldType: 'select';
  /**
   * `true` to also add an empty option; `false` otherwise. Empty option is an option having
   * both value and text equal to empty string.
   *
   * @default false
   */
  emptyOption?: boolean;
  /**
   * A hint to the user of what can be entered in the field.
   */
  emptyText?: string;
  /**
   * `true` to force to be `ignore-freshness` specifically just for this field.
   *
   * This property is useful when you have a newly introduced field in the form, and there is a
   * need to specifically set the default selected item. To set the default selected item, set
   * the selected property of the item as usual.
   *
   * See `nameNotFoundMode` property of [Field](https://www.adobe.io/experience-manager/reference-materials/6-5/granite-ui/api/jcr_root/libs/granite/ui/components/coral/foundation/form/index.html#/libs/granite/ui/components/coral/foundation/form).
   */
  forceIgnoreFreshness?: boolean;
  /**
   * Child items for the select field.
   */
  items: GraniteFieldSelectItem[];
  /**
   * Indicates if the user is able to select multiple selections.
   *
   * @default false
   */
  multiple?: boolean;
  /**
   * `true` to sort the options based on the text, `false` otherwise. It is assumed that the
   * options don’t contain option group.
   *
   * @default false
   */
  ordered?: boolean;
  /**
   * `true` to translate the options, `false` otherwise.
   *
   * @default true
   */
  translateOptions?: boolean;
  /**
   * The variant of the select.
   *
   * @default default
   */
  variant?: 'default' | 'quiet';
}

export interface GraniteFieldSelectItem {
  /**
   * Indicates if the option is in disabled state.
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * The icon of the option.
   */
  icon?: string;
  /**
   * The icon describing the status of the option.
   */
  statusIcon?: string;
  /**
   * The text describing the status. It is **recommended** that it is specified when `statusIcon`
   * is also specified for a11y purpose.
   */
  statusText?: string;
  /**
   * The text describing the status. It is **recommended** that it is specified when `statusIcon`
   * is also specified for a11y purpose.
   */
  statusVariant?: 'error' | 'warning' | 'success' | 'help' | 'info';
  /**
   * The text of the option.
   */
  text: string;
  /**
   * The value of the option.
   */
  value: string;
}

export interface GraniteFieldTextField extends GraniteField {
  fieldType: 'textfield';
  /**
   * Indicates if the value can be automatically completed by the browser.
   *
   * @default off
   * @see Indicates if the value can be automatically completed by the browser.
   */
  autocomplete?: HTMLInputElement['autocomplete'];
  /**
   * The `autofocus` attribute to lets you specify that the field should have input focus
   * when the page loads, unless the user overrides it, for example by typing in a different
   * control. Only one form element in a document can have the `autofocus` attribute.
   *
   * @default false
   */
  autofocus?: boolean;
  /**
   * The maximum number of characters (in Unicode code points) that the user can enter.
   */
  maxlength?: number;
}

export interface GraniteFieldSwitch extends GraniteField, Pick<GraniteFieldHints, 'deleteHint'> {
  fieldType: 'switch';
  /**
   * `true` to pre-check this field, `false` otherwise.
   */
  checked?: boolean;
  /**
   * If `false`, the checked state is based on matching the form values by `name` and `value` properties.
   * Otherwise, the form values are ignored, and the checked state is based on `checked` property specified.
   */
  ignoreData?: boolean;
  /**
   * The submit value of the field when it is unchecked. It is **recommended** that this property is set.
   */
  uncheckedValue?: string;
  /**
   * The value of the field.
   */
  value: string;
}

export interface GraniteFieldTextArea extends GraniteField {
  fieldType: 'textarea';
  /**
   * Indicates if the value can be automatically completed by the browser.
   *
   * @default off
   * @see Indicates if the value can be automatically completed by the browser.
   */
  autocomplete?: HTMLInputElement['autocomplete'];
  /**
   * The `autofocus` attribute to lets you specify that the field should have input focus
   * when the page loads, unless the user overrides it, for example by typing in a different
   * control. Only one form element in a document can have the `autofocus` attribute.
   *
   * @default false
   */
  autofocus?: boolean;
  /**
   * The visible width of the text control, in average character widths.
   */
  cols?: number;
  /**
   * A hint to the user of what can be entered in the field.
   */
  emptyText?: string;
  /**
   * The maximum number of characters (in Unicode code points) that the user can enter.
   */
  maxlength?: number;
  /**
   * Note that since it is implemented using CSS resize property, it may not work for some
   * browsers.
   *
   * @default none
   */
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  /**
   * The number of visible text lines.
   *
   * @default 5
   */
  rows?: number;
  /**
   * The value of the field.
   */
  text: string;
}

export interface GraniteFieldSet<E> {
  fieldType: 'fieldset';
  /**
   * Child items for the fieldset.
   *
   * **NOTE:** Multifields only support one nested level of itself, therefore, this has been limited
   * to ensure it cannot be configured this way.
   */
  items: (GraniteBaseFields<E> | GraniteFieldMultiField<(GraniteBaseFields<E> | GraniteFieldMultiField<GraniteBaseFields<E>[]>)[]>)[];
  /**
   * The legend of the field set.
   */
  'jcr:title': string;
}
