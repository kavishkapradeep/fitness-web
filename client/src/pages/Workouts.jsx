import { Work } from '@mui/icons-material';
import React from 'react';
import styled from 'styled-components';
import WorkoutCard from '../components/cards/WorkoutCard';
import  {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DateCalendar} from '@mui/x-date-pickers/DateCalendar';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';

import { getWorkouts } from '../api';
import { useEffect } from 'react';
import { CircularProgress } from '@mui/material';


const Container = styled.div`
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    padding:22px 0px;
    overflow-y:scroll;
`
const Wrapper = styled.div`
    flex: 1;
    max-width: 1600px;
    display: flex;
    gap:22px;
    padding: 0px 16px;
    @media (max-width: 600px) {
      gap: 12px;
    }`
const Left = styled.div`
   flex:0.2;
   height: fit-content; 
   padding: 18px;
   border :1px solid ${({theme})=>theme.text_primary + 20};
   border-radius: 14px;
   box-shadow : 1px 6px 20px 0px ${({theme})=>theme.text_primary + 20}; 
`
const Right = styled.div`
   flex:1;
`
const Title = styled.div`font-weight: 600;
  font-size: 16px;
  color: ${({theme})=>theme.primary};
  @media (max-width: 600px) {
    font-size: 14px;
  }`
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 100px;
  @media (max-width: 600px) {
    gap: 12px;
  }`
const Section = styled.div`
display: flex;
flex-direction: column;
padding: 0px 16px;
gap:22px;`
const SecTitle = styled.div`
font-size : 22px;
color: ${({theme})=>theme.text_primary};
font-weight: 500;`

const Workouts = () => {

  
  const [date,setDate] = useState('')
  const [loading,setLoading] =useState(false)
  const [todaysWorkouts,setTodayWorkouts] =useState([])

  const getTodaysWorkout = async () => {
    setLoading(true)
    console.log(date);
    
    const token = localStorage.getItem('fittrack-app-token')
    await  getWorkouts(token, date ?`${date}`:"").then((res)=>{
       setTodayWorkouts(res?.data?.todaysWorkouts
)
       console.log(res.data.todaysWorkouts
);
       setLoading(false)
      
    })
    
  }
useEffect(()=>{
  getTodaysWorkout();
},[date])
  return (
    <Container>
        <Wrapper>
            <Left>
              <Title>Select Date</Title>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                   <DateCalendar onChange={(e)=>setDate(e.format('DD-MM-YYYY'))}/>
              </LocalizationProvider>
            </Left>
            <Right>
                <Section>
                     <SecTitle>Todays Workout</SecTitle>
                     {loading?(<CircularProgress/>):(
                      <CardWrapper>
                          {todaysWorkouts.map((workout)=>(
                            <WorkoutCard key={workout._id || index} workout={workout}/>
                          ))}
                      </CardWrapper>
                     )}
                </Section>
            </Right>
        </Wrapper>
    </Container>
  );
}

export default Workouts;
