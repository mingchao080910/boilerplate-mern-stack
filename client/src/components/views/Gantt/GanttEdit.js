import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  Button,
  Form,
  Input,
  DatePicker,
  InputNumber,
  Card,
  Divider,
  Select,
} from "antd";
import Axios from "axios";
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
function GanttEdit(props) {
  //保存表单数据到变量
  const [name, setname] = useState("");
  const [category, setcategory] = useState("");
  const [categories, setcategories] = useState([]);
  const [categoryData, setcategoryData] = useState([]);
  const [subCategory, setsubCategory] = useState("");
  const [subCategories, setsubCategories] = useState([]);
  const [start, setstart] = useState(new Date());
  const [end, setend] = useState(new Date());
  const [progress, setprogress] = useState(0);
  const [comments, setcomments] = useState("");

  //获取categoryData,传参id为undifined,这样可以获取全部数据
  useEffect(() => {
    Axios.get("/api/gantt/category", { params: { id: undefined } }).then(
      (res) => {
        if (res.data.success) {
          //get tableData
          setcategoryData(res.data.tableData);
        }
      }
    );
  }, []);
  //获取ganttlist的数据
  useEffect(() => {
    //没有id的话返回
    if (!props.match.params.id) return;
    Axios.get("/api/gantt/getList", {
      params: { id: props.match.params.id },
    }).then((res) => {
      if (!res.data.success) return alert("查询错误");
      let data = res.data.tableData[0];
      setname(data.name);
      setcategory(data.categoryID?.Category);
      setsubCategory(data.categoryID?.SubCategory);
      setstart(data.start);
      setend(data.end);
      setprogress(data.progress);
      setcomments(data.comments);
    });
  }, []);
  //保存数据
  const save = (event) => {
    const categoryID = categoryData.find((d) => {
      return d.Category === category && d.SubCategory === subCategory;
    })?._id;
    //阻止默认提交
    const lists = {
      _id: props.match.params.id,
      name,
      categoryID,
      start,
      end,
      progress,
      comments,
    };
    event.preventDefault();
    Axios.post("/api/gantt/ganttList", lists).then((res) => {
      if (res.data.success) {
        // ReactDOM.render(<Alert message="Success Text" type="success" />);
        alert("保存成功");
        //跳转到列表页面
        props.history.push("/gantt");
      } else {
        // return <Alert message="保存成功!" type="success" banner closable />;
        alert("保存失败");
      }
    });
  };
  //取消保存
  const cancel = () => {
    props.history.push("/gantt");
  };
  //日期range改变后的回调函数
  const dateChange = (date) => {
    setstart(date[0]);
    setend(date[1]);
  };
  //按钮布局
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  //on Category focus
  const onCategoryFocus = () => {
    //get categories
    let cates = [...new Set(categoryData.map((d) => d.Category))];
    setcategories(cates);
  };
  // on subCategory focus
  const onSubCategoryFocus = () => {
    let cates = categoryData
      .filter((d) => {
        return d.Category === category;
      })
      .map((d) => d.SubCategory);
    setsubCategories(cates);
  };

  return (
    <div style={{ width: "50%" }}>
      <Card>
        <Divider />
        <article>
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
          >
            <Form.Item label="项目名称">
              <Input onChange={(e) => setname(e.target.value)} value={name} />
            </Form.Item>

            <Form.Item label="大类">
              <Select
                showSearch
                placeholder="请选择一个大类"
                onFocus={onCategoryFocus}
                value={category}
                onChange={(value) => setcategory(value)}
              >
                {categories.map((d) => (
                  <Option key={d} value={d}>
                    {d}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="小类">
              <Select
                showSearch
                placeholder="请选择一个小类"
                onFocus={onSubCategoryFocus}
                value={subCategory}
                onChange={(value) => setsubCategory(value)}
              >
                {subCategories.map((d) => (
                  <Option value={d}>{d}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="日期范围">
              <RangePicker
                onChange={dateChange}
                value={[moment(start), moment(end)]}
              ></RangePicker>
            </Form.Item>
            <Form.Item label="进度">
              <InputNumber
                defaultValue={10}
                min={0}
                max={100}
                formatter={(value) => `${value}%`}
                parser={(value) => value.replace("%", "")}
                onChange={(value) => setprogress(value)}
                value={progress}
              />
            </Form.Item>
            <Form.Item label="备注">
              <TextArea
                value={comments}
                rows={4}
                onChange={(e) => setcomments(e.target.value)}
              />
            </Form.Item>
            <Divider />
            <Form.Item {...tailLayout}>
              <Button type="primary" onClick={save}>
                保存
              </Button>
              <Button type="primary" onClick={cancel}>
                取消
              </Button>
            </Form.Item>
          </Form>
        </article>
      </Card>
    </div>
  );
}

export default GanttEdit;
