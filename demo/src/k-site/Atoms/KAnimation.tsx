import styled, { css } from "styled-components";
import React, { useState, useEffect, useRef } from "react";
import { component, KStatefulComponentProps } from "../Theming/KStyles";
import { randStr } from "../Libs/KLib";

import { animations } from "../Libs/animations";
import { useDispatch } from "react-redux";
import { addAnimation, removeAnimation } from "../redux/actions/act_con";

interface KAnimWrapperProps {
  animCss: string;
  anim?: string | string[];
  id: string;
}

const KAnimationContainer = styled.div`
  margin: 0;
  padding: 0;
  overflow: hidden;
`;

const KAnimationWrapper = styled.div<
  KStatefulComponentProps & KAnimWrapperProps
>`
  margin: 0;
  padding: 0;
  ${component}

  ${(props) => {
    return css`
      &.${props.animCss} {
        ${animation(props.anim)}
      }
    `;
  }}

  &.hidden {
    opacity: 0;
  }
`;

interface KAnimationProps {
  anim?: string | string[];
  className?: string;
}

const KAnimation: React.FC<KStatefulComponentProps & KAnimationProps> = (
  props
) => {
  const { children, anim, className, ...wrapperProps } = props;
  const [id, setId] = useState("");
  const [animCss, setAnimCss] = useState("");
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (anim && ref.current) {
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
    <KAnimationContainer>
      <KAnimationWrapper
        ref={ref}
        animCss={animCss}
        anim={anim}
        id={id}
        {...wrapperProps}
        className={`${className || ""} hidden`}>
        {children}
      </KAnimationWrapper>
    </KAnimationContainer>
  );
};

const animation = (anim?: string | string[]) => {
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

const getWordsFromAnim = (anim: string) => {
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
