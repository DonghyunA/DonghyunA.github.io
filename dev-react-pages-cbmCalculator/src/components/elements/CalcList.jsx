import React from "react";
import { Table } from "antd";
function CalcList(props) {
  console.log(props);
  const { item } = props;
  const {onDeleteBtn} = props;
  const columns = [
    {
      title: "상품명",
      dataIndex: "itemName",
      key: "itemName",
    },
    {
      title: "가로",
      dataIndex: "itemLength",
      key: "itemLength",
    },
    {
      title: "세로",
      dataIndex: "itemWidth",
      key: "itemWidth",
    },
    {
      title: "높이",
      dataIndex: "itemHeight",
      key: "itemHeight",
    },
    {
      title: "단위",
      dataIndex: "itemUnit",
      key: "itemUnit",
    },
    {
      title: "CBM",
      dataIndex: "itemCbmValue",
      key: "itemCbmValue",
      render: (text) => (
        <div>
          {text}m<sup>3</sup>
        </div>
      ),
    },
    {
      title: "20FT",
      dataIndex: "itemContainerValue1",
      key: "itemContainerValue1",
      render: (text) => <div>{text}개</div>,
    },
    {
      title: "40FT",
      dataIndex: "itemContainerValue2",
      key: "itemContainerValue2",
      render: (text) => <div>{text}개</div>,
    },
    {
      title: "40HC",
      dataIndex: "itemContainerValue3",
      render: (text) => <div>{text}개</div>,
    },
    {
        title: "삭제",
        key: "deleteBtn",
        render: (index) => <a onClick={()=>onDeleteBtn(index)}>삭제</a>,
      },
  ];
  return <Table columns={columns} dataSource={item}></Table>;
}

export default CalcList;
