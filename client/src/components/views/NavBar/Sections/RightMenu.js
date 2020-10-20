/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Menu } from "antd";
import { AppstoreOutlined } from '@ant-design/icons';
import axios from "axios";
import { USER_SERVER } from "../../../Config";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

const { SubMenu } = Menu;

function RightMenu(props) {
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        {/* <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item> */}
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <SubMenu key="SubMenu" icon={<AppstoreOutlined/>}  title="Project Cost">
          <Menu.Item key="gantt">
            <a href="/gantt">Gantt</a>
          </Menu.Item>

          <Menu.Item key="category">
            <a href="/ganttCategoryList">类别管理</a>
          </Menu.Item>
        </SubMenu>

        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(RightMenu);
