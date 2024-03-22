import "../../components/css/admin/AdminMain.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import AdminDash from "./pages/AdminDash";
import AdminUser from "./pages/AdminUser";
import AdminContent from "./pages/AdminContent";
import AdminNotice from "./pages/AdminNotice";
import AdminNoticeList from "./pages/AdminNoticeList";
import AdminInquiry from "./pages/AdminInquiry";
import AdminComment from "./pages/AdminComment";
const AdminMain = () => {

  const navigate = useNavigate();

  const [page, setPage] = useState("AdminDash");

  // 페이지 변경 핸들러 함수
  const pageChangeHandler1 = () => {
    setPage("AdminDash");
  }
  const pageChangeHandler2 = () => {
    setPage("AdminUser");
  }
  const pageChangeHandler3 = () => {
    setPage("AdminContent");
  }
  const pageChangeHandler4 = () => {
    setPage("AdminNoticeList");
  }
  const pageChangeHandler5 = () => {
    setPage("AdminNotice");
  }
  const pageChangeHandler6 = () => {
    setPage("AdminInquiry");
  }
  const pageChangeHandler7 = () => {
    setPage("AdminComment");
  }



  const getAdminComponent = () => {
    switch (page) {
      case "AdminDash":
        return <AdminDash />;
      case "AdminUser":
        return <AdminUser />;
      case "AdminContent":
        return <AdminContent />;
      case "AdminNoticeList":
        return <AdminNoticeList />;
      case "AdminNotice":
        return <AdminNotice />;
      case "AdminInquiry":
        return <AdminInquiry/>;
        case "AdminComment":
          return <AdminComment/>;
      default:
        return null;
    }
  }

  const localHandler = () => {
    window.localStorage.removeItem("AUTH");
  }
  const goMain = () => {
    navigate("/");
  }

  const nonChoice = {
    background: 'transparent',
    border: 0,
    cursor: 'pointer',
    fontSize: '1.1rem',
    textDecoration: 'none',
    color: '#b2b2b2'
  }
  const choice = {
    color: 'black',
    fontWeight: 'bold',
    border: 0,
    cursor: 'pointer',
    fontSize: '1.1rem',
    textDecoration: 'none',
  }

  return (
    <>
      <div className="adminTotalDiv">


        <div className="adminDiv">
          <div className="adminMainText" style={{ backgroundColor: "white", color: "black",cursor:"pointer" }} onClick={goMain}>www.gurotimes.shop</div>
          <button className="adminLogOut" onClick={localHandler}><NavLink to={"/"} style={{ backgroundColor: "white", textDecoration: "none", color: "black" }}>로그아웃</NavLink></button>

        </div>

        <div className="adminNav">
          <ul className="adminUl">
            <li
              onClick={(e) => { pageChangeHandler1(e); }}
              value="AdminDash"
              style={page === "AdminDash" ? choice : nonChoice}
            >
              대시 보드
            </li>
            <li
              onClick={(e) => { pageChangeHandler2(e); }}
              value="AdminUser"
              style={page === "AdminUser" ? choice : nonChoice}
            >
              회원 관리
            </li>
            <li
              onClick={(e) => { pageChangeHandler3(e); }}
              value="AdminContent"
              style={page === "AdminContent" ? choice : nonChoice}
            >
              콘텐츠 수정
            </li>
            <li
              onClick={(e) => { pageChangeHandler4(e); }}
              value="AdminNoticeList"
              style={page === "AdminNoticeList" ? choice : nonChoice}
            >
              공지사항 내역
            </li>
            <li
              onClick={(e) => { pageChangeHandler5(e); }}
              value="AdminNotice"
              style={page === "AdminNotice" ? choice : nonChoice}
            >
              공지사항 입력
            </li>
            <li
              onClick={(e) => { pageChangeHandler6(e); }}
              value="AdminInquiry"
              style={page === "AdminInquiry" ? choice : nonChoice}
            >
              문의 답글 등록
            </li>
            <li
              onClick={(e) => { pageChangeHandler7(e); }}
              value="AdminComment"
              style={page === "AdminComment" ? choice : nonChoice}
            >
              댓글 관리
            </li>

          </ul>
        </div>
        <div className="adminbackground">
          {getAdminComponent()}
        </div>
      </div>
    </>
  )
}
export default AdminMain;