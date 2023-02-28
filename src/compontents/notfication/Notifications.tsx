import Draggable from "react-draggable";
import "./notification.css";
type NotificationsType = {
  type: string;
  message: string;
  state: Function;
};

export default function Notifications(props: NotificationsType) {
  return (
    <Draggable>
      <div className="rounded border notification">
        <div>{props.message}</div>
        <div>
          <button
            className="btn btn-danger"
            onClick={() => {
              props.state(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </Draggable>
  );
}
