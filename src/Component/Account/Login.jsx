import React, { useContext } from 'react';
import { useState } from 'react';
import { Box, TextField, Button, styled, Typography } from '@mui/material';
import { DataContext } from '../../Context/Dataprovider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  display: flex;
  flex-direction: column;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/0.6);
  & > p {
    margin-top: 10px;
  }
`;

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: auto;
  justify-content: center;
  margin: 10px 40px 20px 40px;
`;

const Image = styled('img')({
  width: 100,
  display: 'flex',
  margin: 'auto',
  padding: '50px 0 0',
});

const Buttons = styled(Button)`
  margin: 0px 20px;
  text-transform: none;
`;
const TYpography=styled(Typography)`
margin:20px;
toUppercase:true;
color:red; `

export default function Login({isuserAuthenticated}) {
  const API_URL='';
  const [account, toggleAccount] = useState('login');
  const imageURL =
    'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

  const toggleToSignup = () => {
    toggleAccount('signup');
  };
  const nevigate=useNavigate();
  const { setpaccount}=useContext(DataContext);

  const toggleToLogin = () => {
    toggleAccount('login');
  };

  const signUpInitialValue = {
    name: '',
    userName: '',
    password: '',
    ConfirmPassword: '', // Renamed to 'confirmPassword'
  };
  const loginInitialValue={
    userName:'',
    password:''
  }

  const [signup, setSignup] = useState(signUpInitialValue);
  const [error,seterror]=useState('');
  const [loginvalue,setloginvalue]=useState(loginInitialValue)

  const onChangeInput = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };
  
  
  const Signup = async () => {
    try {
      const response = await fetch(`${API_URL}/blogify/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signup),
      });

      if (response.ok) {
        // Request was successful
        const data = await response.json();
        seterror('');
        setSignup(signUpInitialValue);
        toggleAccount('login')
        console.log('Response:', data);
      } else {
        seterror('enter valid username,password,confirmpassword');
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const onvalueChange=(e)=>{
           setloginvalue({...loginvalue,[e.target.name]:e.target.value})
  };

  const loginup = async () => {
    try {
      const response = await axios.post(`${API_URL}/blogify/login`, loginvalue);
  
      if (response) {
        console.log(response);
        if (response.data && response.data.data) {
          seterror('');
          setSignup(signUpInitialValue);
          toggleAccount('login');
          // Store tokens in sessionStorage with the correct key names
          sessionStorage.setItem('accessToken', `Bearer ${response.data.data.acesstoken}`);
          sessionStorage.setItem('refreshToken', `Bearer ${response.data.data.refreshtoken}`);
          setpaccount({userName:response.data.data.userName,name:response.data.data.name});
          isuserAuthenticated(true);
          nevigate('/');
        } else {
          seterror('Invalid response data structure');
        }
      } else {
        seterror('Invalid username or password');
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
 


  return (
    <Component>
      <Image src={imageURL} alt="login" />
      {account === 'login' ? (
        <Box>
          <Wrapper>
            <TextField variant="standard" onChange={(e)=>onvalueChange(e)} name="userName"label="Enter userName" autoComplete='userName'/>
            <TextField variant="standard" onChange={(e)=>onvalueChange(e)} name="password"label="Enter password" type='password' autoComplete='password'/>
          </Wrapper>
          <Buttons variant="contained" onClick={loginup}>Login</Buttons>
          {error && <TYpography>{error}</TYpography>}
          <Typography style={{ textAlign: 'center' }}>oR</Typography>
          <Buttons onClick={toggleToSignup}>Create account</Buttons>
        </Box>
      ) : (
        <Box>
          <Wrapper>
            <TextField
              variant="standard"
              onChange={(e) => onChangeInput(e)}
              name="name"
              label="name"
              autoComplete="name"
            />
            <TextField
              variant="standard"
              onChange={(e) => onChangeInput(e)}
              name="userName"
              label="Enter userName"
              autoComplete="userName"
            />
            <TextField
              variant="standard"
              onChange={(e) => onChangeInput(e)}
              name="password"
              label="Enter password"
              type='password'
              autoComplete="password"
            />
            <TextField
              variant="standard"
              onChange={(e) => onChangeInput(e)}
              name="ConfirmPassword"
              label="Confirm password"
              type='password'
              autoComplete="confirmPassword"
            /> 
          </Wrapper>
          <Buttons variant="contained" onClick={Signup}>
            Sign Up
          </Buttons>
          {error && <TYpography>{error}</TYpography>}
          <Typography style={{ textAlign: 'center' }}>oR</Typography>
          <Buttons onClick={toggleToLogin}>Already have an account</Buttons>
        </Box>
      )}
    </Component>
  );
}
