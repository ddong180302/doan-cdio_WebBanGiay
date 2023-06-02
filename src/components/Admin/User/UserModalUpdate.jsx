import React, { useEffect, useState } from "react";
import { Divider, Form, Modal, message, notification, Input } from "antd";
import { callUpdateUser } from "../../../services/api";

const UserModalUpdate = (props) => {
  const [form] = Form.useForm();
  const { openModalUpdate, setOpenModalUpdate, dataUpdate, setDataUpdate } =
    props;
  const [isSubmit, setIsSubmit] = useState(false);
  const onFinish = async (values) => {
    const { id, fullName, phone } = values;
    setIsSubmit(true);
    const res = await callUpdateUser(id, fullName, phone);
    if (res && res.data) {
      message.success("Cập nhật user thành công");
      setOpenModalUpdate(false);
      await props.fetchUser();
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: res.message,
      });
    }
    setIsSubmit(false);
  };

  useEffect(() => {
    form.setFieldsValue(dataUpdate);
  }, [dataUpdate]);

  return (
    <>
      <Modal
        title="Cập nhật người dùng"
        open={openModalUpdate}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => {
          setOpenModalUpdate(false);
          //setDataUpdate(null);
        }}
        okText={"Cập nhật"}
        cancelText={"Huỷ"}
        confirmLoading={isSubmit}
        width={"40vw"}
      >
        <Divider />
        <Form form={form} name="basic" onFinish={onFinish} autoComplete="off">
          <Form.Item
            hidden
            labelCol={{ span: 24 }}
            label="ID"
            name="id"
            rules={[{ required: true, message: "Vui lòng nhập id!" }]}
          >
            <Input />
          </Form.Item>
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
            <Input disabled />
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
        </Form>
      </Modal>
    </>
  );
};

export default UserModalUpdate;
