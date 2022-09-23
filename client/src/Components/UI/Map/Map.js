import React from "react";
import "./map.css";

const Map = () => {
  return (
    <div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d44508561.92830257!2d65.51602944798749!3d15.653813775147148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1663071093839!5m2!1sen!2sbd"
        width="100%"
        height="380"
        loading="lazy"
        title="google_map"
      ></iframe>
    </div>
  );
};

export default Map;
