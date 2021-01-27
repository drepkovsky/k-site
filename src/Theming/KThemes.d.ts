export interface KTheme {
    colors: {
        [key: string]: string;
    };
    font: string;
    weights: {
        [key: string]: number;
    };
    radius: string;
}
export declare const useTheme: () => {
    theme: KTheme;
    getTheme: (accentColor: string, optionalColors: {
        [key: string]: string;
    }) => KTheme;
    setMainTheme: (accentColor: string, optionalColors: {
        [key: string]: string;
    }) => KTheme;
    getFonts: () => string[];
};
export declare const getColor: (color?: string | undefined, theme?: KTheme | undefined) => string;
export declare const getLowerColor: (color?: string | undefined, theme?: KTheme | undefined) => string | undefined;
export declare const getHigherColor: (color?: string | undefined, theme?: KTheme | undefined) => string | undefined;
export declare const getFontWeight: (weightName: string | number, theme: KTheme) => string | number;
