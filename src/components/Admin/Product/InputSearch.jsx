import { Button, Col, Form, Input, Row, theme } from "antd";
import React, { useState } from "react";
import "./inputSearch.scss";
const InputSearch = (props) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    let query = "";
    //build query
    if (values.product_id) {
      query += `&product_id=${values.product_id}`;
    }

    if (values.title) {
      query += `&title=${values.title}`;
    }

    if (values.price) {
      query += `&price=${values.price}`;
    }

    if (query) {
      props.handleSearch(query);
    }
  };
  return (
    <Form
      form={form}
      name="advanced_search"
      //style={formStyle}
      onFinish={onFinish}
    >
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item
            labelCol={{ span: 24 }}
            name={`product_id`}
            label={`Mã danh mục`}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            labelCol={{ span: 24 }}
            name={`title`}
            label={`Tên sản phẩm`}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item labelCol={{ span: 24 }} name={`price`} label={`Giá`}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24} className="row-btn" justify="end">
        <Button type="primary" htmlType="submit">
          Search
        </Button>
        <Button
          onClick={() => {
            form.resetFields();
            props.setFilter("");
          }}
        >
          Clear
        </Button>
      </Row>
    </Form>
  );
};

export default InputSearch;
