import { useNavigate } from "react-router";
import "../../sytles/global.css";

export default function PopUpComponent(props: {
  message: string;
  redirectComponent: string;
}) {
  const redirect = useNavigate();
  return (
    <div className="popupcontainer">
      {" "}
      <div className="popup">
        {" "}
        {popUp(props.message)}{" "}
        <button
          onClick={() => {
            redirect(props.redirectComponent);
          }}
          className="btn btn-danger"
        >
          Close
        </button>
      </div>{" "}
    </div>
  );

  function popUp(message: string) {
    return <div id="popup">{message}</div>;
  }
}
