import React, { useState } from "react";
import {
  Modal,
  Divider,
  Select,
  Form,
  Input,
  message,
  notification,
} from "antd";
import { callCreateAUser } from "../../../services/api";

const ModalCreateNewUser = (props) => {
  const [form] = Form.useForm();
  const { openModalCreate, setOpenModalCreate } = props;
  const [isSubmit, setIsSubmit] = useState(false);
  const onFinish = async (values) => {
    const { fullName, email, password, phone, role } = values;
    setIsSubmit(true);
    const res = await callCreateAUser(fullName, email, password, phone, role);
    if (res && res.data) {
      message.success("Tạo mới thành công!");
      form.resetFields();
      setOpenModalCreate(false);
      await props.fetchUser();
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
    setIsSubmit(false);
  };
  return (
    <>
      <Modal
        title="Thêm mới người dùng"
        open={openModalCreate}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => setOpenModalCreate(false)}
        okText={"Tạo mới"}
        cancelText={"Huỷ"}
        confirmLoading={isSubmit}
        width={"40vw"}
      >
        <Divider />
        <Form name="basic" onFinish={onFinish} form={form} autoComplete="off">
          <Form.Item
            labelCol={{ span: 24 }}
            label="Tên hiển thị"
            name="fullName"
            rules={[{ required: true, message: "Vui lòng nhập tên hiển thị!" }]}
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
                message: "E-mail bạn nhập không đúng định dạng!",
              },
              {
                required: true,
                message: "Vui lòng nhập E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24 }}
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24 }}
            label="Số điện thoại"
            name="phone"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            label="Role"
            name="role"
            rules={[{ required: true, message: "Vui lòng chọn role!" }]}
          >
            <Select>
              <Select.Option value="ADMIN">ADMIN</Select.Option>
              <Select.Option value="USER">USER</Select.Option>
              <Select.Option value="STAFF">STAFF</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCreateNewUser;
