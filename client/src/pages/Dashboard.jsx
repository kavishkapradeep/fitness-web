import React from 'react';
import styled from 'styled-components';
import {counts} from '../utils/data.jsx'
import CountsCard from '../components/cards/CountsCard.jsx';
import WeeklyStatCard from '../components/cards/WeeklyStatCard.jsx';
import CategoryChartCard from '../components/cards/CategoryChartCard.jsx';
import AddWorkout from '../components/AddWorkout.jsx';

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


const Dashboard = () => {

    const data = {
        totalCaloriesBurnt :13500,
        totalWorkouts : 6,
        avgCaloriesBurntPerWorkout : 2250,
        totalWeeksCaloriesBurnt : {
            weeks:['17th','18th','19th','20th','21th','22th','23th'],
            caloriesBurned:[10500,0,0,0,0,0,13500]
        },
        pieChartData :[
            {
                id:0,
                value:1500,
                label:'Back'
            },
            {
                id:2,
                value:3750,
                label:'Shoulder'
            },
            {
                id:3,
                value:2250,
                label:'ABS'
            }    
        ]
    }

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
         </FlexWrap>
         <FlexWrap>
             
              <CategoryChartCard  data={data}/>
         </FlexWrap>
           <FlexWrap>
             <AddWorkout/>
         </FlexWrap>
              
      </Wrapper>
    </Container>
  );
}

export default Dashboard;
