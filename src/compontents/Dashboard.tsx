import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "./About";
import CreateBluePrint from "./CreateBluePrint";
import ViewBluePrint from "./ViewBlueprint";
import Login from "./login/login";
import Profile from "./profile/Profile";
import ManageLinks from "./mangeRoutes/manageLinks";
import Question from "./Questions/Question";
var isLogIn = false;
if (sessionStorage.getItem("userid")) {
  isLogIn =true;
}
type role = {
  role :string | undefined
}
export type user = {
  username : string,
  location : string,
  status : string,
  roles : role[],
  userid : string
}


export default function Dashboard(props:any) {

  console.log(props.isLoggedin)

if(!props.isLoggedin){ 
  return (
    <>
        <Login setLoginStatus={props.loginStatus} setUserData ={props.setUserData}/>
    </>
  );
}else{
  return (
    <>
      {/* <Navbar app="eManagement" userData = { props.userData as user } username={uid} isLoggedin={props.isLoggedin} /> */}
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLogIn} />} />
        <Route path="/About" element={<About />} />
        <Route path="/createBlueprint" element={<CreateBluePrint />} />
        <Route path="/viewBlueprint" element={<ViewBluePrint />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/manageLinks" element={<ManageLinks />} />
        <Route path="/question/:action" element={<Question />} />
        <Route path="/question/:action/:id" element={<Question />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}
}
