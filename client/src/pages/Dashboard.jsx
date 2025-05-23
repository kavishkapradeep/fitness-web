import React, { use, useEffect, useState } from 'react';
import styled from 'styled-components';
import {counts} from '../utils/data.jsx'
import CountsCard from '../components/cards/CountsCard.jsx';
import WeeklyStatCard from '../components/cards/WeeklyStatCard.jsx';
import CategoryChartCard from '../components/cards/CategoryChartCard.jsx';
import AddWorkout from '../components/AddWorkout.jsx';
import WorkoutCard from '../components/cards/WorkoutCard.jsx';
import { addWorkouts, getDashboardDetails, getWorkouts } from '../api/index.js';

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
    max-width: 1400px;
    display: flex;
    flex-direction: column;
    gap:22px;
`
const Title = styled.div`
font-size : 22px;
color: ${({theme})=>theme.text_primary};
font-weight: 500;`
const FlexWrap = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-between;
gap: 22px;
padding: 0px 16px;
@media (max-width: 600px) {
    gap: 12px;
}
`
const Section = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0px 16px;
    
    @media (max-width: 600px) {
        gap: 12px;
    }`
const CardWrapper = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
gap: 20px;`
const Dashboard = () => {

    const [data,setData] = useState()
    const [todayWorkout,setTodayWorkout] = useState([])
    const [buttonLoading,setButtonLoading] = useState(false)
    const [loading,setLoading] = useState(false)
    const [workout,setWorkout] = useState(
       `# Legs
- Back Squat
- 5 sets 15 reps
- 30kg
- 10min`
    )

    const dashboardData =  async () => {
        setLoading(true)
        const token = localStorage.getItem('fittrack-app-token')
        await getDashboardDetails(token).then((res)=>{
            setData(res.data)
            setLoading(false)
            console.log(res.data);
            
            
        })
    }

    function formatDateToDDMMYYYY(dateString) {
  const date = new Date(dateString);
  if (isNaN(date)) return "Invalid date";

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

      const getTodayWorkout =  async () => {
        setLoading(true)
        const token = localStorage.getItem('fittrack-app-token')
          const todayDate = new Date().toISOString().split('T')[0]; 
        
        const today = formatDateToDDMMYYYY(todayDate)

        await getWorkouts(token,today).then((res)=>{
            setTodayWorkout(res?.data?.todaysWorkouts)
           
            setLoading(false)
            console.log(res.data.todaysWorkouts
);
            
            
        })
    }

    const addNewWorkout = async () => {
        setButtonLoading(true)
        const token = localStorage.getItem('fittrack-app-token')

          if (!token) {
      throw new Error("Authentication token not found.");
    }

    if (!workout) {
      throw new Error("Workout data is missing.");
    }
    console.log(token,workout);
    

        await addWorkouts(token,{workoutString :workout}).then((res)=>{
            dashboardData()
            setButtonLoading(false)
            getTodayWorkout()
        }).catch((err)=>{
            alert(err)
            setButtonLoading(false)
        })
    }

    useEffect(() => {
        dashboardData()
       getTodayWorkout()
        
    },[])

    useEffect(()=>{
     
        
    },[])

  return (
    <Container>
      <Wrapper>
         <Title>Dashboard</Title>
         <FlexWrap>
              {counts.map((item)=>(
                 <CountsCard item={item} data={data}/>
              ))}
         </FlexWrap>
            <FlexWrap>
              <WeeklyStatCard data={data} />
              <CategoryChartCard  data={data}/>
              <AddWorkout workout={workout} setWorkout={setWorkout} 
              addNewWorkout={addNewWorkout} buttonLoading={buttonLoading}/>
         </FlexWrap>
        
        <Section>
            <Title>Today Workous</Title>
            <CardWrapper>
                {todayWorkout.map((item) => (
                            <WorkoutCard data={data} workout={item} />
                        ))}
            </CardWrapper>
        </Section>

      </Wrapper>
    </Container>
  );
}

export default Dashboard;
