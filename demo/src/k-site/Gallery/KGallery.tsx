//// EXTERNAL ////

// React
import React, { Fragment, useState, useEffect, useRef, FC } from "react";

// Reactstrap
import KIcon from "../Atoms/KIcon";

//// INTERNAL ////
import { getBootstrapSizes, KStatefulComponentProps } from "../Theming/KStyles";
import { KGallerySlider, GalleryImage } from "./KGallerySlider";
import KAnimation from "../Atoms/KAnimation";
import { KLazyImage } from "../Atoms/KImage";
import { KCol, KRow } from "../Atoms/KGrid";
import { Div } from "../Atoms/KComponent";
import KContainer from "../Atoms/KContainer";
import KButton from "../Atoms/KButton";

////// COMPONENT //////
const defaultSizes = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 3,
  xl: 3,
};

export interface KGalleryProps {
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

const KGallery: FC<KGalleryProps> = (props) => {
  //props
  const {
    images,
    xs,
    sm,
    md,
    lg,
    xl,
    maxImgHeight = 400,
    loadBuffer = 20,
    animateImages = true,
  } = props;
  //states
  const [galleryWidth, setGalleryWidth] = useState(0);
  const [imageLimit, setImageLimit] = useState(loadBuffer);
  const [isSliderOpen, setSliderOpen] = useState(false);
  const [clickedImageIndex, setClickedImageIndex] = useState(0);
  //consts
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //size init
    getGallerySize();
    window.addEventListener("resize", () => {
      getGallerySize();
    });
  }, [images]);

  const getGallerySize = () => {
    if (galleryRef.current) setGalleryWidth(galleryRef.current.offsetWidth);
  };

  //init cols count according to gallery size
  const sizes = getBootstrapSizes(galleryWidth);

  var cols = sizes.xl
    ? defaultSizes.xl
    : sizes.lg
    ? defaultSizes.lg
    : sizes.md
    ? defaultSizes.md
    : sizes.sm
    ? defaultSizes.sm
    : defaultSizes.xs;

  if (xs) cols = sizes.xs ? xs : cols;
  if (sm) cols = sizes.sm ? sm : cols;
  if (md) cols = sizes.md ? md : cols;
  if (lg) cols = sizes.lg ? lg : cols;
  if (xl) cols = sizes.xl ? xl : cols;

  //wanted width of each image in the gallery

  //grid images of gallery

  const renderImage = (image: GalleryImage, index: number) => {
    return (
      <KLazyImage
        alt={image.description}
        w="100"
        maxW="100"
        transition="all 0.1s ease-in-out"
        opacity="1"
        objFit="cover"
        src={image.thumbnailSrc || image.src}
        maxH={`${maxImgHeight}`}
        hover={{
          opacity: "0.6",
          cursor: "pointer",
        }}
        onClick={() => {
          setClickedImageIndex(index);
          setSliderOpen(true);
        }}
      />
    );
  };

  const bodyImgs = () => {
    return images.map((image, index) => {
      if (index < imageLimit) {
        return (
          <Div py="0.75" key={index}>
            {animateImages ? (
              <KAnimation anim={["fadeIn 0.5s ease", "up 0.5s ease"]}>
                {renderImage(image, index)}
              </KAnimation>
            ) : (
              renderImage(image, index)
            )}
          </Div>
        );
      }
    });
  };

  //prevents multiple drawing glitches
  const body = bodyImgs();
  let imgCounter = 0;

  const columns: any[] = [];

  for (var i = 0; i < cols; i++) {
    columns.push([]);
  }

  body.forEach((image, index) => {
    columns[index % cols].push(image);
    if (image) imgCounter++;
  });

  return (
    <Fragment>
      <KRow ref={galleryRef}>
        {columns.map((col, index) => (
          <KCol key={index} position="relative" xs={12 / cols}>
            {col}
          </KCol>
        ))}
      </KRow>
      {imgCounter < images.length && (
        <KContainer display="flex" justifyContent="center" py="2">
          <KButton
            p="0.2"
            radius="50%"
            onClick={() => setImageLimit(imageLimit + loadBuffer)}>
            <KIcon size={2} prefix="fa" name="arrow-down"></KIcon>
          </KButton>
        </KContainer>
      )}
      <KGallerySlider
        images={images}
        startIndex={clickedImageIndex}
        isOpen={isSliderOpen}
        onClose={() => {
          setSliderOpen(false);
        }}
        shouldLoadDimensions
        fullscreen
      />
    </Fragment>
  );
};

////// EXPORTS //////
export default KGallery;
