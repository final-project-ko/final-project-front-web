import { useEffect, useState } from "react";
import "../../../components/css/admin/ADminUser.css";
const AdminUser = () => {
    
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const userInfo = async () => {
        await fetch(`/api/user/admin`,{
            method: "GET",
        }).then(res => res.json())
          .then(data => {
              setArticles(data);
              console.log(data);

          })
            .catch(error =>{
                console.log(error);
            });
            //계속 쓸 정보들( ex: 이름) 등은 localStorage에 저장해두자
/*                localStorage.setItem("name", res.data.account.name);*/
            //로그인이 성공하면 이동할 페이지

    };
    userInfo();
},[]);


    return (
        <>
  <div className="userInfo">
    <h2>유저정보</h2>
    {articles.map((article, index) => (
      <button className="allUsers" id={`news${index + 1}`} key={index}>
        <div className="userText">
          <strong>이름:</strong> {article.userName}
        </div>
        <div className="userText">
          <strong>이메일:</strong> {article.userEmail}
        </div>
        <div className="userText">
          <strong>코드:</strong> {article.userCode}
        </div>
      </button>
    ))}
  </div>
        </>
    )

}
export default AdminUser;