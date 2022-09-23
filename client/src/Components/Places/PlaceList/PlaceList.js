import React from "react";
import SinglePlace from "../SinglePlace/SinglePlace";

const PlaceList = (props) => {
  return (
    <div className="container">
      <div className="row">
        {props.places.map((place) => (
          <SinglePlace key={place._id}  place={place} show={props.show}/>
        ))}
      </div>
    </div>
  );
};

export default PlaceList;
