///returns a contrasted black or white color
export function getContrast(hex) {
  hex = fixHex(hex);

  var r = parseInt(hex.substr(1, 2), 16),
    g = parseInt(hex.substr(3, 2), 16),
    b = parseInt(hex.substr(5, 2), 16),
    yiq = (r * 299 + g * 587 + b * 114) / 1000;

  return yiq >= 128 ? "#000000" : "#ffffff";
}

/**
 *
 * @param {String} hex
 * @param {Number} t - range (0,1)
 * returns returns a color interpolated to its contrast color
 * #ffffff or #000000 by a
 */
export function leanToContrast(hex, t) {
  return lerpColor(hex, getContrast(hex), t);
}

export function colorAlpha(hex, a) {
  return fixHex(hex) + Math.floor(a * 255).toString(16);
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

//if hex is consited only of 3 numbers, this converts it to 6
export function fixHex(hex) {
  if (hex.length == 4) {
    var h = "#";
    for (let i = 1; i < hex.length; i++) {
      h += hex[i] + "" + hex[i];
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

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
