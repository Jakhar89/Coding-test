import type { DataSourceItem, DataSourceOptions } from '@/generator/support/types/datasource';

import { GraniteBaseFields, GraniteField, GraniteFieldMultiField } from '@/generator/support/types/granite';

export type VueGraniteBaseFields = GraniteBaseFields<VueDataSourceItemField>;

export interface VueDataSourceConfigMap {
  name: string;
  mapTo: string;
}

export interface VueDataSourceItemFieldItem {
  label: string;
  value: string;
}

export interface VueDataSourceItemField extends GraniteField {
  /**
   * Does the field value need to be evaluated by the AEM Externalizer service?
   */
  externalizer?: boolean;
  /**
   * When specified, the value provided will map the field value to your custom HTML attribute name.
   */
  mapToAttribute?: string;
  /**
   * Should the field be skipped when processing values as slots and attributes?
   *
   * @default false
   */
  skipOutput?: boolean;
  /**
   * Does the field need to be output as a slot instead of an HTML attribute?
   *
   * **NOTE:** This property is ignored when `skipOutput` is set to `true`.
   */
  slot?: boolean;
}

export interface VueDataSourceItem extends DataSourceItem {
  /**
   * Define a map of _attribute -> configurations_ that will use AEM services to generate outputs.
   */
  configMap?: (string | VueDataSourceConfigMap)[];
  /**
   * List of fields to generate for the Vue component.
   *
   * **NOTE:** Multifields only support one nested level of itself, therefore, this has been limited
   * to ensure it cannot be configured this way.
   */
  fields?: (VueGraniteBaseFields | GraniteFieldMultiField<(VueGraniteBaseFields | GraniteFieldMultiField<VueGraniteBaseFields[]>)[]>)[];
}

export interface VueDataSourceOptions extends DataSourceOptions {
  items: VueDataSourceItem[];
}
