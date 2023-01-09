import { css } from "@emotion/react";

export const fadeinFromRightAnimation = css`
  @-webkit-keyframes fadein {
    from {
      right: 0;
      opacity: 0;
    }
    to {
      right: 30px;
      opacity: 1;
    }
  }
  @keyframes fadein {
    from {
      right: 0;
      opacity: 0;
    }
    to {
      right: 30px;
      opacity: 1;
    }
  }
`;

export const fadeoutToRightAnimation = css`
  @-webkit-keyframes fadeout {
    from {
      right: 30px;
      opacity: 1;
    }
    to {
      right: 0;
      opacity: 0;
    }
  }
  @keyframes fadeout {
    from {
      right: 30px;
      opacity: 1;
    }
    to {
      right: 0;
      opacity: 0;
    }
  }
`;
