import { useEffect } from "react";

export default function WorkFlow(props:{app : string}){

    useEffect(()=>{
        console.log(props.app)
    })

}