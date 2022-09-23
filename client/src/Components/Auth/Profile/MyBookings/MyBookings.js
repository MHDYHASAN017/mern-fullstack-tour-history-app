import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { bookedRoomByUser, cancleBooking } from "../../../../redux/actions/bookingAction";
import Loader from "../../../Ui/Loader/Loader";
import "./myBookings.css";

const MyBookings = () => {
  const dispatch = useDispatch();
  const userRed = useSelector((state) => state.userReducer);
  const bookRed = useSelector((state) => state.bookingReducer);
  const { loading, user, isAuth } = userRed;
  const { bookedRooms } = bookRed;
  const navigate = useNavigate()

  console.log(user);
  console.log(bookedRooms);

  useEffect(() => {
    if (user !== null) {
      dispatch(bookedRoomByUser(user._id , navigate));
    }
    console.log("runn");
  }, [user]);


  // const roomBookUserHandler = (id) => {}

  const cancleBookingHandler = (id) => {
    dispatch(cancleBooking(id))
  }

  if (isAuth === false) {
    return <Navigate to="/login" replace />;
  }
  
  if (loading === true && bookedRooms.length === 0) {
    return <Loader/>
  }
  if(loading === false && bookedRooms.length === 0){
    return <div>no booking to show</div>
  }
  

  return (
    <div>
      <div className="container">
        <div className="row">
          {bookedRooms.map((room) => (
            <div key={room._id} className="col-md-6 col-lg-3 mt-3">
              <div className="card p-2 space-y-3">
                <div>{room.room}</div>
                <div>from date : {room.fromdate}</div>
                <div>to date : {room.todate}</div>
                <div>{room.status}</div>
                <div>
                  <button onClick={() => cancleBookingHandler(room._id)} className="btn btn-dark">cancle booking</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
