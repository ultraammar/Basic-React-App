import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import "./LoginForm.scss";
import { useNavigate } from "react-router-dom";

const loginCredentials = {
  email: "admin@admin.com",
  password: "admin",
};

const LoginForm = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success:", values);

    if (
      values.email === loginCredentials.email &&
      values.password === loginCredentials.password
    ) {
      localStorage.setItem("loggedIn", true);
      console.log("Login successful");
      setLoggedIn(true);
      //useNavgiate to route to home page
      navigate("/");
    } else {
      console.log("Invalid credentials");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  //put the boolean in localstorage
  // localStorage.setItem("loggedIn", loggedIn);

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600, width: "100%" }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="login-form"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
