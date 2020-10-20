import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import GanttSvg from './views/Gantt/GanttSvg'
import GanttEdit from './views/Gantt/GanttEdit'
import GanttCategoryEdit from './views/Gantt/GanttCategoryEdit'
import GanttCategoryList from './views/Gantt/GanttCategoryList'
//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      {/* 上面是导航栏 */}

      {/* 这底下就是codingd的内容 */}
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(GanttSvg, false)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/gantt" component={Auth(GanttSvg,true)} />
          <Route exact path="/ganttedit/:id" component={Auth(GanttEdit,true)} />
          <Route exact path="/ganttedit" component={Auth(GanttEdit,true)} />
          <Route exact path="/ganttCategoryEdit/:id" component={Auth(GanttCategoryEdit,true)} />
          <Route exact path="/ganttCategoryEdit" component={Auth(GanttCategoryEdit,true)} />
          <Route exact path="/ganttCategoryList" component={Auth(GanttCategoryList,null)} />
        </Switch>
      </div>

      {/* 下面是页脚 */}
      <Footer />
    </Suspense>
  );
}

export default App;
