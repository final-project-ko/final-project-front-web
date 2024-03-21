import { useEffect, useState } from "react";
import HTMLFormattedContent from "../../components/HTMLFormatContent";
import "../../components/css/CustomerPage.css";
import useStore from "../../store";


const InquiryList = () => {
  
  const [haveNotice, setHaveNotice] = useState(false);
  const [articles, setArticles] = useState([]);
  const [visibleContentIndex, setVisibleContentIndex] = useState(-1);
  const [code, setCode] = useState("");
  const noticeNull = "현재 문의 사항이 없습니다.";
  const { userId, auth, setUserInfo } = useStore();


  useEffect(() => {
    const allInquiry = async () => {

  
      try {
        const promise = await fetch(`https://www.oheveryday.shop/api/qna/findInquiry/${userId}`)
          .then(response => response.json())
          .then(data => {
         //   console.log(data);
            setArticles(data);
          })
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    allInquiry();
  }, [code]);


  const onClickHandler = (index) => {
    if (visibleContentIndex === index) {
      setVisibleContentIndex(-1);
    } else {
      setVisibleContentIndex(index);
    }
  };

  const deleteHandler = async (article) => {
    const articleCode = article.inquiryCode; // 현재 article의 inquiryCode 저장
    setCode(articleCode);
  
    await fetch("https://www.oheveryday.shop/api/qna/deleteInquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: articleCode // article의 inquiryCode 사용
      }),
    }).then(res => {
      if (res.ok) {
        alert("삭제 완료");
        setCode("");
      } else {
        alert("오류 발생 다시 시도 해 주세요");
      }
    });
  };


  return (
    <>
      <div className="notice">
        {articles ? (
          articles.map((article, index) => (
            <div className="inquiryList" key={index}>
              <button className={`allNotice ${visibleContentIndex === index ? 'show' : 'hide'}`} id={`notice${index + 1}`} onClick={() => onClickHandler(index)}>
                <div className="inquiryReply" style={article.inquiryReply==="답변 완료"? {color:"blue"}:{color:"red"}}>
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
                   답변 : {article.replyText}
                </div>
                {/* 어드민 쪽에서 답글 다는 로직 추가 후 추가로 나타나게 꾸며줘야함 */}
                <button className="deleteInquriy" onClick={()=>deleteHandler(article)}>삭제하기</button>
              </button>
            </div>
          ))
        ) : (
          <div className="inquiry">
            <button className={`allNotice`}>
              {noticeNull}
            </button>
          </div>
        )}
      </div>
    </>
  )
}
export default InquiryList;