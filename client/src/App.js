import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import AddPlace from "./Components/Places/AddPlace/AddPlace";
import Places from "./Components/Places/Places";
import Users from "./Components/Users/Users";
import Login from "./Components/Auth/Login/Login";
import Register from "./Components/Auth/Register/Register";
import EditPlace from "./Components/Places/EditPlace/EditPlace";
import { useMainCtx } from "./Context/MainCtx";

const App = () => {
  const { message, clearMessage, loadCurrentUser } = useMainCtx();

  // console.log(useMainCtx());

  useEffect(() => {
    if (message !== "") {
      toast.info(message, {
        position: toast.POSITION.TOP_MIDDLE,
        theme: "dark",
      });
    }
    clearMessage();
    if (localStorage.getItem("userInfo")) {
      loadCurrentUser();
    }
    console.log("runn");
  }, [message]);

  return (
    <div className="custom_font">
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/my_places" element={<Places />} />
        <Route path="/add_place" element={<AddPlace />} />
        <Route path="/edit_place" element={<EditPlace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
