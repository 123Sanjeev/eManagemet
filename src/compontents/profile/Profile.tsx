import { user } from "../Dashboard";
export default function Profile(props: { user: user }) {
  return <div className="container">{JSON.stringify(props.user)}</div>;
}
