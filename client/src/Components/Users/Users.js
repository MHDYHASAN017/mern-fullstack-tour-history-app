import React, { useEffect } from "react";
import { useMainCtx } from "../../Context/MainCtx";
import UsersList from "./UsersList/UsersList";
import Loader from '../UI/Loader/Loader'

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Max Schwarz",
      image:
        "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      places: 3,
    },
  ];

  const { getAllUsers , loading , users} = useMainCtx();

  useEffect(() => {
    getAllUsers();
  }, []);

  if(loading === true){
    return <Loader/>
  }

  return <UsersList users={users} />;
};

export default Users;
