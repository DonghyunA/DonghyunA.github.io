import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import RegisterStep from "../RegisterElements/RegisterStep";
import { Form } from "antd";
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
const RegisterTestContents = () => {
  const history = useHistory();
  const [testTitle, setTestTitle] = useState();
  const [question, setQuestion] = useState();
  const [answerArr, setAnswerArr] = useState();
  const onChange = (event: any) => {
    console.log(event);
    const {
      target: { name, value },
    } = event;
    if (name === "title") {
      setTestTitle(value);
    } else if (name === "question") {
      setQuestion(value);
    } else if (name === "answer") {
      setAnswerArr(value);
    }
    // if (length && width && height){
    //     setCbmValue(length*width*height);
    // }
  };
  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
  };
  const functionSet = {
    testTitle,
    setTestTitle,
    question,
    setQuestion,
    answerArr,
    setAnswerArr,
    onChange,
  };
  return (
    <>
      <Form
        style={{ marginTop: 20 }}
        name="dynamic_form_item"
        {...formItemLayoutWithOutLabel}
        onFinish={onFinish}
      >
        <RegisterStep functionSet={functionSet}></RegisterStep>
      </Form>
    </>
  );
};
export default RegisterTestContents;
