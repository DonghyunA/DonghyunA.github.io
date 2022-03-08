import { Form, Input, Button, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

export const DynamicSecInput2 = ({fieldKey}:any) => {
  {console.log(fieldKey)}
  return (
    <Form.List
    name={[fieldKey, "answerArr"]}
      rules={[
        {
          validator: async (_, names) => {
            if (!names || names.length < 2) {
              return Promise.reject(new Error("At least 2 passengers"));
            }
          },
        },
      ]}
    >
      {(fields, { add, remove }, { errors }) => (
        <>
          {fields.map((field) => (
            <>
              <Form.Item
                {...field}
                validateTrigger={["onChange", "onBlur"]}
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message:
                      "Please input passenger's name or delete this field.",
                  },
                ]}
                noStyle
                fieldKey={[field.fieldKey, "tempa"]}
                name={[field.fieldKey, "tempa"]}
              >
                <Space
                  key={field.key}
                  style={{ display: "flex", marginBottom: 8}}
                  align="baseline"
                >
                  <Form.Item
                    {...field}
                    name={[field.name, "answerStr"]}
                    fieldKey={[field.fieldKey, "answerStr"]}
                    rules={[{ required: true, message: "Missing first name" }]}
                  >
                    <Input placeholder="answerStr" />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, "answerVal"]}
                    fieldKey={[field.fieldKey, "answerVal"]}
                    rules={[{ required: true, message: "Missing last name" }]}
                  >
                    <Input placeholder="answerVal" />
                  </Form.Item>

                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      style={{
                        position: "relative",
                        top: "4px",
                        margin: "0 8px",
                        color: "#999",
                        fontSize: "24px",
                        cursor: "pointer",
                        transition: "all 0.3s",
                      }}
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </Space>
              </Form.Item>
            </>
          ))}
          <Form.Item>
            <Button
              type="dashed"
              onClick={() => add()}
              style={{ width: "60%" }}
              icon={<PlusOutlined />}
            >
              Add field
            </Button>
            <Button
              type="dashed"
              onClick={() => {
                add("The head item", 0);
              }}
              style={{ width: "60%", marginTop: "20px" }}
              icon={<PlusOutlined />}
            >
              Add field at head
            </Button>
            <Form.ErrorList errors={errors} />
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

const DynamicOneInput = () => {
  return (
    <Form.List
      name="answer"
      rules={[
        {
          validator: async (_, names) => {
            if (!names || names.length < 2) {
              return Promise.reject(new Error("At least 2 passengers"));
            }
          },
        },
      ]}
    >
      {(fields, { add, remove }, { errors }) => (
        <>
          {fields.map((field, index) => (
            <Form.Item
              {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
              label={index === 0 ? "Passengers" : ""}
              required={false}
              key={field.key}
            >
              <Form.Item
                {...field}
                validateTrigger={["onChange", "onBlur"]}
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message:
                      "Please input passenger's name or delete this field.",
                  },
                ]}
                noStyle
              >
                <Input placeholder="passenger name" style={{ width: "60%" }} />
              </Form.Item>
              {fields.length > 1 ? (
                <MinusCircleOutlined
                  style={{
                    position: "relative",
                    top: "4px",
                    margin: "0 8px",
                    color: "#999",
                    fontSize: "24px",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                  onClick={() => remove(field.name)}
                />
              ) : null}
            </Form.Item>
          ))}
          <Form.Item>
            <Button
              type="dashed"
              onClick={() => add()}
              style={{ width: "60%" }}
              icon={<PlusOutlined />}
            >
              Add field
            </Button>
            <Button
              type="dashed"
              onClick={() => {
                add("The head item", 0);
              }}
              style={{ width: "60%", marginTop: "20px" }}
              icon={<PlusOutlined />}
            >
              Add field at head
            </Button>
            <Form.ErrorList errors={errors} />
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};
export default DynamicOneInput;
