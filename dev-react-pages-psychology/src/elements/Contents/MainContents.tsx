import { Col, Row, Button } from "antd";
import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const MainContents = () => {
    const history = useHistory();
    const onRegisterBtnClick = () => {
      history.push("/register");
    };
  
  return (
    <Row justify="center" align="middle">
      <Col>
        <Button type="primary" icon={<PlusOutlined />} onClick={onRegisterBtnClick}>
          나만의 테스트 등록
        </Button>
        <Button type="primary" icon={<PlusOutlined />}>
          나만의 테스트 등록
        </Button>
      </Col>
    </Row>
  );
};
export default MainContents;
