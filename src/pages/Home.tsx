import { user } from "../compontents/Dashboard";
import "../sytles/home.css";
import { useState, useEffect } from "react";
export default function Home(props: { userData: user }) {
  const [currentUser, setCurrentUser] = useState<user>({
    username: "",
    location: "",
    status: "",
    roles: [],
    userid: "",
  });
  useEffect(() => {
    setCurrentUser(props.userData);
  }, [currentUser,props.userData]);

  return <>Welcome {currentUser?.username}</>;
}
