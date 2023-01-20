import { useState } from "react";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import db from "../../api/dbqueries";
import uuid from "react-native-uuid";
import Notifications from "../notfication/Notifications";
import { useNavigate } from "react-router-dom";
type messageType = {
  type: string;
  message: string;
};

export default function Login(props: {
  setLoginStatus: any;
  setUserData: any;
}) {
  const navigate = useNavigate();
  const [justifyActive, setJustifyActive] = useState("tab1");
  const [username, setUsername] = useState(0);
  const [password, setPassword] = useState("");
  const [registerNewUserId, setRegisterNewUserId] = useState(0);
  const [location, setLocation] = useState("");
  const [errorCode, setErrorCode] = useState<messageType>({
    type: "",
    message: "",
  });
  const handleJustifyClick = async (value: string) => {
    if (value === justifyActive) {
      return;
    }
    const registerId = await db.registerInit();
    setRegisterNewUserId(parseInt(registerId));
    setJustifyActive(value);
  };

  return (
    <div className="container w-75">
      {errorCode.type !== "" ? (
        <Notifications type={errorCode.type} message={errorCode.message} />
      ) : (
        ""
      )}
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <MDBTabs
          pills
          justify
          className="mb-3 d-flex flex-row justify-content-between"
        >
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleJustifyClick("tab1")}
              active={justifyActive === "tab1"}
            >
              Login
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <div id="Register">
              <MDBTabsLink
                onClick={() => handleJustifyClick("tab2")}
                active={justifyActive === "tab2"}
              >
                Register
              </MDBTabsLink>
            </div>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>
          <MDBTabsPane show={justifyActive === "tab1"}>
            <MDBInput
              wrapperClass="mb-4"
              label="User Name"
              id="form1"
              type="text"
              onChange={(e: any) => {
                setUsername(e.target.value);
              }}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="form2"
              type="password"
              onChange={(e: any) => {
                setPassword(e.target.value);
              }}
            />

            <div className="d-flex justify-content-between mx-4 mb-4">
              <MDBCheckbox
                name="flexCheck"
                value=""
                id="flexCheckDefault"
                label="Remember me"
              />
              <a href="!#">Forgot password?</a>
            </div>

            <MDBBtn
              className="mb-4 w-100"
              onClick={() => {
                handleRegisterLogin(justifyActive);
              }}
            >
              Sign in
            </MDBBtn>
            <p className="text-center">
              Not a member?{" "}
              <button
                className="btn bg-none mb-2 "
                onClick={() => handleJustifyClick("tab2")}
              >
                Register
              </button>
            </p>
          </MDBTabsPane>

          <MDBTabsPane show={justifyActive === "tab2"}>
            <MDBInput
              wrapperClass="mb-4"
              label="User Id"
              id="form1"
              type="text"
              readonly
              value={registerNewUserId}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Username"
              id="form1"
              type="text"
              onChange={(e: any) => {
                setUsername(e.target.value);
              }}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="form1"
              type="password"
              onChange={(e: any) => {
                setPassword(e.target.value);
              }}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Location"
              id="form1"
              type="text"
              onChange={(e: any) => {
                setLocation(e.target.value);
              }}
            />

            <div className="d-flex justify-content-center mb-4">
              <MDBCheckbox
                name="flexCheck"
                id="flexCheckDefault"
                label="I have read and agree to the terms"
              />
            </div>

            <MDBBtn
              className="mb-4 w-100"
              onClick={() => handleRegisterLogin(justifyActive)}
            >
              Sign up
            </MDBBtn>
          </MDBTabsPane>
        </MDBTabsContent>
      </MDBContainer>
    </div>
  );
  async function handleRegisterLogin(option: string) {
    console.log(option);
    if (option === "tab1") {
      const data = {
        userId: username,
        password: password,
        loginkey: uuid.v1() as string,
      };

      const response = await db.login(
        data as { userId: number; password: string; loginkey: string }
      );

      console.log(response);
      debugger;
      if (response?.type === "error") {
        debugger;
        setErrorCode({
          type: response?.type,
          message: response?.message,
        });
      } else {
        sessionStorage.setItem("userid", data.userId.toString());
        sessionStorage.setItem("sessionkey", response.loginkey);
        props.setLoginStatus(true);
        props.setUserData(response);
        navigate("/viewblueprint");
      }
    } else {
      const registerForm = {
        userId: registerNewUserId as number,
        username: username.toString(),
        password: password,
        location: location,
      };
      console.log(registerForm);
      const user = await db.register(registerForm);
      console.log(user);
    }

    //  window.location.reload();
  }
}
