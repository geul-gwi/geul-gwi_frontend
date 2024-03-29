import React, { useState, useEffect, useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux'; 
import styled from 'styled-components';
import {AxiosAddrContext} from 'contextStore/AxiosAddress';
// component
import ProfileEditUser from 'component/user/profile/edit/ProfileEditUser';
import ProfileEditTagForm from 'component/user/profile/edit/ProfileEditTagForm';
import { login, setNickname, setProfile, setUserSeq, setRole } from 'Reducer/authReducer';
import { useDispatch } from 'react-redux'; 
import imageDataFetcher from './../../../../service/imageDataFetcher';

const ProfileEditForm = ({ userInfo }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Redux Dispatch = 리덕스 저장소 사용

    const axiosAddress = useContext(AxiosAddrContext).axiosAddr;
    const userUpdateUrl = '/user/update/';
    const userDeleteUrl = '/user/delete/';

    const userSeq = useSelector((state) => state.authReducer.userSeq);
    const userToken = useSelector((state) => state.authReducer.accessToken);

    const [newProfile, setNewProfile] = useState(userInfo.profile); 
    const [newNickname, setNewNickname] = useState(userInfo.nickname); 
    const [newComment, setNewComment] = useState(userInfo.comment); 

    const [showProfileImage, setShoeProfileImage] = useState(userInfo.profile);

    const [newNicknameError, setNewNicknameError] = useState('');
    const [newCommentError, setNewCommentError] = useState('');

    const [showPasswordChange, setShowPasswordChange] = useState(false);

    const [newPassword, setNewPassword] = useState(''); 
    const [curPassword, setCurPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const [currentPasswordError, setCurrentPasswordError] = useState('');
    const [confirmNewPasswordError, setConfirmNewPasswordError] = useState('');
    const [passwordChangeError, setPasswordChangeError] = useState('');

    const [selectedTags, setSelectedTags] = useState(userInfo.tags);

    const [isAcountDelete, setIsAcountDelete] = useState(false);
    const [accountDeletePassword, setAccountDeletePassword] = useState('');

    // 계정 삭제 요청
    const handleDeleteAccount = async () => {
        try {
            const data = {
                password: accountDeletePassword,
            };

            const response = await axios.delete(`${axiosAddress}${userDeleteUrl}${userSeq}`, {
                data,
                headers: {
                    Authorization: "Bearer " + userToken,
                },
            });

            if (response) {
                alert('계정이 성공적으로 삭제되었습니다.');
                navigate('/');
            } 
        } catch (error) {
            console.error('계정 탈퇴 실패', error);
            alert('계정 삭제에 실패했습니다. 서버 오류가 발생했습니다.');
        }
    };

    // 적용 버튼 클릭
    const handleChange = async () => {
        // 유효성 검사
        if (!CheckAll()) {
            alert('적용을 실패했습니다. 입력 칸을 확인해 주세요');
            return;
        }

        try {
            const formData = new FormData();

            if(newProfile !== null)
                formData.append("file", newProfile);

            console.log("프로필", newProfile);
            
            const updateDTO = {
                password: showPasswordChange ? newPassword : userInfo.password,
                nickname: newNickname,
                userTagSeq: selectedTags ? selectedTags.map(tag => tag.tagSeq) : null, // 선택된 태그가 있을 때만 매핑
                comment: newComment,
            };

            //console.log(updateDTO);

            // 나머지 데이터를 JSON 문자열로 변환하여 FormData에 추가
            formData.append("updateDTO", new Blob([JSON.stringify(updateDTO)], {type:"application/json"}));


            // FormData 내용 확인
            // for (let pair of formData.entries()) {
            //     console.log(pair[0] + ', ' + pair[1]);
            // }

            const response = await axios.post(
                `${axiosAddress}${userUpdateUrl}${userSeq}`, formData, {
                    headers: {
                        Authorization: "Bearer " + userToken,
                        'Content-Type': 'multipart/form-data',
            }});
            if (response) {
                console.log('프로필 편집 성공 : ', response);
                alert("프로필 편집을 완료했습니다.");
                try {
                   // const newProfileData = await imageDataFetcher(newProfile); // 새로운 프로필 이미지를 가져옴
            
                    // 새로운 프로필 데이터를 Redux 스토어에 업데이트
                    dispatch(setProfile(showProfileImage));
            
                    // 프로필 페이지로 이동
                    navigate('/main/Profile', { state: { profileUserSeq: userSeq } });
                } catch (error) {
                    console.error('프로필 이미지 가져오기 실패:', error);
                    // 실패 시에 대응하는 로직 추가
                }
            }
        } catch (error) {
            console.log('프로필 편집 실패  : ', error);
            alert("프로필 편집을 실패했습니다.\n다시 시도해주세요.");
        }
    };


    // 전체 유효성 검사
    const CheckAll = () => {
        if (!CheckNickname()) return false;
        if (!CheckComment()) return false;
        if (showPasswordChange) {
            if (!CheckCurPassword()) return false;
            if (!CheckNewPassword()) return false;
            if (!CheckConfirmNewPassword()) return false;
        }
        return true;
    };

    // 닉네임 유효성 검사
    const CheckNickname = () => {
        if (newNickname.trim() === '') {
            setNewNicknameError('닉네임을 입력해주세요.');
            return false;
        } else if (newNickname.length < 1 || newNickname.length > 8) {
            setNewNicknameError('닉네임은 1자 이상 8자 이하로 입력해주세요.');
            return false;
        }
        setNewNicknameError('');
        return true;
    };

    // 소개 유효성 검사
    const CheckComment = () => {
        if (!newComment)
            return true;
        
        if (newComment.length > 250) {
            setNewCommentError('소개는 250자 이하로 작성해주세요.')
            return false;
        }
        setNewCommentError('');
        return true;
    };

    const CheckCurPassword = () => {
        if (curPassword.trim() === '') {
            setCurrentPasswordError('기존 비밀번호를 입력해주세요.');
            return false;
        } else if (curPassword !== userInfo.password) {
            setCurrentPasswordError('기존 비밀번호가 일치하지 않습니다.');
            return false;
        }
        setCurrentPasswordError('');
        return true;
    };

    // 새 비밀번호 유효성 검사
    const CheckNewPassword = () => {
        if (newPassword.trim() === '') {
            setPasswordChangeError('새 비밀번호를 입력해주세요.');
            return false;
        } else if (newPassword.length < 6) {
            setPasswordChangeError('비밀번호는 최소 6자 이상이어야 합니다.');
            return false;
        }
        setPasswordChangeError('');
        return true;
    };

    // 새 비밀번호 재입력 유효성 검사
    const CheckConfirmNewPassword = () => {
        if (confirmNewPassword.trim() === '') {
            setConfirmNewPasswordError('새 비밀번호를 재입력해주세요.');
            return false;
        } else if (confirmNewPassword !== newPassword) {
            setConfirmNewPasswordError('새 비밀번호가 일치하지 않습니다.');
            return false;
        }
        setConfirmNewPasswordError('');
        return true;
    };

    // 취소 버튼 클릭
    const handleCancel = () => {
        const userResponse = window.confirm("변경된 내용을 삭제하시겠습니까?\n변경 내용을 삭제하면 이전 정보로 복구됩니다.");
        if (userResponse) {
            window.history.back();
        }
    };

    return (
        <MainContainer>
            <ChildContainer>
                <ProfileEditUser 
                    confirmNewPassword={confirmNewPassword}
                    curPassword={curPassword}
                    newNickName={newNickname}
                    newProfile={newProfile}
                    newComment={newComment}
                    setNewProfile={setNewProfile}
                    setNewNickname={setNewNickname}
                    setNewComment={setNewComment}
                    newNicknameError={newNicknameError}
                    newCommentError={newCommentError}
                    CheckNickname={CheckNickname}
                    CheckComment={CheckComment}
                    newPassword={newPassword}
                    showProfileImage={showProfileImage}
                    setShoeProfileImage={setShoeProfileImage}

                    setCurPassword={setCurPassword}
                    setNewPassword={setNewPassword}
                    setConfirmNewPassword={setConfirmNewPassword}
                    currentPasswordError={currentPasswordError}
                    confirmNewPasswordError={confirmNewPasswordError}
                    passwordChangeError={passwordChangeError}
                    CheckConfirmNewPassword={CheckConfirmNewPassword}
                    CheckCurPassword={CheckCurPassword}
                    CheckNewPassword={CheckNewPassword}
                    showPasswordChange={showPasswordChange}
                    setShowPasswordChange={setShowPasswordChange}

                    handleDeleteAccount={handleDeleteAccount}
                    isAcountDelete={isAcountDelete}
                    setIsAcountDelete={setIsAcountDelete}
                    setAccountDeletePassword={setAccountDeletePassword}
                    accountDeletePassword={accountDeletePassword}
                />
            </ChildContainer>
            <ChildContainer>
                <ProfileEditTagForm 
                    selectedTags={selectedTags} 
                    setSelectedTags={setSelectedTags}
                />
                <ButtonGroup>
                    <Button onClick={handleChange}>적용</Button>
                    <Button onClick={handleCancel}>취소</Button>
                </ButtonGroup> 
            </ChildContainer>
        </MainContainer>
    );
};

const MainContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    user-select: none;
`;

const ChildContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); 
    border-radius: 8px; 
    background-color: white;
    margin-bottom: 20px;
`;

const Button = styled.button`
    background-color: white;
    padding: 10px 50px;
    border: 1px solid #ccc;
    border-radius: 8px;
    cursor: pointer;
    
    &:hover {
        background-color: #f2f2f2;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    width: 50%;
    justify-content: space-between;
    margin-bottom: 20px;
`;

export default ProfileEditForm;