import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import Model from "../../common/Modal/Model";
import FeedbackUpdateForm from "../FeedbackUpdateForm/FeedbackUpdateForm";

import { useSelector, useDispatch } from "react-redux";
import { setDataToUpdate } from "../../../features/feedback/dataUpdate/dataToUpdateSlice";

const FeedbackTable = ({ data, dataSetter }) => {
  // using the redux state management to get the dataToUpdate state
  const dataToUpdate = useSelector((state) => state.dataToUpdate.value);
  const dispatch = useDispatch();

  const handleDelete = (record) => {
    const tempStore = JSON.parse(localStorage.getItem("feedback"));
    const newData = tempStore.filter((item) => item.id !== record.id);
    localStorage.setItem("feedback", JSON.stringify(newData));
    dataSetter(newData);
  };
  const handleUpdate = (record) => {
    localStorage.setItem("update", JSON.stringify(record));
    // setDataToUpdate(record); //do not stringify

    dispatch(setDataToUpdate(record));
  };

  //feedback update model options
  const [isFeedbackUpdateModalOpen, setIsFeedbackUpdateModalOpen] =
    useState(false);

  //table columns
  const columns = [
    { title: "id", dataIndex: "id", key: "id", width: 50 },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Street Address",
      dataIndex: "streetAddress",
      key: "streetAddress",
    },
    {
      title: "Work Status",
      dataIndex: "workStatus",
      key: "workStatus",
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
      key: "contactNumber",
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              handleUpdate(record);
              setIsFeedbackUpdateModalOpen(true);
            }}
          >
            Edit{" "}
          </a>
          <a onClick={() => handleDelete(record)}>Delete</a>
        </Space>
      ),
    },
  ];

  // console.log(data.map((item) => console.log(item.id)));

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.id}
        scroll={{ x: 1000 }}
      />
      <Model
        isModalOpen={isFeedbackUpdateModalOpen}
        setIsModalOpen={setIsFeedbackUpdateModalOpen}
        title="Feedback Update"
      >
        <FeedbackUpdateForm
          dataSetter={dataSetter}
          setIsModalOpen={setIsFeedbackUpdateModalOpen}
        />
      </Model>
    </div>
  );
};

export default FeedbackTable;
