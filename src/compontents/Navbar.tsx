import { ReactNode } from "react";
import appList from "./private/navbar.elements";
import "../sytles/navbar.css";
import { Link } from "react-router-dom";
import { user } from "./Dashboard";
import { RoleBasedAuthorities } from "../authorization/AuthAccess";
type applicationProps = {
  app: string;
  userData: user;
};

const navbarDetails = function (userData: user) {
  const apps: [
    {
      AuthApps: string[];
      AuthorizedActions: {
        I: boolean;
        U: boolean;
        V: boolean;
        D: boolean;
      };
    }
  ] = userData.roles.map((role, idx) => {
    switch (role.role) {
      case "ADMIN":
        return {
          AuthApps: RoleBasedAuthorities["UEB"].authorizedApps,
          AuthorizedActions: RoleBasedAuthorities["UEB"].authorizedActions,
        };
    }
    return "";
  }) as [
    {
      AuthApps: string[];
      AuthorizedActions: {
        I: boolean;
        U: boolean;
        V: boolean;
        D: boolean;
      };
    }
  ];

  console.log(apps);

  const appData = apps.map((ap) => {
    return ap.AuthApps.map((e) => {
      return appList.map((nav, idx) => {
        if (nav.app === e) {
          return (
            <>
              {nav.type === "single" ? (
                <li className="nav-item">
                  <Link to={nav.MenuUrl} key={idx} className="nav-link">
                    {nav.MenuName}
                  </Link>
                </li>
              ) : (
                <li key={idx} className="nav-item dropdown">
                  <Link to={nav.MenuUrl} className="nav-link">
                    {nav.MenuName}
                  </Link>
                  <ul className="navbar-nav bg-dark">
                    {" "}
                    {nav.mutiVal?.map((multi, idx) => {
                      if(ap.AuthorizedActions.V && multi.app === "V"){
                        return (
                          <li className="nav-item" key={idx}>
                            <Link to={multi.MenuUrl} className="nav-link">
                              {multi.MenuName}
                            </Link>
                          </li>
                        );
                      }else if(ap.AuthorizedActions.I && multi.app === "I"){
                        return (
                          <li className="nav-item" key={idx}>
                            <Link to={multi.MenuUrl} className="nav-link">
                              {multi.MenuName}
                            </Link>
                          </li>
                        );
                      }
                      return ""
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

  // const navbarDrawer = appList.map((data, id) => {
  //   return (
  //     <div key={id}>
  //       {data.type === "single" ? (
  //         <li className="nav-item">
  //           <Link to={data.MenuUrl} className="nav-link">
  //             {data.MenuName}
  //           </Link>{" "}
  //         </li>
  //       ) : (
  //         <li key={id} className="nav-item dropdown">
  //           <Link to={data.MenuUrl} className="nav-link">
  //             {data.MenuName}
  //           </Link>
  //           <ul className="navbar-nav bg-dark">
  //             {" "}
  //             {data.mutiVal?.map((multi, idx) => {
  //               return (
  //                 <li className="nav-item" key={idx}>
  //                   <Link to={multi.MenuUrl} className="nav-link">
  //                     {multi.MenuName}
  //                   </Link>
  //                 </li>
  //               );
  //             })}
  //           </ul>
  //         </li>
  //       )}
  //     </div>
  //   );
  // });

  // const ADMIN = userData?.roles.map((e, idx) => {
  //   if (e.role === "ADMIN") {
  //     return (
  //       <li className="nav-items" key={idx}>
  //         <Link to="/manageLinks" className="nav-link">
  //           Manage Routes
  //         </Link>
  //       </li>
  //     );
  //   }
  //   return "";
  // });
  return userData.userid !== "" ? (
    <>
      {/* {navbarDrawer} */}
      {appData}
      <li className="nav-item text-white sign-in dropdown">
        <Link to="#" className="nav-link">
          {userData.username}
        </Link>
        <ul key={1} className="navbar-nav bg-dark">
          <li className="nav-item">
            <span
              className="nav-link"
              onClick={() => {
                localStorage.removeItem("user");
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
      <ul key={1} className="navbar-nav mr-auto">
        <li className="text-white nav-item" style={{ cursor: "pointer" }}>
          <Link key={3} className="nav-link" to={"/"}>
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
          {navbarDetails(props.userData) as ReactNode}
        </ul>
      </div>
    </nav>
  );
}
