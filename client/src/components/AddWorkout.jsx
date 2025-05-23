import { BarChart } from '@mui/x-charts/BarChart';
import React, { useState } from 'react';
import styled from 'styled-components';
import TextInput from './TextInput';
import Button from './Button';

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

const AddWorkout = ({workout,setWorkout,addNewWorkout,buttonLoading}) => {
   
  return (
    <Card>
       <Title>Add New Workout</Title>
        <TextInput label="Workout" 
        textArea rows={10} placeholder={`
        Enter in this format:
        #category
        -workout Name
        -sets
        -Reps
        -Weight
        -Duration`} value={workout} handelChange={(e)=>setWorkout(e.target.value)}/>
        <Button text="Add Workout" small onClick={()=>addNewWorkout()}
            isLoading={buttonLoading} isDisabled={buttonLoading}/>
    </Card>
  );
}

export default AddWorkout;
