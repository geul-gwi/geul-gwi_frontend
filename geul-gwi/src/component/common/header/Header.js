import React from 'react';
import styled  from "styled-components";

// Import Component
import HeaderMenu from "component/common/header/HeaderMenu";


// Header를 나중에 수정하기 위해서 Style된 Tag로 만들어둠
const Container = styled.div`
    position : relative;
    width : 100%;
    height : 70px;
    background-color: white;
`
const TextContainer = styled.div`
    position : absolute;
    left : 30px;
    width : auto;
    min-width : 100px;
    height: 100%;
    color : #FFB6B2;
    font-size: 30px;
    line-height: 70px;

`

const IconContainer = styled.div`
    position : absolute;
    display : flex;
    justify-content : center;
    align-items : center;
    right : 0px;
    width : auto;
    min-width : 100px;
    height : 100%;
`

const Header = () => {
    return (
        <Container>
            <TextContainer style={{fontFamily : "Maru Buri", fontStyle : "semi-bold"}}>
                글 귀
            </TextContainer>
            <IconContainer>
                <HeaderMenu/>
            </IconContainer>
        </Container>
    );
};

export default Header;