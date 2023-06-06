import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
// component Import!
import LikeBtn from 'component/common/button/LikeBtn';

// css Import!
import 'css/main/HomePost.css'

// React icons
import { AiOutlineLike , AiFillLike} from 'react-icons/ai'
import { useState } from 'react';

// Icon Path


const HomePost = ({profile, name, intro, contentImage,content, tags}) => {
    // Icon Path
    const IconPath = process.env.PUBLIC_URL+'/icon/LikeBtn/'

    const [LikeBtnClick, setLikeBtnClick] = useState(false)

    const toggleLike = async (e) => {
        axios.post('127.0.0.1',!LikeBtnClick)
        .then(console.log('axios success'))
        .catch(console.error());
        setLikeBtnClick(!LikeBtnClick);
    }

    return (
        <PostContainer>

            {/* 헤드영역 */}
            <PostHeadContainer>
                <PostProfileContainer>
                    <img className='content_img' src={profile} alt='profile_image'/>
                </PostProfileContainer>
                <PostProfileTxtContainer>
                    <div className='prof_name'>
                        <span className='user_name_text'>{name}</span>
                    </div>
                    <div className='intro_text'>
                        <span className='user_intro_text'>{intro}</span>
                    </div>
                </PostProfileTxtContainer>
            </PostHeadContainer>

            {/* 이미지 및 게시글 콘텐츠 */}
            <PostContentsContainer>
                <img className='content_img'  src={contentImage} alt='content_image'/>
                <span className='content_txt'> {content} </span>
            </PostContentsContainer>

            {/* 좋아요 버튼, 태그 */}
            <PostBtnTagContainer>
                <TagContainer>

                </TagContainer>
                <LikeBtnContainer onClick={ () => toggleLike }>
                    <LikeBtn like={true} onClick={ () => toggleLike() }/>
                </LikeBtnContainer>
                
            </PostBtnTagContainer>
        </PostContainer>
    );
};

// 게시글 전체 Container
const PostContainer = styled.div`
    display : flex;
    width : 500px;
    height : auto;  // 여기다가 오토주면 안됨;; ^^ 그러면 높이가 자동으로 헤더 풋터 컨텐츠 더한 높이가 돼서 더이상 안 늘어남 ㅅㄱ
    min-height: 300px;
    box-shadow: 3px 3px 8px 0px #b3b3b3;
    background-color : white;
    margin : 20px 30px 90px 30px; /* top right down left*/
    padding-left : 20px;
    padding-right : 20px;
    border-radius : 16px;
    justify-content: space-evenly;
    flex-direction: column;
`
// 게시글 헤더 부분 영역
const PostHeadContainer = styled.div`
    position : relative;
    display : flex;
    width : 100%;
    height : 6  0px;
    align-items: center;
    flex-direction: row;
    margin-top : 5px; margin-bottom : 5px;
    background-color : white;
`
// 게시글 콘텐츠 부분 영역
const PostContentsContainer = styled.div`
    width : 100%;
    height : auto;
    min-height : 150px;
    overflow:hidden
`
// 게시글 아래 : 태그 , 좋아요 버튼 Container
const PostBtnTagContainer = styled.div`
    position : relative;
    width : 100%;
    height : 40px;
    border : 1px solid grey;
`
// Tag Container
const TagContainer = styled.div`
    position : absolute;
    left: 0px;
    top : 0px;
    width : 66%;
    height : 100%;
    background-color : grey;
`
// Like Container
const LikeBtnContainer = styled.div`
    position : absolute;
    display : flex;
    right : 0px;
    bottom : 0px;
    width : 40px;
    height : 40px;
    border:  1px solid blue;

    align-items : center;
    justify-content : center;
    cursor : pointer;
`

// 게시글 프로필 Container
const PostProfileContainer = styled.div`
    
    width : 50px;
    height : 50px;
    border-radius : 70%;
    overflow:hidden;
`
// 게시글 작성자, 소개글 Container
const PostProfileTxtContainer = styled.div`
    padding-left : 7px;
    padding-top : 15px;
    text-align: left;
    width : calc(100% - 60px);
    height : 50px;
`
// 게시글 


export default HomePost;