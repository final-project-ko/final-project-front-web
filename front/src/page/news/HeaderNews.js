import {useNavigate, useParams} from "react-router-dom";
import "../../components/css/HeaderNews.css";
import DetailsNews from "./DetailsNews";
import {useEffect, useState} from "react";

const HeaderNews = () => {

    // 파라미터 값을 url을 통해 넘겨받은 페이지에서 사용할 수 있도록 해줌.
    let {category} = useParams();


    if(category===undefined){
        category = "kr_total";
    }
    console.log(category);
    // 카테고리 안에 기본은 main 나머지는 각 카테고리 이름을 담고 있음.. 그 카테고리 기사를 받아와 각 news에 뿌려주는 로직 작성 필요

    const navigate = useNavigate();

    /* 뉴스 클릭시 해당 뉴스 상세페이지 이동 */
    const onClickHandler = (article) => {

        navigate(`/detailNews/${article.code}`, {state : {article, articles}}); // 선택한 뉴스, 전체 뉴스 정보를 상세페이지에 보내줌
    }

    const [articles, setArticles] = useState([]);

    /* 카테고리 별 뉴스 조회 API 요청 */
    useEffect(() => {
        const fetchCategoryNews = async () => {
            try {
                const promise = await fetch(`http://localhost:8080/api/news/categoryNews/${category}`)
                                                .then(response => response.json())
                                                .then(data => {
                                                    setArticles(data.articles);
                                                    console.log("data", data);
                                                })
            } catch (error) {
                console.log("Error fetching data", error);
            }
        };
        fetchCategoryNews();
    }, [category]); // 카테고리가 변경될때마다 api요청


    return(
        /* api요청으로 받아 온 뉴스를 하나씩 담아준다 */
        <div className='mainDiv'>
            {articles.map((article, index) => (
                <button className="new1" id={`news${index + 1}`} key={index} onClick={() => onClickHandler(article)}>
                    <img className="newsImage" src={article.image} width="90%" height="55%" alt={article.title} />
                    <div className="newsText">{article.title}</div>
                </button>
            ))}
        </div>
    )
}
export default HeaderNews;