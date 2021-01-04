//// EXTERNAL ////

// React
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useRef } from "react";

// Reactstrap
import { Container, Spinner } from "reactstrap";

/////STYLES //////
import "./KGallery.css";
//// INTERNAL ////
import {
    getBootstrapSizes,
    cleanArray,
    initArray,
    minIndex,
} from "../Libs/KLib";
import KGallerySlider from "./KGallerySlider";

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
    const { images, xs, sm, md, lg, xl, paddingClass } = props;
    //states
    const [galleryWidth, setGalleryWidth] = useState(0);
    const [loading, setLoading] = useState(true);
    const [loadedImages, setLoadedImages] = useState(0);
    const [galleryImages, setGalleryImages] = useState([]);
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

        //get the sizes of all images
        cleanArray(galleryImages);
        images.map((img) => {
            const tempImg = new Image();
            tempImg.src = img.src;
            tempImg.onload = () => {
                galleryImages.push({
                    src: img.src,
                    description: img.description,
                    tags: img.tags,
                    width: tempImg.width,
                    height: tempImg.height,
                });
                setLoadedImages(galleryImages.length);
                setLoading(images.length != galleryImages.length);
            };
        });

        //cleanup
        return () => {
            cleanArray(galleryImages);
        };
        //useEffect will only be called if images array changed
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
    const wantedWidth = galleryWidth / cols;
    //array of heights of each col in gallery
    var colsHeights = initArray(cols, 0);

    //grid images of gallery
    const bodyImgs = () => {
        return galleryImages.map((image, index) => {
            const height = (wantedWidth / image.width) * image.height;

            const x = minIndex(colsHeights);

            const posX = x * wantedWidth;
            const posY = colsHeights[x];

            colsHeights[x] += height;

            return (
                <div
                    key={index}
                    className={`k-gallery-image-holder ${padding}`}
                    style={{
                        left: posX,
                        top: posY,
                        width: wantedWidth,
                        height: height,
                    }}
                >
                    <img
                        alt={image.description}
                        className="k-gallery-img"
                        src={image.src}
                        onClick={() => {
                            setClickedImageIndex(index);
                            setSliderOpen(true);
                        }}
                    ></img>
                </div>
            );
        });
    };

    //spinner showing message if the gallery is not fully loaded
    const spinner = () => {
        return (
            <div>
                <Spinner />
                <p>
                    Loading...{" "}
                    {Math.floor((loadedImages / images.length) * 100)}%{" "}
                </p>
            </div>
        );
    };

    //prevents multiple drawing glitches
    const body = [bodyImgs()];
    const galleryHeight = Math.max(...colsHeights);

    return (
        <Fragment>
            {loading ? spinner() : null}
            <div
                className="k-gallery"
                ref={galleryRef}
                style={{ height: galleryHeight }}
            >
                {body}
            </div>
            <KGallerySlider
                images={galleryImages}
                startIndex={clickedImageIndex}
                isOpen={isSliderOpen}
                onClose={() => {
                    setSliderOpen(false);
                }}
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
};

////// EXPORTS //////
export default KGallery;
