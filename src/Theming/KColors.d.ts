interface RGB {
    r: number;
    g: number;
    b: number;
}
declare function rgba(color: RGB | string, a: number): string;
interface PresetPalette {
    [key: string]: string[];
}
declare const presetPalettes: PresetPalette;
declare const presetDarkPalettes: PresetPalette;
declare function generateTheme(backgroundColor: string, optionalColors: {
    [key: string]: string;
}): {
    [key: string]: string;
};
interface Opts {
    isDark?: boolean;
    backgroundColor?: string;
}
declare function generate(color: string, opts?: Opts): string[];
export { rgba, presetPalettes, presetDarkPalettes, generateTheme, generate };
