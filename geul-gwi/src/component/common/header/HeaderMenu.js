import React from 'react';
import styled from 'styled-components';


const HeaderMenu = () => {
    return (
        <IconBox>
            <CustomizedImage src={process.env.PUBLIC_URL + "/icon/Header/bars-sort.svg"} alt="HeaderMenu" fill={"blue"} ></CustomizedImage>
        </IconBox>
    );
};

const IconBox = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    width : 50px;
    height : 50px;
    background-color : white;
    box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.25);
    border-radius : 50px;
    cursor : pointer;
`
const CustomizedImage = styled.img`
    width : 25px;
    height : 25px;
    margin : 0 auto;
`

export default HeaderMenu;