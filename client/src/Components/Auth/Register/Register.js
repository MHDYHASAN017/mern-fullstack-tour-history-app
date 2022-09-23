import Heading from "../../UI/Heading/Heading";
import "./register.css";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useMainCtx } from "../../../Context/MainCtx";
import { useState } from "react";
import axios from "axios";

const Register = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [photo , setPhoto] = useState("")
  const { registerUser  , isAuth } = useMainCtx();
  const navigate = useNavigate()


  const fileUploadHandler = async (e) => {
    const file = e.target.files[0] 
    const formData = new FormData() 
    formData.append('photo' , file)
    try {
      const config = {
        headers : {
          'Content-Type' : "multipart/form-data"
        }
      }
      const {data} = await axios.post('/api/uploads' , formData ,{config} )
      setPhoto(data) 
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  const handleSubmitForm = async (data) => {
    data.photo = photo
    registerUser(data, navigate);
    reset();
  };

  if(isAuth === true){
    return <Navigate to='/' replace/> 
  }

  return (
    <div className="container">
      <Heading heading="Register" orange form className="mt-5" />
      <div className="row my-3">
        <div className="col-md-6 col-lg-4 mx-auto">
          <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-3">
            <div className="form-group">
              <h4>
                {errors.username && <span>please enter a user name</span>}
              </h4>
              <input
                type="text"
                className="form-control"
                placeholder="enter user name"
                {...register("username", {
                  required: true,
                })}
              />
            </div>
            <div className="form-group">
              <h4>
                {errors.photo && <span>please upload your photo</span>}
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
              <h4>{errors.email && <span>please enter a valid email</span>}</h4>
              <input
                type="email"
                className="form-control"
                placeholder="enter email"
                {...register("email", {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                })}
              />
            </div>
            <div className="form-group">
              <h4>
                {errors.password && (
                  <span>password length more then 5 characture</span>
                )}
              </h4>
              <input
                className="form-control"
                type="text"
                placeholder="enter password"
                {...register("password", {
                  required: true,
                  minLength: 5,
                })}
              />
            </div>
            <button className="btn btn-dark mt-3 col-12">Register</button>
          </form>
          <div className="mt-4">
            <Link to="/login" className="register__redirect">
              login your account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
