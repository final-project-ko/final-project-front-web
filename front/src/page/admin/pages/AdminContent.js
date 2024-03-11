import "../../../components/css/admin/AdminContent.css";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
const AdminContent = () => {

    const [category, setCategory] = useState("kr_total");
    const [articles, setArticles] = useState([]);
    const [news, setNews] = useState([]);
    const [inputTitle, setInputTitle] = useState("");
    const [inputDesc, setInputDesc] = useState("");


    const navigate = useNavigate();

    const changeCategory = (e) =>{
        setCategory(e.target.value);
    }

    const onClickHandler = (article) => {
        setNews(article);
        setInputTitle(article.title);
        setInputDesc(article.description);
    }

    const titleChange = (e) => {
        setInputTitle(e.target.value);
    }
    const descChange = (e) => {
        setInputDesc(e.target.value);
    }

    const adminContentModify = async () => {
        await fetch(`/api/news/modifyNews`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                code:news.code,
                title:inputTitle,
                description:inputDesc,
                url:news.url,
                image:news.image,
                category:news.category,
                date:news.date
            }),
        }).then(res=>{
            if(res.ok) {
                alert("수정 완료");
            }else {
                alert("오류 발생 다시 시도 해 주세요");
            }
        })
    }
    const adminContentDelete = async () => {
        await fetch(`/api/news/deleteNews`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                code:news.code,
                title:inputTitle,
                description:inputDesc

            }),
        }).then(res=>{
            if(res.ok) {
                alert("삭제 완료");
            }else {
                alert("오류 발생 다시 시도 해 주세요");
            }
        })
    }


    useEffect(() => {
        const fetchCategoryNews = async () => {
            try {
                const promise = await fetch(`http://localhost:8080/api/news/categoryNews/${category}`)
                    .then(response => response.json())
                    .then(data => {
                        setArticles(data.articles);
                    })
            } catch (error) {
                console.log("Error fetching data", error);
            }
        };
        fetchCategoryNews();
    }, [category]);



    return (
        <>
            <div className="adminContentTitle">
                <h2>현재 뉴스 목록</h2>

                <div className="adminNewsTitle">
                    {articles.map((article, index) => (
                        <button className="adminNews" id={`news${index + 1}`} key={index} onClick={() => onClickHandler(article)}>
                            <div className="adminNewsText">{article.title}</div>
                        </button>
                    ))}
                </div>

            </div>

            <div className="adminChoiceCategory">
                <select name="adminChoiceCategorySelect" id="adminChoiceCategorySelect" onChange={changeCategory}
                        style={{width:"100%", height:"100%",fontSize:"1.2rem",border:"none",fontWeight:"bold",verticalAlign:"middle"}}>
                    <option value="kr_total">국내 종합</option>
                    <option value="kr_business">국내 비즈니스</option>
                    <option value="kr_entertainment">국내 엔터</option>
                    <option value="kr_general">국내 일반</option>
                    <option value="kr_health">국내 건강</option>
                    <option value="kr_science">국내 과학</option>
                    <option value="kr_sports">국내 스포츠</option>
                    <option value="kr_technology">국내 기술</option>
                    <option value="us_total">해외 종합</option>
                    <option value="us_business">해외 비즈니스</option>
                    <option value="us_entertainment">해외 엔터</option>
                    <option value="us_general">해외 일반</option>
                    <option value="us_health">해외 건강</option>
                    <option value="us_science">해외 과학</option>
                    <option value="us_sports">해외 스포츠</option>
                    <option value="us_technology">해외 기술</option>
                </select>
            </div>

            <div className="adminContentContent">
                <h2>제목</h2>
                <textarea className="adminTextTitle" value={inputTitle} onChange={titleChange}></textarea>
                <h2>본문 내용</h2>
                <textarea className="adminTextDesc" value={inputDesc} onChange={descChange}></textarea>
            </div>

            <button className="adminContentModify" onClick={adminContentModify}>수정</button>
            <button className="adminContentDelete"  onClick={adminContentDelete}>삭제</button>
        </>

    )

}
export default AdminContent;
