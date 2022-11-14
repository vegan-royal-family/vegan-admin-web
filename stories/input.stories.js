import Input from "../components/common/Input";

export default {
  title: "components/Input",
  component: Input,
};

const Template = (args) => {
  return <Input {...args} />;
};

export const Default = Template.bind({});
Default.args = {};
