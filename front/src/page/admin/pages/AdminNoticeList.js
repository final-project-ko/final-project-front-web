import { useEffect, useState } from "react";
import "../../../components/css/admin/AdminNotice.css";
const AdminNoticeList = () => {

  const [page, setPage] = useState(false);
  const [articles, setArticles] = useState([]);
  const [notice, setNotice] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const noticeList = async () => {
      await fetch(`https://www.oheveryday.shop/api/notice/allNotice`, {
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
  }, [title]);

  const onClickHandler = (article) => {
    setPage(true);
    setNotice(article);
    setTitle(article.notice_title);
    setContent(article.notice_content);
    setDate(article.notice_date);
  }

  const noticeTitleChange = (e) => {
    setTitle(e.target.value);
  }
  const noticeContentChange = (e) => {
    setContent(e.target.value);
  }

  const noticeModify = async () => {
    await fetch("https://www.oheveryday.shop/api/notice/modifyNotice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        num: notice.notice_num,
        title: title,
        content: content,
        date: date
      }),
    }).then(res => {
      if (res.ok) {
        alert("수정 완료");
        setTitle("");
        setContent("");
      } else {
        alert("오류 발생 다시 시도 해 주세요");
      }
    })
  }
  const noticeDelete = async () => {
    await fetch("https://www.oheveryday.shop/api/notice/deleteNotice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        num: notice.notice_num,
        title: title,
        content: content,
        date: date
      }),
    }).then(res => {
      if (res.ok) {
        alert("삭제 완료");
        setTitle("");
        setContent("");
      } else {
        alert("오류 발생 다시 시도 해 주세요");
      }
    })
  }



  return (
    <>
      <div className="userInfo">
        {articles.map((article, index) => (
          <button className="allUsers" id={`news${index + 1}`} key={index} onClick={() => onClickHandler(article)}>
            <div className="userText">
              <strong>제목:</strong> {article.notice_title}
            </div>
            <div className="userText">
              <strong>등록일:</strong> {article.notice_date}
            </div>

          </button>
        ))}
      </div>

      <div className="adminNoticeContent" style={page? {display:"block"} : {display:"none"}}>
        <h2>제목</h2>
        <textarea className="adminNoticeTitle" value={title} onChange={noticeTitleChange}></textarea>
        <h2>본문 내용</h2>
        <textarea className="adminNoticeAllContent" value={content} onChange={noticeContentChange}></textarea>
      </div>

      <button className="adminNoticeModify" onClick={noticeModify} style={page? {display:"block"} : {display:"none"}}>수정</button>
      <button className="adminNoticeDelete" onClick={noticeDelete} style={page? {display:"block"} : {display:"none"}}>삭제</button>

    </>
  )

}
export default AdminNoticeList;