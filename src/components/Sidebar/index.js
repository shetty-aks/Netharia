import React from "react";
import styled from "styled-components";
import {BarChart, Home, Logo} from '../Svg'

const SideBarWrapper = styled.div`
  flex: 0 0 auto;
  padding: 18px 0;
  font-family: 'Inter', sans-serif;
  background: #FFFFFF;
  box-shadow: 6px 0 18px rgba(0, 0, 0, 0.06);
  min-height: 100vh;
  width: 64px;
  
  svg {
    display: block;
    margin: auto;
  }
`;

const Nav = styled.div`
  svg {
    margin-top: 80px;
  }

`;

const SideBar = () => {
    return (
        <SideBarWrapper>
            <a href={''}>
                <Logo/>
            </a>
            <Nav>
                <a href={''}>
                    <Home/>
                </a>
                <a href={''}>
                    <BarChart/>
                </a>
            </Nav>
        </SideBarWrapper>
    );
}

export default SideBar;