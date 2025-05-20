import React from 'react';
import styled, {ThemeProvider} from 'styled-components'
import {lightTheme} from './utils/Themes.js';
import {BrowserRouter} from 'react-router-dom';
import Authentication from './pages/Authentication.jsx';

const Container = styled.div`
width :100%;
height: 100vh;
display: flex;
flex-direction: column;
background:${({theme})=>theme.bg};
color: ${({theme})=>theme.text};
overflow-x: hidden;
transition: all 0.5s ease;
`;

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
       <BrowserRouter>
       <Container>
          <Authentication/>
       </Container>
       </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
