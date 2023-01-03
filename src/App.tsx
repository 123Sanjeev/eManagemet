import {useEffect, useState} from 'react';
import Dashboard, { user } from './compontents/Dashboard';
import Navbar from './compontents/Navbar';

const uid = sessionStorage.getItem("userid")


function App() {

  useEffect(()=>{
    const uid = sessionStorage.getItem("userid")
    if(uid){
      setLoginStatus(true)
    }else{
      setLoginStatus(false)
    }
  },[])

  const [loginStatus, setLoginStatus] = useState(false);
  const [loggedInUser, setUser] = useState<user>();

  return (
    <div className="App">
      <Navbar app="eManagement" userData = { loggedInUser as user } username={uid} isLoggedin={(loginStatus || uid) ? true : false} />
      <Dashboard loginStatus= {setLoginStatus} isLoggedin = {(loginStatus || uid) ? true : false} userData = {loggedInUser} setUserData={setUser}/>
    </div>
  );
}

export default App;
