import { useState } from "react";

export default function usePopup<T>() {
  type PopupOptionType = {
    type: "" | T;
    visible: boolean;
  };

  const [popupOption, setpopupOption] = useState<PopupOptionType>({
    type: "",
    visible: false,
  });

  const onPopupOpen = (type) => {
    setpopupOption({
      type,
      visible: true,
    });
  };

  const onPopupClose = () => {
    setpopupOption({
      type: "",
      visible: false,
    });
  };

  return { popupOption, onPopupOpen, onPopupClose };
}
