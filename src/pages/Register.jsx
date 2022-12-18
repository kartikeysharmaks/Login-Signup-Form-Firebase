import React, { useEffect, useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signInWithGoogle } from "../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    if (fullName === "") {
      toast.error("Full Name is required!");
    } else if (password === "") {
      toast.error("Password is required!");
    } else if (password.length < 8) {
      toast.error("Password must atleast be of 8 characters!");
    } else if (email === "") {
      toast.error("Email-id is required!");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          console.log(userCredentials);
        })
        .catch((err) => {
          if (err.code === "auth/email-already-in-use") {
            toast.error("Email already registered, login to continue");
          } else {
            toast.error("Error occured, please try again");
          }
        });
    }
  };

  useEffect(() => {
    if (loading) return;
    if (user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  return (
    <div className="max-w-[100%] mx-auto">
      <div className="flex items-center justify-between text-purple-500 font-bold mt-10">
        <div className="cursor-pointer flex items-center" onClick={()=> navigate("/login")}>
          <MdArrowBackIos />
          Back to login
        </div>
        <div className="cursor-pointer">Need any help?</div>
      </div>
      <h1 className="text-3xl text-gray-800 font-normal mt-8">Registration</h1>
      <p className="text-gray-500 leading-5 my-2">
        fill the details to register
      </p>
      {error && <div className="my-4 text-center"> {error.message} </div>}
      <form onSubmit={handlesubmit}>
        <label className="relative">
          <input
            type="text"
            value={fullName}
            required
            onChange={(e) => setFullName(e.target.value)}
            className="my-2 mx-1  w-[300px] h-[50] sm:w-[248px] sm:h-[60px] md:w-[500px] md:h-[60px] px-8 py-3 rounded-full outline-none border-[1px] border-gray-400 focus:border-purple-500 transition duration-200"
          />
          <span className="absolute w-[100px] -top-[2px] text-gray-500 left-0 mx-6 pr-2 transition duration-300 input-text">
            {fullName ? "" : "Full name"}
          </span>
        </label>
        <label className="relative">
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="my-2 mx-1 w-[300px] h-[50] sm:w-[248px] sm:h-[60px] md:w-[500px] md:h-[60px] px-6 py-3 rounded-full outline-none border-[1px] border-gray-400 focus:border-purple-500 transition duration-200"
          />
          <span className=" absolute -top-[2px] text-gray-500 left-0 mx-6 px-2 transition duration-300 input-text">
            {email ? "" : "Email"}
          </span>
        </label>
        <label className="relative">
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="my-2 mx-1 w-[300px] h-[50] sm:w-[248px] sm:h-[60px] md:w-[500px] md:h-[60px] px-6 py-3 rounded-full outline-none border-[1px] border-gray-400 focus:border-purple-500 transition duration-200"
          />
          <span className="absolute w-[100px] -top-[2px] text-gray-500 left-0 mx-4 pr-2 transition duration-300 input-text">
            {password ? "" : "Password"}
          </span>
        </label>
        <button
          type="submit"
          className="w-[248px] md:w-[500px] h-[60px] bg-purple-500 hover:bg-purple-700 text-white text-lg md:text-xl  rounded-full mt-5 md:mt-4"
        >
          Submit
        </button>
        <ToastContainer />
      </form>
      <div className="flex items-center justify-center mt-5 text-gray-500">
        <div className="border-[1px] w-[200px] border-gray-300 mr-1" />
        OR
        <div className="border-[1px] w-[200px] border-gray-300 ml-1"></div>
      </div>
      <div className="flex flex-col items-center">
        <button
          type="submit"
          className="w-[248px] md:w-[500px] h-[60px] bg-white border-gray-200 border-[2px] text-lg md:text-xl rounded-full mt-5 md:mt-4 flex items-center justify-center"
          onClick={() => signInWithGoogle()}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/2991/2991148.png"
            alt="google"
            className="h-[21px] md:h-[28px] mr-2"
          />
          With Google
        </button>
        <button
          type="submit"
          className="w-[248px] md:w-[500px] h-[60px] bg-white border-gray-200 border-[2px] text-lg md:text-xl rounded-full my-5 md:mt-4 flex items-center justify-center"
        >
          <img
            src="https://1000logos.net/wp-content/uploads/2016/11/Facebook-logo.png"
            alt="facebook"
            className="h-[30px] sm:h-[36px]"
          />
          With Facebook
        </button>
        <div className="text-gray-600 my-5">
          Already have an account?{" "}
          <Link to={"/login"}>
            <span className="text-purple-500 font-medium">Login</span>
          </Link>{" "}
        </div>
      </div>
    </div>
  );
};

export default Register;
