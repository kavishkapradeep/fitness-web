import React, { useState } from 'react';
import styled from 'styled-components';
import TextInput from './TextInput';
import Button from './Button';
import { UserSignUp } from '../api/index'
import { useDispatch } from 'react-redux';
import { signUpSuccess } from '../redux/reducers/userSlice';

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
const SignUp = () => {
     const dispatch = useDispatch();
        const [loading,setLoading] = useState(false);
        const [name,setName] = useState('');
        const [email,setEmail] = useState('');
        const [password,setPassword] = useState('');
        const [buttonDisabled,setButtonDisabled] = useState(false);

        const validateInputs = ()=>{
            if (!name || !email || !password) {
                alert('Please fill all the fields');
                return false;
            }
            return true;
        }
  const handlesubmit = async () => {
            setLoading(true);
            setButtonDisabled(true);
            if (validateInputs()) {
                await UserSignUp({name,email,password}).then((res)=>{
                    dispatch(signUpSuccess(res.data));
                    alert('Sign up Successful');
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
            <TextInput label='Full Name'
            value={name} handelChange={(e)=>setName(e.target.value)} placeholder='Enter your full Name'/>
             <TextInput label='Email Address'
             value={email} handelChange={(e) => setEmail(e.target.value)} placeholder='Enter your email address'/>
              <TextInput label='Password'
              value={password} handelChange={(e)=>setPassword(e.target.value)} placeholder='Enter your password' password/>
        <Button onClick={handlesubmit} isDisabled={buttonDisabled} isLoading={loading}  text='SignUp'/>
        </div> 
    </Container>
  );
}

export default SignUp;
