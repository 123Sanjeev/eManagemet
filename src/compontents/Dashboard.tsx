import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "./About";
import CreateBluePrint from "./Blueprint/CreateBluePrint";
import ViewBluePrint from "./Blueprint/ViewBlueprint";
import Login from "./login/login";
import Profile from "./profile/Profile";
import ManageLinks from "./mangeRoutes/manageLinks";
import Question from "./Questions/Question";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import UpdateBlueprint from "./Blueprint/UpdateBlueprint";

type role = {
  role: string | undefined;
};
export type user = {
  username: string;
  location: string;
  status: string;
  roles: role[];
  userid: string;
};

export default function Dashboard() {
  const redirect = useNavigate();
  const [user, setUser] = useState<user>({
    username: "",
    location: "",
    status: "",
    roles: [],
    userid: "",
  });
  useEffect(() => {
    const sessionUser = localStorage.getItem("user");
    if (sessionUser) {
      setUser(JSON.parse(localStorage.getItem("user")!) as user);
    } else {
      redirect("/login");
    }
  }, [redirect]);
  return (
    <>
      <Navbar app="E Assessment" userData={user} />
      {/* <Navbar app="eManagement" userData = { props.userData as user } username={uid} isLoggedin={props.isLoggedin} /> */}
      <Routes>
        {/* Home route */}
        <Route path="/" element={<Home userData={user} title={"Home"} />} />
        {/* About page route TODO: to be removed in production build */}
        <Route path="/About" element={<About />} />
        {/* Blueprint routes */}
        <Route path="/createBlueprint" element={<CreateBluePrint title={"Create Blueprint"} />} />
        <Route path="/viewBlueprint" element={<ViewBluePrint title={"View Blueprint"}/>} />
        <Route path="/viewBlueprint/:bpid" element={<UpdateBlueprint title={"Update Blueprint"} user={user} />} />
        {/* Question routes */}
        <Route path="/question/:action" element={<Question title={"Question"} user={user} />} />
        <Route path="/question/:action/:id" element={<Question title={"Edit Question"} user={user} />} />
        {/* Login Route */}
        <Route path="/login" element={<Login setUser={setUser} title={"Login"}/>} />
        {/* Profile Route */}
        <Route path="/profile" element={<Profile />} />
        {/* Manage links route */}
        <Route path="/manageLinks" element={<ManageLinks />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}
