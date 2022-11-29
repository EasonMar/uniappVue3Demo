/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface successcbp {
  phoneNumber: string,
  displayName: string,
  phoneNumberList: string
}

interface wxobj {
  success(params: successcbp): any,
  fail?(params: any): any,
  complete?(params: any): any
}

declare namespace wx {
  function chooseContact(obj: wxobj): any
}


// vk-uview-ui 声明
declare module 'vk-uview-ui';