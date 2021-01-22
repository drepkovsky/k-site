import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import React, { useState, useEffect, useRef } from "react";
import { component } from "../Libs/styles";
import { randStr } from "../Libs/KLib";

import { animations } from "../Libs/animations";
import { useDispatch } from "react-redux";
import { addAnimation, removeAnimation } from "../redux/actions/act_con";

const KAnimationWrapper = styled.div`
  margin: 0;
  padding: 0;
  ${component}

  ${(props) => {
    return css`
      &.${props.animCss} {
        ${animation(props)}
      }
    `;
  }}

  &.hidden {
    opacity: 0;
  }
`;

const KAnimation = (props) => {
  const { children, anim, className } = props;
  const [id, setId] = useState("");
  const [animCss, setAnimCss] = useState("");
  const dispatch = useDispatch();
  const ref = useRef();

  useEffect(() => {
    if (anim) {
      const tmpId = randStr(15, false);
      const tmpAnimCss = randStr(10, false);
      dispatch(addAnimation({ ref: ref.current, id: tmpId, anim: tmpAnimCss }));
      setId(tmpId);
      setAnimCss(tmpAnimCss);
      return () => {
        dispatch(removeAnimation({ id }));
      };
    }
  }, []);

  return (
    <KAnimationWrapper
      ref={ref}
      animCss={animCss}
      id={id}
      {...props}
      className={`${className || ""} hidden`}>
      {children}
    </KAnimationWrapper>
  );
};

KAnimation.propTypes = {
  animation: PropTypes.string,
  customAnimClass: PropTypes.string,
};

const animation = ({ anim }) => {
  if (!anim) return "";
  let result = "";
  if (Array.isArray(anim)) {
    let tmpAnim = "";
    let allAnims = "";
    anim.forEach((an, index) => {
      const { animName, rest } = getWordsFromAnim(an);
      if (animations[animName]) allAnims += animations[animName];

      if (index != 0) tmpAnim += ",";

      tmpAnim += `${animName}${rest}`;
    });

    tmpAnim = `animation : ${tmpAnim};`;
    result = tmpAnim + allAnims;
  } else {
    const { animName, rest } = getWordsFromAnim(anim);
    if (animations[animName]) result += animations[animName];

    if (rest.length == 0) result += "animation-duration: 0.5s;";

    result += `animation: ${animName}${rest};`;
  }

  return result;
};

const getWordsFromAnim = (anim) => {
  const words = anim.split(" ");
  let animName = "";
  let rest = "";

  if (words.length > 0) {
    animName = words[0];
  }
  for (let i = 1; i < words.length; i++) {
    rest += ` ${words[i]}`;
  }

  return { animName, rest };
};

export default KAnimation;
