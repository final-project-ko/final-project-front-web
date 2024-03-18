import { useEffect, useState } from "react";
import "../../../components/css/admin/AdminComment.css";
const AdminComment = () => {

  const [comments, setComments] = useState([]);
  const [searchUser, setSearchUser] = useState('');

  useEffect(() => {
    const userComments = async () => {
      try {
        const promise = await fetch(`api/comments/allComments`)
          .then(response => response.json())
          .then(datas => {
            setComments(datas);
          })
      } catch (error) {
        console.log("Error fetching data", error);
      }
    }
    userComments();
  }, []);

  const findUserHandler = async () => {
    try {
      if (searchUser.length < 1) {
        const promise = await fetch(`api/comments/allComments`)
          .then(response => response.json())
          .then(datas => {
            setComments(datas);
          })
      } else {
        const promise = await fetch(`/api/comments/findUser/${searchUser}`)
          .then(response => response.json())
          .then(data => {
            setComments(data);
          })
      }
    } catch (error) {
      console.log("Error fetching data", error);
    }
  }

  const commentDelete = async (comment) => {
    await fetch(`api/comments/deleteComments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: comment.commentCode,

      }),
    }).then(res => {
      if (res.ok) {
        alert("삭제 완료");
      } else {
        alert("오류 발생 다시 시도 해 주세요");
      }
    })
  }

  const findNotify = async () => {
    try {
      const promise = await fetch(`api/comments/adminNotify`)
        .then(response => response.json())
        .then(datas => {
          setComments(datas);
        })
    } catch (error) {
      console.log("Error fetching data", error);
    }
  }

  const notifyHandler = (comment) => {
    if(comment.status !=="B"){
      return <p>신고 수 : {comment.notify}</p>
    }else{
      return <p>신고됨</p>
    }
  }

return (
  <>
    <div className="userInfo">
      <h2>댓글</h2>
      <div className="searchContainer">
        <input
          type="text"
          placeholder="유저 검색"
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
          className="searchInput"
        />
        <button className="searchButton" onClick={findUserHandler}>
          검색
        </button>
        <button className="searchButton2" onClick={findNotify} style={{ backgroundColor: "red" }}>
          신고함
        </button>

      </div>

      {comments.map((comment, index) => (
        <div className="comment" key={index}>
          <div className="commentHeader">
            <span className="adminCommentDate">{comment.date}</span>
            <span className="adminCommentEmail">{comment.email}</span>
            <span className="adminCommentEmail">{notifyHandler(comment)}</span>
          </div>
          <div className="adminCommentContent" style={comment.status==="B"? {color:"red"}:{color:"black"}}>{comment.content}</div>
          <button onClick={() => commentDelete(comment)} className="deleteButton">
            삭제
          </button>
        </div>
      ))}
    </div>
  </>
)

}
export default AdminComment;