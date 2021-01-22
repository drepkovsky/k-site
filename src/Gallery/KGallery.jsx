//// EXTERNAL ////

// React
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useRef } from "react";

// Reactstrap
import { Container, Spinner } from "reactstrap";
import KIcon from "../Atoms/KIcon";

//// INTERNAL ////
import { getBootstrapSizes } from "../Libs/styles";
import { cleanArray, initArray, minIndex } from "../Libs/KLib";
import KGallerySlider from "./KGallerySlider";
import KAnimation from "../Atoms/KAnimation";
import { KLazyImage } from "../Atoms/KImage";

////// COMPONENT //////
const defaultSizes = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 3,
  xl: 3,
};

function KGallery(props) {
  //props
  const {
    images,
    xs,
    sm,
    md,
    lg,
    xl,
    paddingClass,
    maxHeight = 400,
    loadBuffer = 20,
    animateImages = true,
  } = props;
  //states
  const [galleryWidth, setGalleryWidth] = useState(0);
  const [imageLimit, setImageLimit] = useState(loadBuffer);
  const [isSliderOpen, setSliderOpen] = useState(false);
  const [clickedImageIndex, setClickedImageIndex] = useState(0);
  //consts
  const galleryRef = useRef(null);

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

  //set padding
  const padding = paddingClass ? paddingClass : "p-2";

  //wanted width of each image in the gallery

  //grid images of gallery

  const renderImage = (image, index) => {
    return (
      <KLazyImage
        alt={image.description}
        className="k-gallery-img "
        src={image.src}
        style={{
          objectFit: "cover",
          width: "100%",
          maxHeight: maxHeight,
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
          <div key={index} className="py-3 k-gallery-image-holder">
            {animateImages ? (
              <KAnimation anim={["fadeIn 0.5s ease", "up 0.5s ease"]}>
                {renderImage(image, index)}
              </KAnimation>
            ) : (
              renderImage(image, index)
            )}
          </div>
        );
      }
    });
  };

  //prevents multiple drawing glitches
  const body = bodyImgs();
  let imgCounter = 0;

  const columns = [];

  for (var i = 0; i < cols; i++) {
    columns.push([]);
  }

  body.forEach((image, index) => {
    columns[index % cols].push(image);
    if (image) imgCounter++;
  });

  return (
    <Fragment>
      <div className="row" ref={galleryRef}>
        {columns.map((col, index) => (
          <div key={index} className={`relative col-${12 / cols}`}>
            {col}
          </div>
        ))}
      </div>
      {imgCounter < images.length && (
        <div className="container py-2">
          <span
            className="btn"
            onClick={() => setImageLimit(imageLimit + loadBuffer)}>
            <KIcon size="3" prefix="fa" name="arrow-circle-down"></KIcon>
          </span>
        </div>
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
}

KGallery.propTypes = {
  images: PropTypes.array,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  xl: PropTypes.number,
  paddingClass: PropTypes.string,
  animateImages: PropTypes.bool,
};

////// EXPORTS //////
export default KGallery;
