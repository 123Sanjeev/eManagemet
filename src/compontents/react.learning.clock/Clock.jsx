import React from "react";


export default class Clock extends React.Component{
    constructor(props){
        
        super(props)
        this.date = props.date;
        this.state = {
          date : new Date()
        };
    }


    componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          1000
        );
      }
    
      componentWillUnmount() {
        clearInterval(this.timerID);
      }
    
      tick() {
        this.setState({
          date: new Date()
        });
      }
    render(){
        return (
          <div>
            <div style={{color:this.state.nColor}}>
                {this.state.date.toLocaleTimeString()}
            </div>
          </div>
        );
    }
}