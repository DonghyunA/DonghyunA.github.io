import { Card, Col, Image, Input, Row, Form } from "antd";
import Avatar from "../Common/ImageUpload";
import React, { useEffect, useState } from "react";
import { RegisterProps } from "../../interfaces/RegisterProps";
import DynamicInput from "../Common/DynamicInput"
const FormItem = Form.Item;
const RegisterFirstStep = (props:any) => {
    const {
        testTitle,
        setTestTitle,
        question,
        setQuestion,
        answerArr,
        setAnswerArr,
        onChange
      } = props
    let profile_preview = null;
    const [imgInfo, setImgInfo] = useState<RegisterProps>({file:'',previewURL:''});
    const showPreview = () => {
        console.log(imgInfo)
        if(imgInfo.file !== ''){
            profile_preview = <Image className='profile_preview' src={imgInfo.previewURL as string}></Image>
          }
    }
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
            file : file,
            previewURL : reader.result as string
          })
        }
        reader.readAsDataURL(file);
      }
    return (
        <>
        {/* <Input type='file' 
            accept='image/jpg,impge/png,image/jpeg,image/gif' 
            name='profile_img' 
            onChange={handleFileOnChange}>
        </Input> */}
        {/* {showPreview()} */}
        <Card title="나만의 테스트 등록" bordered={false}>
      <Row justify="center" align="middle">
        <Col>
          <Form style={{ marginTop: 20 }}>
          <FormItem label="메인에 노출될 사진 등록">
              <Row justify="center" align="middle">
                  <Col><Avatar ></Avatar></Col>
              </Row>

          </FormItem>
            <FormItem label="테스트 명">
              <Input
                name="title"
                type="text"
                required
                value={testTitle}
                onChange={onChange}
                className="title"
              />
            </FormItem>
            <FormItem label="질문">
              <Input
                name="question"
                type="text"
                required
                value={question}
                onChange={onChange}
                className="question"
              />
            </FormItem>
            <FormItem label="결과">
              <DynamicInput></DynamicInput>
            </FormItem>
          </Form>
        </Col>
      </Row>
    </Card>

      </>
    )
}
export default RegisterFirstStep;