import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "zustand";
import "../../../components/css/Mypage.css";

const BookMark = ({ userId }) => {

  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);

  /* 뉴스 클릭 시 해당 뉴스 상세페이지 이동 */
  const onClickHandler = (article) => {
    navigate(`/detailNews/${article.newsCode}`, { state: { article, articles } }); // 선택한 뉴스, 전체 뉴스 정보를 상세페이지에 보내줌
  }


  useEffect(() => {
    const userBookMark = async () => {
      try {
        const promise = await fetch(`https://www.oheveryday.shop/api/bookmark/userBookMark/${userId}`);
        const news = await promise.json();
        if (news && news.length > 0) {
          setArticles(news);
          console.log(news);
        } else {
          console.log("북마크가 없습니다.");
        }
      } catch (error) {
        console.error("Error while fetching user bookmarks:", error);

      }
    };
    userBookMark();
  }, []);
  


  return (
    <>
      <h3 className="myPageText">  북마크 목록</h3>
      <div className='myPageDiv'>
        {articles.length === 0 ? (
          <div className="emptyBookmarkMessage">
          <p>북마크가 없습니다.</p>
        </div>
        ) : (
          articles.map((article, index) => (
            <button className="news1" id={`news${index + 1}`} key={index} onClick={() => onClickHandler(article)}>
              <img className="newsImage" src={article.image} width="90%" height="55%" alt={article.title} />
              <div className="newsText">{article.title}</div>
            </button>
          ))
        )}
      </div>
    </>
  )

}

export default BookMark;