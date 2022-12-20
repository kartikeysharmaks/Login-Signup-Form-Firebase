import React, { useEffect, useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signInWithGoogle, signInWithGithub } from "../firebase.js";
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
      <div className="flex items-center justify-between text-purple-500 font-bold mt-5 p-1">
        <Link to={"/login"}>
          <div className="cursor-pointer flex items-center text-xs">
            <MdArrowBackIos />
            Back to login
          </div>
        </Link>

        <div className="cursor-pointer text-xs">Need any help?</div>
      </div>
      <h1 className="text-2xl text-gray-800 font-medium text-center mt-5 p-2">
        Registration
      </h1>
      <p className="text-gray-500 leading-5 mb-2 text-center">
        fill the details to register
      </p>
      {error && <div className="my-4 text-center"> {error.message} </div>}
      <form
        onSubmit={handlesubmit}
        className="flex flex-col justify-center items-center"
      >
        <label className="relative">
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="my-2 mx-1 w-[270px] h-[30] xs:w-[360px] xs:h-[40px] md:w-[450px] md:h-[50px] px-6 py-3 rounded-full outline-none border-[1px] border-gray-400 focus:border-purple-500 transition duration-200"
          />
          <span className="absolute top-5 text-gray-500 left-0 mx-6 px-2 transition duration-300 input-text">
            {fullName ? "" : "Full Name"}
          </span>
        </label>
        <label className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="my-2 mx-1 w-[270px] h-[30] xs:w-[360px] xs:h-[40px] md:w-[450px] md:h-[50px] px-6 py-3 rounded-full outline-none border-[1px] border-gray-400 focus:border-purple-500 transition duration-200"
          />
          <span className=" absolute top-5 text-gray-500 left-0 mx-6 px-2 transition duration-300 input-text">
            {email ? "" : "Email"}
          </span>
        </label>
        <label className="relative">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="my-2 mx-1 w-[270px] h-[30] xs:w-[360px] xs:h-[40px] md:w-[450px] md:h-[50px] px-6 py-3 rounded-full outline-none border-[1px] border-gray-400 focus:border-purple-500 transition duration-200"
          />
          <span className="absolute w-[80px] top-5 text-gray-500 left-0 mx-6 px-2 transition duration-300 input-text">
            {password ? "" : "Password"}
          </span>
        </label>
        <div className="flex items-center my-2 py-1 justify-center w-[270px] h-[30] xs:w-[360px] xs:h-[40px] md:w-[450px] md:h-[50px]">
          <input
            id="link-checkbox"
            type="checkbox"
            value=""
            className="w-5 h-5 rounded-full text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="link-checkbox"
            className="ml-4 text-base font-medium text-gray-900"
          >
            I agree with the{" "}
            <span className="text-purple-600 dark:text-purple-600 hover:underline">
              terms & conditions{" "}
            </span>
            and{" "}
            <span className="text-purple-600 dark:text-purple-600 hover:underline">
              privacy-policy
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="w-[270px] h-[30] xs:w-[360px] xs:h-[40px] md:w-[450px] md:h-[50px] bg-purple-500 hover:bg-purple-700 p-2 md:p-0 text-white text-base rounded-full mt-5 md:mt-4"
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
          className="w-[270px] h-[30] xs:w-[360px] xs:h-[40px] md:w-[450px] md:h-[50px] p-2 md:p-0 bg-white border-gray-200 border-[2px] text-base font-medium rounded-full mt-5 md:mt-4 flex items-center justify-center"
          onClick={() => signInWithGoogle()}
        >
          <img
            src={require("../assets/Google.png")}
            alt="google"
            className="h-[25px] md:h-[28px] mr-[6px]"
          />
          With Google
        </button>
        <button
          type="submit"
          className="w-[270px] h-[30] xs:w-[360px] xs:h-[40px] md:w-[450px] md:h-[50px] p-2 md:p-0 bg-gray-100 border-[2px] text-base font-medium rounded-full my-5 md:mt-4 flex items-center justify-center"
          onClick={() => signInWithGithub()}
        >
          <img
            src={require("../assets/Github.png")}
            alt="facebook"
            className="h-[30px] sm:h-[36px] mr-[2px]"
          />
          With Github
        </button>
        <div className="text-gray-600 mt-2 mb-5">
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
