import React, { useEffect, useState } from "react";
import GanttRole from "frappe-gantt-with-roles";
import Gantt from "frappe-gantt";
import { Radio } from "antd";
import GanttList from "./GanttList";
import Axios from "axios";
import moment from "moment";
function GanttSvg(props) {
  const [tasks, settasks] = useState([]);
  const [View, setView] = useState("Month");
  const [Update, setUpdate] = useState(0);
  const [gantt, setGantt] = useState(undefined);
  const gantt_config = { custom_popup_html: (task) => returnGanttHtml(task), view_mode: 'Month' };

  const ganttViewChange = (event) => {
    let view = event.target.value;
    setView(view);
    gantt.change_view_mode(view);
    tasks && changeBarColor(tasks);
  };

  //组件初始化后,svg设置为gantt组件

  useEffect(() => {
    Axios.get("/api/gantt/getList").then((res) => {
      let data = returnResData(res);
      if (data) {
        const ganttNew = new Gantt("#gantt", data, gantt_config);
        setGantt(ganttNew);
        settasks(data);
        changeBarColor(data);
      }
    });
  }, [Update]);

  //refresh tasks
  const refreshTasks = (task) => {
    settasks(task);
    setUpdate(Update + 1);
  };

  return (
    <div
      style={{
        width: "85%",
        margin: "3rem auto ",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <GanttList props={props} refresh={refreshTasks} />
      <div style={{ width: "80%" }}>
        <Radio.Group value={View} onChange={ganttViewChange}>
          <Radio.Button value="Day">Day</Radio.Button>
          <Radio.Button value="Week">Week</Radio.Button>
          <Radio.Button value="Month">Month</Radio.Button>
        </Radio.Group>
        <svg id="gantt"></svg>
      </div>
    </div>
  );
}

function returnGanttHtml(task) {
  return `
    <div class="details-container" style="width:200px" >
      <h5  style="color: white;" >${task.name}</h5>
      <p>预计完成时间: ${moment(task.end).format("MMMM Do YY")}</p>
      <p>已完成: ${task.progress}%</p>
      <p>大类: ${task.categoryID.Category}</p>
      <p>小类: ${task.categoryID.SubCategory}</p>
      <p>备注:${task.comments ? task.comments : ""} </p>
    </div>
    `;
}
function returnResData(res) {
  if (!res.data.success) return alert("获取数据错误!");
  if (res.data.tableData.length === 0) return; //没有数据也返回
  let data = res.data.tableData;
  return data;
}

function changeBarColor(data) {
  data.forEach((d) => {
    let node = document.querySelector(`g[data-id*="${d.name}_"] .bar-progress`);

    node.style.fill = d.categoryID ? d.categoryID.Color : "#8a8aff";
    node.style.opacity = 1;
    node.style.width = 5;
  });
}
export default GanttSvg;
