//// EXTERNAL ////
//REDUX
import { connect } from "react-redux";

// React
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";

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
      //add a formID to every child input
      setKids(
        recursiveChildrenMap(children, (child) => {
          var type = child.type;

          if (type.name === KInput.name) {
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
    const result = {};

    Object.keys(forms[id]).map((key) => {
      Object.assign(result, {
        [forms[id][key].name]: forms[id][key].value,
      });
    });

    var response = null;
    if (onOutput) response = onOutput(result);

    if (response)
      if (response.error) {
        Object.keys(response.error).forEach((key) => {});
      }
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
