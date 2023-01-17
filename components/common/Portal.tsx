import reactDom from "react-dom";

export const ModalPortal = ({ children }) => {
  const el = document.getElementById("modal-root");
  return reactDom.createPortal(children, el);
};
