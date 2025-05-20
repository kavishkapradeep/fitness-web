import {Link as LinkR, NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import styled from 'styled-components';
import LogoImg from '../utils/images/Logo.png';
import { MenuRounded } from '@mui/icons-material';
import { Avatar } from '@mui/material';

const Nav = styled.div`
  background-color: ${({theme})=>theme.bg};
  width:100%;
  display: flex;
  align-items: center;
    justify-content: center;
    position: sticky;
    top: 0;
    font-size:1rem;
    z-index:10;
    color:white;
    border-bottom: 1px solid ${({theme})=>theme.text_secondary +20};
`;
const NavContainer = styled.div`
 width: 100%;
 max-width: 1400px;
 padding: 0px 24px;
 display: flex;
 gap:14px;
 align-items: center;
 justify-content: space-between;
 font-size: 1rem;
 position:relative
`
const NavLogo = styled(LinkR)`
    display: flex;
    align-items: center;
    gap:16px;
    padding:0 6px ;
    font-weight:600;
    font-size: 18px;
    text-decoration: none;
    color: ${({theme})=>theme.black};
`;
const Logo = styled.img`
    height: 42px;
`;
const Mobileicon = styled.div`
color: ${({theme})=>theme.text_primary};
display: none;
@media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    
}
`
const NavItems = styled.div`

display: flex;

width: 100%;
justify-content: center;
gap:32px;
padding: 0px 6px;

@media screen and (max-width: 768px) {
 display: none;}`
const Navlink = styled(NavLink)`
 display: flex;
 align-items: center;
 color: ${({theme})=>theme.text_primary};
 font-weight: 500;
 cursor: pointer;
 transition:all 0.3s ease-in-out;
 text-decoration: none;
    &:hover{
        color: ${({theme})=>theme.primary };
    }
    &.active{
        color: ${({theme})=>theme.primary };
        border-bottom: 1.8px solid ${({theme})=>theme.primary};
    }
 `
const UserContainer = styled.div`
width:100%;
height: 100%;
display:flex;
justify-content:flex-end;
gap:16px;
align-items: center;
padding: 0px 6px;
color: ${({theme})=>theme.primary};`

const TextButton = styled.div`
 text-align:end;
 color:${({theme})=>theme.secondary}`

 const MobileMenu = styled.ul`
 display:flex;
 flex-direction:column;
 gap:16px;
 padding:0 6px;
 list-style:none;
 width:90%;
 padding: 12px 40px 24px 40px;
 background:${({theme})=>theme.bg};
 position:absolute;
 top:80px;
 right:0;
 transition: all 0.6s ease-in-out;
 transform:${({isOpen})=> isOpen ?'translateY(0)':'translateY(-100%)'};
 border-radius:0 0 20px 20px;
 box-shadow:0 0 10px 0 rgba(0,0,0,0.2);
 opacity:${({isOpen})=> isOpen ?'100%':'0'};
 z-index:${({isOpen})=> isOpen ?'1000':'-1000'};`

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <Nav>
      <NavContainer>
        <Mobileicon onClick={() => setIsOpen(!isOpen)}>
             <MenuRounded sx={{color:'inherit'}}/>
        </Mobileicon>
        <NavLogo to='/'>
             <Logo src={LogoImg} alt="Fittrack Logo" />
                Fittrack
        </NavLogo>

        <MobileMenu isOpen={isOpen}>
            <Navlink to='/'>Dashboard</Navlink>
            <Navlink to='/workouts'>Workouts</Navlink>
            <Navlink to='/tutorials'>Tutorials</Navlink>
            <Navlink to='/blogs'>Blogs</Navlink>
            <Navlink to='/contact'>Contact</Navlink>
        </MobileMenu>
        <NavItems>
            <Navlink to='/'>Dashboard</Navlink>
            <Navlink to='/workouts'>Workouts</Navlink>
            <Navlink to='/tutorials'>Tutorials</Navlink>
            <Navlink to='/blogs'>Blogs</Navlink>
            <Navlink to='/contact'>Contact</Navlink>
            
        </NavItems>

        <UserContainer>
            <Avatar/>
            <TextButton>Logout</TextButton>
        </UserContainer>
      </NavContainer>
    </Nav>
  );
}

export default Navbar;
