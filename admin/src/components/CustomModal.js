import React from "react";
import { Button, Modal, Space } from "antd";
const CustomModal = (props) => {
  const { open, hideModal, title, performAction } = props;
  return (
    <div>
      <Modal
        title="Modal"
        open={open}
        onOk={performAction}
        onCancel={hideModal}
        okText="Okay"
        cancelText="Cancel"
      >
        <p>{title}</p>
      </Modal>
    </div>
  );
};

export default CustomModal;
