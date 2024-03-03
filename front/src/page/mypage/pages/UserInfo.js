import { NavLink, useNavigate } from "react-router-dom";
import "../../../components/css/Mypage.css";

const UserInfo = () => {

  const navigate = useNavigate();

  const logOutHanlder = () =>{
    window.localStorage.removeItem("userCode");
    window.localStorage.removeItem("userName");
    window.localStorage.removeItem("userEmail");
    window.localStorage.removeItem("userAuth");
    navigate("/");
  }


  return (
    <> 
     <div className="userInfoAll">
      <div className="userInfoDiv">
        <button style={{ textDecoration: "none", color: "black" }}>닉네임 변경</button>
        <button style={{ textDecoration: "none", color: "black" }}>해외 신문 원어로 보기</button>
        <button onClick={logOutHanlder} style={{ textDecoration: "none", color: "black" }}>로그 아웃</button>
        <button onClick={logOutHanlder} style={{ textDecoration: "none", color: "black" }}>회원 탈퇴</button>
      </div>
    </div>
    </>
  )
}
export default UserInfo;


