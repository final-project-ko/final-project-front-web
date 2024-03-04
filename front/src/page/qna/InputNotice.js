import { useEffect, useState } from "react";
import "../../components/css/CustomerPage.css";
import HTMLFormattedContent from "../../components/HTMLFormatContent";

const InputNotice = ({inputText}) => {

  console.log(inputText);

  const [articles, setArticles] = useState([]);
  const [visibleContentIndex, setVisibleContentIndex] = useState(-1);
  useEffect(() => {
    const noticeList = async () => {
      await fetch(`/api/notice/searchNotice/${inputText}`, {
        method: "GET",
      }).then(res => res.json())
        .then(data => {
          setArticles(data);

        })
        .catch(error => {
          console.log(error);
        });

    };
    noticeList();
  },[]);

  const onClickHandler = (index) => {
    if (visibleContentIndex === index) {
      setVisibleContentIndex(-1); // 현재 보여지는 content를 다시 숨김 (-1로 설정)
    } else {
      setVisibleContentIndex(index); // 클릭한 버튼에 해당하는 content를 보여줌
    }
  };
  return (
    <div className="notice">
    {Array.isArray(articles) && articles.map((article, index) => (
      <div className="noticeItem" key={index}>
        <button className={`allNotice ${visibleContentIndex === index ? 'show' : 'hide'}`} id={`notice${index + 1}`} onClick={() => onClickHandler(index)}>
          <div className="noticeTitle">
            {article.notice_title}
          </div>
          <div className={`noticeContent ${visibleContentIndex === index ? 'show' : 'hide'}`}>
            <HTMLFormattedContent htmlContent={article.notice_content}/>
          </div>
        </button>
      </div>
    ))}
  </div>
  );
}
export default InputNotice;