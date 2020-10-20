import React, { useState } from "react";
import { Collapse, Checkbox } from "antd";
import continents from "./continents";

const { Panel } = Collapse;

/***************************************
 *折叠的checkbox
 *props里有continents的数据,循环展示为checkbox
 *check改变之后,更改数组,数组也根据state来改变
 **************************************/

function CheckList(props) {
  const [Checked, setChecked] = useState([]);
  const handelChecked = (key) => {
    let newChecklist = Checked;
    //如果列表里有这个选项,那么就删除她,没有的话就加上.作为是否check的动态变化
    if (!Checked.includes(key)) {
      newChecklist.push(key);
    } else {
      newChecklist.splice(newChecklist.indexOf(key), 1);
    }
    //更新列表
    setChecked(newChecklist);
    //更新父组件
    props.refresh(newChecklist);
  };

  return (
    <Collapse style={{ margin: "3rem 0rem", width: "40%" }}>
      <Panel>
        {continents.map((d, i) => (
          <>
            <Checkbox
              style={{ margin: "0 0.5rem  0  1.5rem" }}
              value={d.key}
              checked={Checked.includes(d.key)}
              onChange={() => handelChecked(d.key)}
            ></Checkbox>
            <span>{d.value}</span>
          </>
        ))}
      </Panel>
    </Collapse>
  );
}

export default CheckList;
