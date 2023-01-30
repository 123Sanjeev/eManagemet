import { useNavigate } from "react-router-dom";
import "../../sytles/global.css";

export default function PopUpComponent(props: {
  message: string;
  redirectComponent: any;
  setState: any;
  state?: object;
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
            if (props.redirectComponent) {
              if (props.state) {
                redirect(props.redirectComponent, { state: props.state });
              } else {
                redirect(props.redirectComponent);
              }
            }
            if (props.setState) {
              props.setState(false);
            }
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
