import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, styled,TextareaAutosize,Button } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './BlogPost.css'; // Import the CSS file
import { useContext } from 'react';
import { DataContext } from '../Context/Dataprovider';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// import Comment from './Comment';
//-------------------------------------------------------------------------------------
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
//------------------------------------------------------------------------------------
const ImageStyled = styled('img')({
  width: '100%',
  height: '50vh',
  objectFit: 'cover',
  borderRadius: '8px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
  alignItems: 'center',
  margin: 'auto',
});

const Commentheading=styled(Box)`
font-Size:20px;
font-Weight:Bold;`

const CommentBox=styled(Box)`
display:flex;
flex-Direction:column;
margin-left:3rem;
margin-right:3rem;
`

const StyledButton=styled(Button)`


color: #fff;
background: #6495ED;
height:2rem;
position:absolute;
right:14rem;
bottom:2rem;
&:hover {
  background: orange;
}`
const StyledTextarea = styled(TextareaAutosize)`
  width: 60vw; /* Set your desired width in pixels */
  height: 100px; /* Set your desired height in pixels */
  font-size: 14px;
  margin-top: 50px;
  resize: none; /* Prevent user resizing with cursor */
  
  &:focus-visible {
    outline: none;
  }
`;

const Publishsection=styled(Box)`
display:flex;
flex-Direction:row;
gap:3rem;
position:relative;
margin-bottom:1rem;`

const LikeIcon = styled(ThumbUpIcon)({
  cursor: 'pointer',
  transition: 'color 0.4s', // Define the transition for color change
  animation: 'none', // Initially, no animation

  '&.liked': {
    color: 'blue',
    animation: '$popLike 0.4s ease-in-out', // Apply the animation when liked
  },

  '@keyframes popLike': {
    '0%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: 'scale(1.2)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  },
});

const Heading = styled(Typography)`
  font-size: 38px;
  font-weight: 600;
  text-align: center;
`;

const CommonText = styled(Typography)`
  text-align: justify;
  padding: 16px; // Add padding for spacing around the text
`;

const Infotext=styled(Box)`
display:flex;
flex-direction:center;
gap:2rem;
margin:2rem 1rem;`

const Container = styled(Box)`
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);`; // No need to define margin here

