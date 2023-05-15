import React from "react";
import "./register.scss";
import { Button, Checkbox, Divider, Form, Input } from "antd";

const onFinish = (values) => {
  console.log("Success:", values);
};

const RegisterPage = () => {
  return (
    <div className="register-page" style={{ padding: "50px" }}>
      <main className="main">
        <div className="container">
          <section className="wrapper">
            <div className="heading">
              <h2 className="text" style={{ textAlign: "center" }}>
                Đăng ký người dùng mới
              </h2>
            </div>
            <Divider />
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600, margin: "0 auto" }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                labelCol={{ span: 24 }}
                label="Full Name"
                name="fullName"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Email"
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }}
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }}
                label="Phone"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={false}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;
