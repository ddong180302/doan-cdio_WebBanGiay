import React, { useEffect, useState } from "react";
import {
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  notification,
  Row,
  Select,
} from "antd";
import { callCreateAProduct, callFetchCategory } from "../../../services/api";
const ModalCreateNewProduct = (props) => {
  const { openModalCreate, setOpenModalCreate } = props;
  const [isSubmit, setIsSubmit] = useState(false);

  const [listCategory, setListCategory] = useState([]);
  const [form] = Form.useForm();
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await callFetchCategory();
      if (res && res.data) {
        const d = res.data.map((item) => {
          return { label: item.name, value: item.id };
        });
        setListCategory(d);
      }
    };
    fetchCategory();
  }, []);

  const onFinish = async (values) => {
    const {
      category_id,
      title,
      price,
      discount,
      description,
      [image]: value,
    } = values;
    console.log(
      "chekc value: ",
      category_id,
      title,
      price,
      discount,
      description,
      [image]
    );
    setIsSubmit(true);
    const res = await callCreateAProduct(
      category_id,
      title,
      price,
      discount,
      description,
      image
    );
    if (res && res.data) {
      message.success("Tạo mới sản phẩm thành công");
      form.resetFields();
      setOpenModalCreate(false);
      await props.fetchProduct();
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: res.message,
      });
    }
    setIsSubmit(false);
  };

  const handleChangeFile = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };
  return (
    <>
      <Modal
        title="Thêm mới Sản phẩm"
        open={openModalCreate}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => setOpenModalCreate(false)}
        okText={"Tạo mới"}
        cancelText={"Hủy"}
        confirmLoading={isSubmit}
        width={"50vw"}
        maskClosable={false}
      >
        <Divider />

        <Form form={form} name="basic" onFinish={onFinish} autoComplete="off">
          <Row gutter={15}>
            <Col span={6}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Loại giày"
                name="category_id"
                rules={[
                  { required: true, message: "Vui lòng chọn loại giày!" },
                ]}
              >
                <Select showSearch allowClear options={listCategory} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Tên giày"
                name="title"
                rules={[
                  { required: true, message: "Vui lòng nhập tên hiển thị!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
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
            </Col>
            <Col span={6}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Giá tiền đã giảm"
                name="discount"
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
            </Col>

            <Col span={18}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Số lượng"
                name="quantity"
                rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
              >
                <InputNumber min={1} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Mô tả"
                name="description"
                rules={[
                  { required: true, message: "Vui lòng nhập tên hiển thị!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={image} label="Upload" valuePropName="filelist">
                <input
                  type="file"
                  className="form-control"
                  onChange={(event) => handleChangeFile(event)}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCreateNewProduct;
