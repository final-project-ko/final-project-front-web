import React, {useEffect, useState} from 'react';
import {BrowserRouter, NavLink, Navigate, Route, Routes} from "react-router-dom";
import Layout from "./components/layouts/Layout";
import HeaderNews from "./page/news/HeaderNews";
import DetailsNews from "./page/news/DetailsNews";
import CustomerPage from "./page/qna/CustomerPage";
import Mypage from "./page/mypage/Mypage";
import AdminMain from "./page/admin/AdminMain";
import Login from "./page/login/Login";
import LoginHandler from "./page/login/LoginHandler";
import useStore from './store';
import NaverHandler from './page/login/NaverHandler';

function App() {
    const [toggle, setToggle] = useState(true);
    const { userId, setUserInfo } = useStore();
    const auth = localStorage.getItem("AUTH");
   



  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout toggle={toggle} setToggle={setToggle}/>}>
              <Route index element={<HeaderNews/>}/>
              <Route path=':category' element={<HeaderNews/>}/>
              <Route path='/detailNews/:articleCode' element={<DetailsNews toggle={toggle}/>}/>
              <Route path='/customer' element={<CustomerPage/>}/>
              <Route path='/mypage' element={<Mypage/>}/>
              <Route path='/login' element={<Login/>}/>
          </Route>
          {localStorage.getItem("AUTH") === "admin" && <Route path="/admin"  element={<AdminMain/>} />}
              <Route path='/admin' element={<Navigate to="/" replace />}/>
        <Route path='/api/login/oauth' element={<LoginHandler/>}/>
        <Route path='/api/naver/oauth' element={<NaverHandler/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

