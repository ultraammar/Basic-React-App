import React, { useState } from "react";
import { Button, Modal } from "antd";
import { setDataToUpdate } from "../../../features/feedback/dataUpdate/dataToUpdateSlice";
import {useDispatch } from 'react-redux';

//dispatch(setDataToUpdate(false));
const Model = ({ isModalOpen, setIsModalOpen, title='', children }) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(setDataToUpdate(false));
    setIsModalOpen(false);
  };
  return (
    <div>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Close"
        okType="danger"
        cancelButtonProps={{ style: { visibility: 'hidden' } }}
      >

        
        {children}
      </Modal>
    </div>
  );
};

export default Model;
