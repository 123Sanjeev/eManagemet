import { MouseEvent, ReactHTMLElement, ReactNode, useEffect, useState } from "react";
import appList from "./private/navbar.elements";
import "../sytles/navbar.css";
import { Link } from "react-router-dom";
import { user } from "./Dashboard";
import { RoleBasedAuthorities } from "../authorization/AuthAccess";
import { FaDashcube, FaBookOpen } from "react-icons/fa";
import { IconType } from "react-icons";
type applicationProps = {
  app: string;
  userData: user;
};
type appsType = {
  AuthApps: string[];
  AuthorizedActions: {
    I: boolean;
    U: boolean;
    V: boolean;
    D: boolean;
  };
};

const navbarDetails = function (userData: user) {
  const apps: Set<appsType> = new Set();
  userData.roles.forEach((role, idx) => {
    switch (role.role) {
      case "UEB":
        apps.add({
          AuthApps: RoleBasedAuthorities["UEB"].authorizedApps,
          AuthorizedActions: RoleBasedAuthorities["UEB"].authorizedActions,
        });
        break;
      case "CO":
        apps.add({
          AuthApps: RoleBasedAuthorities["CO"].authorizedApps,
          AuthorizedActions: RoleBasedAuthorities["CO"].authorizedActions,
        });
        break;
      case "CI":
        apps.add({
          AuthApps: RoleBasedAuthorities["CI"].authorizedApps,
          AuthorizedActions: RoleBasedAuthorities["CI"].authorizedActions,
        });
        break;
      default:
        apps.add({
          AuthApps: RoleBasedAuthorities["ALL"].authorizedApps,
          AuthorizedActions: RoleBasedAuthorities["ALL"].authorizedActions,
        });
    }
  });
  if (userData.roles.length < 1) {
    apps.add({
      AuthApps: RoleBasedAuthorities["ALL"].authorizedApps,
      AuthorizedActions: RoleBasedAuthorities["ALL"].authorizedActions,
    });
  }

  console.log(apps);

  var appString = "";
  const appData = Array.from(apps).map((ap) => {
    return ap.AuthApps.map((e) => {
      if (appString.includes(e)) {
        return "";
      } else {
        appString += e;
      }
      return appList.map((nav, idx) => {
        if (nav.app === e) {
          console.log(nav)
          return (
            <>
              {nav.type === "single" ? (
                <li className="nav-item" key={idx}>
                  <Link to={nav.MenuUrl} className="nav-link">
                    <nav.icon />
                    {nav.MenuName}
                  </Link>
                </li>
              ) :
              
              (
                
                <li key={idx} className="nav-item dropdown">
                  <Link to={nav.MenuUrl} className="nav-link">
                    <nav.icon />
                    {nav.MenuName}
                  </Link>
                  <ul className="navbar-nav bg-dark">
                    {" "}
                    {nav.mutiVal?.map((multi, idx) => {
                      if (ap.AuthorizedActions.V && multi.app === "V") {
                        return (
                          <li className="nav-item" key={idx}>
                            <Link to={multi.MenuUrl} className="nav-link">
                              <multi.icon />
                              {multi.MenuName}
                            </Link>
                          </li>
                        );
                      } else if (ap.AuthorizedActions.I && multi.app === "I") {
                        return (
                          <li className="nav-item" key={idx}>
                            <Link to={multi.MenuUrl} className="nav-link">
                              <multi.icon />
                              {multi.MenuName}
                            </Link>
                          </li>
                        );
                      }
                      return "";
                    })}
                  </ul>
                </li>
              )}
            </>
          );
        }
        return "";
      });
    });
  });
  return <>{appData} </>;
};

export default function Navbar(props: applicationProps) {


  return (
    <nav className={`navbar`} >
      <ul key={1} className="navbar-nav mr-auto">
        <li style={{ cursor: "pointer" }}>
          <Link key={3} className="nav-link title" to={"/"}>
           
            {props.app}{" "}
          </Link>
        </li>
      </ul>
      <div className="nav-links" id="navbarSupportedContent">
        <ul key={2} className="">
          <li className="nav-item">
            <Link to={"/"} className="nav-link">
              <FaDashcube style={{ color: "blue" }} />
              Dashboard
            </Link>
          </li>
          {navbarDetails(props.userData) as ReactNode}
        </ul>
      </div>
    </nav>
  );
}
