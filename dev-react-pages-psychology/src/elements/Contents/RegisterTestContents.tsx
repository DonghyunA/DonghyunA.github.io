import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import RegisterStep from "../RegisterElements/RegisterStep";
import { Form } from "antd";
import { TestProps } from "../../interfaces/TestProps";

const RegisterTestContents = () => {
  const history = useHistory();
  const [testTitle, setTestTitle] = useState();
  const [question, setQuestion] = useState();
  const [answerArr, setAnswerArr] = useState();
  const [suite, setSuite] = useState<TestProps>({
    suiteInfo: { image: "", title: "", question: "", answer: [] },
    suiteArr: [],
  });
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

  const functionSet = {
    testTitle,
    setTestTitle,
    question,
    setQuestion,
    answerArr,
    setAnswerArr,
    onChange,
    suite,
    setSuite,
  };
  return (
    <>
      <RegisterStep functionSet={functionSet}></RegisterStep>
    </>
  );
};
export default RegisterTestContents;
