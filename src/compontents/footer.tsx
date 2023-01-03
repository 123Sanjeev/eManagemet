import "../sytles/dashboard.css";
import Clock from "./react.learning.clock/Clock";

export default function Footer(){

return (
    <div className="footer">
        <h1> Footer </h1>
        <Clock date={new Date()} />
    </div>
)

}