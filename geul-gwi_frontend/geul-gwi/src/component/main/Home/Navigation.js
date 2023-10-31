import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi'; // 로그아웃 아이콘
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'; // Redux 사용 Library
import Axios from 'axios';
import { logout } from 'Reducer/authReducer';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';

// component
import NoticeForm from "component/notice/NoticeForm";
import FriendForm from "component/friend/FriendForm";

const menus = []
menus.push({ "name": "홈", "src": "/icon/Navigation/home.svg", "target": "/" })
menus.push({ "name": "알림", "src": "/icon/Navigation/bell.svg", "target": "/alarm" })
menus.push({ "name": "친구", "src": "/icon/Navigation/users.svg", "target": "/friend" })
menus.push({ "name": "쪽지함", "src": "/icon/Navigation/free-icon-letter-1250663.png", "target": "/main/message" })
menus.push({ "name": "챌린지", "src": "/icon/Navigation/free-icon-notes-622216.png", "target": "/main/WritingChallenge" })
menus.push({ "name": "작성", "src": "/icon/Navigation/free-icon-add-button-7324985.png", "target": "/main/Writing" })

const Navigation = () => {
    const dispatch = useDispatch();
    const axiosAddr = useContext(AxiosAddrContext).axiosAddr;
    const userSeq = useSelector((state) => state.authReducer.userSeq);
    const userToken = useSelector((state) => state.authReducer.accessToken);
    const logoutUrl = '/user/logout';
    const navigate = useNavigate();

    const [isAlertFormVisible, setIsAlertFormVisible] = useState(false);
    const [isFriendForm, SetisFriendForm] = useState(false);

    const ComponentMove = (target) => {
        if (target === "/alarm") {
            handleAlertClick();
            return;
        }
        else if (target === "/friend") {
            handleFriendClick();
            return;
        }
        navigate(`${target}`);
    }

    const handleAlertClick = () => {
        setIsAlertFormVisible(!isAlertFormVisible);
        SetisFriendForm(false);
    };

    const handleFriendClick = () => {
        SetisFriendForm(!isFriendForm);
        setIsAlertFormVisible(false);
    };
    const goHome = () => {
        navigate("/");
    }
    const [isMoreMenuVisible, setIsMoreMenuVisible] = useState(false);

    const handleMoreButtonClick = () => {
        setIsMoreMenuVisible(!isMoreMenuVisible);
    };

    const userNickname = useSelector((state) => state.authReducer.userNickname);
    const userProfile = useSelector((state) => state.authReducer.userProfile);
    const role = useSelector((state) => state.authReducer.role);

    // 로그아웃
    const onClickLogout = async () => {
        try {
            const response = await Axios.post(`${axiosAddr}${logoutUrl}`, {}, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            navigate('/user/login');
            dispatch(logout());

        } catch (error) {
            console.error('로그아웃 실패:', error);
        }
    };

    const onClickProfile = () => {
        navigate('/main/Profile', { state: { profileUserSeq: userSeq } });
    };

    const onClickManagement = () => {
        navigate('/manager');
    };


    return (
        <NaviFrame>
            <TextContainer style={{ fontFamily: "Maru Buri", fontStyle: "semi-bold" }} onClick={goHome}>
                <Logo src={process.env.PUBLIC_URL + "/img/Logo.png"}></Logo>
            </TextContainer>
            <Container>
                {menus.map((element, idx) => (
                    <Item id={"NaviButton" + idx} onClick={() => ComponentMove(element.target)}>
                        <IconBox><IconImg src={process.env.PUBLIC_URL + element.src} /></IconBox>
                        <TextBox>{element.name}</TextBox>
                    </Item>
                ))}
                <Item>
                    <IconBox>
                        <ProfileImage src={userProfile ? userProfile : "/img/defaultProfile.png"}/>
                    </IconBox>
                    <TextBox onClick={() => onClickProfile()}>프로필</TextBox>
                </Item>

            </Container>
            <subscribeContainer>
                    구독
            </subscribeContainer>
            <MoreButton onClick={handleMoreButtonClick}>
                <Item>
                    <IconBox><IconImg src={process.env.PUBLIC_URL + "/icon/Navigation/free-icon-menu-1828859.png"} /></IconBox>
                    <TextBox>더보기</TextBox>
                </Item>
            </MoreButton>
            {isMoreMenuVisible && <MenuButtonContainer>
                <MenuButtonManager>
                    {role === 'ADMIN' && <MenuItem onClick={onClickManagement}>사이트 관리</MenuItem>}
                    <MenuItem onClick={onClickLogout}>로그아웃
                        <FiLogOut size={16} style={{ marginLeft: '8px' }} />
                    </MenuItem>
                </MenuButtonManager>
            </MenuButtonContainer>}
            <AlertContainer isVisible={isAlertFormVisible}>
                {isAlertFormVisible &&
                    <NoticeForm
                        handleAlertClick={handleAlertClick}
                    />}
            </AlertContainer>
            <AlertContainer isVisible={isFriendForm}>
                {isFriendForm &&
                    <FriendForm
                        handleFriendClick={handleFriendClick}
                    />}
            </AlertContainer>
        </NaviFrame>
    );
};

const subscribeContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 300px;
    width: 100%;
    align-items: center;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
`

const NaviFrame = styled.div`
    position: absolute;
    height: 100%;
    user-select: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    width: 320px;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
        align-items: center;
    margin-top: 40px;
    width: 100%;
`

const Logo = styled.img`
    position: relative;
    top: -50px;
    left: -20px;
    height: 220px;
    width: 240px;
`

const AlertContainer = styled.div`
    position: absolute;
    top: 0px;
    right: ${({ isVisible }) => (isVisible ? "-460px" : "0px")}; /* 알림함을 왼쪽에 숨겨둡니다. */
    transition: right 0.3s; 
    height: 100vh;
`

const MenuButtonContainer = styled.div`
  position: absolute;
  left: 35px;
  bottom: 80px;
  width: 200px;
  min-height: 10px;
  height: auto;
  border-radius: 12px;
  background-color: white;

`;

const MenuButtonManager = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  justify-content: space-between;
  color: #343434;
  cursor: pointer;
  font-size: 14px;
  padding: 0 5px;
  transition: background-color 0.2s;
  border-radius: 8px ;
  &:hover {
    background-color : rgb(240, 240, 240);
  }
`;

const ProfileImage = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
    cursor: pointer;
    transition: transform 0.2s;
    border: solid 1px #ccc;

    &:hover {
        transform: scale(1.1);
    }
`;

const Item = styled.div`
    display : flex;
    width : 90%;
    height : 55px;
    justify-content : center;
    align-items : center;
    cursor : pointer;
    border-radius: 8px;
    transition: 0.3s;

    &:hover{
        background-color : rgb(240, 240, 240);
    }
`
const IconBox = styled.div`
display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    cursor: pointer;
    border-radius: 50%;
    flex: 2;
    &:hover {
        background-color: rgb(240, 240, 240);
    }
`
const TextBox = styled.div`
    display : flex;
    flex: 7;
    align-items: center;
    color : #343434;
    font-size: 17px;
`
const IconImg = styled.img`
    width : 20px;
    height : 20px;


`
const TextContainer = styled.div`
    margin-top: 35px;
    display : flex;
    left : 0px;
    width : auto;
    color : #FFB6B2;
    font-size: 40px;
    height: 120px;
    cursor : pointer;
`
const MoreButton = styled.div`
    position: absolute;
    bottom: 20px;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    cursor: pointer;
    display: flex;
`;
export default Navigation;