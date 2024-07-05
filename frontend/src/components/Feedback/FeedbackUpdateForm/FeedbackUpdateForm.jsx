import React, { useEffect, useState } from "react";
import { useFormik, Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from 'react-redux';
import { setDataToUpdate } from "../../../features/feedback/dataUpdate/dataToUpdateSlice";

import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Select,
  TreeSelect,
  Space,
} from "antd";
import PK from "../../../assets/PK.svg";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};

const FeedbackUpdateForm = ({ dataSetter, setIsModalOpen }) => {

    //state management preparation
    const dataToUpdate = useSelector((state) => state.dataToUpdate.value);
    const dispatch = useDispatch();


  
  const [update, setUpdate] = useState(null);

  const [form] = Form.useForm();
  const formik = useFormik({
    initialValues: {
      id: "",
      email: "",
      firstName: "",
      lastName: "",
      streetAddress: "",
      workStatus: "unselected", //dropdown
      contactNumber: "",
      countryCode: "+92",
    },
    onSubmit: (values) => {
      // Before submitting, concatenate countryCode with contactNumber after cleaning
      const cleanedContactNumber = values.contactNumber
        .toString()
        .replace(/^0+/, "");
      values.contactNumber = `${values.countryCode}${cleanedContactNumber}`;
      // alert(JSON.stringify(values, null, 2));
        
      console.log("values = ", values.id);
      
      
      formik.resetForm();
      form.resetFields();

      //push to local storage table
      let feedback = JSON.parse(localStorage.getItem("feedback"));
      if (!feedback) {
        feedback = [];
      }

      //find and update feedback array with id of values.id
        const index = feedback.findIndex((item) => item.id === values.id);
        if (index !== -1) {
            feedback[index] = values;
        }

      console.log(index);
      dataSetter(feedback);
      console.log(feedback);
      localStorage.setItem("feedback", JSON.stringify(feedback));
      dispatch(setDataToUpdate(false));
      setIsModalOpen(false);
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(2, "Too Short!")
        .required("Required"),
    }),
  });

  useEffect(() => {
    if (dataToUpdate) {
      //set formik values equal to object in local storage
      console.log(dataToUpdate);

      console.log("SSS", formik.setValues);
      formik.setValues({
        id: dataToUpdate.id,
        email: dataToUpdate.email,
        firstName: dataToUpdate.firstName,
        lastName: dataToUpdate.lastName,
        streetAddress: dataToUpdate.streetAddress,
        workStatus: dataToUpdate.workStatus, //dropdown

        contactNumber: dataToUpdate.contactNumber
          ? dataToUpdate.contactNumber.replace(/^\+92/, "")
          : "",
        countryCode: "+92",
      });
      console.log(formik, "= formik value");
    }
  }, [dataToUpdate]);

  return (
    <div>
      <Form
        form={form}
        onFinish={formik.handleSubmit}
        {...formItemLayout}
        variant="filled"
        style={{
            // maxWidth: 600,
          width: "100%",
        }}
      >
        <Form.Item label="ID">
          <Input
            id="id"
            name="id"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.id}
            
            disabled
            className={
              formik.errors.id && formik.touched.id ? "input-error" : ""
            }
          />
        </Form.Item>

        <Form.Item
          label="Email"
        >
          <Input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            className={
              formik.errors.email && formik.touched.email ? "input-error" : ""
            }
          />
        </Form.Item>

        <Form.Item
          label="First Name"
          // name="firstName"
        >
          <Input
            // id="firstName"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.firstName}
            className={
              formik.errors.firstName && formik.touched.firstName
                ? "input-error"
                : ""
            }
          />
        </Form.Item>

        <Form.Item
          label="Last Name"
          // name="lastName"
        
        >
          <Input
            id="lastName"
            name="lastName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.lastName}
            className={
              formik.errors.lastName && formik.touched.lastName
                ? "input-error"
                : ""
            }
          />
        </Form.Item>

        <Form.Item
          label="Street Address"
          // name="streetAddress"
        >
          <Input
            id="streetAddress"
            name="streetAddress"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.streetAddress}
            className={
              formik.errors.streetAddress && formik.touched.streetAddress
                ? "input-error"
                : ""
            }
          />
        </Form.Item>

        <Form.Item
          label="Work Status"
          // name="workStatus"  
        >
          <Select
            id="workStatus"
            name="workStatus"
            type="text"
            onChange={(value) => formik.setFieldValue("workStatus", value)}
            value={formik.values.workStatus}
            // defaultValue={"Please select one"}
            options={[
              { value: "unselected", label: "Please select a value" },
              { value: "student", label: "Student" },
              { value: "employed", label: "Employed" },
              { value: "unemployed", label: "Unemployed" },
            ]}
            className={
              formik.errors.workStatus && formik.touched.workStatus
                ? "input-error"
                : ""
            }
          />
        </Form.Item>

        <Form.Item label="Contact Number" name="contactNumber">
          <Space.Compact block>
            <Input
              style={{
                width: "100px",
                // minWidth: "15%",
              }}
              defaultValue="+92"
              // prefix="🇵🇰"
              prefix={<img src={PK} alt="PK" style={{ width: 20 }} />}
              readOnly
              id="countryCode"
              value={formik.values.countryCode}
            />

            <Input
              style={
                {
                  // width: "85%",
                }
              }
              defaultValue=""
              id="contactNumber"
              name="contactNumber"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.contactNumber}
              placeholder="123456789"
            />
          </Space.Compact>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 0,
            sm: { offset: 6 }, // large screen: {span: 14}
            span: 14,
          }}
        >
          <Button type="primary" htmlType="submit" block size="large">
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FeedbackUpdateForm;
