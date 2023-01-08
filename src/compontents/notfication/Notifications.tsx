import './notification.css'
type NotificationsType = {
    "type" : string,
    "message" : string
}

export default function Notifications(props:NotificationsType) {
  return (
   
    <div className="container w-25 position-absolute rounded border notification text-white" style={
        (props.type === "error") ? {
            backgroundColor : "red"
        } :  (props.type === "message") ?{backgroundColor : "green"} : {
            backgroundColor : "black"
        } 
    }>
        {props.message}
    </div>

  )
}