const BlogPost = () => {
  const {paccount,value}=useContext(DataContext);
  const { id } = useParams();
  const [blogPost, setBlogPost] = useState({});
  const [typedTitle, setTypedTitle] = useState(''); // Initialize typedTitle
  const [formattedDescription, setFormattedDescription] = useState([]); // Initialize formattedDescription
  const [View,setView]=useState(0);
  const [liked,setliked]=useState('');
  const [countlike,setcountlike]=useState(0);
  const [comment,setcomment]=useState([]);
  const [num,setnum]=useState(0);
  const API_URL='';
  
  const initialpost={
    id:id,
    description:'',
   
    userName:paccount.userName,
    
    createDate:new Date()
}
const [postdata,setpostdata]=useState(initialpost);
 
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          id: id,
        };

        const response = await axios.get(`${API_URL}/details`, {
          params: params,
        });

        if (response && response.data && response.data.data && response.data.data.collection) {
          setBlogPost(response.data.data.collection);
          // Trigger the typewriter effect when the title is available
          startTypewriterEffect(response.data.data.collection.title, 'title');
          formatDescription(response.data.data.collection.description); // Format the description
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(()=>{

    const fetchview=async ()=>{
      try{
        const params = {
          id: id,
        };
        const response=await axios.get(`${API_URL}/view`,{
          params:params
        });

        if(response)
        {
          setView(Math.round(response.data.data.view/2))
        }
      
      }
      catch{
        console.log('error');
      }

    }
    fetchview();
   
   

  },[]);

 
  useEffect(() => {
    const fetch = async () => {
      try {
        const params = {
          id: id,
          Likeby: paccount.userName,
        };
  
        const response = await axios.get(`${API_URL}/like`, {
          params: params,
        });
  
        if (response) {
          setcountlike(response.data.number);
       
          // Determine if the user has liked or disliked the post and set 'liked' accordingly
          if (response.data.num === -1) {
            setliked('Disliked');
          } else {
            setliked('Liked');
          }
        }
      } catch (error) {
        console.log('error', error);
      }
    };
  
    fetch();
  }, [id]); 

  const fetchlike = async () => {
    try {
      const params = {
        id: id,
        Likeby: paccount.userName,
      };

      const response = await axios.get(`${API_URL}/like`, {
        params: params,
      });

      if (response) {
        setcountlike(response.data.number);
     
        // Determine if the user has liked or disliked the post and set 'liked' accordingly
        if (response.data.num === -1) {
          setliked('Disliked');
        } else {
          setliked('Liked');
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  
  const checklike = () => {
    if (liked === 'Liked') {
     
      setliked('Disliked');
      setcountlike(countlike - 1);
      fetchlike();
    } else {
      
      setliked('Liked');
      setcountlike(countlike + 1);
      fetchlike();
    }
  }
  const publishComment=async ()=>{
    
    try{
      const response=await axios.post(`${API_URL}/comment`,postdata
       
      )
      if(response)
      {
        console.log('data published')
        setpostdata(initialpost);
        setnum(num+1);
        
       
      }
      else{
        console.log('not published')
      }
    }
    catch(error){
      console.log(error);
    }
  }
   
  const imageUrl = blogPost.picture
    ? blogPost.picture
    : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    const routes=paccount.userName===blogPost.userName ? '/profile' :`/profile/${blogPost.userName}`;

   useEffect(()=>{
    const fetchcomment=async()=>{
      try{
        const params={
          id:id
        }
          const response= await axios.get(`${API_URL}/comment`,{
            params:params
          })
          if(response)
          {
            console.log(response);
            setcomment(response.data.data.commentdata);
            setnum(response.data.data.commentdata.length)
          }
      }
      catch{
           console.log('error');
      }
    }
    fetchcomment();
   },[num]) 

  // Function to create the typewriter effect
  const startTypewriterEffect = (text, target) => {
    let currentIndex = 0;
    let typedText = '';
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        typedText += text[currentIndex];
        if (target === 'title') {
          setTypedTitle(typedText);
        }
        currentIndex++;
      } else {
        clearInterval(interval); // Stop the typewriter effect
      }
    }, 50); // Adjust the speed (milliseconds per character) as needed
  };
   //---------------------------------commment design------------------------------------------------
   const commentStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '2px',
    marginBottom: '5px',
    display: 'flex',
    height:'20%',
    overflow:'scroll'
  };

  const avatarStyle = {
    width: '60px',
    height: '60px',
    marginRight: '10px',
    borderRadius: '50%',
    objectFit: 'cover',
  };
  const scrolllimit={
    maxHeight:'15vh'
  }

  const userDetailsStyle = {
    flex: 1,
  };
  const firstline={
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between'
  }
  const options={
    display:'flex',
    flexDirection:'row',
    gap:'1rem'
  }
  //-----------------------commnet design-------------------------------------------------
  // Function to format the description as paragraphs
  const formatDescription = (description) => {
    const lines = description.split('\n');
    const paragraphs = lines.map((line, index) => (
      <p key={index}>{line}</p>
    ));
    setFormattedDescription(paragraphs);
  };
  const contentChange=(e)=>{
    setpostdata({...postdata,[e.target.name]:e.target.value})
}
const deleteComment=async(id)=>{
  try{
    const params={
      id:id
    }
     const response=await axios.delete(`${API_URL}/comment`,{
      params:params
     })
     if(response)
     {
      
     setnum(num-1);
       
     }
  }
  catch{
    console.log('error');
  }
}
const comments = comment && comment.length > 0 ? (
  comment.map((data) => (
    <div style={commentStyle} key={data._id}>
      <img src={data.userAvatar} alt={data.userName} style={avatarStyle} />
      <div style={userDetailsStyle}>
        <div style={firstline}>
          <Link to={routes}>
            <p style={{ fontWeight: 'bold' }}>{data.userName}</p>
          </Link>
          {paccount.userName === data.userName ? (
            <div style={options}>
             
              <DeleteOutlineOutlinedIcon
                onClick={() => deleteComment(data._id)} // Use a function reference
                style={{ cursor: 'pointer' }}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
        <p style={{ color: '#777' }}>
          {new Date(data.createDate).toDateString()}
        </p>
        <p style={scrolllimit}>{data.description}</p> {/* Use data.description */}
      </div>
    </div>
  ))
) : (
  <div>Your comment will be the first one.</div>
);

  return (
    <>
    <Container className="container"> {/* Add the 'container' class */}
      <ImageStyled src={imageUrl} alt="blog post image" />
      <Heading variant="h4">{typedTitle}</Heading> {/* Render the typed title */}
      <Box>
      <Link to={routes}>
        <CommonText variant="subtitle1">by - {blogPost.userName}</CommonText>
        </Link>
        <CommonText variant="body1">{formattedDescription}</CommonText> {/* Render the formatted description */}
        <CommonText variant="body2">
          Created on {new Date(blogPost.createDate).toDateString()}
        </CommonText>
        <Infotext>
        <Box>
        <RemoveRedEyeIcon/><sup style={{marginLeft:'5px'}}>{View}</sup>
        </Box>
        <Box> 
        <LikeIcon
        className={liked === 'Liked' ? 'liked' : ''}
        onClick={checklike}
      />
      
       
         <sup> {countlike} Like</sup>
        </Box>
        </Infotext>
       
      </Box>
    </Container>
    <CommentBox>
      <Commentheading>Comments</Commentheading>
      <Publishsection>
      <StyledTextarea minRows={5} placeholder='write comment' value={postdata.description} title="description" name="description" onChange={(e)=>contentChange(e)}/>
      <StyledButton onClick={publishComment}>Publish</StyledButton>
      </Publishsection>
      <Box>
        {
          comments
        }
      </Box>
    </CommentBox>
    </>
  );
};

export default BlogPost;
