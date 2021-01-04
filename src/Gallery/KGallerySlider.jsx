////// IMPORTS //////

//// EXTERNAL ////
import NavigateBeforeRoundedIcon from "@material-ui/icons/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@material-ui/icons/NavigateNextRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

// React
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";

// Reactstrap
import { Container, Modal, ModalBody } from "reactstrap";

/////STYLES //////

//// INTERNAL ////

////// COMPONENT //////

function KGallerySlider(props) {
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
    } = props;
    //states
    const [isModalOpen, setModalOpen] = useState(false);
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [currentIndex, setCurrentIndex] = useState(0);

    //effects
    useEffect(() => {
        setModalOpen(isOpen);
        setCurrentIndex(startIndex);
    }, [isOpen, startIndex]);

    useEffect(() => {
        window.addEventListener("resize", () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        });
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
                <img
                    src={images[currentIndex]?.src}
                    className="k-slider-img "
                />
                <div className="k-gallery-img-controls-holder p-1">
                    <div className="d-flex flex-row justify-content-end">
                        <span
                            className="k-gallery-img-control p-1"
                            onClick={close}
                        >
                            <CloseRoundedIcon fontSize="large" />
                        </span>
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                        <span
                            className="k-gallery-img-control p-1"
                            onClick={previous}
                        >
                            <NavigateBeforeRoundedIcon fontSize="large" />
                        </span>

                        <span className="k-gallery-img-control p-1">
                            <NavigateNextRoundedIcon
                                fontSize="large"
                                onClick={next}
                            />
                        </span>
                    </div>
                    <div className="d-flex flex-row justify-content-center"></div>
                </div>
            </div>
        );
    };

    //render
    if (fullscreen) {
        const modal = () => {
            var imgWidth = images[currentIndex].width;
            var imgHeight = images[currentIndex].height;

            if (imgWidth > dimensions.width) {
                imgHeight = (dimensions.width / imgWidth) * imgHeight;
                imgWidth = dimensions.width;
            }
            if (imgHeight > dimensions.height) {
                imgWidth = (dimensions.height / imgHeight) * imgWidth;
                imgHeight = dimensions.height;
            }

            const left = dimensions.width / 2 - imgWidth / 2;
            const top = dimensions.height / 2 - imgHeight / 2;
            return (
                <Modal
                    toggle={toggleModal}
                    isOpen={isModalOpen}
                    className="k-gallery-modal m-0 p-2"
                    contentClassName="k-gallery-modal-content"
                    style={{
                        maxWidth: imgWidth,
                        maxHeight: imgHeight,
                        width: imgWidth,
                        height: imgHeight,
                        left: left,
                        top: top,
                    }}
                >
                    <ModalBody className="p-0">
                        <div className="k-gallery-modal-body">
                            {imageBody()}
                        </div>
                    </ModalBody>
                </Modal>
            );
        };

        if (shouldLoadDimensions) {
            if (images[currentIndex]) {
                if (!images[currentIndex]?.width) {
                    const tmpImg = new Image();
                    tmpImg.src = images[currentIndex]?.src;
                    tmpImg.onload = () => {
                        images[currentIndex].width = tmpImg.width;
                        images[currentIndex].height = tmpImg.height;
                        return modal();
                    };
                }
                return modal();
            }
            return null;
        }
        return modal();
    }
    return imageBody();
}

KGallerySlider.propTypes = {
    fullscreen: PropTypes.bool,
    images: PropTypes.array,
    startIndex: PropTypes.number,
    onClose: PropTypes.func,
    onNext: PropTypes.func,
    onPrevious: PropTypes.func,
    isOpen: PropTypes.bool,
    shouldLoadDimensions: PropTypes.bool,
};

////// EXPORTS //////
export default KGallerySlider;
