import { useEffect , useState } from "react";
import { user } from "../compontents/Dashboard";
import "../sytles/WF/routeWF.css";
import RouteWFDB from "../api/routeWFDB";

export default function RouteWF(props: { app: string; to: string , setRouteWf:Function, user : user, currentRole:string, ownerid: string, setWFState : Function}) {
    const [sendTo, setSendTo]  = useState<string>("");
    const [memo, setMemo] = useState<string>("");
  useEffect(() => {
    console.log(props.app);
  });
  return (
    <div className="wrapper">
      <div className="routeWF p-4">
        <h4>
            Route Workflow
        </h4>
        <div className="form-group m-2">
          <input
            type="radio"
            name="to"
            id="sendTo"
            className="form-check-input m-2"
            data-sendto={props.to}
            onChange={(e)=>{
                setSendTo(e.currentTarget.dataset.sendto as string)
            }}
          />
          <label htmlFor="to">Send To {props.to}</label>
        </div>
        <div className="form-group m-2">
          <label htmlFor="Memo">Memo</label>
          <textarea
            name="Memo"
            id="Memo"
            className="form-control m-2"
            onChange={(e)=>{
                setMemo(e.currentTarget.value)
            }}
            rows={5}
          ></textarea>
        </div>
        <div className="form-group m-2">
            <button type="button" className="btn btn-primary m-2" onClick={()=>{
                handleRouteWF()
            }} >Route</button>
            <button type="button" className="btn btn-danger" onClick={()=>{
                handleCancel()
            }} >Cancel</button>
        </div>
      </div>
    </div>
  );
  async function handleRouteWF(){
    const {app, currentRole,user,ownerid} = props;
    const routeWFData = {
        app,
        routedby: user.userid,
        role:sendTo,
        memo,
        routedTo : sendTo,
        ownerid
    }
    const responseData = await RouteWFDB.routeWF(routeWFData)
    props.setWFState(responseData)
    handleCancel()
  }
  function handleCancel(){
    props.setRouteWf(false)
  }
}
