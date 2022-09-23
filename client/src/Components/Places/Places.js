import React, { useState, useEffect } from "react";
import { useMainCtx } from "../../Context/MainCtx";
import Map from "../UI/Map/Map";
import Modal from "../UI/Modal/Modal";
import PlaceList from "./PlaceList/PlaceList";
import Loader from "../UI/Loader/Loader";
import { Navigate } from "react-router-dom";

const Places = () => {
  const [modal, setModal] = useState(false);

  const { getAllPlaces, places, loading, isAuth } = useMainCtx();


  useEffect(() => {
    getAllPlaces();
  }, []);

  if (isAuth === false) {
    return <Navigate to="/login" replace />;
  }

  if (loading === true) {
    return <Loader />;
  }

  if (loading === false && places.length === 0) {
    return (
      <div className="container">
        <div className="row  mt-5">
          <h3 className="text-4xl mx-auto">No Places To Show</h3>;
        </div>
      </div>
    );
  }

  const show = () => {
    setModal(true);
  };
  const close = () => {
    setModal(false);
  };

  return (
    <>
      {modal === true && (
        <Modal close={close}>
          <Map />
        </Modal>
      )}
      <PlaceList show={show} places={places} />
    </>
  );
};

export default Places;
