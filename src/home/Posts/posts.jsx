import React, { useEffect } from 'react'
import {useState} from 'react'
import {Box,Grid} from '@mui/material'
import axios from 'axios';
import Post from './post';
import styled from '@emotion/styled';
import { useSearchParams,Link } from 'react-router-dom';
const Styledbox=styled(Box)`
margin-left:2rem;`

export default function Posts() {
    const [Posts,setposts]=useState([]);
    const [searchparams]=useSearchParams();
    let category=searchparams.get('category');
    const API_URL='';
    useEffect(()=>{
         const fetchdata=async ()=>{
             try{
                const params = {
                    // Define your query parameters here
                    category:category || ''
                  };
                const response=await axios.get(`${API_URL}/allposts`,{
                    params:params
                });
                
               
                if(response)
                {
                    setposts(response.data.data.collection)
                
                   
                }
                
             }
             
             catch(error){
                console.log(error);
             }
         }
         fetchdata();
    },[category])
    console.log(Posts);
  return (
      <Styledbox>
       {
    Posts && Posts.length > 0 ? (
        Posts.map(post => (
           
               <Grid item lg={10} sm={8} xs={12}>
              
                 <Post post={post}/>
              
               
               </Grid>
            
           
        ))
    ) : (
        <Box style={{ color: '#878787', margin: '30px 30px', fontSize: 18 }}>
            no data available to display
        </Box>
    )
}

      </Styledbox>
  )
}
