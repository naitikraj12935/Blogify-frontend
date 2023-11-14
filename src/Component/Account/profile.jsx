import React, { useState } from 'react';
import { useContext, useEffect } from 'react';
import { DataContext } from '../../Context/Dataprovider';
import { Box, Typography, Button, Grid, styled } from '@mui/material';
import axios from 'axios';
import Profilepost from '../../home/Posts/Profilepost';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import People from './people';
import Peopleto from './peoplefollowto';

const ProfileContainerStyle = styled(Box)`
  padding: 20px;
  border-Bottom: 1px solid #ccc;
  border-Radius: 8px;
  height: 84vh;
  overflow: scroll;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: row;
`;
const Bluetick=styled(CheckCircleIcon)`
color:#007bff`;

const Profiledata = styled(Box)`
  width: 30%;
  margin: auto;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0px;
  bottom: 80%;
`;
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
const Followsection=styled(Box)`
display:flex;
flex-direction:row;
justify-content:space-between;
margin:20px;

`

const Profileblogs = styled(Box)`
  width: 50%;
  margin: auto;
  display: flex;
  flex-direction: column;
`;

const FollowerSection = styled(Box)`
  display: flex;
  flex-direction: row;
  gap:1.5rem;
  align-items: center;
  margin-top: 20px;
  margin-left:2rem;
`;

const FollowerCount = styled(Typography)`
  font-size: 24px;
  font-weight: bold;
`;

const FollowLabel = styled(Typography)`
  font-size: 16px;
  color: #878787;
`;

const Profile = () => {
  const { paccount } = useContext(DataContext);
  const [postdata, setpostdata] = useState([]);
  const [follower, setfollower] = useState([]);
  const [followback, setfollowback] = useState([]);
  const API_URL='';
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const params = {
          // Define your query parameters here
          userName: paccount.userName,
        };
        const response = await axios.get(`${API_URL}/userpost`, {
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
  }, []);

  useEffect(() => {
    const finddata = async () => {
      try {
        const params = {
          followto: paccount.userName,
        };
        const response = await axios.get(`${API_URL}/followers`, {
          params: params,
        });
        if (response) {
          console.log(response)
          setfollower(response.data.data.followby);
          setfollowback(response.data.data.followto);
        }
      } catch (error) {
        console.log(error);
      }
    };
    finddata();
  }, []);

  const textStyles = {
    fontSize: '20px',
    margin: '10px 0',
  };
  const followers = follower.map((el) => {
    return <People data={el} key={el.id} />;
  });
  
  const followingUsers = followback.map((el) => {
    return <Peopleto data={el} key={el.id} />;
  });

  return (
    <ProfileContainerStyle>
      <Profiledata>
        <Typography variant="h4">User Profile</Typography>
        <Typography style={textStyles}>Name: {paccount.name}</Typography>
        {
          follower.length>=3?(
            <Typography style={textStyles}> Username: {paccount.userName} <Bluetick/>
        
            </Typography>
           


          ):(
            <Typography style={textStyles}>Username: {paccount.userName}
        
        </Typography>
          )
        }
        

        <FollowerSection>
        <Box>
          <FollowerCount>{follower.length}</FollowerCount>
          <FollowLabel>Followers</FollowLabel>
       
        </Box>
          <Box>
          <FollowerCount>{followback.length}</FollowerCount>
          <FollowLabel>Following</FollowLabel>
          </Box>
        </FollowerSection>
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
        <Typography>your blogs</Typography>
        {postdata && postdata.length > 0 ? (
          postdata.map((post) => (
            <Grid item lg={10} sm={8} xs={12}>
              <Profilepost post={post} key={post._id}/>
            </Grid>
          ))
        ) : (
          <Box style={{ color: '#878787', margin: '30px 30px', fontSize: 18 }}>
            No blogs have been published by you.
          </Box>
        )}
      </Profileblogs>
    </ProfileContainerStyle>
  );
};

export default Profile;


