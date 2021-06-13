/** @jsxImportSource @emotion/react */
import React from "react";
import { Row, Col, Form, Card, Radio } from "antd";
import "antd/dist/antd.css";
import { css } from "@emotion/react";
const FormItem = Form.Item;
function CalcInput(props) {
  const {
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
    }
    setCbmValue(length * width * height / unit);
    // if (length && width && height){
    //     setCbmValue(length*width*height);
    // }
  };

  // const handleSizeChange = (event) =>{
  //   event
  // }
  return (
    <>
      <div className="site-card-border-less-wrapper">
        <Card title="CBM 계산기" bordered={false} style={{ width: 700 }}>
          <Row>
            <Radio.Group name="size" onChange={onChange} defaultValue="1000000">
              <Radio.Button value="1000000">mm</Radio.Button>
              <Radio.Button value="1000">cm</Radio.Button>
              <Radio.Button value="1">m</Radio.Button>
            </Radio.Group>
          </Row>
          <Row style={{marginTop:10}}>
            <Col xs={{ span: 8, offset: 0 }} lg={{ span: 8, offset: 0 }}>
              <Form>
                <FormItem>
                  <FormItem label="가로">
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
                  <FormItem label="세로">
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
                  <FormItem label="높이">
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
                </FormItem>
              </Form>
            </Col>
            <Col xs={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2}}>
              <div style={{fontSize:40, textAlign:"center"}}>CBM(m3) : {cbmValue}</div>
            </Col>
          </Row>
        </Card>
      </div>

    </>
  );
}
export default CalcInput;

const cardLayoutCss = css`
  display: flex;
  align-items: center;
`;
