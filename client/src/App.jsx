import React, { useState } from 'react';
import styled, {ThemeProvider} from 'styled-components'
import {lightTheme} from './utils/Themes.js';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Authentication from './pages/Authentication.jsx';
import Navbar from './components/Navbar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Workouts from './pages/Workouts.jsx';

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
  const [user,setUser] = useState(true)
  return (
    <ThemeProvider theme={lightTheme}>
       <BrowserRouter>
       {user?<Container>
        <Navbar/>
        <Routes>
          <Route path='/' exact element={<Dashboard/>}/>
          <Route path='/workouts' exact element={<Workouts/>}/>
        </Routes>
       </Container>:<Container>
          <Authentication/>
       </Container>}
       </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
