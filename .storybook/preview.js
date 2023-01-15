import { ThemeProvider } from "@emotion/react";
import theme from "../styles/theme";
import "react-perfect-scrollbar/dist/css/styles.css";
import "styles/reset.css";

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
