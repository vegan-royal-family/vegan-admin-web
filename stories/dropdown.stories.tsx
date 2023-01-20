import Dropdown from "components/common/Dropdown";

export default {
  title: "components/Dropdown",
  component: Dropdown,
};

const Template = (args) => {
  return <Dropdown {...args} />;
};

export const DefaultDropdown = Template.bind({});
DefaultDropdown.args = {
  label: "test",
  options: [
    { id: 1, name: "test1" },
    { id: 2, name: "test2" },
  ],
};
