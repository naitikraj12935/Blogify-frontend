import React, { useState } from 'react';
import { useContext, useEffect } from 'react';
import { DataContext } from '../../Context/Dataprovider';
import { Box, Typography, Button, Grid, styled } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Authorpost from '../../home/Posts/Authorpost';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import People from './people';
import Peopleto from './peoplefollowto';

const ProfileContainerStyle = styled(Box)`
  padding: 20px;
  border-bottom: 1px solid #ccc;
  border-radius: 8px;
  height: 84vh;
  overflow: scroll;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
`;

const Profiledata = styled(Box)`
  width: 30%;
  margin: auto;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0px;
  bottom: 80%;
`;

const Profileblogs = styled(Box)`
  width: 50%;
  margin: auto;
  display: flex;
  flex-direction: column;
`;
const Followsection=styled(Box)`
display:flex;
flex-direction:row;
justify-content:space-between;
margin:20px;

`

const FollowButton = styled(Button)`
  background-color: ${(props) => (props.following ? '#ff0000' : '#007bff')};
  color: #fff;
  width: 100px;
`;
const Bluetick=styled(CheckCircleIcon)`
color:#007bff`;

const Boxing = styled(Box)`
  width: 40%;
  height: 30vh;
  overflow: scroll;
  scrollbar-width: none; /* Hide the scrollbar in Firefox */
  -ms-overflow-style: none; /* Hide the scrollbar in IE and Edge */
 padding:5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add a box shadow */

  &::-webkit-scrollbar {
    width: 0 !important; /* Hide the scrollbar in WebKit based browsers (Chrome, Safari, etc.) */
  }
`;

const Authorprofile = () => {
  const { paccount } = useContext(DataContext);
  const [postdata, setpostdata] = useState([]);
  const { userName } = useParams();
  const [followbtn, setfollowbtn] = useState('follow');
  const [follower, setfollower] = useState(0);
  const [followback, setfollowback] = useState(0);
  const [peoplefollowby,setpeoplefollowby]=useState([{}]);
  const [peoplefollowto,setpeoplefollowto]=useState([{}]);
  const API_URL='';
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const params = {
          userName: userName,
        };
        const response = await axios.get(`${API_URL}/blogify/userpost`, {
          params: params,
        });

        if (response) {
          setpostdata(response.data.data.collection);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, [userName]);

  useEffect(() => {
    const finddata = async () => {
      try {
        const params = {
          followto: userName,
        };
        const response = await axios.get(`${API_URL}/blogify/followers`, {
          params: params,
        });
        if (response) {
          setpeoplefollowby(response.data.data.followby);
          setfollower(response.data.data.followby.length);
          setfollowback(response.data.data.followto.length);
          setpeoplefollowto(response.data.data.followto);
          let ans=response.data.data.followby.some(user=>user.followby===paccount.userName);
          if(ans){
            setfollowbtn('unfollow')
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    finddata();
  }, [follower,userName]);

  const textStyles = {
    fontSize: '20px',
    margin: '10px 0',
  };

  const following = async () => {
    try {
      const token = sessionStorage.getItem('accessToken');
      const data = {
        followto: userName,
        followby: paccount.userName,
      };
      const response = await axios.post(`${API_URL}/blogify/follow`, data, {
        headers: {
          Authorization: token,
        },
      });
      if (response) {
        if (response.data.num === 1) {
          setfollower(follower + 1);
          setfollowbtn('unfollow');
        } else {
          setfollower(follower - 1);
          setfollowbtn('follow');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const followers = peoplefollowby.map((el) => {
    return <People data={el} key={el.id} />;
  });
  
  const followingUsers = peoplefollowto.map((el) => {
    return <Peopleto data={el} key={el.id} />;
  });
 

  return (
    <ProfileContainerStyle>
      <Profiledata>
        <Typography variant="h4">User Profile</Typography>
        {
          follower>=3?(
            <Typography style={textStyles}> Username: {userName} <Bluetick/>
        
            </Typography>
           


          ):(
            <Typography style={textStyles}>Username: {userName}
        
        </Typography>
          )
        }
        
        <FollowButton onClick={following} following={followbtn === 'unfollow'}>
          {followbtn}
        </FollowButton>
        <Typography>{follower} Followers</Typography>
        <Typography>{followback} Following</Typography>

        <Followsection>
        <Boxing>
          <Typography>followers</Typography>
          {followers}
          </Boxing>
          <Boxing>
          <Typography>following-to</Typography>
          {followingUsers}
          </Boxing>

        </Followsection>
      </Profiledata>
      <Profileblogs>
        <Typography>Your Blogs</Typography>
        {postdata && postdata.length > 0 ? (
          postdata.map((post) => (
            <Grid item lg={10} sm={8} xs={12} key={post._id}>
              <Authorpost post={post} />
            </Grid>
          ))
        ) : (
          <Box style={{ color: '#878787', margin: '30px 30px', fontSize: 18 }}>
            No blogs have been published by them.
          </Box>
        )}
      </Profileblogs>
    </ProfileContainerStyle>
  );
};

export default Authorprofile;
