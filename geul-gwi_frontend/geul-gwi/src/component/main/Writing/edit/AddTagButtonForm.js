import React, { useEffect, useContext, useState } from 'react';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import styled from 'styled-components';
import axios from 'axios';
import 'css/main/Writing/AddTagListComponent.css';
import { useSelector } from 'react-redux';
import { Tag, TagButton } from 'component/common/button/Tag'

const AddTagButtonForm = (props) => {
    const axiosAddress = useContext(AxiosAddrContext).axiosAddr;  // Axios Address
    const defaultTagUrl = "/tag/list/DEFAULT";
    const addTagUrl = "/tag/register/";

    const userSeq = useSelector((state) => state.authReducer.userSeq);
    const userToken = useSelector((state) => state.authReducer.accessToken);

    const [selectedMenu, setSelectedMenu] = useState(true); // 태그 선택 폼 On/Off
    const [defaultTags, setDefaultTags] = useState([]); // DEFAULT 전채 태그

    // 사용자가 추가 중인 태그 정보 변수들
    const [tagValue, setTagValue] = useState('');
    const [tagFontColor, setTagFontColor] = useState('white');
    const [tagBackColor, setTagBackColor] = useState('#FBD929');

    // DEFAULT 전채 태그 불러오기
    useEffect(() => {
        axios.post(`${axiosAddress}${defaultTagUrl}`)
            .then(response => {
                setDefaultTags(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    // 직접 입력한 태그 Handler
    const InputTagHandler = (e) => {
        setTagValue(e.target.value);
    }

    // 유저가 직접 입력한 태그 Enter 이벤트 처리
    const OnEnterPress = (e) => {
        if (e.key !== 'Enter') {
            return;
        }
        if (tagValue.trim() === '') {
            alert('태그를 입력하세요.');
            return;
        }

        // 사용자 지정 태그는 서버에 바로 요청 넣어서 시퀀스 값 받는다.

        const userAddTag = {
            fontColor: tagFontColor,
            backColor: tagBackColor,
            value: tagValue,
        };

       // console.log("userAddTag:", userAddTag);
       // console.log("토큰:", userToken);
        // 사용자가 추가한 태그 요청

        axios.post(`${axiosAddress}${addTagUrl}${userSeq}`, userAddTag, {
            headers: {
                Authorization: "Bearer " + userToken
            },
        }).then((response) => {
            console.log("사용자 지정 태그 추가 성공", response);
            onAddTag(response.data);
            alert("태그 추가를 성공했습니다.")

        }).catch((error) => {
            console.error("사용자 지정 태그 추가 실패", error);
            alert("태그 추가를 실패했습니다. 다시 시도해주세요. ")
        })
    }

    // 선택한 태그 추가 Handler
    const onAddTag = (tag) => {
        // 선택 개수 3개 제한
        if (props.tags.length >= 3) {
            alert('태그는 최대 3개까지 선택 가능합니다.');
            return;
        }
        // 이미 추가한 태그인지 유효성 검사
        if (props.tags.some(selectedTag => selectedTag.value === tag.value)) {
            alert('이미 선택한 태그입니다.');
            return;
        }

        props.setTags([...props.tags, tag]);
    }

    // 선택된 태그 삭제 Handler
    const SeletedTagDeleteHandler = (idx) => {
        props.setTags(props.tags.filter((_, index) => index !== idx));
    }

    // 태그 font 색상 선택 처리 
    const onTagFontColorChange = (event) => {
        setTagFontColor(event.target.value);
    };

    // 태그 back 색상 선택 처리 
    const onTagBackColorChange = (event) => {
        setTagBackColor(event.target.value);
    };

    return (
        <AddTagFrame>
            <TagMenuContainer>
                <TabButton
                    onClick={() => { setSelectedMenu(true) }}
                    active={selectedMenu}
                >
                    기본 태그
                </TabButton>
                <TabButton
                    onClick={() => { setSelectedMenu(false) }}
                    active={!selectedMenu}
                >
                    사용자 지정
                </TabButton>
            </TagMenuContainer>
            {selectedMenu ?
                <TagListContainer>
                    <SmallTitle_Container>사용할 태그를 선택해주세요</SmallTitle_Container>
                    <TagsContainer>
                        {defaultTags && defaultTags.map((tag) => (
                            <TagButton fontColor={tag.fontColor} backColor={tag.backColor}
                                onClick={() => onAddTag(tag)}
                            >
                                {'# ' + tag.value}
                            </TagButton>
                        ))}
                    </TagsContainer>
                </TagListContainer>
                :
                <TagListContainer>
                    <SmallTitle_Container>원하는 태그를 설정해주세요</SmallTitle_Container>
                    <UserChooseInputContainer>
                        <UserChooseStyledInput
                            type='text'
                            placeholder="최대 10자 가능합니다."
                            onChange={(e) => InputTagHandler(e)}
                            onKeyPress={(e) => OnEnterPress(e)}
                        />
                    </UserChooseInputContainer>
                    <ColorPickerContainer>
                        <Title>태그 글자 색상</Title>
                        <ColorPicker
                            type='color'
                            value={tagFontColor}
                            onChange={onTagFontColorChange}
                        />
                        <Title>태그 배경 색상</Title>
                        <ColorPicker
                            type='color'
                            value={tagBackColor}
                            onChange={onTagBackColorChange}
                        />
                    </ColorPickerContainer>
                    <SelectedTagsPreview>
                        <TagsContainer>
                            <Tag fontColor={tagFontColor} backColor={tagBackColor}>
                                {'# ' + tagValue}
                            </Tag>
                        </TagsContainer>
                    </SelectedTagsPreview>
                </TagListContainer>
            }
            <SelectedTagContainer>
                <SmallTitle_Container>선택한 태그</SmallTitle_Container>
                <TagsContainer>
                    {props.tags && props.tags.map((tag, idx) => (
                        <TagButton
                            key={idx}
                            fontColor={tag.fontColor}
                            backColor={tag.backColor}
                            onClick={() => SeletedTagDeleteHandler(idx)}
                        >
                            {'#' + tag.value + " x"}
                        </TagButton>
                    ))
                    }
                </TagsContainer>
            </SelectedTagContainer>
        </AddTagFrame>
    );

};

const AddTagFrame = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const SmallTitle_Container = styled.div`
    display: flex;
    width: 100%;
    height: 40px;
    font-size: 14px;
    text-indent: 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`

const TagMenuContainer = styled.div`
    display: flex;
    width: 100%;
    height: 45px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const TabButton = styled.div`
   background-color: ${(props) => (props.active ? "#ccebb5" : "#ccc")};
   color: #fff;
   border: none;
   padding: 10px 20px;
   cursor: pointer;
   margin: 0 10px;
   border-radius: 5px;
   transition: background-color 0.3s;
   font-size: 13px;

   &:hover {
      background-color: #aaa;
   }
`

const TagListContainer = styled.div`
    display: flex;
    min-height: 120px;
    height: auto;
    flex-direction: column;
    align-items: center;
    padding-top: 10px;
`

const TagsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`

const UserChooseInputContainer = styled.div`
    display: flex;
    width: 100%;
    height: 45px;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
`

const UserChooseStyledInput = styled.input`
    width: 100%;
    height: 40px;
    text-indent: 10px;
    border-radius: 12px;
    border: 2px solid #CCC;
    box-shadow: none;
    color: #545454;
    font-size: 14px;
`

const SelectedTagContainer = styled.div`
    display: flex;
    min-height: 40px;
    height: auto;
    width: 100%;
    flex-direction: column;
`

const ColorPickerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;
`

const ColorPicker = styled.input`
    width: 30px;
    height: 30px;
    margin-left: 10px;
    border: none;
    cursor: pointer;
    margin-right: 10px;
`

const Title = styled.div`
    font-size: 15px;

`

const SelectedTagsPreview = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
`

export default AddTagButtonForm;