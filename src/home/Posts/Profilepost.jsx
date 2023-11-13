import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled(Box)`
  display: flex;
  border-bottom: 1px solid #ccc;
  border-radius: 10px;
  margin: 20px;
  overflow: hidden;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.05);
  }
`;

const ImageContainer = styled(Box)`
  width: 30%; /* Adjust the width as needed */
  max-height: 150px; /* Adjust the max-height as needed */
  overflow: hidden;
`;

const ImageStyled = styled('img')`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px 0 0 10px;
`;

const Content = styled(Box)`
  width: 70%; /* Adjust the width as needed */
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

const Category = styled(Typography)`
  font-weight: bold;
`;

const Title = styled(Typography)`
  font-size: 1rem; /* Adjust the font size as needed */
  flex-grow: 1;
`;

const Author = styled(Typography)`
  color: #888;
`;

const ReadMoreButton = styled(Button)`
  color: #fff;
  background-color: #007bff;
  width: 50%;
  font-size: 10px;
  &:hover {
    background-color: #0056b3;
  }
`;

const IconsContainer = styled(Box)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 16px;
`;

const EditDeleteIcons = styled(Box)`
  margin-left: 10px;
  cursor: pointer;
`;

export default function Profilepost({ post }) {
    const nevigate=useNavigate();
  const url = post.picture ? post.picture : 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg';
  const API_URL='';

  const Deletepost=async ()=>{
    try{
        const token=sessionStorage.getItem('accessToken')
        const params={
            id:post._id,
            userName:post.userName
        }
        const response=await axios.delete(`${API_URL}/blogify/deletepost`,{
            headers:{
                Authorization:token
              },
              params:params
                
        })
        if(response){
          nevigate('/')
        }
    }
    catch(error){
        console.log(error)
    }
  }
  return (
    <Container>
      <ImageContainer>
        <ImageStyled src={url} alt="photo" />
      </ImageContainer>
      <Content>
        <Category variant="subtitle2" color="primary">
          Category: {post.categories}
        </Category>
        <Title variant="h6">{post.title}</Title>
        <Author variant="body2">By {post.userName}</Author>
        <Link to={`/details/${post._id}`}>
          <ReadMoreButton variant="contained">Read More</ReadMoreButton>
        </Link>
        <IconsContainer>
          <EditDeleteIcons>
          <Link to={`/update/${post._id}`}>
            <EditIcon style={{color:'blue'}}/>
            </Link>
          </EditDeleteIcons>
          <EditDeleteIcons>
            <DeleteIcon onClick={Deletepost} style={{color:'red'}}/>
          </EditDeleteIcons>
        </IconsContainer>
      </Content>
    </Container>
  );
}
