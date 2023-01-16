import Checkbox from "components/common/Checkbox";

export default {
  title: "components/Checkbox",
  component: Checkbox,
};

const Template = (args) => {
  return <Checkbox {...args} />;
};

export const DefaultCheckbox = Template.bind({});

DefaultCheckbox.args = {
  id: "vegan-checkbox",
  label: "라벨",
  disabled: false,
  checked: true,
};
