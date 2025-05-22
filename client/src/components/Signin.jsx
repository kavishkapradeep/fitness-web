import React, { useState } from 'react';
import styled from 'styled-components';
import TextInput from './TextInput';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { UserSignIn } from '../api';
import { loginSuccess } from '../redux/reducers/userSlice';

const Container = styled.div`
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
`
const Title = styled.div`
    font-size : 30px;
    font-weight: 800;
    color: ${({theme})=>theme.text_primary};
`
const Span = styled.div`
 font-size: 16px;
 font-weight: 400;
 color: ${({theme})=>theme.text_secondary+90};`

const Signin = () => {

    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [buttonDisabled,setButtonDisabled] = useState(false);

    const validateInputs = ()=>{
        if (!email || !password) {
            alert('Please fill all the fields');
            return false;
        }
        return true;
    }

    const handlesubmit = async () => {
        setLoading(true);
        setButtonDisabled(true);
        if (validateInputs()) {
            await UserSignIn({email,password}).then((res)=>{
                dispatch(loginSuccess(res.data));
                alert('Login Successful');
                  setLoading(false);
            setButtonDisabled(false);
            }).catch((err)=>{
                alert(err.response.data.message);
                setLoading(false);
                setButtonDisabled(false);
            })
          
        }
    }

  return (
     <Container>
        <div>
            <Title>Welcome to Fittrack 👋</Title>
            <Span>Please login with your details !</Span>
        </div> 
        <div style={
            {display:'flex',
                gap:'20px',
                flexDirection:'column',
            }
        }>
             <TextInput label='Email Address'
             value={email} handelChange={(e)=>setEmail(e.target.value)}
             placeholder='Enter your email address'/>
              <TextInput label='Password'
              value={password} handelChange={(e)=>setPassword(e.target.value)}
              placeholder='Enter your password' password/>
        <Button  text='SignIn'
        onClick={handlesubmit}
        isLoading={loading}
        isDisabled={buttonDisabled}/>
        </div> 
    </Container>
  );
}

export default Signin;
