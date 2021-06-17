import React from "react";
import { useHistory } from "react-router-dom";
function Main(){
    const history = useHistory();
    const onToolBtnClick = () =>{
        history.push("/cbmCalculator")
    }
    return (
        <button onClick={onToolBtnClick}>CBM 계산기</button>
    )
}
export default Main;