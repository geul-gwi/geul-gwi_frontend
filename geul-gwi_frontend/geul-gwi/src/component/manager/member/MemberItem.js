import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// Axios Address Context
import { AxiosAddrContext } from 'contextStore/AxiosAddress'; // Axios Address Context

const MemberItem = (props) => {
  const { user, handleShowProfile, handleDelete } = props;
  // Axios Address
  const axiosAddress = useContext(AxiosAddrContext).axiosAddr;  
  // Api Mapping
  const userDetailApi = '/user/detail/';

  const handleClick = () => {
    // 유저 세부 정보 요청
    const userSeqNumber = Number(user.userSeq);
    //console.log("회원 세부 조회 url 주소: " `${axiosAddress}${userDetailApi}${userSeqNumber}`);
    axios.post(`${axiosAddress}${userDetailApi}${userSeqNumber}`)
      .then((response) => {
        console.log("load Request => "); 
        console.log(response);
        handleShowProfile(response.data);
      })
      .catch((error) => {
        console.error('회원 세부정보를 가져오는 동안 오류 발생:', error);
      });
  };

  return (
    <Item>
      <Container>
        <ProfileImage
          src={user.profile || '/img/defaultProfile.png'}
          onClick={handleClick}
        />
        <UserName onClick={handleClick}>{user.nickname}</UserName>
      </Container>
      <ButtonContainer>
        <DeleteButton onClick={() => handleDelete(user.userSeq)}>삭제</DeleteButton>
      </ButtonContainer>
    </Item>
  )
};

const Item = styled.div`
  user-select: none;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative; 
`;

const ProfileImage = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
      :hover{
      cursor: pointer;
    }
`;

const UserName = styled.p`
    margin-left: 10px;
    font-size: 15px;
        :hover{
      cursor: pointer;
    }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const DeleteButton = styled.div`
    background-color: #f2f2f2;
    padding: 8px 18px;
    border-radius: 8px;
    font-size: 15px;
    user-select: none;
    :hover{
      cursor: pointer;
    }

`;

export default MemberItem;