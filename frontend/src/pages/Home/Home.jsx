// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "./Home.scss";

import { Layout } from "antd";
import Navbar from "../../components/Navbar/Navbar";
import FeedbackForm from "../../components/FeedbackForm/FeedbackForm";
import FeedbackTable from "../../components/FeedbackTable/FeedbackTable";
const { Content } = Layout;

const Home = () => {
  const [data, setData] = useState([]);
  const [dataToUpdate, setDataToUpdate] = useState("false");

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("feedback")));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="homepage" style={{paddingTop: "125px"}}>
        {/* <h2>Home</h2> */}

        <Content>
          <div className="site-layout-content">
            <h1 id="feedback-form" >Welcome to the Home Page</h1>
            <FeedbackForm dataSetter={setData} dataToUpdate={dataToUpdate}/>
          </div>
          <div className="site-layout-content" style={{ marginTop: 100 }}>
            <h1>Feedback Table</h1>
            <FeedbackTable
              data={data}
              dataSetter={setData}
              setDataToUpdate={setDataToUpdate}
            />
          </div>
        </Content>
      </div>
    </div>
  );
};

export default Home;
