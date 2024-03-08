import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const NaverHandler = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const code = new URLSearchParams(location.search).get("code");

    useEffect(() => {
      const naverLogin = async () => {
          await fetch(`/naver/oauth/?code=${code}`,{
              method: "GET",
          }).then(res => res.json())
            .then(data => {
            //  console.log(data);
                localStorage.setItem("NtodayId",data.accessToken);

            })
              .catch(error =>{
                  console.log(error);
              });

              navigate("/");

      };
      naverLogin();
  });

    return (
        <div className="NaverLoginHandler">
            <p>네이버 로그인 처리 중입니다.</p>
            <p>잠시만 기다려주세요.</p>
        </div>
    );
};

export default NaverHandler;