import themeJSON from "../theme.json";
import _ from "lodash";
import { generateTheme } from "./KColors";
import { useState } from "react";
import { TinyColor } from "@ctrl/tinycolor";

export const useTheme = () => {
  const [theme, setTheme] = useState(themeJSON);

  const getFonts = () => {
    const allFonts = theme.font.split(", ");
    for (let i = 0; i < allFonts.length; i++) {
      allFonts[i] += ":";
      Object.keys(theme.weights).map((key, index) => {
        allFonts[i] += theme.weights[key];
        if (index < Object.keys(theme.weights).length - 1) allFonts[i] += ",";
      });
      console.log(allFonts[i]);
    }
    console.log(allFonts);
    return allFonts;
  };

  const getTheme = (accentColor, optionalColors) => {
    if (accentColor || optionalColors) {
      const tmpTheme = themeJSON;
      tmpTheme.colors = generateTheme(accentColor, optionalColors);
      return tmpTheme;
    } else return theme;
  };

  const setMainTheme = (accentColor, optionalColors) => {
    const tmpTheme = getTheme(accentColor, optionalColors);
    setTheme(tmpTheme);
    return tmpTheme;
  };

  return { theme, getTheme, setMainTheme, getFonts };
};

/**
 * @param {Object} theme
 * @param {String} color
 */
export const getColor = (color, theme) => {
  if (color) {
    return theme.colors[color] ? theme.colors[color] : color;
  } else return "";
};

export const getLowerColor = (color, theme) => {
  if (color) {
    let col = new TinyColor(color);
    if (theme) {
      return new TinyColor(theme.colors.background).isLight()
        ? col.lighten(10)
        : col.darken(10);
    }
    return col.isLight() ? col.lighten(10) : col.darken(10);
  }
};
export const getHigherColor = (color, theme) => {
  if (color) {
    let col = new TinyColor(color);
    if (theme) {
      return !new TinyColor(theme.colors.background).isLight()
        ? col.lighten(10)
        : col.darken(10);
    }
    return !col.isLight() ? col.lighten(10) : col.darken(10);
  }
};

export const getFontWeight = (weightName, theme) => {
  return theme.weights[weightName] ? theme.weights[weightName] : 500;
};
