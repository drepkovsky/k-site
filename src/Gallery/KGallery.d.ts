import { FC } from "react";
import { KStatefulComponentProps } from "../Theming/KStyles";
import { GalleryImage } from "./KGallerySlider";
interface KGalleryProps {
    images: GalleryImage[];
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    imageProps?: KStatefulComponentProps;
    animateImages?: boolean;
    loadBuffer?: number;
    maxImgHeight?: number;
}
declare const KGallery: FC<KGalleryProps>;
export default KGallery;
