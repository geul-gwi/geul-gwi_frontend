import { calculateNewValue } from "@testing-library/user-event/dist/utils";
import React from "react";
import styled from "styled-components";

const TagButton = ({fontColor, backColor , value , widthPercentage}) => {
    return (
        <ButtonFrame style={{backgroundColor : backColor , color : fontColor , width : `calc(70px * ${widthPercentage})`}}>
            {value}
        </ButtonFrame>
    );
};

// Styled component 
const ButtonFrame = styled.div`
    display : flex;
    width : 100px;
    height : 30px;
    border-radius : 8px;
    justify-content : center;
    align-items : center;
    font-size : 14px;
    margin-right : 10px;
    margin-bottom : 5px;
    cursor : pointer;
`

export default TagButton;