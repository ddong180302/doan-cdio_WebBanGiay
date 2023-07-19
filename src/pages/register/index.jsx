import React, { useState } from "react";
import "./register.scss";
import {
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  message,
  notification,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { callRegister } from "../../services/api";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const onFinish = async (values) => {
    const { fullName, email, password, phone } = values;
    console.log(fullName, email, password, phone);
    setIsLoading(true);
    const res = await callRegister(fullName, email, password, phone);
    setIsLoading(false);
    if (res?.data?._id) {
      message.success("Đăng ký tài khoản thành công!");
      navigate("/login");
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description:
          res.message && Array.isArray(res.message)
            ? res.message[0]
            : res.message,
        duration: 5,
      });
    }
  };

  return (
    <div className="register-page" style={{ padding: "50px" }}>
      <main className="main">
        <div className="container">
          <section className="wrapper">
            <div className="heading">
              <h2 className="text text-heading" style={{ textAlign: "center" }}>
                Đăng ký người dùng mới
              </h2>
            </div>
            <Divider />
            <Form name="basic" onFinish={onFinish} autoComplete="off">
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
                <Button
                  className="text text-submit"
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                >
                  Submit
                </Button>
              </Form.Item>
              <Divider>Or</Divider>
              <div>
                <p className="text text-login">
                  Đã có tài khoản ?
                  <span>
                    <Link to={"/login"}> Đăng Nhập</Link>
                  </span>
                </p>
              </div>
            </Form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;
