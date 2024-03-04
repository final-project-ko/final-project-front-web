import "../../components/css/CustomerPage.css";
import { FaSearch } from "react-icons/fa";
import {useState} from "react";
import Announcement from "./Announcement";
import Notice from "./Notice";
import Inquiry from "./Inquiry";
const CustomerPage = () => {
    const [page, setPage] = useState("Announcement");

    // 페이지 변경 핸들러 함수

    const pageChangeHandler3 = () => {
        setPage("Notice");
    }
    const pageChangeHandler4 = () => {
        setPage("Inquiry");
    }

    // 각 메뉴 항목에 대한 컴포넌트 매핑
    const getPageComponent = () => {
        switch (page) {

            case "Notice":
                return <Notice />;
            case "Inquiry":
                return <Inquiry />;
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


    return (
        <>
            <div className="customerMent">
                오늘은 서비스를 이용 하시는 데 도움이 필요 하신가요?
            </div>
            <div className="searchBar">
                <input type="text" className="searchText" placeholder="도움말을 검색 해보세요"/>
                <button className="serchBtn"><FaSearch  size="30" color="gray"/></button>
            </div>

            <div className="searchMenu">
                <ul className='searchUl'>

                    <li
                        onClick={(e) => { pageChangeHandler3(e);}}
                        value="Notice"
                        style={page === "Notice" ? choice : nonChoice}
                    >
                        공지 사항
                    </li>
                    <li
                        onClick={(e) => { pageChangeHandler4(e);}}
                        value="Inquiry"
                        style={page === "Inquiry" ? choice : nonChoice}
                    >
                        1대1 문의
                    </li>
                </ul>
            </div>
            {getPageComponent()}


        </>
    )

}
export default CustomerPage;