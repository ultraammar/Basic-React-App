import React, { useEffect } from "react";
import "./Login.scss";
import { Content } from "antd/es/layout/layout";
import LoginForm from "../../components/LoginForm/LoginForm";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
// import LineBlob from "../../assets/line-blob.svg";


const Login = () => {
  const navigate = useNavigate();
  
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true'? true: false;
  console.log(isLoggedIn);
  if (isLoggedIn) {
    navigate('/');
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      <Navbar />
      <div className="loginpage">
        <div>
          <svg
            className="left-blob"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            style={{
              marginTop: "-2.5rem",
              width: "100%",
              height: "12rem",
              display: "block",
            }}
          >
            <path
              fill="#FF0066"
              d="M0,224L40,218.7C80,213,160,203,240,213.3C320,224,400,256,480,240C560,224,640,160,720,144C800,128,880,160,960,149.3C1040,139,1120,85,1200,96C1280,107,1360,181,1400,218.7L1440,256L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
            ></path>
          </svg>
        </div>

        <Content>
          <div className="site-layout-content">
            <h1 style={{marginBottom: "50px"}}>Login Page</h1>
            <LoginForm />
          </div>
        </Content>
      </div>
    </div>
  );
};

export default Login;
