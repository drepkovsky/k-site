//based on ant-design/ant-design-colors
import { TinyColor } from "@ctrl/tinycolor";
import { getContrast } from "./KColorPalette";

const hueStep = 2;
const saturationStep = 0.16;
const saturationStep2 = 0.05;
const brightnessStep1 = 0.05;
const brightnessStep2 = 0.15;
const lightColorCount = 5;
const darkColorCount = 4;

const colorPalette = {
  red: "#F5222D",
  volcano: "#FA541C",
  orange: "#FA8C16",
  gold: "#FAAD14",
  yellow: "#FADB14",
  lime: "#A0D911",
  green: "#52C41A",
  cyan: "#13C2C2",
  blue: "#1890FF",
  geekblue: "#2F54EB",
  purple: "#722ED1",
  magenta: "#EB2F96",
  grey: "#bfbfbf",
};

const functionalMap = {
  success: { color: "green", index: 6 },
  link: { color: "blue", index: 6 },
  warning: { color: "gold", index: 6 },
  error: { color: "red", index: 5 },
};

const neutralMap = {
  title: 0.85,
  text: 0.85,
  textSecondary: 0.45,
  disabled: 0.25,
  border: 0.15,
  divider: 0.06,
  backgroundSecondary: 0.04,
  tableHeader: 0.02,
};

function rgbaToHex(r, g, b, a) {
  return new TinyColor({ r, g, b, a }).toHex8String();
}
function rgba(color, a) {
  return new TinyColor(color).setAlpha(a).toHex8String();
}

const darkColorMap = [
  { index: 7, opacity: 0.15 },
  { index: 6, opacity: 0.25 },
  { index: 5, opacity: 0.3 },
  { index: 5, opacity: 0.45 },
  { index: 5, opacity: 0.65 },
  { index: 5, opacity: 0.85 },
  { index: 4, opacity: 0.9 },
  { index: 3, opacity: 0.95 },
  { index: 2, opacity: 0.97 },
  { index: 1, opacity: 0.98 },
];

const presetPalettes = {};
const presetDarkPalettes = {};

function generatePresetsColors(backgroundColor) {
  Object.keys(colorPalette).forEach((key) => {
    presetPalettes[key] = generate(colorPalette[key]);
    // dark presetPalettes
    presetDarkPalettes[key] = generate(colorPalette[key], {
      isDark: true,
      backgroundColor: backgroundColor || "#141414",
    });
  });
}

function generateTheme(backgroundColor, optionalColors) {
  //generate accent color and contrast
  const bgCol = new TinyColor(backgroundColor);
  const contrast = getContrast(bgCol.toHexString());

  //generating neutral colors for given accent
  const neutrals = generateNeutral(bgCol, contrast);

  //generate preset colors for given accent bg
  generatePresetsColors(neutrals.background);

  //generate palette for given accent
  const bgPal = {
    background: generate(backgroundColor, bgCol.isDark(), neutrals.background),
  };

  const functionalCols = {};
  Object.keys(functionalMap).map((key) => {
    if (bgCol.isDark()) {
      functionalCols[key] =
        presetDarkPalettes[functionalMap[key].color][functionalMap[key].index];
    } else {
      functionalCols[key] =
        presetPalettes[functionalMap[key].color][functionalMap[key].index];
    }
  });

  //generating palete for optionalColors
  var optional = {};
  Object.keys(optionalColors).map((key) => {
    const col = generate(
      optionalColors[key],
      bgCol.isDark(),
      neutrals.background
    );

    const obj = {
      [key]: col,
    };
    Object.assign(optional, obj);
  });

  var colors = {};
  if (bgCol.isDark()) {
    colors = { ...presetDarkPalettes };
  } else {
    colors = { ...presetPalettes };
  }
  colors = {
    ...colors,
    ...neutrals,
    ...functionalCols,
    ...optional,
    ...bgPal,
  };

  const theme = {};
  Object.keys(colors).map((key) => {
    if (Array.isArray(colors[key])) {
      for (let i = 0; i < colors[key].length; i++) {
        const colKey = `${key}-${i + 1}`;
        theme[colKey] = colors[key][i];

        if (i == 5) {
          theme[key] = colors[key][i];
        }
      }
    } else {
      theme[key] = colors[key];
    }
  });
  return theme;
}

function generateNeutral(backgroundColor, contrast) {
  const result = {};
  Object.keys(neutralMap).map((key) => {
    const obj = {
      [key]: new TinyColor(backgroundColor)
        .mix(contrast, neutralMap[key] * 100)
        .toHexString(),
    };

    Object.assign(result, obj);
  });
  return result;
}

function getHue(hsv, i, light = true) {
  let hue;
  if (Math.round(hsv.h) >= 60 && Math.round(hsv.h) <= 240) {
    hue = light
      ? Math.round(hsv.h) - hueStep * i
      : Math.round(hsv.h) + hueStep * i;
  } else {
    hue = light
      ? Math.round(hsv.h) + hueStep * i
      : Math.round(hsv.h) - hueStep * i;
  }
  if (hue < 0) {
    hue += 360;
  } else if (hue >= 360) {
    hue -= 360;
  }
  return hue;
}

function getSaturation(hsv, i, light = true) {
  // grey color don't change saturation
  if (hsv.h === 0 && hsv.s === 0) {
    return hsv.s;
  }
  let saturation;
  if (light) {
    saturation = hsv.s - saturationStep * i;
  } else if (i === darkColorCount) {
    saturation = hsv.s + saturationStep;
  } else {
    saturation = hsv.s + saturationStep2 * i;
  }
  if (saturation > 1) {
    saturation = 1;
  }
  if (light && i === lightColorCount && saturation > 0.1) {
    saturation = 0.1;
  }
  if (saturation < 0.06) {
    saturation = 0.06;
  }
  return Number(saturation.toFixed(2));
}

function getValue(hsv, i, light = true) {
  let value;
  if (light) {
    value = hsv.v + brightnessStep1 * i;
  } else {
    value = hsv.v - brightnessStep2 * i;
  }
  if (value > 1) {
    value = 1;
  }
  return Number(value.toFixed(2));
}

function generate(color, isDark = false, backgroundColor) {
  const pallete = [];
  const newColor = new TinyColor(color);
  for (let i = lightColorCount; i > 0; i -= 1) {
    const hsv = newColor.toHsv();
    const colorString = new TinyColor({
      h: getHue(hsv, i, true),
      s: getSaturation(hsv, i, true),
      v: getValue(hsv, i, true),
    }).toHexString();
    pallete.push(colorString);
  }

  pallete.push(newColor.toHexString());

  for (let i = 1; i <= darkColorCount; i += 1) {
    const hsv = newColor.toHsv();
    const colorString = new TinyColor({
      h: getHue(hsv, i, false),
      s: getSaturation(hsv, i, false),
      v: getValue(hsv, i, false),
    }).toHexString();
    pallete.push(colorString);
  }

  // dark theme patterns
  if (isDark) {
    return darkColorMap.map(({ index, opacity }) => {
      const darkColorString = new TinyColor(backgroundColor || "#141414")
        .mix(pallete[index], opacity * 100)
        .toHexString();
      return darkColorString;
    });
  }
  return pallete;
}

export {
  rgbaToHex,
  rgba,
  presetPalettes,
  presetDarkPalettes,
  generateTheme,
  generate,
};
