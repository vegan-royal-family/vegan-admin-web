import ProfileDropdown from "components/common/ProfileDropdown";

export default {
  title: "components/ProfileDropdown",
  component: ProfileDropdown,
};

const Template = (args) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <ProfileDropdown {...args} />
    </div>
  );
};

export const DefaultProfileDropdown = Template.bind({});
DefaultProfileDropdown.args = {
  authValue: {
    userId: "nickname",
    profileImage: null,
    name: "김뫄뫄",
    email: "vegan@gmail.com",
  },
};
