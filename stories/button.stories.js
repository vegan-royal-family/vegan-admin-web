import Button from "../components/common/Button";

export default {
  title: "components/Button",
  component: Button,
};

const Template = (args) => {
  return <Button {...args} />;
};

export const PrimaryButton = Template.bind({});
PrimaryButton.args = {
  type: "primary",
  size: "sm",
  label: "Button",
  disabled: false,
};

export const SecondaryButton = Template.bind({});
SecondaryButton.args = {
  type: "secondary",
  size: "md",
  label: "Button",
  disabled: false,
};
