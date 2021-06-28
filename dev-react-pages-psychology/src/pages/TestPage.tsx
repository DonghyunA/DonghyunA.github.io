import { Row, Col, Image, Button, Progress } from "antd";
import React, { useState } from "react";
import { TestProps } from "../interfaces/TestProps";

const TestPage: React.FC<TestProps> = (props) => {
  // const makeBtn = () =>{
  //     return (

  //     )
  // }
  const [step, setStep] = useState(0);

  const selectBtn = () => {
    const nextStep = step + 1;
    if (nextStep >= props.suiteArr.length) {
      // 결과 페이지로 이동
      console.log("마지막 페이지로 이동시켜줘..");
    } else {
      setStep(step + 1);
    }
  };
  return (
    <>
      <Row justify="center" align="middle">
        <Progress
          percent={(step / props.suiteArr.length) * 100}
          status="active"
        />
      </Row>

      <Row justify="center" align="middle">
        {/* <Col span={16} offset={4}> */}
        <Col>
          <Image
            width={400}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          ></Image>
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col></Col>
      </Row>
      {props.suiteArr[step].answerArr.map((element, index) => (
        <Row
          justify="center"
          align="middle"
          style={{ marginTop: 10 }}
          key={index}
        >
          <Col
            xs={{ span: 20 }}
            sm={{ span: 17 }}
            md={{ span: 15 }}
            lg={{ span: 12 }}
            xl={{ span: 10 }}
            xxl={{ span: 7 }}
            key={index}
          >
            <Button block key={index} onClick={selectBtn}>
              {element.answerStr}
            </Button>
          </Col>
        </Row>
      ))}
    </>
  );
};

export default TestPage;
