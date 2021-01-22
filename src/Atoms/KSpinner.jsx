import styled from "styled-components";
import KAnimation from "./KAnimation";
import KIcon from "./KIcon";

const KSpinner = (props) => {
  return (
    <KAnimation
      lineHeight={1}
      display="inline-block"
      anim="spin 0.9s ease infinite">
      <KIcon size={1.5} prefix="fa" name="spinner" {...props} />
    </KAnimation>
  );
};

export default KSpinner;
