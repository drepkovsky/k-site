import { FC } from "react";
export interface GalleryImage {
    src: string;
    thumbnailSrc?: string;
    description?: string;
    tags?: string[] | string;
    width?: number;
    height?: number;
}
interface KGallerySliderProps {
    fullscreen?: boolean;
    images: GalleryImage[];
    startIndex: number;
    isOpen?: boolean;
    onClose?: (e?: number) => void;
    onNext?: (e?: number) => void;
    onPrevious?: (e?: number) => void;
    shouldLoadDimensions?: boolean;
    padding?: number;
}
export declare const KGallerySlider: FC<KGallerySliderProps>;
export {};
