import { Button, Col, Form, Input, Row, theme } from "antd";
import React, { useState } from "react";
import "./inputSearch.scss";
const InputSearch = (props) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    let query = "";
    //build query
    if (values.name) {
      query += `&name=${values.name}`;
    }

    if (values.createdAt) {
      query += `&createdAt=${values.createdAt}`;
    }

    if (values.updatedAt) {
      query += `&updatedAt=${values.updatedAt}`;
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
            name={`name`}
            label={`Tên danh mục`}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            labelCol={{ span: 24 }}
            name={`createdAt`}
            label={`Ngày tạo`}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            labelCol={{ span: 24 }}
            name={`updatedAt`}
            label={`Ngày cập nhật`}
          >
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
