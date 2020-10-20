import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Form, Button, Input } from "antd";

function GanttCategoryEdit(props) {
  const [Category, setCategory] = useState("");
  const [SubCategory, setSubCategory] = useState("");
  const [Color, setColor] = useState("#000080");
  //save data
  const submit = () => {
   
    //如果有id,那么就更新数据库
    //保存到数据库
    const variables = {
      Category,
      SubCategory,
      Color,
      id:props.match.params.id?props.match.params.id:""
    };

    Axios.post("/api/gantt/category", variables).then((res) => {
      if (!res.data.success) return alert("保存失败!");
      //else 保存成功
      alert("保存成功!");
      //跳转到列表界面
      props.history.push("/ganttCategoryList");
    });
  };
  //cancel data ,jump to listpage
  const cancel = () => {
    props.history.push("/ganttCategoryList");
  };
  //get data
  useEffect(() => {

    if(!props.match.params.id) return;
    Axios.get("/api/gantt/category", {
      params: {
        id: props.match.params.id,
      },
    }).then((res) => {
      //update inputbox  and variables
      if(!res.data.success) return alert("没有数据!")
      let data=res.data.tableData[0]
      setCategory(data.Category)
      setSubCategory(data.SubCategory)
      setColor(data.Color)
    });
  }, []);

  return (
    <div style={{ width: "400px", margin: "auto auto " }}>
      <Form>
        <Form.Item label="大类">
          <Input
            type="text"
            value={Category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="小类">
          <Input
            type="text"
            value={SubCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="颜色">
          <Input
            type="color"
            value={Color}
            onChange={(e) => setColor(e.target.value)}
          />
        </Form.Item>

        <Button onClick={submit}>提交</Button>
        <Button onClick={cancel}>取消</Button>
      </Form>
    </div>
  );
}

export default GanttCategoryEdit;
