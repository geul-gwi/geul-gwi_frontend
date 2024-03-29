import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// Import Library
import { useSelector } from 'react-redux'; // Redux 사용 Library
// Axios Address Context
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { Tag, TagButton } from 'component/common/button/Tag';
import { Button } from 'component/common/button/Button';

const TagManagement = () => {
  const AxiosAddress = useContext(AxiosAddrContext).axiosAddr;
  const getTagListMapping = "/tag/admin/list"; // 전체 태그 목록 요청 주소
  const addTagApiMapping = "/tag/register/"; // 태그 추가 요청 주소
  const deleteTagUrl = "/tag/delete/"; // 태그 삭제 요청 주소

  // State 값 변수
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState('');
  const [tagFontColor, setTagFontColor] = useState('#c9c9c9');
  const [tagBackColor, setTagBackColor] = useState('#F5ED98');
  // User 로그인 정보
  const UserSequence = useSelector((state) => state.authReducer.userSeq);
  const UserToken = useSelector((state) => state.authReducer.accessToken);


  const onTagHandler = (event) => {
    setTag(event.currentTarget.value);
  };
  // 태그 font 색상 선택 처리 
  const onTagFontColorChange = (event) => {
    setTagFontColor(event.target.value);
  };

  // 태그 back 색상 선택 처리 
  const onTagBackColorChange = (event) => {
    setTagBackColor(event.target.value);
  };

  useEffect(() => {
    TagsRefresh(); // Tag목록 초기화
  }, []);

  // Tags값 할당 or 재할당
  const TagsRefresh = () => {
    axios.post(`${AxiosAddress}${getTagListMapping}`, {}, {
      headers: {
        Authorization: "Bearer " + UserToken
      },
    })
      .then(response => {
        console.log(response);
        setTags(response.data); // 태그 목록 배열로 반환
      })
      .catch(error => {
        console.error(error);
      });

    axios.post(`${AxiosAddress}${getTagListMapping}`, {}, {
      headers: {
        Authorization: "Bearer " + UserToken
      },
    })
      .then(response => {
        console.log(response);
        setTags(response.data); // 태그 목록 배열로 반환
      })
      .catch(error => {
        console.error(error);
      });
  }

  // 태그 삭제
  const handleRemoveTag = async (tagSeq) => {
    await axios.delete(`${AxiosAddress}${deleteTagUrl}${tagSeq}`, {
      headers: {
        Authorization: "Bearer " + UserToken
      },
    });
    TagsRefresh();
  };

  // 태그 추가 
  const onAddTagHandler = async () => {
    if (tag.trim() === '') {
      alert('태그를 입력하세요.');
      return;
    }

    // 태그가 서버의 태그목록에 없을 경우
    if (!tags.some((item) => item.value === tag)) {
      const newTag = {
        fontColor: tagFontColor,
        backColor: tagBackColor,
        value: tag,
      }
      await axios.post(AxiosAddress + addTagApiMapping + `${UserSequence}`,
        newTag,
        {
          headers: {
            Authorization: "Bearer " + UserToken
          },
        }).then((response) => {
          console.log(response);

        }).catch((error) => {
          console.error("태그 등록", error);
        })
      TagsRefresh();
    }
  };

  return (
    <MainContainer>
      <Container>
        <Title>태그 목록</Title>
        <TagContainer>
          <TagsContainer>
          {tags && tags.map(tag => {
              if (tag.type === 'DEFAULT') {
                return (
                  <TagButton
                    fontColor={tag.fontColor}
                    backColor={tag.backColor}
                    onClick={() => handleRemoveTag(tag.tagSeq)}
                  >
                    {'# ' + tag.value} x
                  </TagButton>
                );
              }
              return null; // 출력하지 않을 경우
            })}
          </TagsContainer>
        </TagContainer>
        <Adding>태그 추가</Adding>
        <TagInputContainer>
          <InputTag
            type='text'
            value={tag}
            onChange={onTagHandler}
            placeholder='태그를 입력하세요'
          />
          <ColorPickerContainer>
            <SubTitle>배경 색상</SubTitle>
            <ColorPicker
              type='color'
              value={tagBackColor}
              onChange={onTagBackColorChange}
            />
            <SubTitle>글자 색상</SubTitle>
            <ColorPicker
              type='color'
              value={tagFontColor}
              onChange={onTagFontColorChange}
            />
          </ColorPickerContainer>
        </TagInputContainer>
        <SelectedTagsPreview>
          <SelectedTagsContainer>
            <Tag fontColor={tagFontColor} backColor={tagBackColor}>
              {'# ' + tag}
            </Tag>
          </SelectedTagsContainer>
        </SelectedTagsPreview>
        <ButtonGroup>
          <Button onClick={onAddTagHandler}>추가</Button>
        </ButtonGroup>
      </Container>
      <Container>
        <Title>사용자 추가 태그 목록</Title>
        <TagContainer>
          <TagsContainer>
            {tags && tags.map(tag => {
              if (tag.type === 'USER_ADDED') {
                return (
                  <TagButton
                    fontColor={tag.fontColor}
                    backColor={tag.backColor}
                    onClick={() => handleRemoveTag(tag.tagSeq)}
                  >
                    {'# ' + tag.value} x
                  </TagButton>
                );
              }
              return null; // 출력하지 않을 경우
            })}
          </TagsContainer>
        </TagContainer>
      </Container>
    </MainContainer>
  );
};

const InputTag = styled.input`
  width: 200px;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-left: 30px;

  &:focus {
        outline: none; /* 포커스 테두리 제거 (선택 사항) */
        border-color:  #ccebb5; /* 포커스 시 변경할 테두리 색상 */
        box-shadow: 0 0 5px  #ccebb5; /* 포커스 시 그림자 효과 (선택 사항) */
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    margin: auto;
    margin-bottom: 20px;

`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  height: 90vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  padding: 20px 40px;
  text-align: center;
  background-color: white;
  margin: auto;
  user-select: none;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const TagContainer = styled.div`
margin-top: 20px;
  width: 100%;
  height: 90%;
  margin-bottom: 20px;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px; 
  margin-bottom: 20px;
`;

const TagInputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;

`;

const ColorPicker = styled.input`
  width: 30px;
  height: 30px;
  border: none;
  cursor: pointer;
`;

const Title = styled.p`
  font-size: 20px;

`;

const Adding = styled.p`
  font-size: 18px;
  margin-bottom: 30px;

`;

const SubTitle = styled.span`
    font-size: 12px;
      margin-left: 10px;
            margin-right: 10px;
`;

const ColorPickerContainer = styled.div`
  display: flex;
  justify-content: center; 
  align-items: center;
  width: 100%;
  height: auto;
`;

// 미리보기
const SelectedTagsPreview = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 20px;
`;

const SelectedTagsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    margin-bottom: 10px;
`;

export default TagManagement;