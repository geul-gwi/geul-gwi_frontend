// import Library
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import styled from 'styled-components';
import { Navigate, useNavigate } from 'react-router-dom';
// Using Redux
import { useDispatch, useSelector } from 'react-redux';
// import axios
import axios from 'axios';
import { logout } from 'Reducer/authReducer';

const MenuList = [];
MenuList.push({'value' : '글 작성','componentSrc':'/main/Writing'});
MenuList.push({'value' : '챌린지','componentSrc':'/main/WritingChallenge'});

const HeaderMenu = () => {
    const AxiosAddress = useContext(AxiosAddrContext).axiosAddr; // Axios Address
    // User 로그인 정보
    const userToken = useSelector((state) => state.authReducer.accessToken);
    const logoutUrl = '/user/logout'; // 로그아웃 요청 주소

    const [isButtonHidden, setIsButtonHidden] = useState(false);

    // object
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const ShowList = () => {
        setIsButtonHidden(!isButtonHidden);
    };
    const OnLiClicked = (src) =>{
        navigate(`${src}`);
    }

    // 로그아웃 버튼 클릭
    const onLogout = async () => {
        //console.log("Current userToken : ", userToken);
        await axios.post(`${AxiosAddress}${logoutUrl}`, {},
            {
                headers: {
                    Authorization: "Bearer " + userToken,  // 토큰 넣어주기
                },
            }
        )
            .then((response) => {
                //console.log("로그아웃 성공 : ", response);
                dispatch(logout());
                navigate(`/user/login`); // 로그아웃 성공하면 메인 페이지로 이동한다.
            }).catch((error) => {
                // 로그아웃이 실패하면 토큰만료 문제이므로 다시 로그인하도록
                dispatch(logout());
                navigate(`/user/login`); // 로그아웃 성공하면 메인 페이지로 이동한다.
            })
    }


    return (
        <MenuContainer>
            <IconBox onClick={ShowList}>
                <CustomizedImage src={process.env.PUBLIC_URL + "/icon/Header/bars-sort.svg"} alt="HeaderMenu" fill={"blue"} ></CustomizedImage>
            </IconBox>
            {isButtonHidden && <MenuButtonContainer id="displayMenu">
                {/* 보일 버튼들을 담는 ul */}
                <MenuButtonManager>
                    {MenuList.map((element) => (
                            <MenuItem onClick={() => {OnLiClicked(element.componentSrc)}}>
                                {element.value}
                            </MenuItem>
                    ))}
                    {
                        userToken === null ?
                        <MenuItem onClick={() => {OnLiClicked('/user/login')}}>로그인</MenuItem>
                        :
                        <MenuItem onClick={onLogout}>로그아웃</MenuItem>
                    }
                        
                </MenuButtonManager>
            </MenuButtonContainer>
            }
        </MenuContainer>
    );
};
// level 1
const MenuContainer = styled.div`
    position : relative;
    display : flex;
    min-width : 50px;
    width : auto;
    height : 100%;
    justify-content : center;
    align-items : center; 
`
const IconBox = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    width : 50px;
    height : 50px;
    background-color : white;
    box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.25);
    border-radius : 50px;
    cursor : pointer;
`
// MenuButton Container = 클릭했을때 보이는 메뉴를 담는 Container
const MenuButtonContainer = styled.div`
    position : absolute;
    right : 0px;
    top : calc(100% + 10px);
    width : calc(100% * 2);
    min-height : 50px;
    height : auto;
    border-radius : 12px;
    box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.25);
    background-color : white;
    overflow : hidden;
`

// level 2
    // icon
    const CustomizedImage = styled.img`
        width : 25px;
        height : 25px;
        margin : 0 auto;
    `

    // Button Manager
    // 클릭했을때 보이는 버튼들을 뿌려줄 ul
    const MenuButtonManager = styled.ul`
        display : flex;
        width : 100%;
        height : 100%;
        flex-direction : column;
        padding-left : 0px;
        margin : 0px;
    `

// level 3
    // ButtonItem
    // 클릭할 수 있는 버튼
    const MenuItem = styled.li`
        display : flex;
        width : 100%;
        height : 40px;
        justify-content : center;
        align-items : center;
        color : #343434;
        cursor : pointer;
        &:hover{
            background-color : #D9D9D9;
        }
    `

export default HeaderMenu;