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
    const [replyToggle, setReplyToggle] = useState([]);
    const [reply, setReply] = useState("");
    const [replyCommentCode, setReplyCommentCode] = useState("");
    const [findReply, setFindReply] = useState([]);
    const [findReplyCount, setFindReplyCount] = useState({});
    // const [replyInput, setReplyInput] = useState({});

    const navigate = useNavigate();

    /* localStorage 에서 userCode, userEmail 꺼내옴 */
    // const userEmail = localStorage.getItem('userEmail');
    const { userId, auth, userName, userEmail, setUserInfo } = useStore();
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

            // if (!response.ok) {
            //     throw new Error('서버 응답이 실패했습니다.');
            // }

            if (response.status === 401) {
                alert('로그인이 필요합니다.');
            } else if (response.status === 402) {
                alert('댓글 내용이 없습니다. 다시 입력해주세요');
            } else if (!response.ok) {
                throw new Error('서버 응답이 실패했습니다.');
            } else {
                console.log('comment submit success : ' + comment);
                alert('댓글이 등록되었습니다.');

                setComment(''); // 댓글 등록후 input박스 값 초기화

                findCommentList(); // 댓글 등록 후 댓글 다시 불러옴
            }
            
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

    useEffect(() => {
        findReplyList(replyCommentCode);
    }, [replyToggle])

    /* 댓글에 달린 답글 수 불러오는 함수 */
    useEffect(() => {
        // 컴포넌트가 마운트될 때 각 댓글에 대한 답글 갯수를 불러와서 설정
        const loadReplyCounts = async () => {
            const counts = {};  // 댓글 코드를 키로 사용하여 답글 갯수를 저장할 객체
    
            // 각 댓글 코드에 대한 답글 갯수를 불러오기
            for (const comment of commentList) {
                try {
                    const response = await fetch(`http://localhost:8080/api/reply/find/${comment.commentCode}`);
                    if (response.ok) {
                        const data = await response.json();
                        counts[comment.commentCode] = data.replys.length;
                    } else {
                        counts[comment.commentCode] = 0;
                    }
                } catch (error) {
                    console.error("Error fetching reply count", error);
                    counts[comment.commentCode] = 0;
                }
            }
    
            // 불러온 답글 갯수를 상태에 설정
            setFindReplyCount(counts);
        };
    
        loadReplyCounts();  // 함수 호출
    
        // 여기서는 commentList를 의존성 배열에 추가하지 않습니다.
        // 컴포넌트가 처음 렌더링될 때 한 번만 실행하면 되기 때문입니다.
    }, [commentList, findReply]);  // 빈 배열을 의존성 배열로 전달하여 마운트될 때만 실행되도록 함

    /* 답글 토글 함수 */
    const toggleReply = (commentCode) => {
        console.log('commentCode', commentCode);
        setReplyCommentCode(commentCode);
        setReplyToggle((prevToggle) => ({
            ...prevToggle,
            [commentCode]: !prevToggle[commentCode]
        }));
        findReplyList(commentCode);

    }

    /* 답글 등록 */
    const onReplyInputChangeHandler = (e, commentCode) => {
        setReply(e.target.value);
        setReplyCommentCode(commentCode);
    }

    const registReply = async (e) => {
        e.preventDefault();
        console.log('asdfa : ', replyCommentCode);

        try {
            // 서버로 보낼 답글 데이터
            const response = await fetch(`http://localhost:8080/api/reply/regist`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    commentCode: replyCommentCode,
                    userId: userId,
                    email: userEmail,
                    content: reply
                })
            });

            // if (!response.ok) {
            //     throw new Error('서버 응답이 실패했습니다.');
            // }

            if (response.status === 401) {
                alert('로그인이 필요합니다.');
            } else if (response.status === 402) {
                alert('답글 내용이 없습니다. 다시 입력해주세요');
            } else if (!response.ok) {
                throw new Error('서버 응답이 실패했습니다.');
            } else {
                console.log('reply submit success : ' + reply);
                alert('답글이 등록되었습니다.');
                setReply('');
                findReplyList(replyCommentCode);
            }
            
        } catch (error) {
            console.log('Error submit reply : ', error.message);
        }
    }

    /* 댓글 별 답글 조회 */
    const findReplyList = async (commentCode) => {
        console.log('comment code: ', commentCode);
        try {
            const promise = await fetch(`http://localhost:8080/api/reply/find/${commentCode}`)
                .then(response => response.json())
                .then(data => {
                    setFindReply((prevReplies) => ({
                        ...prevReplies,
                        [commentCode]: data.replys
                    }));
                    console.log('findReply :', data)
                })
        } catch (error) {
            console.log("Error fetching data", error);
        }
    }

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
                            <button className="replyButton" onClick={() => toggleReply(comment.commentCode)}>답글{findReplyCount[comment.commentCode] || 0}</button>
                            {replyToggle[comment.commentCode] && (
                                <div className="replyContainer">
                                    <div className="replyList">
                                    {(findReply[comment.commentCode] || []).map((reply, index) => (
                                            <div className="findReplyList" key={index}>
                                                <p className="replyEmail">{reply.email.replace(/@.*/, '')}</p>
                                                <p className="replyDate">{reply.date}</p>
                                                <p className="replyContent">{reply.content}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="replyRegist">
                                        <form onSubmit={registReply} className="replyForm">
                                            <input
                                                className="replyInput"
                                                type="text"
                                                placeholder={userCode ? '답글을 입력하세요' : '답글을 작성하려면 로그인 해주세요'}
                                                value={reply}
                                                onChange={(e) => onReplyInputChangeHandler(e, comment.commentCode)}
                                            ></input>
                                            <button className="replyRegistButton" type="submit">등록</button>
                                        </form>
                                    </div>
                                </div>
                            )}
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