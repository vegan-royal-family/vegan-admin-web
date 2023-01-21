import Dropdown from "components/common/Dropdown";

export default {
  title: "components/Dropdown",
  component: Dropdown,
};

const Template = (args) => {
  const onChange = (selectedOption) => {
    console.log(selectedOption);
  };
  return (
    <div>
      <Dropdown {...args} onChange={onChange} />
    </div>
  );
};

export const DefaultDropdown = Template.bind({});
DefaultDropdown.args = {
  label: "test",
  defaultValueId: 1,
  options: [
    { id: 1, name: "test1" },
    { id: 2, name: "test2" },
    { id: 3, name: "test3" },
    { id: 4, name: "test4" },
  ],
};
