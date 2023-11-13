import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { DataContext } from '../../Context/Dataprovider';
import { Box, Typography, Button } from '@mui/material';
import styled from '@emotion/styled';
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
const NotificationBox = styled(Box)`
  margin-top: 1rem;
  margin-left:18rem;
 
  width: 50vw;
  align-items: center;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
const PanToolAlt=styled(PanToolAltIcon)`
color:#E0A526;`
const NotificationText = styled(Typography)`
  margin-bottom: 1rem;
`;

const UserNameLink = styled(Link)`
  text-decoration: none;
  font-weight: bold;
  color: #007bff;
`;

const CategoryLink = styled(Link)`
  text-decoration: none;
  font-weight: bold;
  color: #007bff;
`;

const ExploreLink = styled(Link)`
  text-decoration: none;
  font-weight: bold;
  color: #007bff;
`;

export default function Shownotification({ data }) {
  const { paccount } = useContext(DataContext);
  const category = data.categories ? data.categories : 'All';
  const isCurrentUser = paccount.userName === data.userName;

  return (
    <NotificationBox>
      <NotificationText variant="body1">
        <UserNameLink to={isCurrentUser ? '/profile' : `/profile/${data.userName}`}>
          {data.userName}
        </UserNameLink>{' '}
        posted a blog on{' '}
        <CategoryLink to={`/category/${category}`}>{category}</CategoryLink> category.{' '}
        <ExploreLink to={`/details/${data._id}`}>Click<sub><PanToolAlt/></sub>here to explore</ExploreLink>.
      </NotificationText>
    </NotificationBox>
  );
}
