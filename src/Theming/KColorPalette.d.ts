export function getContrast(hex: any): "#000000" | "#ffffff";
/**
 *
 * @param {String} hex
 * @param {Number} t - range (0,1)
 * returns returns a color interpolated to its contrast color
 * #ffffff or #000000 by a
 */
export function leanToContrast(hex: string, t: number): string;
export function colorAlpha(hex: any, a: any): string;
export function fixHex(hex: any): any;
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
export function lerpColor(a: string, b: string, t: number): string;
export function isHex(color: string): boolean | undefined;
