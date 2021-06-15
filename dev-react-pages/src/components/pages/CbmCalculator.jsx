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
        <Col span={4}></Col>
        <Col span={9}>
          <Row>
            <CalcInput stateInfo={stateInfo}></CalcInput>
          </Row>
          <Row>
            <Col span={14} offset={5}>
              <CalcBtn></CalcBtn>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Divider orientation="left">Result</Divider>
              <CalcList></CalcList>
            </Col>
          </Row>
        </Col>
        <Col span={4}></Col>
      </Row>
    </>
  );
}

export default CbmCalculator;
