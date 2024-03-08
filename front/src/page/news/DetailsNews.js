import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import "../../components/css/DetailsNews.css"
import useStore from "../../store";

const DetailsNews = ({ toggle }) => {

    const location = useLocation();
    const { article, articles } = location.state; // 선택한 기사 article 정보를 가져옴

    const [linkText, setLinkText] = useState("");
    const [linkUrlText, setLinkUrlText] = useState("");
    const [comment, setComment] = useState("");
    const [commentList, setCommentList] = useState([]);

    const navigate = useNavigate();

    /* localStorage 에서 userCode, userEmail 꺼내옴 */
    // const userEmail = localStorage.getItem('userEmail');
    const { userId, auth,userName,userEmail, setUserInfo } = useStore();
    const userCode = userId;

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

        navigate(`/detailNews/${article.code}`, { state: { article, articles } })
    }

    /* comment input 값 핸들러 */
    const onInputChangeHandler = (e) => {
        setComment(e.target.value);
    }

    /* spring 서버로 댓글 입력 값 전송 */
    const registComment = async (e) => {
        e.preventDefault();

        try {
            // 서버로 보낼 데이터

            const response = await fetch(`http://localhost:8080/api/comments/regist`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    newsCode: article.code,
                    email: userEmail,
                    content: comment
                })
            });

            if (!response.ok) {
                throw new Error('서버 응답이 실패했습니다.');
            }
            console.log('comment submit success : ' + comment);
            alert('댓글이 등록되었습니다.');

            setComment(''); // 댓글 등록후 input박스 값 초기화

            findCommentList(); // 댓글 등록 후 댓글 다시 불러옴
        } catch (error) {
            console.log('Error submit comment : ', error.message);
        }
    }

    /* 뉴스 별 댓글 조회 */
    // useEffect(() => {
        const findCommentList = async () => {
            console.log("code: ", article.code)
            try {
                const promise = await fetch(`http://localhost:8080/api/comments/find/${article.code}`)
                    .then(response => response.json())
                    .then(data => {
                        setCommentList(data);
                        console.log("data: ", data);
                        // console.log("commentList", commentList.length);
                    })
            } catch (error) {
                console.log("Error fetching data", error);
            }
        };
        // findCommentList();
    // }, [article, commentList]);

    useEffect(() => {
        findCommentList();
    }, [article])


    // article.description에서 '.'이 있는 부분을 모두 '\n'으로 치환하여 줄바꿈 처리
    const formattedDescription = article.description.replace(/다\.(?!$)/g, '다.\n\n');

    /* 선택한 뉴스, 추천뉴스 반환 */
    return (
        <div className='detailsNewsDiv'>
            <div className='selectedNewsDiv'>
                {/*<div className="scroll-bar" ref={scrollBarIndicatorRef}></div>*/}
                <span className='detailsNewsTitle'>{article.title}</span>
                <img className='detailsNewsImg' src={article.image} />
                <span className='detailsNewsDescription'>{formattedDescription}</span>
                <span className='detailsNewsLinkText'>
                    {linkText}&nbsp;&nbsp;
                    <a className='detailsNewsLink' href={article.url} target='_blank'>{linkUrlText}</a>
                </span>
                <div className='newsCommentDiv'>
                    <div className='commentHead'>
                        <a className='commentCount'>{commentList.length}개의 댓글</a>
                        <br />
                        <form onSubmit={registComment} className="commentForm">
                            <input
                                className="commentInput"
                                type="text"
                                placeholder={userCode ? '여기에 댓글을 입력하세요' : '댓글을 작성하려면 로그인 해주세요'}
                                value={comment}
                                onChange={onInputChangeHandler}
                            ></input>
                            <button className="commentRegistButton" type="submit">등록</button>
                        </form>
                    </div>
                    {commentList.map(comment => (
                        <div key={comment.commentCode} className="commentBox">
                            <p className="commentEmail">{comment.email.replace(/@.*/, '')}</p> {/* email값 @포함하여 뒤를 빈문자열로 대체 */}
                            <p className="commentDate">{comment.date}</p>
                            <p className="commentContent">{comment.content}</p>
                            <button className="replyButton">답글{/*답글 카운트*/}</button>
                        </div>
                    ))}
                </div>
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