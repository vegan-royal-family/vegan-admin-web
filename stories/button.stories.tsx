import Button from "components/common/Button";
import Icon from "components/common/Icon";

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

export const PrefixIconButton = Template.bind({});
PrefixIconButton.args = {
  type: "primary",
  size: "md",
  label: "Button",
  disabled: false,
  prefixContent: <Icon icon="add-one" size="sm" />,
};

export const SuffixIconButton = Template.bind({});
SuffixIconButton.args = {
  type: "primary",
  size: "md",
  label: "Button",
  disabled: false,
  suffixContent: <Icon icon="right" size="sm" />,
};

export const LoadingButton = Template.bind({});
LoadingButton.args = {
  type: "primary",
  size: "md",
  label: "Button",
  disabled: false,
  loading: true,
};
