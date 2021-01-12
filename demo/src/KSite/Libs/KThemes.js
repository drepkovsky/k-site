import { useEffect, useState } from "react";
import _ from "lodash";
import { isHex } from "./KColorPalette";
import { connect } from "react-redux";

import themesJSON from "../themes.json";

export const useTheme = (props) => {
  const themes = themesJSON;
  const [theme, setTheme] = useState(themes.default);

  const getFonts = () => {
    const allFonts = _.values(_.mapValues(themes, "font"));
    return allFonts;
  };

  const mergeThemes = (addThemes) => {
    Object.keys(addThemes).map((key) => {
      Object.assign(themes, addThemes[key]);
    });
    return themes;
  };

  const setCurrentTheme = (themeName) => {
    if (themes[themeName]) setTheme(themes[themeName]);
    else console.warn(themeName + " is not a valid theme name");
  };

  return { theme, setCurrentTheme, getFonts, mergeThemes };
};

export const getColorFromTheme = (
  theme = themesJSON.default,
  color,
  fallback = "#111"
) => {
  console.log(color);
  console.log(theme);
  console.log(theme.colors[color]);

  return theme.colors[color] || isHex(color) ? color : fallback;
};
