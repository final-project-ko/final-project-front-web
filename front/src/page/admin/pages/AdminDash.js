import { useEffect, useState } from "react";
import "../../../components/css/admin/AdminDash.css";
import { useNavigate } from "react-router";
const AdminDash = () => {
    
  const [articles, setArticles] = useState([]);
  const [inquiry, setInquiry] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoryNews = async () => {
        try {
            const promise = await fetch(`http://localhost:8080/api/news/categoryNews/${"kr_total"}`)
                .then(response => response.json())
                .then(data => {
               //   console.log(data);
                    setArticles(data.articles);
                })
        } catch (error) {
            console.log("Error fetching data", error);
        }
    };
    const fetchAllInquiry = async() => {
      try {
        const promise = await fetch(`api/qna/findAllInquiry`)
            .then(response => response.json())
            .then(datas => {
            //  console.log(datas);
                setInquiry(datas.articles);
            })
    } catch (error) {
        console.log("Error fetching data", error);
    }
    }

    fetchCategoryNews();
    fetchAllInquiry();
}, []);

const onClickHandler = () => {
  navigate("/");
}

    return (
        <>
            <div className="visitor">
                <h2>방문자</h2>

            </div>


            <div className="newPost">
                <h2>새로운 콘텐츠</h2>
                <div className="adminNewsTitles">
                    {articles.map((article, index) => (
                        <button className="adminNews2" id={`news${index + 1}`} key={index} onClick={onClickHandler}>
                            <div className="adminNewsText">{article.title}</div>
                        </button>
                    ))}
                </div>
            </div>


            <div className="newInquiry">
                <h2>1대1 문의</h2>
                <div className="adminNewsTitles">
                    {inquiry.map((article, index) => (
                        <button className="adminNews2" id={`news${index + 1}`} key={index}>
                            <div className="adminNewsText">{article.inquiryTitle}</div>
                        </button>
                    ))}
                </div>
            </div>


            <div className="comments">
                <h2>최근 달린 댓글</h2>
  
            </div>



        </>
    )
}
export default AdminDash;