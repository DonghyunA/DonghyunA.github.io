import React, { useState, useEffect } from "react";
import CalcBtn from "../elements/CalcBtn";
import CalcInput from "../elements/CalcInput";
import CalcList from "../elements/CalcList";
import SideAd from "./SideAd";
import ContentAd from "./contentAd";
import "antd/dist/antd.css";
import { Divider, Row, Col } from "antd";
function CbmCalculator() {
  const [itemName, setItemName] = useState("");
  const [key,setKey] = useState(1);
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState("1000000000");
  const [count, setCount] = useState("");
  const [cbmValue, setCbmValue] = useState("");
  const [items, setItems] = useState([]);
  const stateInfo = {
    itemName,
    setItemName,
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
  const getUnitText=(unit)=>{
    var rtn = ''
    console.log(unit)
    switch(unit){
      case '1000000000':
        rtn = 'mm';
        break;
      case '1000000':
        rtn = 'cm';
        break;
      case '1':
        rtn = 'm';
        break;
      default:
        rtn = 'mm';
        break;
    }
    return rtn
  }
  const getItemName = ()=>{
    if(itemName){
      return itemName;
    }
    else{
      return "item" + key
    }
  }
  const onDeleteBtn= (del_item)=>{
    setItems(items.filter((item)=> item.key !==del_item.key))
  }
  const onClickedAddBtn = () =>{
    const item = {
      key:key,
      itemName:getItemName(),
      itemLength:length,
      itemWidth:width,
      itemHeight:height,
      itemUnit:getUnitText(unit),
      itemCbmValue:cbmValue,
      itemContainerValue1:Math.round(27 / cbmValue),
      itemContainerValue2:Math.round(56 / cbmValue),
      itemContainerValue3:Math.round(68 / cbmValue),
    }
    setItems(items.concat(item))
    setKey(key+1)
    setLength('')
    setWidth('')
    setHeight('')
    setItemName('')
  }
  return (
    <>
    <SideAd></SideAd>
      <Row>
        <Col span={4}>
          <SideAd></SideAd>
        </Col>
        <Col span={11}>
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
              <CalcList item={items} onDeleteBtn={onDeleteBtn}></CalcList>
            </Col>
          </Row>
        </Col>
        <Col span={4}>
        <ContentAd></ContentAd>
        </Col>
      </Row>
      <SideAd></SideAd>
    </>
  );
}

export default CbmCalculator;
