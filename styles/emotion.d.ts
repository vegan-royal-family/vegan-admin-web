import "@emotion/react";
import { string } from "prop-types";
import { theme } from "./theme";

type ThemeTpye = typeof theme;

declare module "@emotion/react" {
  export interface Theme extends ThemeTpye {
    palette: {
      colors: {
        primary: any;
        secondary: any;
        gray: any;
        basic: any;
      };
      status: {
        danger: any;
        success: any;
        warning: any;
        info: any;
      };
    };
    typography: {
      heading1: SerializedStyles;
      heading2: SerializedStyles;
      heading3: SerializedStyles;
      heading4: SerializedStyles;
      heading5: SerializedStyles;
      heading6: SerializedStyles;
      body1: SerializedStyles;
      body2: SerializedStyles;
      body3: SerializedStyles;
      body4: SerializedStyles;
      weightRegular: SerializedStyles;
      weightMedium: SerializedStyles;
      weightBold: SerializedStyles;
    };
  }
}
