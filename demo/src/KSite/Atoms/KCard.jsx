////// IMPORTS //////

//// EXTERNAL ////

// React
import PropTypes from "prop-types";
import React, { useState, useEffect, useRef } from "react";

import { justifyContent } from "../Libs/KLib";

//// INTERNAL ////

////// COMPONENT //////

export function KCard(props) {
  //props
  const { children, className, noBorder } = props;
  //states
  const [kids, setKids] = useState([]);
  const [floaters, setFloaters] = useState([]);
  const ref = useRef(null);

  const borderClass = noBorder ? "no-border" : "";

  //effects
  useEffect(() => {
    var floater = [];
    var tmpKids = [];

    [].concat(children).map((child) => {
      switch (child.type.name) {
        case KCardFloater.name:
          floater.push(child);
          break;
        default:
          tmpKids.push(child);
          break;
      }
    });

    const updateFloaters = () => {
      if (ref.current) {
        floater = React.Children.map(floater, (child) => {
          return React.cloneElement(child, {
            cardWidth: ref.current.offsetWidth,
            cardHeight: ref.current.offsetHeight,
          });
        });
      }
      setFloaters(floater);
    };

    updateFloaters();
    window.addEventListener("resize", updateFloaters);

    setKids(tmpKids);
  }, [children, ref]);

  //render
  return (
    <div
      ref={ref}
      className={`k-card ${className || ""} ${borderClass}`}
      fillWidth
      dirCol>
      {kids}
      {floaters}
    </div>
  );
}

KCard.propTypes = {
  className: PropTypes.string,
  noBorder: PropTypes.bool,
};

export function KCardHeader(props) {
  const { children, className, noDivider, align } = props;

  const dividerClass = noDivider ? "no-border" : "";

  const justify = justifyContent(align);

  return (
    <div
      className={`k-card-header ${dividerClass} ${justify} ${className || ""}`}
      fillWidth>
      {children}
    </div>
  );
}

KCardHeader.propTypes = {
  className: PropTypes.string,
  noDivider: PropTypes.bool,
  align: PropTypes.string,
};

export function KCardBody(props) {
  const { children, className } = props;

  return (
    <div className={`k-card-body ${className || ""}`} dirCol fillWidth>
      {children}
    </div>
  );
}

export function KCardFooter(props) {
  const { children, className, noDivider, align } = props;

  const dividerClass = noDivider ? "no-border" : "";

  const justify = justifyContent(align);

  return (
    <div
      className={`k-card-footer ${dividerClass}  ${justify} ${className}`}
      fillWidth>
      {children}
    </div>
  );
}

KCardFooter.propTypes = {
  className: PropTypes.string,
  noDivider: PropTypes.bool,
  align: PropTypes.string,
};

export function KCardTitle(props) {
  const { children, className } = props;

  return (
    <h3 className={`k-card-title ${className || ""}`} fillWidth>
      {children}
    </h3>
  );
}

KCardTitle.propTypes = {
  className: PropTypes.string,
};

export function KCardFloater(props) {
  const [inverse, setInverse] = useState(false);
  const [width, setWidth] = useState(0);
  const { children, className, ver, hor, cardWidth, cardHeight } = props;
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
    }
  }, [ref, cardWidth, cardHeight]);

  console.log(cardWidth, width);
  var x = 0;
  var y = 0;
  if (width != 0 || cardWidth != 0) {
    switch (hor) {
      case "start":
        x = -width / 2;
        break;
      case "middle":
        x = cardWidth / 2 - width / 2;
        break;
      case "end":
        x = cardWidth - width / 2;
        break;
    }

    switch (ver) {
      case "start":
        y = -width / 2;
        break;
      case "middle":
        if (hor == "middle") y = -width / 2;
        else y = cardHeight / 2 - width / 2;
        break;
      case "end":
        y = cardHeight - width / 2;
        break;
    }
  }

  return (
    <div
      onMouseOver={() => {
        if (!inverse) setInverse(true);
      }}
      onMouseOut={() => {
        if (inverse) setInverse(false);
      }}
      ref={ref}
      className={`k-card-floater ${className || ""}`}
      style={
        width != 0 ? { width: width, height: width, left: x, top: y } : {}
      }>
      {children}
    </div>
  );
}

KCardFloater.propTypes = {
  hor: PropTypes.oneOf(["start", "end", "middle"]),
  ver: PropTypes.oneOf(["start", "end", "middle"]),
  icon: PropTypes.string,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
};

////// EXPORTS //////
