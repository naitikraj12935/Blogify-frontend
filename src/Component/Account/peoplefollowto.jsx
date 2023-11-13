import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { DataContext } from '../../Context/Dataprovider';

const linkStyle = {
  textDecoration: 'none',
  color: '#007bff', // Default text color
  border: '1px solid transparent', // Default border
  fontWeight: 'normal', // Default font weight
  transition: 'all 0.2s', // Smooth transition effect
};

const hoverStyle = {
  color: '#ff0000', // Text color on hover
  border: '1px solid #007bff', // Border on hover
  fontWeight: 'bold', // Font weight on hover
};

export default function People({ data }) {
  const { paccount } = useContext(DataContext);
  const isCurrentUser = paccount.userName === data.followto;
  const route = isCurrentUser ? '/profile' : `/profile/${data.followto}`;

  return (
    <div>
      <Link to={route} style={{ ...linkStyle, ...(isCurrentUser ? hoverStyle : {}) }}>
        {data.followto}
      </Link>
    </div>
  );
}
