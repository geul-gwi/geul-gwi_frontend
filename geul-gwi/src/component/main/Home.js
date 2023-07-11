import React, { useState, useContext} from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
// component Import!
import Header from './../common/header/Header';
import HomePost from 'component/main/HomePost';
import Navigation from 'component/main/Home/Navigation';
import Weather from "component/main/Home/Weather"
import ShowTrend from './Home/ShowTrend';
import ContentManager from './Home/ContentManager';
import AiContent from './Home/AiContent';
import Post from "component/main/Home/Post"
// src Import!
import path from 'img/back_gradient.jpg';
// Context Import
import { userStoreContext } from 'contextStore/UserStore';






const Home = () => {
    const userContext = useContext(userStoreContext);
    const isLogged = true;
    // userContext.isLogged;
    
    // Image Path
    const imagePath = process.env.PUBLIC_URL+'/img/';
    return (
        <div>
            <HeadWhite/>
            <BackImg/>
            <Frame>
                {/* <img src={process.env.PUBLIC_URL + "/icon/Navigation/home.svg"}></img> */}
                { isLogged?
                '' : <h1><Navigate to="/user/login" replace={true}/></h1>
                    
                }
                <HeadContainer>
                    <Header />
                </HeadContainer>

                {/* 왼쪽 Container */}
                <LeftContainer>
                    <Navigation/>
                    <Weather />
                </LeftContainer>
                {/* 가운데 Container */}
                <MidContainer>
                    <ContentManager />
                    <AiContent />
                    <MainContentsContainer>
                        {/* 게시글 2개 넣어보기 ( 정적이라 동적으로 바꾸어 주어야함 )
                        => 예를 들어) 기본적으로 최소 5개 콘텐츠를 보여주고, 스크롤 할 때마다 추가하는 식으로
                        => 아마 보이지 않는 게시글들은 자원을 효율적으로 사용하기 위해 활성화 되지 않다가 
                        => 다시 이전꺼를 보기 위해 활성화 시켜주는 식으로 */}
                        <Post userName={"안건"} userTitle={"감성 글 작가"} profilePath={imagePath + "/profile1.jpg"}
                        imagePath={imagePath + "/content_img1.jpg"}
                        contentSaying={"너의 신념을 남에게 이해시키지 말아라,  너가 믿는 것보다 더 중요한 것은 없다"}/>

                        <Post />
                        <Post />
                        
                    </MainContentsContainer>
                </MidContainer>
                {/* 오른쪽 Container */}
                <RightContainer>
                    <ShowTrend />
                </RightContainer>


                {/* 콘텐츠들을 담아줄  Container */}
                


            </Frame>
        </div>
    );
};
const Frame = styled.div`
    position : relative;
    width : 1200px;
    height: auto;
    min-height : 100vh;
    margin : 0 auto;

`

const BackImg = styled.div`
    position : fixed;
    width : 100%;
    height : 100vh;
    top: 0;
    left : 0;
    z-index: -1;
    background-image: url(${path});
    /* background-color : red;   */
    background-position : "center";
    background-repeat : "no-repeat";
    background-size: cover;
`


// Container는 LeftContainer , MidContainer , RightContainer 세 부분으로 나뉜다
// StyledComponent
const HeadWhite = styled.div`
    position : fixed;
    width : 100%;
    height : 70px;
    background-color : white;
    z-index : 1;
`

const HeadContainer = styled.div`
    position : fixed;
    top : 0%;
    width : 100%;
    height : 70px;
    z-index : 1;
`
const ContainerFrame = styled.div`
    position : absolute;
    width : 180px;
    height: 700px;
    margin-top : 20px;
`

const LeftContainer = styled(ContainerFrame)`
    position : fixed;
    display : flex;
    left : 40px;
    top : 100px;
    height : 470px;
    flex-direction : column;
    justify-content: space-between;
`
const MidContainer = styled(ContainerFrame)`
    position : absolute;
    top : 100px;
    left : calc(50% - 350px);
    width : 630px;
    min-height : 600px;
    height : auto;
`
const RightContainer = styled(ContainerFrame)`
    position : fixed;
    display : flex;
    width : 250px;
    right : 40px;
    top : 100px;

    flex-direction : column;
    justify-content: space-between;
`

// 메인 게시글 콘테이너
const MainContentsContainer = styled.div`
    display : flex;
    width : 100%;
    height : auto;
    min-height : 100px;
    flex-direction : column;
    align-items : center;

    padding-bottom : 50px;

    border : 1px solid black;
`



export default Home;