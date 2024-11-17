

import type { CSSProp } from "styled-components/native";
import { Theme } from "native-design-system";


declare module "styled-components/native" {
  export interface DefaultTheme extends Theme {}
}

declare module "react" {
  interface DOMAttributes<T> {
    css?: CSSProp;
  }
}