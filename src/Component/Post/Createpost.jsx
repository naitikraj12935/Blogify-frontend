import React from 'react'
import { useState,useEffect ,useContext} from 'react';
import {Box,styled,FormControl,InputBase, Button,TextareaAutosize} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useLocation } from 'react-router-dom';
import { DataContext } from '../../Context/Dataprovider';
import { getAcesstoken } from '../../utils/common-utils';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
const Container=styled(Box)`
margin:50px 100px;`
const Styledformcontrol=styled(FormControl)`
 display:flex;
 flex-direction:row;`

 const StledInputbase=styled(InputBase)`
 flex:1;
 margin:0px 30px ;
 font-size:25px;`
 const StyledTextare=styled(TextareaAutosize)`
 width:100%;
 font-size:14px;
 border:none;
 margin-top:50px;
 &:focus-visible{
 outline:none;
 };
 `
const StyledButton=styled(Button)`


color: #fff;
background: #6495ED;

&:hover {
  background: orange;
}`
const Image=styled('img')({
 width:'100%',
 height:'50vh',
 objectFit:'cover'
})
export default function Createpost() {
    const location=useLocation();
    const nevigate=useNavigate();
    const {paccount}=useContext(DataContext);
    const initialpost={
        title:'',
        description:'',
        picture:'',
        userName:'',
        categories:'',
        createDate:new Date()
    }
    const [postdata,setpostdata]=useState(initialpost);
    const API_URL='https://blogingfy-7e950285c55c.herokuapp.com/';
    const [file,setfile]=useState('');
    useEffect(() => {
        const getdata = async () => {
            if (file) {
              const data = new FormData();
              data.append('name', file.name);
              data.append('file', file);
          
              try {
                const response = await axios.post(`${API_URL}/file/upload`, data);
                console.log(response);
          
                if (response.data.data && response.data.data.result && response.data.data.result.imagelink) {
                  setpostdata({
                    ...postdata,
                    picture: `${API_URL}/images/${response.data.data.result.imagelink}`,
                  });
                  console.log(response.data); // Assuming the response contains useful data
                } else {
                  console.error('Invalid response data:', response.data);
                }
              } catch (err) {
                console.log(err);
              }
            }
          };
          
      
        getdata(); // Call getdata here
      
        postdata.categories = location.search?.split('=')[1] || 'All';
        postdata.userName = paccount.userName;
      }, [file]);
      const url=postdata.picture? postdata.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80' ;
      console.log("url",url);
      
      
    const contentChange=(e)=>{
        setpostdata({...postdata,[e.target.name]:e.target.value})
    }
    const publishPost=async ()=>{
      console.log(sessionStorage.getItem('accessToken'))
      const token=sessionStorage.getItem('accessToken')
      try{
        const response=await axios.post(`${API_URL}/create`,postdata,{
          headers:{
            Authorization:token
          }
        })
        if(response)
        {
          console.log('data published',response.data.data)
          nevigate('/');
        }
        else{
          console.log('not published')
        }
      }
      catch(error){
        console.log(error);
      }
    }
    
  
  return (
    <Container>
        <Image src={url} alt='postbanner'/>

<Styledformcontrol>
    <label htmlFor='fileinput'>
       <AddCircleIcon fontSize='large'/>
    </label>
    <input type='file' id='fileinput' style={{display:'none'}} onChange={(e)=>setfile(e.target.files[0])}/>
    <StledInputbase placeholder="Title" autoFocus color="primary"  name="title" onChange={(e)=>contentChange(e)}/>
    <StyledButton onClick={publishPost}>Publish</StyledButton>
    
</Styledformcontrol>
<StyledTextare minRows={5} placeholder='write content'  title="description" name="description" onChange={(e)=>contentChange(e)}/>
    </Container>
  )
}
