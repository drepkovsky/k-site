//returns a completely random color
export function getRandomColor(alpha) {
  const letters = "0123456789abcdef";

  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters.charAt(Math.floor(Math.random() * letters.length - 1));
  }

  if (alpha) {
    alpha = Math.max(alpha, 0);
    alpha = Math.min(alpha, 255);
    color += alpha.toString(16);
  }

  return color;
}

//returns a random color with a centered lightning parameter
export function getRandomCenteredColor() {
  const hsl = rgbToHSL(getRandomColor());
  hsl.l = 0.5;
  return hslToRGB(hsl);
}

export function getClickedColor(color) {
  return getMonochromaticPalette(color)[2];
}

//returns and array of five colors, your color is in the middle (colors[2])
export function getMonochromaticPalette(color) {
  const colors = [];

  colors.push(changeLightness(color, -0.2));
  colors.push(changeLightness(color, -0.1));
  colors.push(color);
  colors.push(changeLightness(color, 0.1));
  colors.push(changeLightness(color, 0.2));

  return colors;
}

function changeHue(rgb, degree) {
  var hsl = rgbToHSL(rgb);
  hsl.h += degree;
  if (hsl.h > 360) {
    hsl.h -= 360;
  } else if (hsl.h < 0) {
    hsl.h += 360;
  }
  return hslToRGB(hsl);
}

function changeLightness(rgb, degree) {
  var hsl = rgbToHSL(rgb);
  hsl.l += degree;
  if (hsl.l > 1) {
    hsl.l -= 1;
  } else if (hsl.s < 0) {
    hsl.l += 1;
  }
  return hslToRGB(hsl);
}

function changeSaturation(rgb, degree) {
  var hsl = rgbToHSL(rgb);
  hsl.s += degree;
  if (hsl.s > 1) {
    hsl.s -= 1;
  } else if (hsl.s < 0) {
    hsl.s += 1;
  }
  return hslToRGB(hsl);
}

///returns a contrasted black or white color
export function getContrast(hex) {
  var r = parseInt(hex.substr(1, 2), 16),
    g = parseInt(hex.substr(3, 2), 16),
    b = parseInt(hex.substr(5, 2), 16),
    yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#111111" : "#ffffff";
}

/**
 *
 * @param {String} hex
 * @param {Number} t - range (0,1)
 * returns returns a color interpolated to its contrast color
 * #ffffff or #111111 by a
 */
export function leanToContrast(hex, t) {
  return lerpColor(hex, getContrast(hex), t);
}

/**
 *
 * @param {String} color - a string to check if is a valid hex color
 */

export const isHex = (color) => {
  if (color.length == 7 || color.length == 4 || color.length == 5) {
    if (color[0] == "#") {
      for (let i = 1; i < color.length; i++) {
        if (color[i] < 0 || color[i] > "f") return false;
      }
    }
    return true;
  }
};

export function fixHex(hex) {
  if (hex.length == 4) {
    var h = "#";
    for (let i = 1; i < hex.length; i++) {
      h += hex[i];
      h += hex[i];
    }
    return h;
  }
  return hex;
}

/**
 * A linear interpolator for hexadecimal colors
 * @param {String} a
 * @param {String} b
 * @param {Number} t - range (0,1)
 * @example
 * // returns #7F7F7F
 * lerpColor('#000000', '#ffffff', 0.5)
 * @returns {String}
 */

export function lerpColor(a, b, t) {
  a = fixHex(a);
  b = fixHex(b);

  var ah = +a.replace("#", "0x"),
    ar = ah >> 16,
    ag = (ah >> 8) & 0xff,
    ab = ah & 0xff,
    bh = (bh = +b.replace("#", "0x")),
    br = bh >> 16,
    bg = (bh >> 8) & 0xff,
    bb = bh & 0xff,
    rr = ar + t * (br - ar),
    rg = ag + t * (bg - ag),
    rb = ab + t * (bb - ab);

  return (
    "#" + (((1 << 24) + (rr << 16) + (rg << 8) + rb) | 0).toString(16).slice(1)
  );
}

// expects a string and returns an object
function rgbToHSL(rgb) {
  // strip the leading # if it's there
  rgb = rgb.replace(/^\s*#|\s*$/g, "");

  // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
  if (rgb.length == 3) {
    rgb = rgb.replace(/(.)/g, "$1$1");
  }

  var r = parseInt(rgb.substr(0, 2), 16) / 255,
    g = parseInt(rgb.substr(2, 2), 16) / 255,
    b = parseInt(rgb.substr(4, 2), 16) / 255,
    cMax = Math.max(r, g, b),
    cMin = Math.min(r, g, b),
    delta = cMax - cMin,
    l = (cMax + cMin) / 2,
    h = 0,
    s = 0;

  if (delta == 0) {
    h = 0;
  } else if (cMax == r) {
    h = 60 * (((g - b) / delta) % 6);
  } else if (cMax == g) {
    h = 60 * ((b - r) / delta + 2);
  } else {
    h = 60 * ((r - g) / delta + 4);
  }

  if (delta == 0) {
    s = 0;
  } else {
    s = delta / (1 - Math.abs(2 * l - 1));
  }

  return {
    h: h,
    s: s,
    l: l,
  };
}

function hslToRGB(hsl) {
  var h = hsl.h,
    s = hsl.s,
    l = hsl.l,
    c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r,
    g,
    b;

  if (h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  r = normalize_rgb_value(r, m);
  g = normalize_rgb_value(g, m);
  b = normalize_rgb_value(b, m);

  return rgbToHex(r, g, b);
}

function normalize_rgb_value(color, m) {
  color = Math.floor((color + m) * 255);
  if (color < 0) {
    color = 0;
  }
  return color;
}

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
