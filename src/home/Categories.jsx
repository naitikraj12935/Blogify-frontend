import React, { useState } from 'react';
import { Button, TableHead, Table, TableCell, TableBody, TableRow } from '@mui/material';
import { Categoriesdata } from '../constants/Data';
import styled from '@emotion/styled';
import { Link, useSearchParams } from 'react-router-dom';

const Styledtable = styled(Table)`
  border: 1px solid rgba(224, 224, 224, 1);
  position: absolute;
  top: 450px;
  width: 200px;
`;

const StyledButton = styled(Button)`
  margin: 20px;
  width: 85%;
  color: #fff;
  background: #6495ED;

  &:hover {
    background: orange;
  }
`;

const Styledlink = styled(Link)`
  text-decoration: none;
  padding:0.5rem;
  color: ${(props) => (props.selected ? '#fff' : '#6495ED')};
  background: ${(props) => (props.selected ? '#6495ED' : 'none')};
`;

export default function Categories() {
  const [searchparams] = useSearchParams();
  const category = searchparams.get('category');
  const [selectedCategory, setSelectedCategory] = useState(category || '');

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <Styledlink to={`/create?category=${category || ''}`} >
        <StyledButton>Create Blog</StyledButton>
      </Styledlink>
      <Styledtable>
        <TableHead>
          <TableRow>
            <TableCell>
              <Styledlink
                to='/'
                selected={selectedCategory === ''}
                onClick={() => handleCategoryClick('')}
              >
                All Categories
              </Styledlink>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Categoriesdata.map((Catego) => (
            <TableRow key={Catego.id}>
              <TableCell>
                <Styledlink
                  to={`/?category=${Catego.type}`}
                  selected={selectedCategory === Catego.type}
                  onClick={() => handleCategoryClick(Catego.type)}
                >
                  {Catego.type}
                </Styledlink>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Styledtable>
    </>
  );
}
