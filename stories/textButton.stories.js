import TextButton from "../components/common/TextButton";

export default {
  title: "components/TextButton",
  component: TextButton,
};

const Template = (args) => {
  return <TextButton {...args} />;
};

export const PrimaryButton = Template.bind({});
PrimaryButton.args = {
  type: "primary",
  size: "md",
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
