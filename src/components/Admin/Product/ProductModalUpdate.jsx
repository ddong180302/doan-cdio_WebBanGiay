import React, { useEffect, useState } from "react";
import {
  Divider,
  Form,
  Modal,
  message,
  notification,
  Input,
  InputNumber,
} from "antd";
import { callUpdateProduct } from "../../../services/api";

const ProductModalUpdate = (props) => {
  const [form] = Form.useForm();
  const { openModalUpdate, setOpenModalUpdate, dataUpdate, setDataUpdate } =
    props;
  const [isSubmit, setIsSubmit] = useState(false);
  const [thumbnail, setThumbnail] = useState("");
  const onFinish = async (values) => {
    const { id, name, price, quantity } = values;
    console.log("ch: ", name, price, quantity);
    setIsSubmit(true);
    const res = await callUpdateProduct(id, name, price, quantity);
    console.log(res);
    if (res && res.data) {
      message.success("Cập nhật sản phẩm thành công");
      setOpenModalUpdate(false);
      setDataUpdate("");
      form.resetFields();
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

  const handleChangeFile = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setThumbnail(event.target.files[0]);
    }
  };
  return (
    <>
      <Modal
        title="Cập nhật sản phẩm"
        open={openModalUpdate}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => {
          setOpenModalUpdate(false);
          setIsSubmit(false);
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
            label="Tên sản phẩm"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            label="Giá tiền"
            name="price"
            rules={[{ required: true, message: "Vui lòng nhập giá tiền!" }]}
          >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              addonAfter="VND"
            />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            label="Số lượng"
            name="quantity"
            rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
          >
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name={thumbnail} label="Upload" valuePropName="filelist">
            <input
              type="file"
              className="form-control"
              onChange={(event) => handleChangeFile(event)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ProductModalUpdate;
