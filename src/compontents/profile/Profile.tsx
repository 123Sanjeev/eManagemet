import React from 'react'
import { useLocation } from 'react-router-dom';
export default function Profile(props:any) {
    const location = useLocation()
    const userData = location.state
  return (
    <div>{
            JSON.stringify(userData).toString()
        }</div>
  )
}
