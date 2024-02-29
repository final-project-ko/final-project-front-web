import {NavLink} from "react-router-dom";

const UserInfo = () => {

    return (
        <>
            <div className="userInfoDiv">
                <NavLink to={"/"}>닉네임 변경</NavLink>
                <NavLink to={"/"}>해외 신문 원어로 보기</NavLink>
                <NavLink to={"/"}>로그 아웃</NavLink>
                <NavLink to={"/"}>회원 탈퇴</NavLink>
            </div>
        </>
    )
}
export default UserInfo;