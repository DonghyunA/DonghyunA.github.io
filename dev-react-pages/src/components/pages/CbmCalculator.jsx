import React, { useState, useEffect } from "react";
import CalcBtn from "../elements/CalcBtn";
import CalcInput from "../elements/CalcInput";
import CalcList from "../elements/CalcList";
import "antd/dist/antd.css";
import { Divider, Row, Col } from "antd";
function CbmCalculator() {
  const [update, setUpdate] = useState(false);
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState("1000000");
  const [count, setCount] = useState("");
  const [cbmValue, setCbmValue] = useState("");
  const stateInfo = {
    length,
    setLength,
    width,
    setWidth,
    setHeight,
    height,
    unit,
    setUnit,
    cbmValue,
    setCbmValue,
  };
  useEffect(() => {
    setCbmValue((length * width * height) / unit);
  });
  return (
    <>
      <Row>
        <CalcInput stateInfo={stateInfo}></CalcInput>
      </Row>
      <Row>
        <Col span={8}>
          <CalcBtn></CalcBtn>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Divider orientation="center">Default Size</Divider>
          <CalcList></CalcList>
        </Col>
      </Row>
    </>
  );
}

export default CbmCalculator;
