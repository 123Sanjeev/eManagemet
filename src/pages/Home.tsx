import { user } from "../compontents/Dashboard";
import "../sytles/home.css";
import { useState, useEffect } from "react";
import { FaPortrait } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
export default function Home(props: { userData: user; title: string }) {
  const redirect = useNavigate();
  const [currentUser, setCurrentUser] = useState<user>({
    username: "",
    location: "",
    status: "",
    roles: [],
    userid: "",
  });
  const [toggleProfile, setToggleProfile] = useState(false);
  useEffect(() => {
    document.title = props.title;
    setCurrentUser(props.userData);
  }, [currentUser, props.userData, props.title]);

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
    </div>
  );
}
