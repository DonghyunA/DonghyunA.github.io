import { Card, Col, Image, Input, Row, Form, Button } from "antd";
import Avatar from "../Common/ImageUpload";
import React, { useEffect, useState } from "react";
import { RegisterProps } from "../../interfaces/RegisterProps";
import DynamicOneInput from "../Common/DynamicInput";
import {suiteInfo} from "../../interfaces/TestProps"
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

const RegisterFirstStep = (props: any) => {
  const {
    testTitle,
    setTestTitle,
    question,
    setQuestion,
    answerArr,
    setAnswerArr,
    onChange,
    suite,
    setSuite,
  } = props.functionSet;
  let profile_preview = null;
  const [imgInfo, setImgInfo] = useState<RegisterProps>({
    file: "",
    previewURL: "",
  });
  const showPreview = () => {
    console.log(imgInfo);
    if (imgInfo.file !== "") {
      profile_preview = (
        <Image
          className="profile_preview"
          src={imgInfo.previewURL as string}
        ></Image>
      );
    }
  };
  const onFinish = (values: suiteInfo) => {
    console.log(values);
    setSuite({suiteInfo:values, suiteArr:suite.suiteArr })
    console.log(suite);
  };
  // useEffect(() => {
  //     console.log(imgInfo)
  //     if(imgInfo.file !== ''){
  //         profile_preview = <img className='profile_preview' src={imgInfo.previewURL as string}></img>
  //       }
  // })
  const handleFileOnChange = (event: any) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      setImgInfo({
        file: file,
        previewURL: reader.result as string,
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      {/* <Input type='file' 
            accept='image/jpg,impge/png,image/jpeg,image/gif' 
            name='profile_img' 
            onChange={handleFileOnChange}>
        </Input> */}
      {/* {showPreview()} */}
      <Form
        style={{ marginTop: 20 }}
        name="dynamic_form_item"
        {...formItemLayoutWithOutLabel}
        onFinish={onFinish}
      >
        <Card title="나만의 테스트 등록" bordered={false}>
          <Row justify="center" align="middle">
            <Col>
              <FormItem label="메인에 노출될 사진 등록" name="image">
                <Row justify="center" align="middle">
                  <Col>
                    <Avatar></Avatar>
                  </Col>
                </Row>
              </FormItem>
              <FormItem label="테스트 명" name="title">
                <Input
                  type="text"
                  required
                  value={testTitle}
                  onChange={onChange}
                  className="title"
                />
              </FormItem>
              <FormItem label="질문" name="question">
                <Input
                  type="text"
                  required
                  value={question}
                  onChange={onChange}
                  className="question"
                />
              </FormItem>
              <FormItem label="결과">
                <DynamicOneInput></DynamicOneInput>
              </FormItem>

              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Card>
      </Form>
    </>
  );
};
export default RegisterFirstStep;
