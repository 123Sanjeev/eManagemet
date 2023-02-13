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
import { HasCapabilities } from "../authorization/hasCapabilities";
import "../sytles/dashboard.css";

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
export type capabilitiesType = {
  authorizedActions: {
    I: boolean;
    U: boolean;
    V: boolean;
    D: boolean;
  };
  authorizedApps: string[];
};
export default function Dashboard() {
  const redirect = useNavigate();
  const [capabilities, setCapabilities] = useState<capabilitiesType>({
    authorizedActions: {
      I: false,
      U: false,
      V: false,
      D: false,
    },
    authorizedApps: [""],
  });
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
      setCapabilities(
        HasCapabilities(JSON.parse(sessionUser)! as user) as capabilitiesType
      );
      console.log(capabilities);
      setUser(JSON.parse(localStorage.getItem("user")!) as user);
    } else {
      redirect("/login");
    }
  }, [redirect]);
  return (
    <div className="dashboard">
      <Navbar app="E Assessment" userData={user} />
      {/* <Navbar app="eManagement" userData = { props.userData as user } username={uid} isLoggedin={props.isLoggedin} /> */}
      <Routes>
        {/* Home route */}

        <Route path="/" element={<Home userData={user} title={"Home"} />} />
        {/* About page route TODO: to be removed in production build */}
        <Route path="/About" element={<About />} />
        {/* Blueprint routes */}
        {capabilities.authorizedApps.map((e) => {
          if (e === "BP") {
            const authActionList = capabilities.authorizedActions;
            if (authActionList.V && authActionList.I && authActionList.U) {
              return (
                <>
                  <Route
                    path="/createBlueprint"
                    element={
                      <CreateBluePrint title={"Create Blueprint"} user={user} />
                    }
                  />
                  <Route
                    path="/viewBlueprint"
                    element={
                      <ViewBluePrint title={"View Blueprint"} user={user} />
                    }
                  />
                  <Route
                    path="/viewBlueprint/:bpid"
                    element={
                      <UpdateBlueprint title={"Update Blueprint"} user={user} />
                    }
                  />
                </>
              );
            } else if (authActionList.V) {
              return (
                <>
                  <Route
                    path="/viewBlueprint"
                    element={
                      <ViewBluePrint title={"View Blueprint"} user={user} />
                    }
                  />
                  <Route
                    path="/viewBlueprint/:bpid"
                    element={
                      <UpdateBlueprint title={"Update Blueprint"} user={user} />
                    }
                  />
                </>
              );
            }
          }
        })}
        {/* <Route
          path="/createBlueprint"
          element={<CreateBluePrint title={"Create Blueprint"} user={user} />}
        />
        <Route
          path="/viewBlueprint"
          element={<ViewBluePrint title={"View Blueprint"} user={user} />}
        />
        <Route
          path="/viewBlueprint/:bpid"
          element={<UpdateBlueprint title={"Update Blueprint"} user={user} />}
        /> */}

        <Route path="*" element={<>Not found / Un-authorized access</>} />

        {/* Question routes */}
        <Route
          path="/question/:action"
          element={<Question title={"Question"} user={user} />}
        />
        <Route
          path="/question/:action/:id"
          element={<Question title={"Edit Question"} user={user} />}
        />
        {/* Login Route */}
        <Route
          path="/login"
          element={<Login setUser={setUser} title={"Login"} />}
        />
        {/* Profile Route */}
        <Route path="/profile" element={<Profile user={user} />} />
        {/* Manage links route */}
        <Route path="/manageLinks" element={<ManageLinks />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}
