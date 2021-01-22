import { useEffect, useState } from "react";
import _, { map } from "lodash";
import { colorAlpha, getContrast, isHex } from "./KColorPalette";
import { css } from "styled-components";
import themesJSON from "../themes.json";
import colorPallete from "./colors.json";
import { bootstrapQuery } from "./KLib";

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

/**
 *
 * @param {Object} theme
 * @param {String} color
 */
export const getColor = (color, theme = themesJSON.default.id, fallback) => {
  if (color) {
    const tmp = color.split("-");
    if (tmp.length > 1) {
      return colorPallete[tmp[0]] ? colorPallete[tmp[0]][tmp[1]] : color;
    }
    return theme.colors[tmp[0]]
      ? theme.colors[tmp[0]]
      : colorPallete[tmp[0]]
      ? colorPallete[tmp[0]][500]
        ? colorPallete[tmp[0]][500]
        : colorPallete[tmp[0]]
      : fallback
      ? fallback
      : color;
  }
  return "";
};
export const getFontWeight = (weightName, theme = themesJSON.default) => {
  return theme.weights[weightName] ? theme.weights[weightName] : 500;
};
