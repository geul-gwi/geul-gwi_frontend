import React, { useState, useContext} from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
// component Import!
import Header from './../common/header/Header';
import LeftNavbar from '../common/leftNav/LeftNavbar';
import HomePost from 'component/main/HomePost';
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
        <div style={{height : "auto"}}>
            { isLogged?
            '' : <h1><Navigate to="/user/login" replace={true}/></h1>
                
            }
            <LeftNavbar />
            <HeadBackImg/>
            <HeadContainer>
                <Header />
                <RecomContainer >
                    {/* 추천글 타이틀 */}
                    <RecomTitle style={{fontFamily : "Nanum Square Round"}}>금일의 추천 글</RecomTitle>
                    {/* 추천글 Contents */}
                    <RecomContentsContainer >
                        {/* 나중에 Component화 하여야 할 부분 */}
                        <RecomContents_HeadContainer >
                            
                        </RecomContents_HeadContainer>

                        {/* 콘텐츠 넣어야함 ( 나중에 컴포넌트 화 할 것 = 객체처럼 써야함) */}

                    </RecomContentsContainer>
                </RecomContainer>
            </HeadContainer>
            <MainContentsContainer>

                {/* 게시글 2개 넣어보기 ( 정적이라 동적으로 바꾸어 주어야함 )
                => 예를 들어) 기본적으로 최소 5개 콘텐츠를 보여주고, 스크롤 할 때마다 추가하는 식으로
                => 아마 보이지 않는 게시글들은 자원을 효율적으로 사용하기 위해 활성화 되지 않다가 
                => 다시 이전꺼를 보기 위해 활성화 시켜주는 식으로 */}
                <HomePost profile={imagePath+'profile1.jpg'} name={'영원한 우정님'} intro={'너와 나는 언제나 함께야'}
                    contentImage={imagePath+'content_img1.jpg'} 
                    content={'너의 신념을 남에게 이해시키지 말아라,  너가 믿는 것보다 더 중요한 것은 없다'}
                    tags={['위로','감성']}
                />
                <HomePost profile={imagePath+'profile2.jpg'} name={'안건'} intro={'감성 글 작가'}
                    contentImage={imagePath+'content_img2.jpg'}
                    content={"인공지능, AI를 하나의 생명으로 바라본 다면 어떨까, \n 그들은 어떤 사람들에게는 그저 로봇에 불과할 수 있지만 \n 어떤 이들에게는 삶의 동반자다"}
                    tags={['동기부여','새벽']}
                />
                <HomePost profile={imagePath+'profile_cat.jpg'} name={'The_Love_creatures'} intro={'동물보호가'}
                    contentImage={imagePath+'content_img5.jpg'}
                    content={"우리가 짐승이라고 생각하는 동물또한 생각을 한다. \n 그들에게도 마음이 있고 생각이 있다 \n 이 세상에 친구가 될 수 없는 존재는 없다"}
                    tags={['자연','동물','사랑']}
                />
            </MainContentsContainer>

        </div>
    );
};
const HeadBackImg = styled.div`
    position : absolute;
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

// StyledComponent
const HeadContainer = styled.div`
    position : relative;
    top : 0%;
    width : 100%;
    height : auto;
    min-height : 580px;
    
    /* background-image : url("i-mg/back_gradient.jpg"); */
`
const RecomTitle = styled.span`
    display : inline-block;
    color : white;
    font-size : 24px;
    font-weight : normal;
    padding-bottom : 10px;
    
`

// 추천 Container들
const RecomContainer = styled.div`
    padding-top : 80px;
    width : 700px;
    height : 76%;
    background-color : rgba(255,255,255,0);
    margin : 0 auto;

`
const RecomContentsContainer = styled.div`
    width : calc(100% - 3px);
    height : 300px;
    background-color : rgba(255,255,255,0);
    border : 2px solid white;
    border-radius : 12px;
    overflow: hidden;
`
const RecomContents_HeadContainer = styled.div`
    position : relative;
    top : 0;
    left : 0;
    width : 100%;
    height : 50px;
    background-color : white;
`

// 메인 게시글 콘테이너
const MainContentsContainer = styled.div`
    display : flex;
    width : 800px;
    height : auto;
    min-height : 1000px;
    
    margin : 0 auto;
    flex-direction : column;
    flex-wrap: no-wrap;
    align-items : center;

    border : 1px solid black;
`

export default Home;