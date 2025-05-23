import React from 'react';
import styled from 'styled-components';


const Card = styled.div`
flex: 1;
min-width : 200px;
padding: 24px;
border: 1px solid ${({theme})=>theme.text_primary + 20};
border-radius: 14px;
display: flex;
gap:6px;
box-shadow: 0px 0px 10px ${({theme})=>theme.text_primary + 20};`
const Left = styled.div`
flex-direction: column;
gap:12px;

@media (max-width: 600px) {
    gap: 6px;
}

}`
const Title = styled.div`
font-weight: 600;
font-size: 16px;
color: ${({theme})=>theme.primary};
@media (max-width: 600px) {
    font-size: 12px;
}
`
const Value = styled.div`
font-weight: 600;
font-size: 32px;
display: flex;
align-items: end;
gap: 8px;
color: ${({theme})=>theme.text_primary};

@media (max-width: 600px) {
    font-size: 22px;
}`
const Unit = styled.div`
 font-size:14px;
 margin-bottom: 8px;`
const Span = styled.div`
 margin-bottom:8px;
 font-size: 16px;
 font-weight: 500;
 @media (max-width: 600px) {
    font-size: 12px;
}
${({positive,theme})=> positive?`color:${theme.green}`:`${theme.red}`};
`
const Icon = styled.div`
    height:fit-content;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    ${({color,bg})=> `background:${bg}; color:${color};`}
`

const Desc = styled.div`
font-size: 14px;
color: ${({theme})=>theme.text_secondary + 50};
margin-bottom:6px;
@media (max-width: 600px) {
    font-size: 14px;
}
`

const CountsCard = ({ item,data }) => {

   let value = 0;

  if (!data) {
    value = 0;
  } else if (item.key === "totalCaloriesBurnt") {
    const arr = data.totalCaloriesBurnt?.caloriesBurnd || [];
    value = arr.reduce((sum, val) => sum + val, 0);
  
  } else {
    value = data[item.key] ?? 0;
  }
  return (
    <Card>
      <Left>
        <Title>{item.name}</Title>
        <Value>
          {value }
          <Unit>{item.unit}</Unit>
          <Span positive>(+10%)</Span>
        </Value>
        <Desc>{item.desc}</Desc>
      </Left>
      <Icon color={item.color} bg={item.lightColor}>{item.icon}</Icon> {/* <- This must match your `data.jsx` */}
    </Card>
  );
};


export default CountsCard;
