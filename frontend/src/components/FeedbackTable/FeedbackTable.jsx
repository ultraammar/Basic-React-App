import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";







const FeedbackTable = ({ data, dataSetter, setIsDataUpdate }) => {

  const [localData, setLocalData] = useState([]);
  const handleDelete = (record) => {
    const tempStore = JSON.parse(localStorage.getItem("feedback"));
    const newData = tempStore.filter((item) => item.id !== record.id);
    localStorage.setItem("feedback", JSON.stringify(newData));
    dataSetter(newData);
  }
  const handleUpdate = (record) => {
    localStorage.setItem("update", JSON.stringify(record));
    setIsDataUpdate("true");
    
    
  }

  const columns = [
    {title: "id", dataIndex: "id", key: "id"},
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
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleUpdate(record)}>Edit </a>
          <a onClick={() => handleDelete(record)}>Delete</a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    setLocalData(data);
  }
  , [data]);
  

  return (
    <div>
      {console.log(localData)}
      <Table
        columns={columns}
        dataSource={localData}
        rowKey={(record) => record.id}
        
      />
    </div>
  );
};

export default FeedbackTable;
