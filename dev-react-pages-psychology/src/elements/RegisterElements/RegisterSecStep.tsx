import { Form, Input, Button, Space, Col, Row } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import Avatar from "../Common/ImageUpload";
import DynamicInput from "../Common/DynamicInput";

const RegisterSecStep = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
  };
  return (
    <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
      <Row justify="center" align="middle">
        <Col>
          <Form.List name="detail">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <>
                    <Space
                      key={key}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="baseline"
                    >
                      <Form.Item label={key + 1 + "번째 문제의 사진"}>
                        <Row justify="center" align="middle">
                          <Col>
                            <Avatar></Avatar>
                          </Col>
                        </Row>
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                    <Form.Item label="질문" name="question">
                      <Input type="text" required className="question" />
                    </Form.Item>
                    <Form.Item label="답변" name="question">
                    <DynamicInput></DynamicInput>
                    </Form.Item>
                    <Space
                      key={key}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "first"]}
                        fieldKey={[fieldKey, "first"]}
                        rules={[
                          { required: true, message: "Missing first name" },
                        ]}
                      >
                        <Input placeholder="First Name" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "last"]}
                        fieldKey={[fieldKey, "last"]}
                        rules={[
                          { required: true, message: "Missing last name" },
                        ]}
                      >
                        <Input placeholder="Last Name" />
                      </Form.Item>
                    </Space>
                  </>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add field
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
export default RegisterSecStep;
