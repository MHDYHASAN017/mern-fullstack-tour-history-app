import React from "react";
import { useEffect } from "react";
import { useMainCtx } from "../../../Context/MainCtx";
import SingleUser from "../SingleUser/SingleUser";

const UsersList = (props) => {
  // console.log(props.users);




  return (
    <div className="container">
        <div className="row">
            {props.users.map(user => (
                <SingleUser key={user._id} user ={user} /> 
            ))}
        </div>
    </div>
  );
};

export default UsersList;
