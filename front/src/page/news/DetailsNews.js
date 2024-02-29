import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import "../../components/css/DetailsNews.css"

const DetailsNews = ({ toggle }) => {

    const location = useLocation();
    const { article, articles } = location.state; // 선택한 기사 article 정보를 가져옴

    const [linkText, setLinkText] = useState("");
    const [linkUrlText, setLinkUrlText] = useState("");

    const navigate = useNavigate();

    /* 토글(국내,해외)에 따라 링크 문구 수정 */
    useEffect(() => {
        if (toggle) { // 국내
            setLinkText("기사가 더 궁금하신가요?");
            setLinkUrlText("기사 보러가기")
        } else { // 해외
            setLinkText("If you're curious about the back story?");
            setLinkUrlText("Continue reading")
        }
    }, [toggle]);

    /* DetailsNews에서 추천뉴스 클릭 시 해당 뉴스 상세페이지로 이동 */
    const onClickHandler = (article) => {

        navigate(`/detailNews/${article.code}`, {state : {article, articles}})
    }

    /* 선택한 뉴스, 추천뉴스 반환 */
    return (
        <div className='detailsNewsDiv'>
            <div className='selectedNewsDiv'>
                <img className='detailsNewsImg' src={article.image}/>
                <span className='detailsNewsTitle'>{article.title}</span>
                <span className='detailsNewsDescription'>{article.description}</span>
                <span className='detailsNewsLinkText'>
                    {linkText}&nbsp;&nbsp;
                    <a className='detailsNewsLink' href={article.url} target='_blank'>{linkUrlText}</a>
                </span>
            </div>

            <div className='recommandNewsDiv'>
                {articles.filter((a) => a !== article).map((recommandArticle, index) => (
                    <button className="recommandNewsButton" id={`news${index + 1}`} key={index} onClick={() => onClickHandler(recommandArticle)}>
                        <div className="recommandNewsImageContainer">
                            <img className="recommandNewsImage" src={recommandArticle.image} width="100%" height="100%" alt={recommandArticle.title} />
                        </div>
                        <div className="recommandNewsText">{recommandArticle.title}</div>
                    </button>
                ))}
            </div>
        </div>
    )

}

export default DetailsNews;