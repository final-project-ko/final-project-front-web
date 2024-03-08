import kakao from "../../img/kakao1.png";
import "../../components/css/Login.css";
import naver from "../../img/naver.png";

const Login = () => {

  // env에서 key 가져오기
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URL;
  const NAVER_REST_API_KEY= process.env.REACT_APP_REST_API_KEY_NAVER;
  const NAVER_REDIRECT_URL= process.env.REACT_APP_REDIRECT_URL_NAVER;


  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_REST_API_KEY}&state=STATE_STRING&redirect_uri=${NAVER_REDIRECT_URL}`

  return (
    <>
      <div className="loginContainer">
        <div className="loginPage">
          <h1 className='mainPage'>오늘은</h1>
          <p>아이디 비밀번호 입력 없이 간편하게 소셜로그인을 통해 로그인 / 회원가입 하실 수 있습니다.</p>
        </div>
        <div className="loginChoice">
          <a className="kakaoLogin" href={KAKAO_AUTH_URL}><img src={kakao} style={{ width: "150%" }} /> </a>
          <a className="naverLogin" href={NAVER_AUTH_URL}><img src={naver} style={{ width: "150%" }} /> </a>
        </div>
      </div>

    </>
  )


}
export default Login;