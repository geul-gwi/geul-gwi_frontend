import React, { useState, useContext, useEffect } from 'react';
import { AiOutlineLeft, AiOutlineRight, AiOutlineEdit, AiFillHeart, AiOutlineHeart, AiOutlineClose } from "react-icons/ai"; 
import styled from 'styled-components';
import axios from 'axios';
import "css/main/Post.css"
import { useNavigate } from 'react-router-dom';
// component
import { Tag } from 'component/common/button/Tag';
import { useSelector } from 'react-redux'; // Redux 사용 Library
import { AxiosAddrContext } from 'contextStore/AxiosAddress';

const Post = (props) => {
    const { axiosAddr } = useContext(AxiosAddrContext);
    const { userSeq, accessToken } = useSelector((state) => state.authReducer);
    const likeUrl = '/geulgwi/like/'; // 좋아요 요청 주소
    const likeDelateUrl = '/geulgwi/unlike/'; // 좋아요 취소 요청 주소
    const postDetailUrl = '/geulgwi/search/'; // 게시물 세부 요청 주소
    const postDeleteUrl = '/geulgwi/delete/'; // 게시물 삭제 요청 주소
    const navigate = useNavigate();

    const [currentImageIndex, setCurrentImageIndex] = useState(0); // 이미지 넘겨보기 위한 인덱스
    const [imageUrls, setImageUrls] = useState([]); // 이미지 URL 목록을 저장할 배열
    const [isLiked, setIsLiked] = useState(props.liked);
    const [likeCount, setLikeCount] = useState(props.likeCount);

    

    // 이미지 데이터를 가져오는 함수
    const fetchImageData = async (path) => {
        try {
            const encodedPath = encodeURIComponent(path);
            const response = await axios.get(`${axiosAddr}/file?file=${encodedPath}`, {
                responseType: 'blob',
            });

            if (response) {
                const newFile = new File([response.data], 'image');
                const reader = new FileReader();
                return new Promise((resolve, reject) => {
                    reader.onload = (event) => {
                        const imageUrl = event.target.result;
                        resolve(imageUrl);
                    };
                    reader.onerror = (error) => {
                        reject(error);
                    };
                    reader.readAsDataURL(newFile);
                });
            }
        } catch (error) {
            console.error('이미지 가져오기에 실패했습니다.', error);
            return null;
        }
    }

    // 이미지를 다음으로 이동하는 함수
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    };

    // 이미지를 이전으로 이동하는 함수
    const previousImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
    };

    // 게시물 삭제 함수
    const onDeletePost = async () => {
        // 사용자에게 확인 메시지를 표시
        const confirmed = window.confirm('게시물을 삭제하시겠습니까?');

        // 사용자가 확인을 클릭한 경우에만 삭제 동작을 실행
        if (confirmed) {
            try {
                const response = await axios.delete(`${axiosAddr}${postDeleteUrl}${props.geulgwiSeq}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (response) {
                    window.location.reload();
                };

            } catch (error) {
                console.error('게시물 삭제 실패.', error);
                return null;
            }
        }
    };

    useEffect(() => {
        // 게시물 이미지 URL 목록을 가져오는 함수
        const fetchImageUrls = async () => {
            const urls = [];
            for (const file of props.files) {
                try {
                    const imageUrl = await fetchImageData(file);
                    urls.push(imageUrl);
                } catch (error) {
                    console.error('이미지 URL 가져오기 실패:', error);
                }
            }
            setImageUrls(urls);
        };
        fetchImageUrls();
    }, []);

    // 좋아요 눌렀을 때 새로고침
    const reload = async () => {
        try {
            const response = await axios.get(`${axiosAddr}${postDetailUrl}${props.geulgwiSeq}?viewSeq=${userSeq}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response) {
                setLikeCount(response.data.likeCount);
                setIsLiked(response.data.liked);
            };

        } catch (error) {
            console.error('이미지 가져오기에 실패했습니다.', error);
            return null;
        }
    }

    const onClickLikeButton = async (e) => {
        if (isLiked) {
            // "좋아요" 취소 로직
            try {
                const response = await axios.delete(`${axiosAddr}${likeDelateUrl}${props.geulgwiSeq}/${userSeq}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (response) {
                    console.log("좋아요 취소 성공 : ", response);
                    reload();
                }
            } catch (error) {
                console.error("좋아요 취소 실패 : ", error);
            }
        } else {
            // "좋아요" 로직
            try {
                const response = await axios.post(`${axiosAddr}${likeUrl}${props.geulgwiSeq}/${userSeq}`, {}, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (response) {
                    console.log("좋아요 성공 : ", response);
                    reload();
                }
            } catch (error) {
                console.error("좋아요 실패 : ", error);
            }
        }
    }
    
    const onClickPostEdit = () => {
        const data = {
            geulgwiSeq: props.geulgwiSeq,
            geulgwiContent: props.geulgwiContent,
            tags: props.tags,
            files: props.files,
            profileUserSeq: props.profileUserSeq
        }

       // console.log("게시물 수정 페이지 이동 : ", data);

        navigate('/main/PostEdit', { state: data }); 
    };

    return (
        <PostFrame>
            <PostProfileContainer>
                <ProfileImage><img src={props.profile}></img></ProfileImage>
                <ProfileName>
                    <Name>{props.nickname}</Name>
                    <Comment>{props.comment}</Comment>
                    {userSeq === props.profileUserSeq && (
                        <HeaderButtonContainer>
                            <EditIcon><AiOutlineEdit size={22} color='gray' onClick={onClickPostEdit} /></EditIcon>
                            <EditIcon><AiOutlineClose size={22} color='gray' onClick={onDeletePost} /></EditIcon>
                        </HeaderButtonContainer>
                    )}
                </ProfileName>

            </PostProfileContainer>
            <PostImageContainer>
                {imageUrls.length > 1 && (
                    <ArrowButton onClick={previousImage}>
                        <AiOutlineLeft />
                    </ArrowButton>
                )}
                {imageUrls.length > 0 && (
                    <img src={imageUrls[currentImageIndex]}/>
                )}
                {imageUrls.length > 1 && (
                    <ArrowButton onClick={nextImage}>
                        <AiOutlineRight />
                    </ArrowButton>
                )}
            </PostImageContainer>
            <Content>{props.geulgwiContent}</Content>
            <TagButtonContainer>
                <TagContainer>
                    <TagsContainer>
                        {props.tags && props.tags.map((tag) => (
                            <Tag fontColor={tag.fontColor} backColor={tag.backColor}>
                                {'# ' + tag.value}
                            </Tag>
                        ))
                        }
                    </TagsContainer>
                </TagContainer>
                <ButtonContainer>
                    {isLiked ?
                        <AiFillHeart class="likebtn" size={30} color={"red"} onClick={onClickLikeButton} /> :
                        <AiOutlineHeart class="likebtn" size={30} onClick={onClickLikeButton} />
                    }
                    {likeCount}
                </ButtonContainer>
            </TagButtonContainer>
        </PostFrame>
    );
};

const EditIcon = styled.div`
    //position: absolute; /* 아이콘의 위치를 조절하기 위해 상대 위치 설정 */
    //top: 5px; /* 원하는 위치로 조절 (상단 여백) */
    //right: 5px; /* 원하는 위치로 조절 (우측 여백) */
    cursor: pointer;
`;

const PostFrame = styled.div`
    display : flex;
    width : calc(85% - 40px);
    height : auto;
    padding : 20px; 
    border-radius : 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    background-color : white;
    flex-direction: column;
    margin-top : 30px;
    user-select: none;
`

const PostProfileContainer = styled.div`
    display : flex;
    width : 100%;
    height : 50px;
    align-items: center;
    justify-content : space-between;
    margin-bottom:10px;
        position: relative; /* 상대 위치 설정 */
`
const PostImageContainer = styled.div`
    display : flex;
    flex-direction: row;
    width : 100%;
    height : auto;
    justify-content : center;
    align-items : center;
    margin-bottom: 30px;
`
const Content = styled.div`
    width : 100%;
    height : auto;
    margin-bottom : 25px;
    font-size: 14px;
`
const TagButtonContainer = styled.div`
    display : flex;
    width : 100%;
    height : 30px;
`
const ProfileImage = styled.div`
        width : 50px;
        height : 100%;
        border-radius : 70%;
        overflow: hidden;
        border: 1px solid #ccc;
    `
const ProfileName = styled.div`
        display : flex;
        width : calc(100% - 60px);
        height : 100%;
        flex-direction: column;
        justify-content : space-evenly;
    `
const TagContainer = styled.div`
        display : flex;
        width : calc(100% - 30px);
        height : auto;
    `
const ButtonContainer = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    width : 30px;
    height : 100%;
    border-radius : 16px;
    cursor : pointer;
    &:hover {
      transform: scale(1.2);
      transition: transform 0.2s ease-in-out;
    }
`
const Name = styled.div`
    width : 100%;
    height : 35%;
    font-style : "bold";
    font-size : 16px;
    color : #5F5F5F;
`

const Comment = styled.div`
    width : 100%;
    height : 35%;
    font-size : 13px;
    color : #ccc;
`

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px; 
`;

const HeaderButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  
  flex-direction: row;
      position: absolute; /* 아이콘의 위치를 조절하기 위해 상대 위치 설정 */
    top: 5px; /* 원하는 위치로 조절 (상단 여백) */
    right: 5px; /* 원하는 위치로 조절 (우측 여백) */
`;

const ArrowButton = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    background-color: rgb(250, 250, 250);
    color: #333;
    border: 1px solid #ccc;
    border-radius: 100%;
    padding: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  
    svg { // 세모 화살표 아이콘 스타일
    width: 16px;
    height: 16px;
    }

    &:hover {
        background-color: rgb(230, 230, 230);
    }
`;



export default Post;