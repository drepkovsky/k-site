////// IMPORTS //////

//// EXTERNAL ////

//REDUX
import { connect } from "react-redux";

// React
import { Button } from "bootstrap";
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useRef } from "react";

// Reactstrap
import { Container, Form } from "reactstrap";

//// INTERNAL ////
import KInput from "./KInput";
import { uuidv4 } from "../Libs/KLib";
import { recursiveChildrenMap } from "../Libs/KLib";

////// COMPONENT //////

function KForm(props) {
  //props
  const { onOutput, children } = props;
  const [kids, setKids] = useState([]);
  //states
  const [id, setId] = useState(null);

  useEffect(() => {
    setId(uuidv4());
  }, []);

  //effects
  useEffect(() => {
    if (id) {
      const tmpInputs = [];
      //add a formiD to every child input
      setKids(
        recursiveChildrenMap(children, (child) => {
          var type = child.type;
          if (typeof type === "object" && type !== null)
            type = type.WrappedComponent;

          if (type.name === KInput.WrappedComponent.name) {
            const clone = React.cloneElement(child, {
              formId: id,
            });

            return clone;
          }
          return child;
        })
      );
    }
  }, [children, id]);

  const harvestForm = (e) => {
    e.preventDefault();

    const { forms } = props;
    const result = forms[id];
    var response = null;
    if (onOutput) response = onOutput(result);

    console.log(result);
  };

  //render
  return (
    <form onSubmit={harvestForm} className="k-form ">
      {kids}
    </form>
  );
}

KForm.propTypes = {
  onOutput: PropTypes.func,
};

////// EXPORTS //////
const mapStateToProps = (state) => ({
  forms: state.forms,
});

export default connect(mapStateToProps, null)(KForm);
