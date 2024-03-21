import { useEffect, useState } from "react";
import "../../../components/css/admin/AdminDash.css";
import { useNavigate } from "react-router";
import ReactApexChart from "react-apexcharts";

const AdminDash = () => {

  const [articles, setArticles] = useState([]);
  const [inquiry, setInquiry] = useState([]);
  const [comments,setComments] = useState([]);
  const navigate = useNavigate();
  const [kakao, setKakao] = useState(0);
  const [naver, setNaver] = useState(0);


  useEffect(() => {
    const fetchCategoryNews = async () => {
      try {
        const promise = await fetch(`https://www.oheveryday.shop/api/news/categoryNews/${"kr_total"}`)
          .then(response => response.json())
          .then(data => {
            //   console.log(data);
            setArticles(data.articles);
          })
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    const fetchAllInquiry = async () => {
      try {
        const promise = await fetch(`https://www.oheveryday.shop/api/qna/findAllInquiry`)
          .then(response => response.json())
          .then(datas => {
            //  console.log(datas);
            setInquiry(datas.articles);
          })
      } catch (error) {
        console.log("Error fetching data", error);
      }
    }
    const allUsers = async () => {
      try {
        const promise = await fetch(`https://www.oheveryday.shop/api/user/allUsers`)
          .then(response => response.json())
          .then(datas => {
            setKakao(datas.kakao);
            setNaver(datas.naver);
          })
      } catch (error) {
        console.log("Error fetching data", error);
      }
    }
    const allComments = async () => {
      try {
        const promise = await fetch(`https://www.oheveryday.shop/api/comments/userComments`)
          .then(response => response.json())
          .then(datas => {
            console.log(datas);
            setComments(datas);
          })
      } catch (error) {
        console.log("Error fetching data", error);
      }
    }

    fetchCategoryNews();
    fetchAllInquiry();
    allUsers();
    allComments();
  }, []);

  const onClickHandler = () => {
    navigate("/");
  }
  const donutData = {
    series: [kakao, naver], options: {
      chart: { type: 'donut', }, legend: { show: false }, responsive: [{ breakpoint: 480, }], plotOptions: {
        pie: {
          donut: { labels: { show: true, total: { showAlways: true, show: true, label: '회원 가입 현황', fontSize: '14px' }, value: { fontSize: '15px', show: true, color: 'blue', }, }, }
        }
      }, labels: ["", ""], colors: ["#F7E600", "#04c75a"], tooltip: { enabled: false }
    },
  }


  return (
    <>
      <div className="visitor" style={{ overflow: "hidden" ,backgroundColor:"white"}}>
        <h2>가입 경로</h2>
        <ReactApexChart options={donutData.options} series={donutData.series} type="donut" width="300" style={{backgroundColor:"white"}}/>
        <div className="color">
          <div className="naverColor"></div>
          <p style={{marginBottom:"1.2rem"}}>네이버 {naver}</p>
          <div className="kakaoColor"></div>
          <p>카카오 {kakao}</p>
        </div>
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


      <div className="comments" style={{overflow:"hidden"}}>
        <h2>최근 달린 댓글</h2>
        <div className="adminNewsTitles" style={{overflow:"scroll"}}>
        {comments.map((article, index) => (
            <button className="adminNews2" id={`news${index + 1}`} key={index} onClick={onClickHandler}>
              <div className="adminNewsText">{article.content}</div>
              <div className="adminNewsText">{article.email}</div>
            </button>
          ))}
          </div>
      </div>



    </>
  )
}
export default AdminDash;