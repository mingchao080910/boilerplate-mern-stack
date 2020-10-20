import React, { useState, useEffect } from "react";
import { Table, Button, Popconfirm } from "antd";
import Axios from "axios";
import { BookFilled, EditOutlined, DeleteOutlined } from "@ant-design/icons";

function GanttCategoryList(props) {
  const [Data, setData] = useState([]);
  const pushToEdit = (text, record) => {
    if (!record) {
      props.history.push(`/ganttCategoryEdit`);
    } else {
      props.history.push(`/ganttCategoryEdit/${record._id}`);
    }
  };

  const confirm = (record) => {
    Axios.delete("/api/gantt/category", { params: { id: record._id } }).then((res) => {
      if (!res.data.success) return alert("删除失败", res.data.err);
      const dataAfterDelete = Data.filter((d) => d._id !== record._id);
      setData(dataAfterDelete);
    });
  };
  //columns
  const columns = [
    { title: "大类", dataIndex: "Category", key: "Category" },
    { title: "小类", dataIndex: "SubCategory", key: "SubCategory" },
    {
      title: "颜色",
      dataIndex: "Color",
      key: "Color",

      render: (text) => (
        <>
          <BookFilled style={{ color: `${text}` }} />
        </>
      ),
    },
    {
      title: "action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <>
          <Popconfirm
            placement="top"
            title="确定要删除吗?"
            onConfirm={() => confirm(record)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined style={{ marginRight: "15px" }} />
          </Popconfirm>
          <EditOutlined onClick={() => pushToEdit(text, record)} />
        </>
      ),
    },
  ];

  //table data source
  useEffect(() => {
    //getData
    Axios.get("/api/gantt/category").then((res) => {
      if (!res.data.success) return alert("获取数据失败!");
      //成功后赋值给Data
      setData(res.data.tableData);
    });
  }, []);

  return (
    <div style={{ width: "400px", margin: "auto 20px " }}>
      <Button onClick={pushToEdit}>新增</Button>
      <Table columns={columns} dataSource={Data}  rowKey={record=>record._id}/>
    </div>
  );
}   

export default GanttCategoryList
