import React, {useState} from 'react';
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import Layout from "./components/layouts/Layout";
import HeaderNews from "./page/news/HeaderNews";
import DetailsNews from "./page/news/DetailsNews";
import CustomerPage from "./page/qna/CustomerPage";
import Mypage from "./page/mypage/Mypage";
import AdminMain from "./page/admin/AdminMain";
import Login from "./page/login/Login";
import LoginHandler from "./page/login/LoginHandler";

function App() {
    const [toggle, setToggle] = useState(true);



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
              <Route path='/admin' element={<AdminMain/>}/>
          </Route>
        <Route path='/login/oauth' element={<LoginHandler/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

