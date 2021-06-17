/** @jsxImportSource @emotion/react */
import React from "react";
import { Row, Col, Form, Card, Radio, Divider } from "antd";
import "antd/dist/antd.css";
import { css } from "@emotion/react";
const FormItem = Form.Item;
function CalcInput(props) {
  const {
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
  } = props.stateInfo;

  const onChange = (event) => {
    console.log(event);
    const {
      target: { name, value },
    } = event;
    if (name === "length") {
      setLength(value);
    } else if (name === "width") {
      setWidth(value);
    } else if (name === "height") {
      setHeight(value);
    } else if (name === "size") {
      setUnit(value);
    } else if (name === "itemName"){
      setItemName(value);
    }
    setCbmValue((length * width * height) / unit);
    // if (length && width && height){
    //     setCbmValue(length*width*height);
    // }
  };
  const myFontSize = 20;
  // const handleSizeChange = (event) =>{
  //   event
  // }
  return (
    <>
      <div className="site-card-border-less-wrapper">
        <Card title="CBM 계산기" bordered={false} style={{ width: 900 }}>
          <Row>
            <Radio.Group
              name="size"
              onChange={onChange}
              defaultValue="1000000000"
            >
              <Radio.Button value="1000000000">mm</Radio.Button>
              <Radio.Button value="1000000">cm</Radio.Button>
              <Radio.Button value="1">m</Radio.Button>
            </Radio.Group>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col span={8}>
              <Form style={{ marginTop: 20 }}>
              <FormItem label="상품명">
                  <input
                    name="itemName"
                    type="text"
                    required
                    value={itemName}
                    onChange={onChange}
                    className="itemName"
                  />
                </FormItem>
                <FormItem label="* 가로">
                  <input
                    name="length"
                    type="text"
                    required
                    value={length}
                    onChange={onChange}
                    className="cbmLength"
                    number="true"
                  />
                </FormItem>
                <FormItem label="* 세로">
                  <input
                    name="width"
                    type="text"
                    required
                    value={width}
                    onChange={onChange}
                    className="cbmWidth"
                    number="true"
                  />
                </FormItem>
                <FormItem label="* 높이">
                  <input
                    name="height"
                    type="text"
                    required
                    value={height}
                    onChange={onChange}
                    className="cbmHeight"
                    number="true"
                  />
                </FormItem>
              </Form>
            </Col>
            <Col span={16}>
              <Row>
                <Col span={3}>
                  <div style={{ fontSize: myFontSize, textAlign: "left" }}>
                    CBM
                  </div>
                </Col>
                <Col flex="auto">
                  <div style={{ fontSize: myFontSize }}>
                    : {cbmValue} m<sup>3</sup>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Divider orientation="center">적재가능 갯수</Divider>
                </Col>
              </Row>
              <Row>
                <Col span={3}>
                  <div style={{ fontSize: myFontSize, textAlign: "left" }}>
                    20FT
                  </div>
                </Col>
                <Col flex="auto">
                  <div style={{ fontSize: myFontSize }}>
                    : {Math.round(27 / cbmValue)} 개
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={3}>
                  <div style={{ fontSize: myFontSize, textAlign: "left" }}>
                    40FT
                  </div>
                </Col>
                <Col flex="auto">
                  <div style={{ fontSize: myFontSize }}>
                    : {Math.round(56 / cbmValue)} 개
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={3}>
                  <div style={{ fontSize: myFontSize, textAlign: "left" }}>
                    40HC
                  </div>
                </Col>
                <Col flex="auto">
                  <div style={{ fontSize: myFontSize }}>
                    : {Math.round(68 / cbmValue)} 개
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
}
export default CalcInput;

