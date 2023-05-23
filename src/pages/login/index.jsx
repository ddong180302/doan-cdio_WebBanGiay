import { Button, Divider, Form, Input, message, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { callLogin } from "../../services/api";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { doLoginAction } from "../../redux/account/accountSlice";
const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    const { email, password } = values;
    setIsLoading(true);
    const res = await callLogin(email, password);
    setIsLoading(false);
    if (res?.data) {
      localStorage.setItem("access_token", res.data.access_token);
      dispatch(doLoginAction(res.data.user));
      message.success("Đăng nhập tài khoản thành công!");
      navigate("/");
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
    <div className="login-page">
      <main className="main">
        <div className="container">
          <section className="wrapper">
            <div className="heading">
              <h2 className="text text-heading">Đăng Nhập</h2>
            </div>
            <Divider />
            <Form name="basic" onFinish={onFinish} autoComplete="off">
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
                  Chưa có tài khoản ?
                  <span>
                    <Link to={"/register"}> Đăng Kí</Link>
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

export default LoginPage;
