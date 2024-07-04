// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "./Home.scss";

import { Col, Layout, Row } from "antd";
import Navbar from "../../components/Navbar/Navbar";
import FeedbackForm from "../../components/Feedback/FeedbackForm/FeedbackForm";
import FeedbackTable from "../../components/Feedback/FeedbackTable/FeedbackTable";
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
      <div className="homepage" style={{ paddingTop: "125px" }}>
        {/* <h2>Home</h2> */}

        <Content>
          <Row gutter={{xl: 10}} >
            <Col xl={12} lg={24}>
              <div className="site-layout-content">
                <h1 id="feedback-form">Welcome to the Home Page</h1>
                <FeedbackForm
                  dataSetter={setData}
                  dataToUpdate={dataToUpdate}
                />
              </div>
            </Col>
            <Col xl={12} lg={24} >
              <div className="site-layout-content" /*style={{ marginTop: 100 }}*/>
                <h1>Feedback Table</h1>
                <FeedbackTable
                  data={data}
                  dataSetter={setData}
                  setDataToUpdate={setDataToUpdate}
                />
              </div>
            </Col>
          </Row>
        </Content>
      </div>
    </div>
  );
};

export default Home;
