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
import { callCreateACategory } from "../../../services/api";

const ModalCreateNewCategory = (props) => {
  const [form] = Form.useForm();
  const { openModalCreate, setOpenModalCreate } = props;
  const [isSubmit, setIsSubmit] = useState(false);
  const onFinish = async (values) => {
    const { name } = values;
    setIsSubmit(true);
    const res = await callCreateACategory(name);
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
        title="Thêm mới danh mục"
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
            label="Tên danh mục"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên danh mục!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCreateNewCategory;
