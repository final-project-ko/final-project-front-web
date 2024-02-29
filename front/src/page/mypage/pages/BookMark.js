import {useNavigate} from "react-router-dom";

const BookMark = () => {

    const navigate = useNavigate();
    const onClickHandler = () => {

        navigate("/detailNews")
    }
    return (
        <>
            <h3 className="myPageText"> > 북마크 목록</h3>
            <div className='myPageDiv'>
                {/* img, title 카테고리별 기사에서 꺼내오는 코드로 바꾸어야 함 */}
                <button className="news" id='news1' onClick={onClickHandler}>

                </button>
                <button className="news" id='news2'>

                </button>
                <button className="news" id='news3'></button>
                <button className="news" id='news4'></button>
                <button className="news" id='news5'></button>
                <button className="news" id='news6'></button>
                <button className="news" id='news7'></button>
                <button className="news" id='news8'></button>
            </div>
        </>
        )

}

export default BookMark;