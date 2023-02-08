import { user } from "../compontents/Dashboard";
import "../sytles/home.css";
import { useState, useEffect } from "react";
export default function Home(props: { userData: user, title:string }) {
  const [currentUser, setCurrentUser] = useState<user>({
    username: "",
    location: "",
    status: "",
    roles: [],
    userid: "",
  });
  useEffect(() => {
    document.title = props.title
    setCurrentUser(props.userData);
  }, [currentUser,props.userData, props.title]);

  return <>Welcome {currentUser?.username}</>;
}
