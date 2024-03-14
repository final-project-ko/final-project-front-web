import kakao from "../../img/kakao1.png";
import "../../components/css/Login.css";
import naver from "../../img/naver.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({setAuth}) => {
  const [admin, setAdmin] = useState(false);
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const adminHandler = () => {
    setAdmin(!admin);
  }
  // 어드민 로그인처리
  const ADMIN_ID = process.env.REACT_APP_ADMIN_ID;
  const ADMIN_PASS = process.env.REACT_APP_ADMIN_PASS;

  const adminLogin = () => {
    if (ADMIN_ID === id && ADMIN_PASS === pass) {
      localStorage.setItem("AUTH", "admin");
      setAuth("admin");
    }
    if (localStorage.getItem("AUTH")) {
      navigate("/admin");
    }
  }




  // env에서 key 가져오기
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URL;
  const NAVER_REST_API_KEY = process.env.REACT_APP_REST_API_KEY_NAVER;
  const NAVER_REDIRECT_URL = process.env.REACT_APP_REDIRECT_URL_NAVER;


  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_REST_API_KEY}&state=STATE_STRING&redirect_uri=${NAVER_REDIRECT_URL}`

  return (
    <>
      <div className="loginContainer">
        <div className="loginPage">
          <h1 className='mainPage' style={{ color: "#008BDA" }} onClick={adminHandler}>오늘은</h1>
          <p>아이디 비밀번호 입력 없이 간편하게 소셜로그인을 통해 로그인 / 회원가입 하실 수 있습니다.</p>
        </div>
        <div className="loginChoice" style={admin ? { display: "none" } : { display: "block" }}>
          <a className="kakaoLogin" href={KAKAO_AUTH_URL}><img src={kakao} style={{ width: "150%" }} /> </a>
          <a className="naverLogin" href={NAVER_AUTH_URL}><img src={naver} style={{ width: "150%" }} /> </a>
        </div>
        <div className="loginChoice2" style={admin ? { display: "block" } : { display: "none" }}>
          <h1 style={{ color: "#008BDA", backgroundColor: "white" }}>어드민</h1>
          <input type="text" value={id} onChange={e => setId(e.target.value)} placeholder="id" className="adminId" /> <br />
          <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="password" className="adminPass" /><br />
          <button onClick={adminLogin} className="adminBtn">로그인</button>
        </div>
      </div>

    </>
  )


}
export default Login;