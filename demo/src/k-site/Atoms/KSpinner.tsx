import styled from "styled-components";
import { KStatefulComponentProps } from "../Theming/KStyles";
import KAnimation from "./KAnimation";
import KIcon from "./KIcon";

const KSpinner: React.FC<
  KStatefulComponentProps & { size?: string | number }
> = (props) => {
  const { size = 1.5, ...wrapperProps } = props;
  return (
    <KAnimation
      lineHeight={1}
      display="inline-block"
      anim="spin 0.9s ease infinite">
      <KIcon size={size} prefix="fa" name="spinner" {...wrapperProps} />
    </KAnimation>
  );
};

export default KSpinner;
