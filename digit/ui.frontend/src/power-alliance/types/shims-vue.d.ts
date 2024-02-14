/// <reference types="vue/macros-global" />

declare module '*.vue' {
  import { DefineComponent } from 'vue';

  const component: DefineComponent;
  export default component;
}
