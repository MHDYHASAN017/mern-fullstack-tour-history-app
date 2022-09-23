import React from "react";
import Card from "../../UI/Card/Card";

const SingleUser = ({ user }) => {
  console.log(user);
  return (
    <div className="col-md-8 col-lg-7 mx-auto">
      <Card>
        <div className="flex space-x-3">
          <div className="w-28 h-28">
            <img
              src={user.photo}
              className="h-full w-full object-cover rounded-lg"
              alt="avatar"
            />
          </div>
          <div className="flex flex-col justify-between bg-slate-900 text-slate-200 p-3 rounded-md w-full">
            <div className="text-5xl">{user.username}</div>
            <div className="text-xl">Places : {user.places.length}</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SingleUser;
