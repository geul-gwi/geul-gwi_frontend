import React from 'react';
import styled from 'styled-components';

// Import React Icons
import { TiWeatherShower } from 'react-icons/ti'

const Weather = () => {
    return (
        <WeatherFrame> 

            {/*1. 날씨 정보를 담을 Container */}
            <DisplayContainer>
                {/* 아이콘을 담을 Container */}
                <DisplayIconContainer><TiWeatherShower size="60" color="#5A2ABF" /></DisplayIconContainer> 
                {/* 날씨 정보 Text Container */}
                <DisplayTextContainer>
                    <TextWeatherName>비</TextWeatherName>
                    <TextWeatherState>많음</TextWeatherState>
                </DisplayTextContainer> 

            </DisplayContainer>

            {/*2. 부가 설명 Text */}
            <AskHowYouFeel>이런날엔 기분이 어떠세요?</AskHowYouFeel>

            {/*3. 날씨 평가 버튼 */}
            <WeatherLikeContainer>
                <WeatherLikeBtn />  {/*매우 별로*/}
                <WeatherLikeBtn />  {/*별로*/}
                <WeatherLikeBtn />  {/*보통*/}
                <WeatherLikeBtn />  {/*만족*/}
                <WeatherLikeBtn />  {/*매우만족*/}
            </WeatherLikeContainer>

            {/*4. 좋음 나쁨 */}
            <WeatherLikeTextContainer>
                <BadText>나쁨</BadText>
                <GoodText>좋음</GoodText>
            </WeatherLikeTextContainer>
        </WeatherFrame>
    );
};

const WeatherFrame = styled.div`
    display : flex;
    width : calc(100% -40px);
    height : 160px;

    border-radius : 16px;
    padding : 10px 20px 10px 20px;
    background-color: white;
    flex-direction : column;
    justify-content : space-between;
    align-items: center;
`
// 날씨 정보를 담을 Container
const DisplayContainer = styled.div`
    display : flex;
    width : 100%;
    height : 70px;
    align-items : center;
`
const DisplayIconContainer = styled.div`
    margin-left : 10px;
    display : flex;
    width : 50%;
    height : 100%;
    justify-content: center;
    align-items: center;
`
const DisplayTextContainer = styled.div`
    margin-right : 10px;
    display : flex;
    width : 50%;
    height : 70%;
    flex-direction: column;
    justify-content : center;
    align-items: center;
`
const TextWeatherName = styled.div`
    width : 100%;
    height : 50%;
    display : flex;
    justify-content: center;
    align-items : center;
    font-family : "Nanum Square";
    font-style : "bold";
    font-size : 16px;
    color : #474646;
`
const TextWeatherState = styled.div`
    width : 100%;
    height : 50%;
    display : flex;
    justify-content: center;
    align-items: center;
    color : #6C6B6B;
    font-size : 14px;
`
const AskHowYouFeel = styled.div`
    display : flex;
    width : 100%;
    height : 20px;
    justify-content: center;
    align-items : center;   
    color : rgba(54,54,54,52%); // 연한 회색 - 보조Text
    font-size : 12px;
`
const WeatherLikeContainer = styled.div`
    display : flex;
    width : 100%;
    height : 20px;
    justify-content: space-evenly;
    align-items : center;
`
const WeatherLikeBtn = styled.div`
    cursor : pointer;
    width : 15px;
    height : 15px;
    border-radius : 50%;
    border : 1px solid grey;

    &:hover{
        background-color : grey;
    }
`
const WeatherLikeTextContainer = styled.div`
    display : flex;
    width : 86%;
    height : 30px;
    
    justify-content : space-between;
`
const BadText = styled.div`
    width : auto;
    min-width : 10px;
    height : 100%;
    color : rgba(235,71,71,100);
    font-size : 12px;
`
const GoodText = styled.div`
    width : auto;
    min-width : 10px;
    height : 100%;
    color : rgba(35,251,0,100);
    font-size : 12px;
`

export default Weather;