import { useEffect, useState } from "react";
import HTMLFormattedContent from "../../../components/HTMLFormatContent";
import "../../../components/css/admin/AdminInquiry.css";

const AdminInquiry = () => {

  const [page, setPage] = useState(false);
  const [articles, setArticles] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [reply, setReply] = useState("");
  const [code, setCode] = useState("");
  const [userCode, setUserCode] = useState("");

  useEffect(() => {
    const fetchAllInquiry = async () => {
      try {
        const promise = await fetch(`https://www.oheveryday.shop/api/qna/findAllInquiry`)
          .then(response => response.json())
          .then(datas => {
          //  console.log(datas);
            setArticles(datas.articles);
          })
      } catch (error) {
        console.log("Error fetching data", error);
      }
    }

    fetchAllInquiry();
  }, [title]);

  const onClickHandler = (article) => {
    setPage(true);
    setTitle(article.inquiryTitle);
    setContent(article.inquiryContent);
    setCode(article.inquiryCode);
    setUserCode(article.userId);
  }

  const noticeTitleChange = (e) => {
    setTitle(e.target.value);
  }
  const noticeContentChange = (e) => {
    setContent(e.target.value);
  }

  const insertReply = async () => {
    await fetch(`https://www.oheveryday.shop/api/qna/insertReply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: code,
        title: title,
        content: content,
        userCode: userCode,
        reply: reply
      }),
    }).then(res => {
      if (res.ok) {
        alert("등록 완료");
        setTitle("");
        setContent("");
      } else {
        alert("오류 발생 다시 시도 해 주세요");
      }
    })
  }
  const deleteReply = async() =>{
    await fetch(`https://www.oheveryday.shop/api/qna/deleteReply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: code,
        title: title,
        content: content,
        userCode: userCode
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
          <button className="allUsers" onClick={() => onClickHandler(article)}>
            <div className="userText">
              <strong>제목:</strong> {article.inquiryTitle}
            </div>
            <div className="userText">
              <strong>유저아이디:</strong> {article.userId}
            </div>
            <div className="userText">
              <strong>등록일:</strong> {article.inquiryDate}
            </div>
          </button>
        ))}
      </div>

      <div className="adminNoticeContent" style={page? {display:"block"} : {display:"none"}}>
        <h2>제목</h2>
        <div className="adminNoticeTitle">{title}</div>
        <h2>내용</h2>
        <div className="adminNoticeTitle" style={{marginBottom:"20%"}}>
          <HTMLFormattedContent htmlContent={content} />
        </div>
        <h2>답글</h2>
        <textarea className="adminNoticeTitle" style={{border:"1px solid black",height:"30%"}} onChange={(e) => setReply(e.target.value)} />
      </div>


      <button className="adminNoticeDelete1" onClick={insertReply} style={page? {display:"block"} : {display:"none"}}>등록</button>
      <button className="adminNoticeDelete" onClick={deleteReply} style={page? {display:"block"} : {display:"none"}}>삭제</button>

    </>
  )
}

export default AdminInquiry;