import React from "react";
import Modal from "react-modal";

const UIModal = (props) => {
  const { children } = props;
  return (
    <Modal
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      shouldFocusAfterRender={true}
      className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 outline-none`}
      overlayClassName={`fixed inset-0 bg-black/70`}
      {...props}
    >
      {children}
    </Modal>
  );
};

export default UIModal;
