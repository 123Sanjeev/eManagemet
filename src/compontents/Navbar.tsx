import { ReactNode } from "react";
import appList from "./private/navbar.elements";
import "../sytles/navbar.css";
import { Link } from "react-router-dom";
import { user } from "./Dashboard";
type applicationProps = {
  app: string;
  username: any;
  isLoggedin: boolean;
  userData: user;
};

const navbarDetails = function (
  username: string,
  userData: user,
  isLoggedin: boolean
) {
  const navbarDrawer = appList.map((data, id) => {
    return (
      <>
        {data.type === "single" ? (
          <li key={id} className="nav-item">
            <Link to={data.MenuUrl} className="nav-link">
              {data.MenuName}
            </Link>{" "}
          </li>
        ) : (
          <li key={id} className="nav-item dropdown">
            <Link to={data.MenuUrl} className="nav-link">
              {data.MenuName}
            </Link>
            <ul key={id} className="navbar-nav bg-dark">
              {" "}
              {data.mutiVal?.map((multi, idx) => {
                return (
                  <li className="nav-item" key={idx}>
                    <Link to={multi.MenuUrl} className="nav-link">
                      {multi.MenuName}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        )}
      </>
    );
  });

  console.log(userData);

  const ADMIN = userData?.roles.forEach((e) => {
    console.log(e);
    if (e.role === "ADMIN") {
      return (
        <li className="nav-items">
          <Link to="/manageLinks" className="nav-link">
            Manage Routes
          </Link>
        </li>
      );
    }
  });

  return isLoggedin ? (
    <>
      {navbarDrawer}
      {ADMIN}
      <li className="nav-item text-white sign-in dropdown">
        <Link to="#" className="nav-link">
          {username}
        </Link>
        <ul key={1} className="navbar-nav bg-dark">
          <li className="nav-item">
            <span
              className="nav-link"
              onClick={() => {
                console.log("jfaksdjflk");
                sessionStorage.removeItem("userid");
                window.location.reload();
              }}
            >
              Logout
            </span>
          </li>
          <li className="nav-item">
            <Link to={"/profile"} state={userData} className="nav-link">
              Profile
            </Link>
          </li>
        </ul>
      </li>{" "}
    </>
  ) : (
    <>
      {/* {navbarDrawer} */}
      <li className="nav-item sign-in">
        <a href="/login" className="nav-link text-white ">
          sign-in
        </a>
      </li>
    </>
  );
};

export default function Navbar(props: applicationProps) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <ul key={2} className="navbar-nav mr-auto">
        <li className="text-white nav-item" style={{ cursor: "pointer" }}>
          <Link className="nav-link" to={"/"}>
            {props.app}{" "}
          </Link>
        </li>
      </ul>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul key={2} className="navbar-nav mr-auto">
          {
            navbarDetails(
              props.userData?.username,
              props.userData,
              props.isLoggedin
            ) as ReactNode
          }
        </ul>
      </div>
    </nav>
  );
}
