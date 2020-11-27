import { Theme, SxStyleProp } from "theme-ui";
import presetTheme from "./presets";
import myVariants from "./variants";

export type variantsType = Record<string, Record<string, SxStyleProp>>;

const theme: Theme = {
  ...presetTheme,
  colors: {
    ...presetTheme.colors,
  },
  // eslint-disable-next-line
  // @ts-ignore
  styles: {
    ...presetTheme.styles,
  },
};

export default { ...theme, ...myVariants };
