import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import styled from 'styled-components';

const Card = styled.div`
    flex: 1;
    min-width : 280px;
    padding: 24px;
    border: 1px solid ${({theme})=>theme.text_primary + 20};
    border-radius: 14px;
    display: flex;
    box-shadow : 1px 6px 20px 0px ${({theme})=>theme.text_primary + 20};
    flex-direction: column;
    gap:6px;
    @media (max-width: 600px) {
        padding :16px;
    }
`
const Title = styled.div`
    font-weight: 600;
    font-size: 16px;
    color: ${({theme})=>theme.primary};
    @media (max-width: 600px) {
        font-size: 14px;
    }
`


const CategoryChartCard = ({data}) => {
  return (
    <Card>
       <Title>Weekly Calories Burned</Title>
       {data?.pieChartData && (<PieChart
      
       series={[{data:data?.pieChartData ,innerRadius:30,
        outerRadius:120,
        paddingAngle:5,
        cornerRadius:5
       }]}
       height={300}/>)}
    </Card>
  );
}

export default CategoryChartCard;
