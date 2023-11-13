import Login from "./Component/Account/Login";
import Dataprovider from "./Context/Dataprovider";
import Home from "./home/home";
import Header from "./Component/header/Header";
//router
import {BrowserRouter,Routes,Route, Navigate, Outlet} from 'react-router-dom';
import { useState } from "react";
import Createpost from "./Component/Post/Createpost";
import { getAcesstoken } from "./utils/common-utils";
import Detail from "./Details/detail";
import Profile from "./Component/Account/profile";
import Updatepost from "./Component/Post/Updatepost";
import Authorprofile from "./Component/Account/Authorprofile";
import Notification from "./Component/Notification/Notification";

const PrivateRoute=({isAuthenticate,...props})=>{
  return isAuthenticate ?
  <>
    <Header/>

 <Outlet/>
  </>
  : <Navigate replace to='/login'/>
}
function App() {
  const [isAuthenticate,setisAuthenticate]=useState(false);
  return (
    <Dataprovider>
    <BrowserRouter>
    
    <div style={{marginTop:64}}>
    <Routes>
    <Route path="/login" element={<Login isuserAuthenticated={setisAuthenticate}/>}/>
    <Route path='/' element={<PrivateRoute isAuthenticate={isAuthenticate}/>}>
    <Route path="/" element={<Home/>}/>
    </Route>
    <Route path='/create' element={<PrivateRoute isAuthenticate={isAuthenticate}/>}>
    <Route path="/create" element={<Createpost/>}/>
    </Route>

    {/* <Route path='/details/:id' element={<PrivateRoute isAuthenticate={isAuthenticate}/>}> */}
    <Route path="/details/:id" element={<Detail/>}/>
    {/* </Route> */}

    <Route path='/profile' element={<PrivateRoute isAuthenticate={isAuthenticate}/>}>
    <Route path="/profile" element={<Profile/>}/>
    </Route>
    <Route path='/profile/:userName' element={<PrivateRoute isAuthenticate={isAuthenticate}/>}>
    <Route path="/profile/:userName" element={<Authorprofile/>}/>
    </Route>
   

    <Route path='/update/:id' element={<PrivateRoute isAuthenticate={isAuthenticate}/>}>
    <Route path="/update/:id" element={<Updatepost/>}/>
    </Route>

    
    <Route path='/notification' element={<PrivateRoute isAuthenticate={isAuthenticate}/>}>
    <Route path='/notification' element={<Notification/>}/>
    </Route>
    
      
      </Routes> 
      </div>
      </BrowserRouter>
    </Dataprovider>
    
  );
}

export default App;
