import React from "react";
import './singlePlace.css'

const SinglePlace = (props) => {
//   console.log(props);
  const {place} = props
  return (
    <div className="col-lg-7 col-md-8 mx-auto my-5 rounded-sm mainCard p-3">
      <div>
        <div className="h-[240px]">
          <img src={place.photo} className="h-full w-full object-cover" alt="tour_image" />
        </div>
        <div className="text-center">
            <div className="my-5 space-y-3">
                <div className="text-4xl">
                    {place.title}
                </div>
                <div className="text-2xl">
                    {place.address}
                </div>
                <div className="text-xl">
                    {place.description}
                </div>
            </div>
            <hr />
            <div className="my-3 space-x-3">
                <button onClick={() => props.show()} className="btn btn-dark">
                    View on map 
                </button>
                <button className="btn btn-dark">
                    Edit 
                </button>
                <button className="btn btn-dark">
                    Delete
                </button>
            </div>
            <div>

            </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePlace;
