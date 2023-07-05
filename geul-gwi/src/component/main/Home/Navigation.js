import React from 'react';
import styled from 'styled-components';

const itemList = []
itemList.push({"name" : "탐색", "src" : "/icon/Navigation/search.svg"})
itemList.push({"name" : "홈", "src" : "/icon/Navigation/home.svg"})
itemList.push({"name" : "알람", "src" : "/icon/Navigation/bell.svg"})
itemList.push({"name" : "팔로우", "src" : "/icon/Navigation/users.svg"})

const Navigation = () => {
    
    return (
        <NaviFrame>
            {
                itemList.map((element,idx) => (
                    <ItemContainer id={"NaviButton"+idx}>
                        <IconBox><IconImg src={process.env.PUBLIC_URL + element.src} alt={element.name}/></IconBox>
                        <TextBox>{element.name}</TextBox>
                    </ItemContainer>
                ))
            }
        </NaviFrame>
    );
};

const NaviFrame = styled.div`
    display : flex;
    width : 100%;
    min-height : 100px;
    height : auto;
    flex-direction : column;
    align-items : center;

    background-color: white;
    border-radius : 16px;
    padding : 20px 0px 20px 0px;
`
const ItemContainer = styled.div`
    display : flex;
    width : 65%;
    height : 40px;
    justify-content : center;
    align-items : center;
    cursor : pointer;
    margin-bottom : 15px;
    padding : 0px 10px 0px 10px;
    border-radius: 16px ;
    &:hover{
        background-color : #DFDFDF;
    }
`
const IconBox = styled.div`
    display : flex;
    width : 40%;
    height : 100%;
    justify-content : center;
    align-items:  center;
`
const TextBox = styled.div`
    display : flex;
    width : 59%;
    height : 100%;

    justify-content: center;
    align-items: center;
    color : #343434;
`
const IconImg = styled.img`
    width : 25px;
    height : 25px;
`


export default Navigation;