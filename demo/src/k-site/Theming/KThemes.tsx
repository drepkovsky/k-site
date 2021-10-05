import { generateTheme } from "./KColors";
import { useState } from "react";
import { TinyColor } from "@ctrl/tinycolor";

const themeDefault: KTheme = {
  colors: {},
  font: "Quicksand, Roboto",
  weights: {
    light: 300,
    "semi-light": 400,
    regular: 500,
    "semi-bold": 600,
    bold: 700,
  },
  radius: "15px",
};

export interface KTheme {
  colors: { [key: string]: string };
  font: string;
  weights: {
    [key: string]: number;
  };
  radius: string;
}

export const getTheme = (
  accentColor = "#131722",
  optionalColors = {}
) => {
  const tmpTheme = themeDefault;
  if (accentColor || optionalColors) 
    tmpTheme.colors = generateTheme(accentColor, optionalColors);
  return tmpTheme;
};



export const getColor = (color?: string, theme?: KTheme) => {
  if (color && theme) {
    return theme.colors[color] ? theme.colors[color] : color;
  } else return "";
};

export const getLowerColor = (color?: string, theme?: KTheme) => {
  if (color) {
    let col = new TinyColor(getColor(color, theme));
    if (theme) {
      return new TinyColor(theme.colors.background).isLight()
        ? col.lighten(10).toHexString()
        : col.darken(10).toHexString();
    }
    return col.isLight()
      ? col.lighten(10).toHexString()
      : col.darken(10).toHexString();
  }
};
export const getHigherColor = (color?: string, theme?: KTheme) => {
  if (color) {
    let col = new TinyColor(getColor(color, theme));
    if (theme) {
      return !new TinyColor(theme.colors.background).isLight()
        ? col.lighten(10).toHexString()
        : col.darken(10).toHexString();
    }
    return !col.isLight()
      ? col.lighten(10).toHexString()
      : col.darken(10).toHexString();
  }
};

export const getFontWeight = (weightName: string | number, theme: KTheme) => {
  return theme.weights[weightName] ? theme.weights[weightName] : weightName;
};
