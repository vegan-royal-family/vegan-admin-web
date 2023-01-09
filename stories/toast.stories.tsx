import { useState } from "react";
import Toast from "components/common/Toast";
import Button from "components/common/Button";

export default {
  title: "components/Toast",
  component: Toast,
};

const Template = (args) => {
  const [open, setOpen] = useState(false);
  const [openWithDesc, setOpenWithDesc] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100px",
        padding: 20,
        marginBottom: 20,
      }}
    >
      {open && (
        <Toast
          onClose={() => {
            setOpen(false);
          }}
          {...args}
        />
      )}
      {openWithDesc && (
        <Toast
          onClose={() => {
            setOpenWithDesc(false);
          }}
          desc="안녕하세요. 어쩌다보니 비건?! 서비스입니다."
          {...args}
        />
      )}
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        {args.type} Toast Pop!
      </Button>
      <div style={{ height: 20 }} />
      <Button
        onClick={() => {
          setOpenWithDesc(true);
        }}
      >
        {args.type} Toast with desc Pop!
      </Button>
    </div>
  );
};

export const InfoToast = Template.bind({});
InfoToast.args = {
  type: "info",
  title: "안내 텍스트입니다.",
};

export const SuccessToast = Template.bind({});
SuccessToast.args = {
  type: "success",
  title: "성공 텍스트입니다.",
};

export const ErrorToast = Template.bind({});
ErrorToast.args = {
  type: "error",
  title: "에러가 발생했습니다.",
};
