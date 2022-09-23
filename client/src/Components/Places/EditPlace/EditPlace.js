import React from "react";
import Heading from "../../UI/Heading/Heading";
import Layout from "../../UI/Layout/Layout";
import { useForm } from "react-hook-form";

const EditPlace = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleSubmitForm = async (data) => {
    console.log();

    reset();
  };

  return (
    <Layout>
      <div className="col-md-5 col-lg-7 mx-auto my-5">
        <Heading heading="Edit Your Place" />
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
            <button className="btn btn-dark mt-3 col-12">Save Changes</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditPlace;
