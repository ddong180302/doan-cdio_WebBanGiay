import React, { useEffect, useState } from "react";
import { Divider, Form, Modal, message, notification, Input } from "antd";
import { callUpdateCategory } from "../../../services/api";

const CategoryModalUpdate = (props) => {
  const [form] = Form.useForm();
  const { openModalUpdate, setOpenModalUpdate, dataUpdate, setDataUpdate } =
    props;
  const [isSubmit, setIsSubmit] = useState(false);
  const onFinish = async (values) => {
    const { id, name } = values;
    setIsSubmit(true);
    const res = await callUpdateCategory(id, name);
    if (res && res.data) {
      message.success("Cập nhật danh mục thành công");
      setOpenModalUpdate(false);
      await props.fetchCategory();
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
        title="Cập nhật danh mục"
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

export default CategoryModalUpdate;
