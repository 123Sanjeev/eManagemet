import { user } from "../compontents/Dashboard";
import "../sytles/home.css";
import { useState, useEffect } from "react";
import { FaPortrait } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import RouteWFDB from "../api/routeWFDB";

export type assignmentType = {
  role: string;
  userid: string;
  timecreated: string;
  timeupdated: string;
  updatedby: string;
  createdby: string;
  app: string;
  memo: string;
};

const appToUrl: { BP: string; QB: string } = {
  BP: "/viewBlueprint/:bpid",
  QB: "/question/Add",
};
export default function Home(props: { userData: user; title: string }) {
  const redirect = useNavigate();

  const [currentUser, setCurrentUser] = useState<user>({
    username: "",
    location: "",
    status: "",
    roles: [],
    userid: "",
  });

  const [pendingAssignments, setPendingAssignments] = useState<
    assignmentType[]
  >([
    {
      role: "",
      userid: "",
      timecreated: "",
      timeupdated: "",
      updatedby: "",
      createdby: "",
      app: "",
      memo: "",
    },
  ]);

  const [toggleProfile, setToggleProfile] = useState(false);
  useEffect(() => {
    document.title = props.title;
    handleAssingmentData();
    setCurrentUser(props.userData);
  }, [currentUser, props.userData, props.title]);

  async function handleAssingmentData() {
    const assingments = await RouteWFDB.getAssignments(
      parseInt(props.userData.userid)
    );
    console.log({"Assignments_data" :assingments })
    setPendingAssignments(assingments);
  }
  return (
    <div className="container home">
      <div className="welcomheader">
        <h3 className="welcome">
          Welome, <span>{props.userData.username}</span>
        </h3>
        <div className="profile">
          <FaPortrait
            onClick={() => {
              setToggleProfile(!toggleProfile);
            }}
          />
          {toggleProfile ? (
            <div className="profileLinks">
              <Link
                to={"/profile"}
                className="nav-link bg-light p-2 mt-1 "
                style={{ width: "100px" }}
              >
                Profile
              </Link>
              <Link
                to={"/logout"}
                className="nav-link bg-light p-2 mt-1 "
                style={{ width: "100px" }}
                onClick={() => {
                  localStorage.removeItem("user");
                  window.location.reload();
                }}
              >
                Logout
              </Link>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <hr style={{ width: "90%" }} />
      {pendingAssignments?.map((assigment, idx) => {
        return (
          <ul key={idx} className="list-group">
            <li className="list-group-item">
              {"Role: " + assigment.role + " User Id: " + assigment.userid}
              <Link
                to={assigment.app === "BP" ? "/viewBlueprint" : "/"}
                style={{
                  float: "right",
                  padding: "2px",
                  listStyleType: "none",
                  textDecoration: "none",
                }}
              >
                Action
              </Link>
            </li>
          </ul>
        );
      })}
    </div>
  );
}
