import React, { useState, useCallback, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import styled from 'styled-components';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { useSelector } from 'react-redux'; 
import ProfilePostList from 'component/user/profile/ProfilePostList';
import { Tag } from 'component/common/button/Tag'
import { Button } from 'component/common/button/Button'
import imageDataFetcher from 'service/imageDataFetcher';

// useCallback

// profileUserSeq => 보여줄 유저의 프로필 시퀀스
const Profile = ({ profileUserSeq }) => {
  const navigate = useNavigate();
  const axiosAddr = useContext(AxiosAddrContext).axiosAddr;
  const userSeq = useSelector((state) => state.authReducer.userSeq);
  const userToken = useSelector((state) => state.authReducer.accessToken);

  const userDetailUrl = '/user/detail/'; // 유저 세부 정보 불러오기 요청 주소
  const friendRequestUrl = '/friend/confirm'; // 친구 요청 주소
  const friendDeleteUrl = '/friend/delete'; // 친구 삭제 요청 주소
  const friendStatusUrl = '/friend/status'; // 친구 상태 요청 주소

  const [isModalOpen, setIsModalOpen] = useState(false); // 프로필 사진 팝업창 on/off
  const [userInfo, setUserInfo] = useState({}); // 유저 프로필 정보
  const [friendStatus, setFriendStatus] = useState(null);

  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await Axios.get(`${axiosAddr}${userDetailUrl}${profileUserSeq}`, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      });

      const userData = response.data;
      const profileImageUrl = await imageDataFetcher(axiosAddr, userData.profile);

      setUserInfo({
        ...userData,
        profile: profileImageUrl
      });

      const status = await CheckFriendStatus();
      setFriendStatus(status);
    } catch (error) {
      console.log('프로필 불러오기 실패:', error);
    }
  }, [axiosAddr, userToken, profileUserSeq, navigate]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  // 프로필 사진 클릭
  const onProfileClick = () => {
    if (null == userInfo.profile) return;
    setIsModalOpen(true);
  };

  // 프로필 자세히 보기 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 프로필 편집 
  const onEditClick = () => {
    navigate('/main/ProfileEdit', { state: userInfo }); // 프로필 정보 넘기기
  };

    // 쪽지 보내기
    const onClickMessageSend = () => {

      const data = { 
        receiverSeq: userInfo.userSeq, 
        receiverNickname: userInfo.nickname
      };

      navigate('/main/messageWriting', { state: data });
    };
    
  // 친구 요청 
  const sendFriendRequest = async () => {
    if('pending' === friendStatus)
    {
      alert("친구 승인 대기중입니다.");
      return;
    }

    try {
      const friendDTO = {
        'toUser': profileUserSeq, // 요청 받는 사람
        'fromUser': userSeq, // 요청 보낸 사람
      };
      console.log(friendDTO);
      const response = await Axios.post(`${axiosAddr}${friendRequestUrl}`, friendDTO, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      console.log('친구 요청 성공 : ', response.data);

      const status = await CheckFriendStatus();
      setFriendStatus(status);

    } catch (error) {
      console.error('친구 요청 실패:', error);
    }
  };

  // 친구 끊기 
  const onClickFriendDelete = async () => {
    try {
      console.log("친삭: ", `${axiosAddr}${friendDeleteUrl}toUser=${profileUserSeq}&fromUser=${userSeq}`);
      const response = await Axios.delete(`${axiosAddr}${friendDeleteUrl}?toUser=${profileUserSeq}&fromUser=${userSeq}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      console.log('친구 삭제: ', response.data);

      const status = await CheckFriendStatus();
      setFriendStatus(status);

    } catch (error) {
      console.error('친구 삭제:', error);
    }
  };

  // 친구 상태인지 체크하는 함수
  const CheckFriendStatus = useCallback(async () => {
    try {
      const friendDTO = {
        'toUser': profileUserSeq,
        'fromUser': userSeq,
      };

      const response = await Axios.post(`${axiosAddr}${friendStatusUrl}`, friendDTO, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('친구 상태 확인 실패 : ', error);
    }
  }, [axiosAddr, userSeq, profileUserSeq, userToken]);

  return (
    <>
      <ProfileContainer>
        <ProfilePicture
          src={userInfo.profile ? userInfo.profile : '/img/defaultProfile.png'}
          onClick={onProfileClick}
        />
        <ProfileInfo>
          <NameText>{userInfo.nickname}</NameText>
          <CommentText>{userInfo.comment}</CommentText>
          <TagsContainer>
            {userInfo.tags && userInfo.tags.map(tag => (
              <Tag fontColor={tag.fontColor} backColor={tag.backColor}>
                {'# ' + tag.value}
              </Tag>
            ))}
          </TagsContainer>
          <ButtonContainer>
            {userSeq === profileUserSeq && (
              <Button onClick={onEditClick}>프로필 편집</Button>
            )}
            {userSeq !== profileUserSeq && (
              <Button onClick={onClickMessageSend}>쪽지</Button>
            )}
            {userSeq !== profileUserSeq && friendStatus === 'stranger' && (
              <Button onClick={sendFriendRequest}>친구 요청</Button>
            )}
            {userSeq !== profileUserSeq && friendStatus === 'pending' && (
              <Button onClick={sendFriendRequest}>승인 대기</Button>
            )}
            {userSeq !== profileUserSeq && friendStatus === 'friend' && (
              <Button onClick={onClickFriendDelete}>친구 끊기</Button>
            )}
          </ButtonContainer>
        </ProfileInfo>
        {isModalOpen && (
          <ModalOverlay onClick={closeModal}>
            <ModalContent>
              <img src={userInfo.profile} />
            </ModalContent>
          </ModalOverlay>
        )}
      </ProfileContainer>
      <ProfilePostList
        profileUserSeq={profileUserSeq}
        profile={userInfo.profile}
        nickname={userInfo.nickname}
        comment={userInfo.comment}
      />
    </>
  );
};

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    width: 550px;
    height: auto;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    background-color: white;
    user-select: none;
    padding: 20px 0;
    border-radius: 16px;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 10px;
`;

const TagsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin: 20px;
`;

const ProfilePicture = styled.img`
    width: 145px;
    height: 150px;
    border-radius: 50%;
    cursor: pointer;
    object-fit: cover;
    border: 1px solid #ccc;
    
    &:hover {
      transform: scale(1.1);
      transition: transform 0.2s ease-in-out;
    }
`;

const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
`;

const NameText = styled.p`
    margin: 10px 0;
    font-size: 22px;
`;

const CommentText = styled.p`
    margin: 0px;
    color: grey;
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
`;

const ModalContent = styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    img {
      width: 100%;
      max-width: 400px;
      border-radius: 5px;
    }
`;

export default Profile;