import { NavLink, useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import { useEffect, useState } from "react";
import { BiWorld } from "react-icons/bi";
import { FcGlobe } from "react-icons/fc";
import { HiOutlineMenu } from "react-icons/hi";
import useStore from "../../store";


const Navbar = ({ toggle, setToggle }) => {


  // const [toggle,setToggle] = useState(true);
  const [login, setLogin] = useState();
  const [showItem, setShowItem] = useState(false);
  const [navLinkPrefix, setNavLinkPrefix] = useState("kr_");
  const { userId, auth, userName, userEmail, setUserInfo } = useStore();
  const navigate = useNavigate();
  const [localStorageChange, setLocalStorageChange] = useState(false);


  const onClickHanlder = () => {
    setToggle(!toggle);

    // 토글 버튼을 눌렀을 때 navLinkPrefix 변경
    setNavLinkPrefix((prevState) => (prevState === "kr_" ? "us_" : "kr_"));

  }

  useEffect(()=>{
    const handleStorage = () => {
      setLocalStorageChange(prevState => !prevState);
    };
    window.addEventListener('storage',handleStorage);
    return () => {
      window.removeEventListener('storage',handleStorage);
    }
  },[])

  useEffect(() => {
    const kakaoAccessToken = localStorage.getItem("KtodayId");
    const NaverAccessToken = localStorage.getItem("NtodayId");
    const fetchData = async () => {
      if (kakaoAccessToken || NaverAccessToken) {
        if (tokenValid(kakaoAccessToken, NaverAccessToken)) {
          try {
            let endpoint = '';
            let accessToken = '';

            if (kakaoAccessToken) {
              endpoint = 'https://www.oheveryday.shop/api/login/kakao';
              accessToken = kakaoAccessToken;
            } else {
              endpoint = 'https://www.oheveryday.shop/api/naver/login';
              accessToken = NaverAccessToken;
            }

            const response = await fetch(endpoint, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                accessToken: accessToken
              })
            });
            const data = await response.json();
             //  console.log(data);
            setUserInfo(data.id, data.userAuth, data.name, data.email);
            setLogin(true);
            //   console.log("userId :"+userId);
          } catch (error) {
            console.error(error);
            setLogin(false);
          }
        }else {
          setLogin(false);
          window.localStorage.removeItem("KtodayId");
          window.localStorage.removeItem("NtodayId");
          setUserInfo("", "", "", "");
        }
      } else {
        setLogin(false);
        window.localStorage.removeItem("KtodayId");
        window.localStorage.removeItem("NtodayId");
        setUserInfo("", "", "", "");
      }
    };

    fetchData();
  }, [tokenValid,localStorageChange]); // accessToken을 의존성 배열에 추가

  // 토글 시 국내,해외 페이지 이동
  useEffect(() => {
    navigate(`${navLinkPrefix}total`);
  }, [navLinkPrefix]);

  const loginHandler = () => {

    if (loginBtn === "LogOut") {
      window.localStorage.removeItem("KtodayId");
      window.localStorage.removeItem("NtodayId");
      setUserInfo("", "", "", "");
      setLogin(false);
      navigate("/kr_total");
    }

  }


  const loginBtn = login ? "LogOut" : "LogIn";

  const barOn = {
    textDecoration: 'none',
    display: 'block',
    color: 'black'
  }
  const barOff = {
    textDecoration: 'none',
    display: 'none',
    color: 'black'
  }

  const set = toggle ? <BiWorld size="40" color="gray" style={{ backgroundColor: "white" }} /> : <FcGlobe size="40" style={{ backgroundColor: "white" }} />

  const nonChoice = {
    background: 'transparent',
    border: 0,
    cursor: 'pointer',
    fontSize: '1.1rem',
    textDecoration: 'none',
    color: 'black'
  }
  const choice = {
    color: "#008BDA",
    background: 'transparent',
    border: 0,
    cursor: 'pointer',
    fontSize: '1.1rem',
    textDecoration: 'none',
  }

  return (
    <>
      <header className='navBox'>

        <div className='mainH1'>

          <NavLink className='mainPage' to={`/${navLinkPrefix}total`}>오늘은</NavLink>

        </div>

        <ul className='mainUl'>
          <li><NavLink to={`/${navLinkPrefix}total`} className='main' style={({ isActive }) => (isActive ? choice : nonChoice)}>종합</NavLink></li>
          <li><NavLink to={`${navLinkPrefix}business`} className='business' style={({ isActive }) => (isActive ? choice : nonChoice)}>비즈니스</NavLink></li>
          <li><NavLink to={`${navLinkPrefix}entertainment`} className='entertainment' style={({ isActive }) => (isActive ? choice : nonChoice)}>엔터테인먼트</NavLink></li>
          <li><NavLink to={`${navLinkPrefix}technology`} className='technology' style={({ isActive }) => (isActive ? choice : nonChoice)}>기술</NavLink></li>
          <li><NavLink to={`${navLinkPrefix}science`} className='science' style={({ isActive }) => (isActive ? choice : nonChoice)}>과학</NavLink></li>
          <li><NavLink to={`${navLinkPrefix}sports`} className='sports' style={({ isActive }) => (isActive ? choice : nonChoice)}>스포츠</NavLink></li>
          <li><NavLink to={`${navLinkPrefix}health`} className='health' style={({ isActive }) => (isActive ? choice : nonChoice)}>건강</NavLink></li>
        </ul>

        {/*로그인 만들때 사용할 div*/}
        <div className='loginDiv' onClick={loginHandler}>
          <NavLink to={loginBtn === "LogIn" ? "/login" : "/"} style={{ textDecoration: "none", color: "white", backgroundColor: "#008BDA" }}>{loginBtn}</NavLink>

        </div>

      </header>

      {/*   해외뉴스 on off 버튼    */}
      <button className='toggle' onClick={onClickHanlder}>{set}</button>

      {/* 로그인 시 메뉴바 보이는 버튼  */}

      <button className="showNav" style={loginBtn === "LogOut" ? barOn : barOff}>
        <HiOutlineMenu size="30" color="#008BDA" style={{ backgroundColor: "white" }} />
        <ul className="mypageNav">
          <li><NavLink to={"/customer"} style={{ textDecoration: "none", color: "black", backgroundColor: "white" }} userId={userId}>고객센터</NavLink></li>
          <li><NavLink to={"/mypage"} style={{ textDecoration: "none", color: "black", backgroundColor: "white" }} userId={userId}>마이페이지</NavLink></li>

        </ul>

      </button>


    </>
  )
}

export default Navbar;


const tokenValid = async (kakaoAccessToken, NaverAccessToken) => {
  let url = null;
  let accessToken = null;
  if (kakaoAccessToken) {
    url = "https://kapi.kakao.com/v1/user/access_token_info";
    accessToken = kakaoAccessToken;
  } else {
    url = "https://openapi.naver.com/v1/nid/verify";
    accessToken = NaverAccessToken;
  }

  // 요청 헤더 설정
  const headers = {
    'Authorization': `Bearer ${accessToken}`
  };

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers
    });
    if (!response.ok) {
      window.localStorage.removeItem("KtodayId");
      window.localStorage.removeItem("NtodayId");
      return false;
    } 

    const data = await response.json();
    // 유효한 토큰인지 확인
    if (data.id) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};


