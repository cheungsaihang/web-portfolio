import { ExtendTheme } from "@pigment-css/react/theme";

declare module "@pigment-css/react/theme" {
  interface ThemeTokens {
    colorSchemes:{
      light:object;
      dark:{
        colors:{
          background:string;
          foreground:string;
          journeySection:string;
          menuTagActive:string;
        }
      };
    };
    colors:{
      background:string;
      foreground:string;
      menuBackground:string;
      layoutBorder:string;
      icon:string;
      breadcrumb:string;
      breadcrumbText:string;
      skeleton:string;
      journeySection:string;
      drawerLink:string;
      tagText:string;
      rate:string;
      menuTag:string;
      menuTagHover:string;
      menuTagActive:string;
      button:string;
      buttonBlur:string;
      buttonSecond:string;
      buttonSecondBlur:string;
      errorText:string;
    };
    sizes:{
      fonts:{
        icon:string;
        iconSmaller:string;
        gridTitle:string;
      },
      spacing:{
        mainInner:string;
      }
    };
    media:{
      screenXS:string;
      screenS:string;
      screenM:string;
      screenL:string;
    };
  }

  interface ThemeArgs {
    theme: ExtendTheme<{
      colorScheme: "light" | "dark";
      tokens: ThemeTokens;
    }>;
    [variant:string]: boolean | string | number | undefined;
  }
}