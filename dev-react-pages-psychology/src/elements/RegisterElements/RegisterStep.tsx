import React from "react";
import { Steps, Button } from "antd";
import RegisterFirstStep from "./RegisterFirstStep";
import RegisterSecStep from "./RegisterSecStep";
import { useState } from "react";
import { TestProps } from "../../interfaces/TestProps";

const { Step } = Steps;
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
const onFinish = (values: any) => {
  console.log("Received values of form:", values);
};
const RegisterStep = (props: any) => {
  const steps = [
    {
      content: <RegisterFirstStep functionSet={props.functionSet}></RegisterFirstStep>,
    },
    {
      content: <RegisterSecStep></RegisterSecStep>,
    },
    {
      content: "Last-content",
    },
  ];
  const [current, setCurrent] = React.useState(0);
  
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  return (
    <>
      <Steps size="small" current={current}>
        <Step title="기본정보" />
        <Step title="상세정보" />
        <Step title="등록완료" />
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}

        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => console.log("Processing complete!")}
          >
            Done
          </Button>
        )}
      </div>
    </>
  );
};
export default RegisterStep;
