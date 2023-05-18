import { Button, Checkbox, Divider, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
const LoginPage = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
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
                  loading={false}
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
