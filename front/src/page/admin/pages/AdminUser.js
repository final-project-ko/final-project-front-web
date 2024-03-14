import { useEffect, useState } from "react";
import "../../../components/css/admin/ADminUser.css";
const AdminUser = () => {
    
  const [articles, setArticles] = useState([]);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const adminUserHandler = async () => {
    await fetch("/api/user/deleteUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: selectedArticle.userId,
      }),
    }).then(res => {
      if (res.ok) {
        alert("삭제 완료");
      } else {
        alert("오류 발생 다시 시도 해 주세요");
      }
    })
  }
  
  useEffect(() => {
    const userInfo = async () => {
        await fetch(`/api/user/admin`,{
            method: "GET",
        }).then(res => res.json())
          .then(data => {
              setArticles(data);
           //   console.log(data);

          })
            .catch(error =>{
                console.log(error);
            });
            //계속 쓸 정보들( ex: 이름) 등은 localStorage에 저장해두자
/*                localStorage.setItem("name", res.data.account.name);*/
          

    };
    userInfo();
},[adminUserHandler]);

  const userInfoHandler = (article,index) => {
    setSelectedArticle(article);
    setSelectedButtonIndex(index);
  }


    return (
        <>
  <div className="userInfo">
    <h2>유저정보</h2>
    {articles.map((article, index) => (
      <button 
      className={`allUsers ${selectedButtonIndex === index ? 'selected' : ''}`}
            id={`news${index + 1}`}
            key={index}
            onClick={() => userInfoHandler(article, index)}
      >
        <div className="userText">
          <strong>이름:</strong> {article.userName}
        </div>
        <div className="userText">
          <strong>이메일:</strong> {article.userEmail}
        </div>
        <div className="userText">
          <strong>코드:</strong> {article.userId}
        </div>
      </button>
    ))}
  </div>


  <div className="userInfoChange"></div>
  <button className="adminNoticeDelete" onClick={adminUserHandler}>유저 탈퇴</button>
        </>
    )

}
export default AdminUser;