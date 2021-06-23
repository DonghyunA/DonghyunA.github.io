import { Col, Row, Card, Form } from "antd";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
const FormItem = Form.Item;
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
  return (
    <Card title="나만의 테스트 등록" bordered={false}>
      <Row justify="center" align="middle">
        <Col>
          <Form style={{ marginTop: 20 }}>
            <FormItem label="테스트 명">
              <input
                name="title"
                type="text"
                required
                value={testTitle}
                onChange={onChange}
                className="title"
              />
            </FormItem>
            <FormItem label="질문">
              <input
                name="question"
                type="text"
                required
                value={question}
                onChange={onChange}
                className="question"
              />
            </FormItem>
            <FormItem label="답변">
              <input
                name="answer"
                type="text"
                required
                value={answerArr}
                onChange={onChange}
                className="answer"
              />
            </FormItem>
          </Form>
        </Col>
      </Row>
    </Card>
  );
};
export default RegisterTestContents;
