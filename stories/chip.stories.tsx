import Chip from "../components/common/Chip";

export default {
  title: "components/Chip",
  component: Chip,
};

const Template = (args) => {
  return <Chip {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  size: "md",
  active: false,
  children: "Text",
};
