import "../../components/css/Mypage.css";
import { FaRegUserCircle } from "react-icons/fa";
import BookMark from "./pages/BookMark";
import {useState} from "react";
import Conditions from "./pages/Conditions";
import UserInfo from "./pages/UserInfo";
import useStore from "../../store";

const Mypage = () => {
  const { userId, auth,userName,userEmail, setUserInfo } = useStore();
    const [page, setPage] = useState("BookMark");

    // 페이지 변경 핸들러 함수
    const pageChangeHandler1 = () => {
        setPage("BookMark");
    }
    const pageChangeHandler2 = () => {
        setPage("Conditions");
    }
    const pageChangeHandler3 = () => {
        setPage("UserInfo");
    }
    const getMypageComponent = () => {
        switch (page) {
            case "BookMark":
                return <BookMark userId={userId}/>;
            case "Conditions":
                return <Conditions />;
            case "UserInfo":
                return <UserInfo />;
            default:
                return null;
        }
    }

    const nonChoice = {
        color:"#cccccc"
    }
    const choice = {
        color:"white"
    }



    return (
        <>
            <div className="myPage">
                <div className="userDiv">

                    <div className="userImg">
                        <FaRegUserCircle size="150" color="#7CF2FF" style={{backgroundColor:"white"}}/>
                    </div>
                    <div className="userName">
                        <h2 style={{backgroundColor:"white"}}>{userName} 님</h2>
                        <h3 style={{backgroundColor:"white"}}>{userEmail}</h3>
                    </div>
                    <ul className="userUl">
                        <li
                            onClick={(e) => { pageChangeHandler1(e);}}
                            className="bookMark"
                            style={page === "BookMark" ? choice : nonChoice}
                        >
                            북마크 목록
                        </li>
                        <li
                            onClick={(e) => { pageChangeHandler2(e);}}
                            className="conditions"
                            style={page === "Conditions" ? choice : nonChoice}
                        >
                            이용 약관
                        </li>
                        <li
                            onClick={(e) => { pageChangeHandler3(e);}}
                            className="userInfos"
                            style={page === "UserInfo" ? choice : nonChoice}
                        >
                            계정 관리
                        </li>

                    </ul>
                </div>

                {getMypageComponent()}
            </div>
        </>
    )

}
export default Mypage;