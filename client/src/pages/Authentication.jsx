import React from 'react';
import styled from 'styled-components';
import LogoImage from '../utils/images/Logo.png';
import AuthImage from '../utils/images/Authimage.jpg'

const Container = styled.div`
 flex: 1;
 height: 100%;
 display: flex;
 background: ${({theme})=>theme.bg};

 @media (max-width: 700px) {
    flex-direction: column;
 }
`
const Left = styled.div`
 flex: 1;
 background:blue
  @media (max-width: 700px) {
   display: none;  
 }
 `
const Logo = styled.img`
    position: absolute;
    width: 70px;
    top:40px;
    left: 60px;
    z-index: 10;
`;

const Image = styled.img`
  position: relative;
  height: 100%;
  width: 100%;
`;


const Right = styled.div`
 flex: 1;
 background:green`

const Authentication = () => {

  return (
    <Container>
        <Left>
            <Logo src={LogoImage}/>
            <Image src={AuthImage}/>
        </Left>
       <Right>R</Right>
    </Container>
  );
}

export default Authentication;
