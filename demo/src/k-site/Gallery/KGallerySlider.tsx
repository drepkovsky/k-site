////// IMPORTS //////

//// EXTERNAL ////
// React
import React, { FC, useState, useEffect } from "react";

// Reactstrap
import KButton from "../Atoms/KButton";
import KIcon from "../Atoms/KIcon";
import { KLazyImage } from "../Atoms/KImage";
import { KModal } from "../Atoms/KModal";

/////STYLES //////

//// INTERNAL ////

////// COMPONENT //////

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

export const KGallerySlider: FC<KGallerySliderProps> = (props) => {
  //props
  const {
    fullscreen,
    images,
    startIndex,
    isOpen,
    onClose,
    onNext,
    onPrevious,
    shouldLoadDimensions,
    padding = 15,
  } = props;
  //states
  const [isModalOpen, setModalOpen] = useState<boolean | undefined>(false);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(shouldLoadDimensions);

  //effects
  useEffect(() => {
    setModalOpen(isOpen);
    setCurrentIndex(startIndex);
  }, [isOpen, startIndex]);

  useEffect(() => {
    if (shouldLoadDimensions) {
      setLoading(true);
      const tmpImg = new Image();
      tmpImg.src = images[currentIndex]?.src;
      tmpImg.onload = () => {
        images[currentIndex].width = tmpImg.width;
        images[currentIndex].height = tmpImg.height;
        setLoading(false);
      };
    }
  }, [currentIndex]);

  const updateDimensions = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => {
      window.addEventListener("resize", updateDimensions);
    };
  }, []);

  if (!isModalOpen) return null;

  const toggleModal = () => {
    if (isModalOpen) if (onClose) onClose(currentIndex);
    setModalOpen(!isModalOpen);
  };

  const next = () => {
    if (currentIndex == images.length - 1) {
      if (onNext) onNext(0);
      setCurrentIndex(0);
    } else {
      if (onNext) onNext(currentIndex + 1);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const previous = () => {
    if (currentIndex == 0) {
      if (onPrevious) onPrevious(images.length - 1);
      setCurrentIndex(images.length - 1);
    } else {
      if (onPrevious) onPrevious(currentIndex - 1);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const close = () => {
    if (isModalOpen) if (onClose) onClose(currentIndex);
    setModalOpen(!false);
  };

  const imageBody = () => {
    return (
      <div className="k-gallery-img-slider-holder">
        <KLazyImage src={images[currentIndex]?.src} className="k-slider-img " />
        <KButton
          border={false}
          bg="#00000080"
          color="white"
          p="0.5"
          radius="50%"
          hover={{
            bg: "#000000a0",
            color: "white",
          }}
          position="fixed"
          top={padding}
          right={padding}
          onClick={close}>
          <KIcon size={1.5} name="times" prefix="fa" />
        </KButton>
        <KButton
          border={false}
          bg="#00000080"
          color="white"
          p="0.5"
          radius="50%"
          hover={{
            bg: "#000000a0",
            color: "white",
          }}
          position="fixed"
          top={dimensions.height / 2}
          left={padding}
          onClick={previous}>
          <KIcon size={1.5} name="chevron-left" prefix="fa" />
        </KButton>
        <KButton
          border={false}
          bg="#00000080"
          color="white"
          p="0.5"
          radius="50%"
          hover={{
            bg: "#000000a0",
            color: "white",
          }}
          position="fixed"
          right={padding}
          top={dimensions.height / 2}
          onClick={next}>
          <KIcon size={1.5} name="chevron-right" prefix="fa" />
        </KButton>
      </div>
    );
  };

  //render
  if (fullscreen) {
    const modal = () => {
      let imgWidth = images[currentIndex].width;
      let imgHeight = images[currentIndex].height;
      let left;
      let top;

      if (!loading) {
        if (imgWidth && imgHeight) {
          if (imgWidth > dimensions.width) {
            imgHeight = (dimensions.width / imgWidth) * imgHeight;
            imgWidth = dimensions.width;
          }
          if (imgHeight > dimensions.height) {
            imgWidth = (dimensions.height / imgHeight) * imgWidth;
            imgHeight = dimensions.height;
          }

          imgWidth -= padding * 2;
          imgHeight -= padding * 2;

          left = dimensions.width / 2 - imgWidth / 2;
          top = dimensions.height / 2 - imgHeight / 2;
        }
      }
      return (
        <KModal
          toggle={toggleModal}
          bodyProps={{ position: "relative", w: 100, height: 100 }}
          isOpen={isModalOpen}
          centered={true}>
          <div
            style={{
              maxWidth: imgWidth || "100%",
              maxHeight: imgHeight || "100%",
              width: imgWidth || "100%",
              height: imgHeight || "100%",
              left: left || 0,
              top: top || 0,
            }}
            className="">
            {imageBody()}
          </div>
        </KModal>
      );
    };
    return modal();
  }
  return imageBody();
};
