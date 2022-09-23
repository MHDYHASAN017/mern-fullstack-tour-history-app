import React, { useState } from "react";
import Heading from "../../UI/Heading/Heading";
import Layout from "../../UI/Layout/Layout";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useMainCtx } from "../../../Context/MainCtx";
import { useNavigate } from "react-router-dom";

const AddPlace = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [photo, setPhoto] = useState("");
  const navigate = useNavigate()
  const {addPlace} = useMainCtx()

  const fileUploadHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("photo", file);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/uploads", formData, { config });

      setPhoto(data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleSubmitForm = async (data) => {
    data.photo = photo 
    // console.log(data);
    addPlace(data , navigate)
    reset();
  };

  return (
    <Layout>
      <div className="col-md-5 col-lg-7 mx-auto my-5">
        <Heading heading="Add Your Place" />
        <div className="mt-3">
          <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-3">
            <div className="form-group">
              <h4>
                {errors.title && <span>please enter your place title</span>}
              </h4>
              <input
                type="text"
                className="form-control"
                placeholder="enter title"
                {...register("title", {
                  required: true,
                })}
              />
            </div>
            <div className="form-group">
              <h4>
                {errors.photo && <span>please enter your place photo</span>}
              </h4>
              <input
                type="file"
                className="form-control"
                placeholder="upload your photo"
                {...register("photo", {
                  required: true,
                })}
                onChange={fileUploadHandler}
              />
            </div>
            <div className="form-group">
              <h4>
                {errors.description && (
                  <span>please enter place description</span>
                )}
              </h4>
              <textarea
                type="text"
                className="form-control"
                placeholder="enter description"
                {...register("description", {
                  required: true,
                })}
              />
            </div>
            <div className="form-group">
              <h4>{errors.address && <span>Please Enter Address</span>}</h4>
              <input
                className="form-control"
                type="text"
                placeholder="Enter Address"
                {...register("address", {
                  required: true,
                })}
              />
            </div>
            <button className="btn btn-dark mt-3 col-12">Add Place</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddPlace;
