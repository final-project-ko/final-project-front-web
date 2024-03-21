import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";

const LoginHandler = (props) => {

    const navigate = useNavigate();
    const code = new URL(window.location.href).searchParams.get("code");
   // console.log(code);



    useEffect(() => {
        const kakaoLogin = async () => {
            await fetch(`https://www.oheveryday.shop/api/login/oauth/?code=${code}&name=web`,{
                method: "GET",
            }).then(res => res.json())
              .then(data => {
              //  console.log(data);
                  localStorage.setItem("KtodayId",data.accessToken);

              })
                .catch(error =>{
                    console.log(error);
                });
                //계속 쓸 정보들( ex: 이름) 등은 localStorage에 저장해두자
/*                localStorage.setItem("name", res.data.account.name);*/
                //로그인이 성공하면 이동할 페이지
                navigate("/");

        };
            kakaoLogin();
    });


    return (
        <div className="LoginHandeler">
            <div className="notice">
                <p>로그인 중입니다.</p>
                <p>잠시만 기다려주세요.</p>
                <div className="spinner"></div>
            </div>
        </div>
    );
}
export default LoginHandler;