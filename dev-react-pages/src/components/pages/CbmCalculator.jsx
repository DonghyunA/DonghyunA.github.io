import React, { useState, useEffect } from "react";
import CalcBtn from "../elements/CalcBtn";
import CalcInput from "../elements/CalcInput";
import CalcList from "../elements/CalcList";
import "antd/dist/antd.css";
import { Divider, Row, Col } from "antd";
function CbmCalculator() {
  const [key,setKey] = useState(1);
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState("1000000000");
  const [count, setCount] = useState("");
  const [cbmValue, setCbmValue] = useState("");
  const [items, setItems] = useState([]);
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
  const onClickedAddBtn = () =>{
    const item = {
      key:key,
      itemLength:length,
      itemWidth:width,
      itemHeight:height,
      itemUnit:unit,
      itemCbmValue:cbmValue,
      itemContainerValue1:Math.round(27 / cbmValue),
      itemContainerValue2:Math.round(56 / cbmValue),
      itemContainerValue3:Math.round(68 / cbmValue)
    }
    setItems(items.concat(item))
    setKey(key+1)
    setLength(0)
    setWidth(0)
    setHeight(0)
    console.log(item)
  }
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
              <CalcBtn onClickedAddBtn={onClickedAddBtn}></CalcBtn>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Divider orientation="left">Result</Divider>
              <CalcList item={items}></CalcList>
            </Col>
          </Row>
        </Col>
        <Col span={4}></Col>
      </Row>
    </>
  );
}

export default CbmCalculator;
