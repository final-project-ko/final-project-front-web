import "../../components/css/admin/AdminMain.css";
import {NavLink} from "react-router-dom";
import {useState} from "react";

import AdminDash from "./pages/AdminDash";
import AdminUser from "./pages/AdminUser";
import AdminContent from "./pages/AdminContent";
import AdminSetting from "./pages/AdminSetting";
const AdminMain = () => {
    
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
        setPage("AdminSetting");
    }
    const getAdminComponent = () => {
        switch (page) {
            case "AdminDash":
                return <AdminDash />;
            case "AdminUser":
                return <AdminUser />;
            case "AdminContent":
                return <AdminContent />;
            case "AdminSetting":
                return <AdminSetting />;
            default:
                return null;
        }
    }


    const nonChoice = {
        background: 'transparent',
        border: 0,
        cursor: 'pointer',
        fontSize: '1.1rem',
        textDecoration : 'none',
        color:'#b2b2b2'
    }
    const choice = {
        color:'black',
        fontWeight:'bold',
        border: 0,
        cursor: 'pointer',
        fontSize: '1.1rem',
        textDecoration : 'none',
    }

    return (
        <>
            <div className="adminDiv">
                <div className="adminMainText" style={{backgroundColor:"white"}}>오늘은</div>
                <button className="adminLogOut"><NavLink to={"/"} style={{textDecoration:"none",color:"black",backgroundColor:"white"}}>로그아웃</NavLink></button>

            </div>

            <div className="adminNav">
                <ul className="adminUl">
                    <NavLink to={"/"} style={({isActive}) => (isActive? choice : nonChoice)}><li>사이트 바로가기</li></NavLink>
                    <li
                        onClick={(e) => { pageChangeHandler1(e);}}
                        value="AdminDash"
                        style={page === "AdminDash" ? choice : nonChoice}
                    >
                        대시 보드
                    </li>
                    <li
                        onClick={(e) => { pageChangeHandler2(e);}}
                        value="AdminUser"
                        style={page === "AdminUser" ? choice : nonChoice}
                    >
                        회원 관리
                    </li>
                    <li
                        onClick={(e) => { pageChangeHandler3(e);}}
                        value="AdminContent"
                        style={page === "AdminContent" ? choice : nonChoice}
                    >
                        콘텐츠
                    </li>
                    <li
                        onClick={(e) => { pageChangeHandler4(e);}}
                        value="AdminSetting"
                        style={page === "AdminSetting" ? choice : nonChoice}
                    >
                        설정
                    </li>
                </ul>
            </div>

            {getAdminComponent()}
        </>
    )
}
export default AdminMain;