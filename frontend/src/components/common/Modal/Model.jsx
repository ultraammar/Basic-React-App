import React, { useState } from "react";
import { Button, Modal } from "antd";

const Model = ({ isModalOpen, setIsModalOpen, title='', CompToInject }) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >

        
        <CompToInject />
      </Modal>
    </div>
  );
};

export default Model;
