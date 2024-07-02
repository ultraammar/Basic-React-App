// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import netsolWhiteLogo from "../../assets/netsol-logo-white.svg";
import "./Navbar.scss"

import {
  ProductOutlined,
  HomeOutlined,
  UserOutlined
  
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("mail");
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true'? true: false;
  
  const logoutHandle = () => {
    localStorage.clear();
    navigate('/login');
  }

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  }

  return(
  <div className="nav-back">
    
    <div className="nav-custom">
      <img src={netsolWhiteLogo} width="50px" alt="Netsol-logo" className="avatar" />
      <div style={{display: "flex", }}>
      <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          className="nav-ul"  
          disabledOverflow="false"
        >
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.SubMenu key="SubMenu" icon={<ProductOutlined />} title="Products">
            <Menu.Item key="ascent">NFS Ascent</Menu.Item>
            <Menu.Item key="digital">NFS Digital</Menu.Item>
            <Menu.Item key="appexnow">AppexNow</Menu.Item>
            <Menu.Item key="aws">AWS</Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="investors">
            <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
              Investors
            </a>
          </Menu.Item>
          <Menu.Item key="innovation">
            <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
              Innovation
            </a>
          </Menu.Item>
          <Menu.Item key="events">
            <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
              Events
            </a>
          </Menu.Item>
          
        </Menu>
        {isLoggedIn && 
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          className="profile-ul"
          disabledOverflow="true"
        >
          <Menu.SubMenu key="profileMenu" icon={<UserOutlined/>} >
            <Menu.Item key="Logout" onClick={logoutHandle}>Logout</Menu.Item>
          </Menu.SubMenu>
        </Menu>
        }

      </div>
    </div>
  </div>
  );
};

export default Navbar;
