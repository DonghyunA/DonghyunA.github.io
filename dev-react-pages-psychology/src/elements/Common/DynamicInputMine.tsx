import { Form, Input, Button, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

export const DynamicSecInput = ({ fieldKey }: any) => {
  const [btnCnt, setBtnCnt] = useState<number>(0);
  const [elements, setElements] = useState<JSX.Element[]>([]);
  const AddInputCnt = () => {
    setBtnCnt(btnCnt + 1);
  };
  useEffect(() => {
    AddInputForm();
  }, [btnCnt]);
  const AddInputForm = () => {
    let newElement = <>
            <Input key= {`str+${btnCnt}`} placeholder="answerStr" />
            <Input key= {`val+${btnCnt}`} placeholder="answerVal" />
        </>;
    for (let i = 0; i < btnCnt; i++) {
      setElements([...elements, newElement]);
    }
  };
  return (
    <>
      {elements}
      
      <Button
        type="dashed"
        onClick={AddInputCnt}
        style={{ width: "60%" }}
        icon={<PlusOutlined />}
      >
        더하기더하기
      </Button>
    </>
  );
};
