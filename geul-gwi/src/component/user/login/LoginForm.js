// 로그인 페이지 가운데 폼
import React, { useState, useContext } from 'react';
import '../../../css/LoginForm.css';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

// Axios Addres Import
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { userStoreContext } from 'contextStore/UserStore';

// Import Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser as RegularUser} from '@fortawesome/free-regular-svg-icons'




const LoginForm = () => {
    // AxiosAddress 
    const [AxiosAddress,SetAxiosAddress] = useState(useContext(AxiosAddrContext).axiosAddr);
    const [RequestMapping , SetRequestMapping] = useState('users/login');

    const [Id, setId] = useState('');
    const [Password, setPassword] = useState('');
    
    // UserContext
    const UserContext = useContext(userStoreContext);

    // navigate Object
    const navigate = useNavigate();

    // Function
    // Login Submit
    const LoginSubmit = () => {
        const data = {
            userId : Id,
            userPassword : Password
        };
        console.log("send : "+AxiosAddress+RequestMapping);
        axios.post(AxiosAddress+RequestMapping, data)
            .then((response) => {
                console.log(response);
                const UserData = {
                    userid : Id,
                    nickname : response.data
                }
                UserContext.setLoggedIn();
                UserContext.setLoggedUser(UserData);
                navigate("/");
            })
            .catch(function(error){
                console.log(error);
            });
    }

    const RegiBtnClick = () => {
        console.log("regibtn click");
        navigate("/user/register");
    }

    const logAccount = (event) => {
        event.preventDefault()
        console.log("Id : "+Id);
        console.log("Password : "+Password);
    }
    // sub Button Click
    

    return (
        <div className="LoginForm">
                <div className="LeftContainer">
                    <div className="TitleContainer">
                        <h1><Link to="/" style={{color : "black"}}>글 귀</Link></h1>
                        <h5>당신의 따뜻한 말을 담다</h5>
                    </div>
                </div>
                <div className="RightContainer" style={{position : 'relative'}}>
                    <IconContainer>
                        <FontAwesomeIcon size="2xl" color={'#444444'} title='계정' icon={RegularUser} />
                        <IconText>로그인</IconText>
                    </IconContainer>
                    {/* Test */}
                    <form className="FormContentManage" onSubmit={logAccount}>
                        <input className='loginFormInput' type='text' placeholder='당신의 아이디 입력' onChange={(e) => setId(e.target.value)}></input>
                        <input className='loginFormInput' type='password' placeholder='비밀번호 입력' onChange={(e) => setPassword(e.target.value)}></input><br/>
                        <input className='loginFormButton' type='submit' value="LOGIN" onClick={LoginSubmit}/>
                    </form>
                    {/* 회원가입,  아이디찾기 , 비밀번호 찾기 */}
                    <div className='sub_Container'>
                        <SubSpan>아이디</SubSpan>
                        <SubSpan>비밀번호 찾기</SubSpan>
                        <SubSpan onClick={RegiBtnClick}>회원가입</SubSpan>
                        
                        <SubSpan>
                            {/* <CheckBoxIcon src={process.env.PUBLIC_URL + '/icon/loginFormCss/no_checked.png'}></CheckBoxIcon> */}
                            <input type='checkbox'/>
                        </SubSpan>
                    </div>
                    
                </div>
            </div>
    );
};

const SubSpan=styled.span`
    display : inline-block;
    font-size : 8px;
    color : grey;
    cursor : pointer;
    padding : 0px 7px 0px 7px;
    &:hover{
        color : black;
        
    }

    input[type=checkBox]{
        display : none;
        border : 1px solid black;
    }
`
const CheckBoxIcon = styled.img`
    width : 15px;
    height : 15px;
    
    &:hover{
        content : url(${process.env.PUBLIC_URL + '/icon/loginFormCss/no_checked_color.png'})
    }
`
const IconContainer = styled.div`
    position : absolute;
    display : flex;
    top : 0%;
    left : 50%;
    width : auto;
    min-width : 50px;
    height : auto;
    min-height : 60px;
    transform: translateX(-50%);

    flex-direction: column;
    flex-wrap : wrap;
    justify-content: center;
    align-items: center;
`
const IconText = styled.span`
    color : #444444;
    font-size : 16px;
`

export default LoginForm;