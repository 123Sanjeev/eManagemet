import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "./About";
import CreateBluePrint from "./CreateBluePrint";
import ViewBluePrint from "./ViewBlueprint";
import Login from "./login/login";
import Profile from "./profile/Profile";
import ManageLinks from "./mangeRoutes/manageLinks";
import Question from "./Questions/Question";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

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
        <Route path="/" element={<Home userData={user} />} />
        <Route path="/About" element={<About />} />
        <Route path="/createBlueprint" element={<CreateBluePrint />} />
        <Route path="/viewBlueprint" element={<ViewBluePrint />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/manageLinks" element={<ManageLinks />} />
        <Route path="/question/:action" element={<Question />} />
        <Route path="/question/:action/:id" element={<Question />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}
