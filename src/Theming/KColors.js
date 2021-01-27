"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.generate = exports.generateTheme = exports.presetDarkPalettes = exports.presetPalettes = exports.rgba = void 0;
//based on ant-design/ant-design-colors
var tinycolor_1 = require("@ctrl/tinycolor");
var KColorPalette_1 = require("./KColorPalette");
var hueStep = 2;
var saturationStep = 0.16;
var saturationStep2 = 0.05;
var brightnessStep1 = 0.05;
var brightnessStep2 = 0.15;
var lightColorCount = 5;
var darkColorCount = 4;
var colorPalette = {
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
    grey: "#bfbfbf"
};
var functionalMap = {
    success: { color: "green", index: 6 },
    link: { color: "blue", index: 6 },
    warning: { color: "gold", index: 6 },
    error: { color: "red", index: 5 }
};
var neutralMap = {
    title: 0.85,
    text: 0.85,
    textSecondary: 0.45,
    disabled: 0.25,
    border: 0.15,
    divider: 0.06,
    backgroundSecondary: 0.04,
    tableHeader: 0.02
};
function rgba(color, a) {
    return new tinycolor_1.TinyColor(color).setAlpha(a).toHex8String();
}
exports.rgba = rgba;
var darkColorMap = [
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
var presetPalettes = {};
exports.presetPalettes = presetPalettes;
var presetDarkPalettes = {};
exports.presetDarkPalettes = presetDarkPalettes;
function generatePresetsColors(backgroundColor) {
    Object.keys(colorPalette).forEach(function (key) {
        presetPalettes[key] = generate(colorPalette[key]);
        // dark presetPalettes
        presetDarkPalettes[key] = generate(colorPalette[key], {
            isDark: true,
            backgroundColor: backgroundColor || "#141414"
        });
    });
}
function generateTheme(backgroundColor, optionalColors) {
    //generate accent color and contrast
    var bgCol = new tinycolor_1.TinyColor(backgroundColor);
    var contrast = KColorPalette_1.getContrast(bgCol.toHexString());
    //generating neutral colors for given accent
    var neutrals = generateNeutral(bgCol.toHexString(), contrast);
    //generate preset colors for given accent bg
    generatePresetsColors(neutrals.background);
    //generate palette for given accent
    var bgPal = {
        background: generate(backgroundColor, {
            isDark: bgCol.isDark(),
            backgroundColor: neutrals.background
        })
    };
    var functionalCols = {};
    Object.keys(functionalMap).map(function (key) {
        if (bgCol.isDark()) {
            functionalCols[key] =
                presetDarkPalettes[functionalMap[key].color][functionalMap[key].index];
        }
        else {
            functionalCols[key] =
                presetPalettes[functionalMap[key].color][functionalMap[key].index];
        }
    });
    //generating palete for optionalColors
    var optional = {};
    Object.keys(optionalColors).map(function (key) {
        var _a;
        var col = generate(optionalColors[key], {
            isDark: bgCol.isDark(),
            backgroundColor: neutrals.background
        });
        var obj = (_a = {},
            _a[key] = col,
            _a);
        Object.assign(optional, obj);
    });
    var colors = {};
    if (bgCol.isDark()) {
        colors = __assign({}, presetDarkPalettes);
    }
    else {
        colors = __assign({}, presetPalettes);
    }
    colors = __assign(__assign(__assign(__assign(__assign({}, colors), neutrals), functionalCols), optional), bgPal);
    var theme = {};
    Object.keys(colors).map(function (key) {
        var color = colors[key];
        if (Array.isArray(color)) {
            for (var i = 0; i < color.length; i++) {
                var colKey = key + "-" + (i + 1);
                theme[colKey] = color[i];
                if (i == 5)
                    theme[key] = color[i];
            }
        }
        else if (typeof color === "string") {
            theme[key] = color;
        }
    });
    return theme;
}
exports.generateTheme = generateTheme;
function generateNeutral(backgroundColor, contrastColor) {
    var result = {};
    Object.keys(neutralMap).map(function (key) {
        var _a;
        var obj = (_a = {},
            _a[key] = new tinycolor_1.TinyColor(backgroundColor)
                .mix(contrastColor, neutralMap[key] * 100)
                .toHexString(),
            _a);
        Object.assign(result, obj);
    });
    return result;
}
function getHue(hsv, i, light) {
    if (light === void 0) { light = true; }
    var hue;
    if (Math.round(hsv.h) >= 60 && Math.round(hsv.h) <= 240) {
        hue = light
            ? Math.round(hsv.h) - hueStep * i
            : Math.round(hsv.h) + hueStep * i;
    }
    else {
        hue = light
            ? Math.round(hsv.h) + hueStep * i
            : Math.round(hsv.h) - hueStep * i;
    }
    if (hue < 0) {
        hue += 360;
    }
    else if (hue >= 360) {
        hue -= 360;
    }
    return hue;
}
function getSaturation(hsv, i, light) {
    if (light === void 0) { light = true; }
    // grey color don't change saturation
    if (hsv.h === 0 && hsv.s === 0) {
        return hsv.s;
    }
    var saturation;
    if (light) {
        saturation = hsv.s - saturationStep * i;
    }
    else if (i === darkColorCount) {
        saturation = hsv.s + saturationStep;
    }
    else {
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
function getValue(hsv, i, light) {
    if (light === void 0) { light = true; }
    var value;
    if (light) {
        value = hsv.v + brightnessStep1 * i;
    }
    else {
        value = hsv.v - brightnessStep2 * i;
    }
    if (value > 1) {
        value = 1;
    }
    return Number(value.toFixed(2));
}
function generate(color, opts) {
    if (opts === void 0) { opts = {}; }
    var palette = [];
    var newColor = new tinycolor_1.TinyColor(color);
    for (var i = lightColorCount; i > 0; i -= 1) {
        var hsv = newColor.toHsv();
        var colorString = new tinycolor_1.TinyColor({
            h: getHue(hsv, i, true),
            s: getSaturation(hsv, i, true),
            v: getValue(hsv, i, true)
        }).toHexString();
        palette.push(colorString);
    }
    palette.push(newColor.toHexString());
    for (var i = 1; i <= darkColorCount; i += 1) {
        var hsv = newColor.toHsv();
        var colorString = new tinycolor_1.TinyColor({
            h: getHue(hsv, i, false),
            s: getSaturation(hsv, i, false),
            v: getValue(hsv, i, false)
        }).toHexString();
        palette.push(colorString);
    }
    // dark theme patterns
    if (opts.isDark) {
        return darkColorMap.map(function (_a) {
            var index = _a.index, opacity = _a.opacity;
            var darkColorString = new tinycolor_1.TinyColor(opts.backgroundColor || "#141414")
                .mix(palette[index], opacity * 100)
                .toHexString();
            return darkColorString;
        });
    }
    return palette;
}
exports.generate = generate;
