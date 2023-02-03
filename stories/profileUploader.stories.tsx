import ProfileUploader from "components/common/ProfileUploader";

export default {
  title: "components/ProfileUploader",
  component: ProfileUploader,
};

const Template = (args) => {
  return <ProfileUploader {...args} />;
};

export const DefaultProfileUploader = Template.bind({});

DefaultProfileUploader.args = {
  id: "vegan-image-select",
};
