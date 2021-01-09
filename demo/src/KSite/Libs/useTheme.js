import { useEffect, useState } from "react";
import themesJSON from "../themes.json";
import _ from "lodash";

export const useTheme = (themeKey = "default") => {
  const themes = themesJSON;
  const [theme, setTheme] = useState(themes[themeKey]);

  const getFonts = () => {
    const allFonts = _.values(_.mapValues(themes, "font"));
    return allFonts;
  };

  return { theme, getFonts };
};
