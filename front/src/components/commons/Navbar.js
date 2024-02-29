import {NavLink, useNavigate} from "react-router-dom";
import "../css/Navbar.css";
import {useEffect, useState} from "react";
import { BiWorld } from "react-icons/bi";
import { FcGlobe } from "react-icons/fc";
import { HiOutlineMenu } from "react-icons/hi";

const Navbar = ( {toggle, setToggle} ) => {

    // const [toggle,setToggle] = useState(true);
    const [login,setLogin] = useState();
    const [showItem, setShowItem] = useState(false);
    const [navLinkPrefix, setNavLinkPrefix] = useState("kr_");

    const navigate = useNavigate();

    const onClickHanlder = () => {
        setToggle(!toggle);

        // 토글 버튼을 눌렀을 때 navLinkPrefix 변경
        setNavLinkPrefix((prevState) => (prevState === "kr_" ? "us_" : "kr_"));
        console.log("toggle value", toggle)

    }

    // 토글 시 국내,해외 페이지 이동
    useEffect(() => {
        navigate(`${navLinkPrefix}total`);
    }, [navLinkPrefix]);

    const loginHandler = () => {
      if(localStorage.getItem("userCode")){
        setLogin(true);
      }  else{
        setLogin(false);
      }
      if(loginBtn ==="LogOut"){
        window.localStorage.removeItem("userCode");
        window.localStorage.removeItem("userName");
        window.localStorage.removeItem("userEmail");
        window.localStorage.removeItem("userAuth");
      }

    }


    const loginBtn = localStorage.getItem("userCode")? "LogOut" : "LogIn";

    const barOn = {
        display:'block'
    }
    const barOff = {
        display: 'none'
    }

    const set = toggle? <BiWorld  size="40" color="gray" style={{backgroundColor: "white"}}/> : <FcGlobe  size="40" style={{backgroundColor: "white"}}/>

    const nonChoice = {
        background: 'transparent',
        border: 0,
        cursor: 'pointer',
        fontSize: '1.1rem',
        textDecoration : 'none',
        color:'black'
    }
    const choice = {
        color:"#008BDA",
        background: 'transparent',
        border: 0,
        cursor: 'pointer',
        fontSize: '1.1rem',
        textDecoration : 'none',
    }

    return (
        <>
            <header className='navBox'>

                <div className='mainH1'>

                    <NavLink className='mainPage' to={`/${navLinkPrefix}total`}>오늘은</NavLink>

                </div>

                <ul className='mainUl'>
                    <li><NavLink to={`/${navLinkPrefix}total`} className='main' style={({isActive}) => (isActive? choice : nonChoice)}>종합</NavLink></li>
                    <li><NavLink to={`${navLinkPrefix}business`} className='business' style={({isActive}) => (isActive? choice : nonChoice)}>비즈니스</NavLink></li>
                    <li><NavLink to={`${navLinkPrefix}entertainment`} className='entertainment' style={({isActive}) => (isActive? choice : nonChoice)}>엔터테인먼트</NavLink></li>
                    <li><NavLink to={`${navLinkPrefix}technology`} className='technology' style={({isActive}) => (isActive? choice : nonChoice)}>기술</NavLink></li>
                    <li><NavLink to={`${navLinkPrefix}science`} className='science' style={({isActive}) => (isActive? choice : nonChoice)}>과학</NavLink></li>
                    <li><NavLink to={`${navLinkPrefix}sports`} className='sports' style={({isActive}) => (isActive? choice : nonChoice)}>스포츠</NavLink></li>
                    <li><NavLink to={`${navLinkPrefix}health`} className='health' style={({isActive}) => (isActive? choice : nonChoice)}>건강</NavLink></li>
                    <li><NavLink to={`${navLinkPrefix}general `} className='Art' style={({isActive}) => (isActive? choice : nonChoice)}>일반</NavLink></li>
                </ul>

                {/*로그인 만들때 사용할 div*/}
                <div className='loginDiv' onClick={loginHandler}>
                    <NavLink to={loginBtn==="LogIn"?"/login" : "/"} style={{textDecoration:"none",color:"black"}}>{loginBtn}</NavLink>

                </div>
                {/*추가로 로그인 완료 시 마이페이지로 보내는 기능도 만들어야 함*/}
            </header>

            {/*   해외뉴스 on off 버튼    */}
            <button className='toggle' onClick={onClickHanlder}>{set}</button>

            {/* 로그인 시 메뉴바 보이는 버튼  */}

            <button className="showNav"  style={loginBtn==="LogOut"? barOn:barOff}>
                <HiOutlineMenu size="30" color="#008BDA"  style={{backgroundColor: "white"}}/>
                <ul className="mypageNav">
                    <li><NavLink to={"/customer"} style={{textDecoration:"none",color:"black"}}>고객센터</NavLink></li>
                    <li><NavLink to={"/mypage"} style={{textDecoration:"none",color:"black"}}>마이페이지</NavLink></li>
                    <li><NavLink to={"/mypage"} style={{textDecoration:"none",color:"black"}}>자유게시판</NavLink></li>
                    <li><NavLink to={"/admin"} 
                    style={localStorage.getItem("userAuth")==="admin"? barOn:barOff}>
                      어드민페이지
                      </NavLink></li>
                </ul>

            </button>


        </>
    )
}

export default Navbar;


