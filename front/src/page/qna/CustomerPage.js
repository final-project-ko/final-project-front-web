import "../../components/css/CustomerPage.css";
import { FaSearch } from "react-icons/fa";
import {useState} from "react";
import Notice from "./Notice";
import Inquiry from "./Inquiry";
import InputNotice from "./InputNotice";
import InquiryList from "./InquiryList";
const CustomerPage = (userId) => {
    const [page, setPage] = useState("Notice");
    const [inputText, setInputText] = useState("");
    // 페이지 변경 핸들러 함수


    const pageChangeHandler1 = () => {
        setPage("Notice");
    }
    const pageChangeHandler2 = () => {
        setPage("Inquiry");
    }
    const pageChangeHandler3 = () => {
      setPage("InquiryList");
  }

    // 각 메뉴 항목에 대한 컴포넌트 매핑
    const getPageComponent = () => {
        switch (page) {
            case "InputNotice":
                return <InputNotice inputText={inputText}/>;
            case "Notice":
                return <Notice />;
            case "Inquiry":
                return <Inquiry userId={userId}/>;
            case "InquiryList":
              return <InquiryList userId={userId}/>;
            default:
                return null;
        }
    }

    const nonChoice = {
        background: 'transparent',
        border: 0,
        cursor: 'pointer',
        textDecoration : 'none',
        color:'black'
    }
    const choice = {
        color:"#008BDA",
        background: 'transparent',
        border: 0,
        cursor: 'pointer',
        textDecoration : 'underLine',
        textUnderlineOffset: '0.7rem',
        textDecorationThickness: '0.2rem'
    }
    const inputHanlder = (e) => {
      setInputText(e.target.value);
    }

    const searchHandler = () => {
        setPage("InputNotice");
    }

    return (
        <>
            <div className="customerMent">
                오늘은 서비스를 이용 하시는 데 도움이 필요 하신가요?
            </div>
            <div className="searchBar">
                <input type="text" className="searchText" placeholder="도움말을 검색 해보세요" value={inputText} onChange={inputHanlder}/>
                <button className="serchBtn" onClick={searchHandler}><FaSearch  size="30" color="gray"/></button>
            </div>

            <div className="searchMenu">
                <ul className='searchUl'>

                    <li
                        onClick={(e) => { pageChangeHandler1(e);}}
                        value="Notice"
                        style={page === "Notice" ? choice : nonChoice}
                    >
                        공지 사항
                    </li>
                    <li
                        onClick={(e) => { pageChangeHandler3(e);}}
                        value="InquiryList"
                        style={page === "InquiryList" ? choice : nonChoice}
                    >
                        문의 내역
                    </li>
                    <li
                        onClick={(e) => { pageChangeHandler2(e);}}
                        value="Inquiry"
                        style={page === "Inquiry" ? choice : nonChoice}
                    >
                        1:1 문의
                    </li>

                </ul>
            </div>
            {getPageComponent()}


        </>
    )

}
export default CustomerPage;