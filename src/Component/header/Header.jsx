import React from 'react'
import { AppBar,Toolbar, Typography,styled } from '@mui/material'
import {Link} from 'react-router-dom'
import Profile from '../Account/profile'
import { useContext,useState,useEffect} from 'react'
import { DataContext } from '../../Context/Dataprovider'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios'

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
const AccountCircle=styled(AccountCircleIcon)`
color:#007bff`
const Notification=styled(NotificationsNoneIcon)`
color:#007bff`;
const Component=styled(AppBar)`
background:#FFFFFF;
color:#000;


`
const Num=styled('sup')({
  color:'red',
fontSize:14

})


const Container=styled(Toolbar)`
justify-content:center;
& > a{
    padding:20px;
    color:inherit;
    text-decoration:none;
}
`

export default function Header() {
 
  const [notifydata, setnotifydata] = useState([]);
  const { paccount } = useContext(DataContext);
  const [num,setnum]=useState(0);
  const API_URL='';
  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          userName: paccount.userName,
        };
        const response = await axios.get(`${API_URL}/blogify/notification`, {
          params: params,
        });

        if (response) {
          // Clear the notifydata array before populating it
          setnotifydata([]);
          response.data.data.notificationdata.forEach((el) => {
            setnotifydata((prevData) => [...prevData, ...el]);
          });
        }
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchData();
  }, [paccount.userName]);
  useEffect(() => {
    setnum(notifydata.length);
  }, [notifydata]);

  const deletedata=async()=>{
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    window.location.href = '/login';
    window.history.pushState(null, '', '/login'); 
  }

  return (
   <Component>
    <Container>
        <Link to='/'>Home</Link>
        <Link to='/about'>About</Link>
        <Link to='/contact'>Contact</Link>
        <Link to='/login' onClick={deletedata}>Logout</Link>
        <Link to='/profile'><AccountCircle/><sup>{paccount.userName}</sup></Link>
        <Link to='/notification'><Notification/><sup><Num>{num}</Num></sup></Link>
       

    </Container>
   </Component>
  )
}
