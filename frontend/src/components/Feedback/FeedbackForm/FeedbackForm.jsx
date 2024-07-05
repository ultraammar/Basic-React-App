import React, { useEffect, useState } from "react";
import { useFormik, Formik } from "formik";
import * as Yup from "yup";
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
  Tooltip,
} from "antd";

// import PK from 'country-flag-icons/flags/3x2/PK.svg';
import PK from "../../../assets/PK.svg";
import { FlagFilled } from "@ant-design/icons";

const { RangePicker } = DatePicker;
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

let validationSchema = Yup.object({
  firstName: Yup.string().min(2, "Too Short!").required("Required"),
  lastName: Yup.string().required("Required").min(2, "Too Short!"),
  email: Yup.string().email("Invalid email").required("Required"),
  streetAddress: Yup.string().min(5, "Too Short!").required("Required"),
  workStatus: Yup.string().notOneOf(["unselected"], "Please select a value"),
});

const yupSync = {
  async validator({ field }, value) {
    await validationSchema.validateSyncAt(field, { [field]: value });
  },
};

const FeedbackForm = ({ dataSetter }) => {
  let last_id = 0;
  if (localStorage.getItem("feedback")) {
    const tempStore = JSON.parse(localStorage.getItem("feedback"));
    if (Array.isArray(tempStore) && tempStore.length > 0) {
      last_id = tempStore[tempStore.length - 1].id;
    }
  }

  const [id, setId] = useState(last_id + 1);
  const [update, setUpdate] = useState(null);

  const [form] = Form.useForm();
  const formik = useFormik({
    initialValues: {
      id: id,
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
      setId((prev) => prev + 1);
      console.log("values = ", values.id);
      values.id = id;
      console.log("id at line 72 = ", id);
      formik.resetForm();
      form.resetFields();

      //push to local storage table
      let feedback = JSON.parse(localStorage.getItem("feedback"));
      if (!feedback) {
        feedback = [];
      }
      feedback.push(values);
      dataSetter(feedback);
      console.log(feedback);
      localStorage.setItem("feedback", JSON.stringify(feedback));
    },
    validationSchema: validationSchema,
  });

  console.log(formik.values);
  console.log(formik.values.email);
  console.log(formik.errors.firstName);
  return (
    <div>
      <p>Please fill this feedback form.</p>
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
        <Form.Item label="ID" name="id">
          <Input
            id="id"
            name="id"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.id}
            defaultValue={id}
            disabled
            className={
              formik.errors.id && formik.touched.id ? "input-error" : ""
            }
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[yupSync]}
        >
          <Input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </Form.Item>

        <Form.Item label="First Name" name="firstName" rules={[yupSync]}>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.firstName}
            className={formik.errors.firstName ? "input-error" : ""}
          />

          {/* { formik.errors.firstName ? (
            <div className="error">{formik.errors.firstName}</div>
          ) : null} */}
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[yupSync]}
        >
          <Input
            id="lastName"
            name="lastName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.lastName}
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
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            disabled={!formik.isValid}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FeedbackForm;
