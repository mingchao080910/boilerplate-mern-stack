import React, { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Table, Button, Popconfirm } from "antd";
import Axios from "axios";
import "./antdTable.css";

function GanttList(props) {
  const [Data, setData] = useState([]);
  const [Update, setUpdate] = useState(0);
  //table 获取数据
  useEffect(() => {
    Axios.get("/api/gantt/getList").then((res) => {
      if (!res.data.success) return alert("获取数据错误!");
      setData(res.data.tableData);
    });
  }, [Update]);

  //跳转到编辑页面
  const pushToEdit = (text, record) => {
    if (!record) {
      props.props.history.push(`/ganttedit`);
    } else {
      props.props.history.push(`/ganttedit/${record._id}`);
    }
  };

  //删除此行数据
  const confirm = (record) => {
    Axios.delete("/api/gantt/deleteOne", {
      params: { id: record._id },
    }).then((res) => {
      if (!res.data.success) return alert("删除失败!");
      alert("删除成功!");
      let dataNew = Data.filter((d) => {
        return d._id !== record._id;
      });
      setData(dataNew);
      setUpdate(Update+1);
      props.refresh(dataNew);
    });
  };

  //定义columns表头
  const columns = [
    { title: "项目名称", dataIndex: "name", key: "name" },
    { title: "进度", dataIndex: "progress", key: "progress" },
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

  //返回table
  return (
    <div style={{ width: "20%" }}>
      <Button onClick={pushToEdit}>新增</Button>
      <Table
        columns={columns}
        dataSource={Data}
        pagination={false}
        rowKey={(record) => record._id}
      />
    </div>
  );
}

export default GanttList;
