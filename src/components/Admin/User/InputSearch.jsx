import { Button, Col, Form, Input, Row, theme } from "antd";
import React, { useState } from "react";
import "./inputSearch.scss";
const InputSearch = (props) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    let query = "";
    //build query
    if (values.fullName) {
      query += `&fullName=${values.fullName}`;
    }

    if (values.email) {
      query += `&email=${values.email}`;
    }

    if (values.phone) {
      query += `&phone=${values.phone}`;
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
          <Form.Item labelCol={{ span: 24 }} name={`fullName`} label={`Name`}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item labelCol={{ span: 24 }} name={`email`} label={`Email`}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            labelCol={{ span: 24 }}
            name={`phone`}
            label={`Số điện thoại`}
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
