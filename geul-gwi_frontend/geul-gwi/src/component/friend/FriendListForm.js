import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { useSelector } from 'react-redux'; // Redux 사용 Library
import FriendItem from 'component/friend/FriendItem';


const FriendListForm = (props) => {
    //const navigate = useNavigate();
    const axiosAddr = useContext(AxiosAddrContext).axiosAddr;
    const userSeq = useSelector((state) => state.authReducer.userSeq);
    const userToken = useSelector((state) => state.authReducer.accessToken);
    const friendListUrl = '/friend/list/friend/'; // 친구 목록 요청 주소
    const friendDeleteUrl = '/friend/delete'; // 친구 삭제 요청 주소

    const [friends, setFriends] = useState([]); // 친구 목록 데이터

    useEffect(() => {
        // 친구 목록 요청
        async function fetchUserProfile() {
            try {
                const response = await Axios.get(`${axiosAddr}${friendListUrl}${userSeq}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                });
                //console.log('친구 목록 요청 성공 : ', response.data);
                setFriends(response.data);
            } catch (error) {
                console.error('친구 목록 요청 실패:', error);
            }
        }
        fetchUserProfile();
    }, []);

    // 친구 삭제 처리
    const friendDeleteHandler = async (friendSeq) => {
        try {
            const response = await Axios.delete(`${axiosAddr}${friendDeleteUrl}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            console.log('친구 삭제 완료 : ', response);
            setFriends((prevNotices) => prevNotices.filter((friends) => friends.userSeq !== friendSeq));
        } catch (error) {
            console.error('알림 삭제 실패 : ', error);
        }
    };

    return (
        <Frame>
            {friends && friends.map((friend) => (
                <FriendItem
                    friend={friend}
                    friendDeleteHandler={friendDeleteHandler}
                />
            ))}
        </Frame>
    );
};

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  width: 450px;
  height: 600px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background-color: white;
  padding: 5px;
  user-select: none;
`;

export default FriendListForm;