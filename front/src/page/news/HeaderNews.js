import { useNavigate, useParams } from "react-router-dom";
import "../../components/css/HeaderNews.css";
import DetailsNews from "./DetailsNews";
import { useEffect, useState } from "react";
import "../../components/css/Splash.css"; // 2024-03-19 스플래시(로딩)화면 css 추가

const HeaderNews = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [splashClass, setSplashClass] = useState("splash-screen");
  const navigate = useNavigate(); // 이동
  const { category } = useParams(); // 카테고리 가져오기
  const [articles, setArticles] = useState([]);


  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashClass("splash-screen fade-out"); // fade-in 애니메이션 적용
      setTimeout(() => {
        setShowSplash(false);
      }, 700);
    }, 300);

    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    const fetchCategoryNews = async () => {
      try {
        const promise = await fetch(`https://www.oheveryday.shop/api/news/categoryNews/${category}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
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
  }, [category]); // 카테고리가 변경될 때마다 API 요청

  if (showSplash) {
    return (
      <div style={{
        backgroundColor: '#f7f9fb',
        width: '100vw',
        height: '100vh',
        position: 'fixed', // or 'absolute'
        top: 0,
        left: 0
      }}>
        <div className={splashClass} >
          <img src="cup-lite.gif" alt="loading..." style={{ height: '10vh' }}></img>
        </div>
      </div>
    );
  }


  /* 뉴스 클릭 시 해당 뉴스 상세페이지 이동 */
  const onClickHandler = (article) => {
    navigate(`/detailNews/${article.code}`, { state: { article, articles } }); // 선택한 뉴스, 전체 뉴스 정보를 상세페이지에 보내줌
  }


  return (
    /* API 요청으로 받아온 뉴스를 하나씩 담아준다 */
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
