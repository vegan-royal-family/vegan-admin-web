import CircleSpinner from "components/common/Spinner";

export default {
  title: "components/Spinner",
  component: CircleSpinner,
};

const Template = (args) => {
  return <CircleSpinner {...args} />;
};

export const DefaultSpinner = Template.bind({});
DefaultSpinner.args = {
  size: "32px",
  firstColor: "#64748B",
  secondColor: "#FF744D",
};
