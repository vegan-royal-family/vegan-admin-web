import styled from "@emotion/styled";
import { rgba } from "emotion-rgba";

const CircleSpinner = styled.div<{
  size?: string | number;
  firstColor?: string;
  secondColor?: string;
}>`
  @-webkit-keyframes spCircRot {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(359deg);
    }
  }
  @keyframes spCircRot {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }

  width: ${(p) => (p.size ? p.size : "16px")};
  height: ${(p) => (p.size ? p.size : "16px")};
  box-sizing: border-box;
  clear: both;
  border: ${(p) => `2px ${rgba(p.firstColor ?? "#fff", 0.2)} solid`};
  border-top: 2px ${(p) => (p.secondColor ? p.secondColor : "#fff")} solid;
  border-radius: 50%;
  -webkit-animation: spCircRot 0.6s infinite linear;
  animation: spCircRot 0.6s infinite linear;
`;

export default CircleSpinner;
