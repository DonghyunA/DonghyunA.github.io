import React from "react";
import { Button } from 'antd';

function CalcBtn(props) {
    console.log(props)
    const {onClickedAddBtn} = props;
    return (
        <Button type="primary" block onClick={onClickedAddBtn}>추가하기</Button>
    )
}

export default CalcBtn;