import { useEffect, useState } from "react";
import HTMLFormattedContent from "../../components/HTMLFormatContent";
import "../../components/css/CustomerPage.css";

const InquiryList = () => {

  const [haveNotice, setHaveNotice] = useState(false);
  const [articles, setArticles] = useState([]);
  const [visibleContentIndex, setVisibleContentIndex] = useState(-1);

  const noticeNull = () => { return <h1>현재 문의 사항이 없습니다.</h1> };
  const userCode = window.localStorage.getItem("userCode");

  useEffect(() => {
    const allInquiry = async () => {
      try {
        const promise = await fetch(`api/qna/findInquiry/${userCode}`)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setArticles(data);
          })
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    allInquiry();
  }, []);


  const onClickHandler = (index) => {
    if (visibleContentIndex === index) {
      setVisibleContentIndex(-1); 
    } else {
      setVisibleContentIndex(index); 
    }
  };

  return (
    <>
      <div className="notice">
        {articles ? (
          articles.map((article, index) => (
            <div className="inquiryList" key={index}>
              <button className={`allNotice ${visibleContentIndex === index ? 'show' : 'hide'}`} id={`notice${index + 1}`} onClick={() => onClickHandler(index)}>
                <div className="inquiryReply">
                  {article.inquiryReply}
                </div>
                <div className="inquiryTitle">
                  {article.inquiryTitle}
                </div>
                <div className="inquiryDate">
                  {article.inquiryDate}
                </div>
                <div className={`noticeContent ${visibleContentIndex === index ? 'show' : 'hide'}`}>
                  <HTMLFormattedContent htmlContent={article.inquiryContent} />
                  {article.replyText}
                </div>
                {/* 어드민 쪽에서 답글 다는 로직 추가 후 추가로 나타나게 꾸며줘야함 */}

              </button>
            </div>
          ))
        ) : (
          <div className="inquiry">
            <button className={`allNotice`}>
              {noticeNull()}
            </button>
          </div>
        )}
      </div>
    </>
  )
}
export default InquiryList;