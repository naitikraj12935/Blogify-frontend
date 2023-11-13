import React from 'react'
import {Box,Typography,styled} from '@mui/material'

const Image=styled(Box)`
background:url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg) center/55% repeat-x;
width:100%;
height:50vh;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
padding:auto;
`

const Heading=styled(Typography)`
font-size:70px;
color:#ffffff;

`
const Subheading=styled(Typography)`
background-color:#ffffff;
font-size:16px;
padding:4px;
border-radius:14px;

`
export default function Banner() {
  return (
    <Image>
      <Heading>Blogify</Heading>
      <Subheading>share your knowledge</Subheading>
    </Image>
  )
}
