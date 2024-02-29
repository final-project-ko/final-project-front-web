import kakao from "../../img/kakao1.png";
import "../../components/css/Login.css";


const Login = () => {

    // env에서 key 가져오기
    const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URL;

    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;


    return (
        <>
            <div className="loginChoice">
                <a className="kakaoLogin" href={KAKAO_AUTH_URL}><img src={kakao}/> </a>
                <a className="kakaoLogin"><img src={kakao}/> </a>
            </div>
        </>
        )


}
export default Login;