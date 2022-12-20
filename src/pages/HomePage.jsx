import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, logout, app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PopupModal from "./PopupModal.jsx";

const initialState = {
  firstName: "",
  lastName: "",
  address: "",
  age: "",
  profession: "",
};

const HomePage = () => {
  const [user, loading, error] = useAuthState(auth);
  const [progress, setProgress] = useState(false);
  const [data, setData] = useState(initialState);
  const [isSubmit, setIsSubmit] = useState(false);
  const [file, setFile] = useState(null);
  const { firstName, lastName, address, age, profession } = data;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (firstName === "") {
      toast.error("First Name is required!");
    } else if (lastName === "") {
      toast.error("Last Name is required!");
    } else if (address === "") {
      toast.error("Enter your Address!");
    } else if (profession === "") {
      toast.error("Enter your Profession!");
    } else if (age === "") {
      toast.error("Age is required!");
    } else {
      setIsSubmit(true);
      await addDoc(collection(db, "users"), {
        ...data,
        email: user.email,
        uid: user.uid,
        timestamp: serverTimestamp(),
      });
      setTimeout(() => {
        navigate("/profile");
      }, 5000);
    }
  };

  useEffect(() => {
    const uploadFile = () => {
      const storage = getStorage(app);
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          if (progress === 1) {
            toast.success(`Uploading image`);
          }
          if (progress === 100) {
            toast.success("Profile picture uploaded successfully");
          }
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              toast.error("Upload is paused");
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          alert(error.message);
          toast.error(`${error.message}`);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
    if (loading) {
      return;
    }
    if (!user) {
      return navigate("/login");
    }
  }, [user, loading, navigate, file]);

  return (
    <div className="-z-10">
      {error && <div> {error}</div>}
      <div className=" flex items-center justify-between py-4">
        <Link to={"/profile"}>
          <button className="bg-purple-700 text-white text-xs sm:text-base px-5 py-2 rounded-full">
            Profile
          </button>
        </Link>{" "}
        <button
          onClick={logout}
          className="bg-purple-700 text-white text-xs sm:text-base rounded-full py-2 px-5"
        >
          Logout
        </button>
      </div>
      <div className="border-[1px] border-gray-300" />
      <h1 className="text-purple-700 p-3 mt-3 text-center text-base xs:text-xl font-black">
        Hello {user && user.email}{" "}
      </h1>
      <h2 className="mt-1 text-2xl text-center">User Details Form </h2>
      <p className="mb-2 text-center text-gray-500">
        Fill all the details to create your profile
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center"
      >
        <label className="relative">
          <input
            type="text"
            name="firstName"
            value={firstName}
            id=""
            onChange={handleChange}
            className="my-2 mx-1 w-[270px] h-[30] xs:w-[360px] xs:h-[40px] md:w-[450px] md:h-[50px] px-6 py-3 rounded-full outline-none border-[1px] border-gray-400 focus:border-purple-500 transition duration-200"
          />
          <span className=" absolute w-[100px] top-5 text-gray-500 left-0 mx-6 px-2 transition duration-300 input-text">
            {firstName ? "" : "First name"}
          </span>
        </label>
        <label className="relative">
          <input
            type="text"
            name="lastName"
            value={lastName}
            id=""
            onChange={handleChange}
            className="my-2 mx-1 w-[270px] h-[30] xs:w-[360px] xs:h-[40px] md:w-[450px] md:h-[50px] px-6 py-3 rounded-full outline-none border-[1px] border-gray-400 focus:border-purple-500 transition duration-200"
          />
          <span className="absolute w-[100px] top-5 text-gray-500 left-0 mx-6 px-2 transition duration-300 input-text">
            {lastName ? "" : "Last name"}
          </span>
        </label>
        <label className="relative">
          <input
            type="text"
            name="address"
            value={address}
            id=""
            onChange={handleChange}
            className="my-2 mx-1 w-[270px] h-[30] xs:w-[360px] xs:h-[40px] md:w-[450px] md:h-[50px] px-6 py-3 rounded-full outline-none border-[1px] border-gray-400 focus:border-purple-500 transition duration-200"
          />
          <span className="absolute w-[90px] top-5 text-gray-500 left-0 mx-6 px-2 transition duration-300 input-text">
            {address ? "" : "Address"}
          </span>
        </label>
        <label className="relative">
          <input
            type="text"
            name="profession"
            value={profession}
            id=""
            onChange={handleChange}
            className="my-2 mx-1 w-[270px] h-[30] xs:w-[360px] xs:h-[40px] md:w-[450px] md:h-[50px] px-6 py-3 rounded-full outline-none border-[1px] border-gray-400 focus:border-purple-500 transition duration-200"
          />
          <span className="absolute w-[110px] top-5 text-gray-500 left-0 mx-6 px-2 transition duration-300 input-text">
            {profession ? "" : "Profession"}
          </span>
        </label>
        <label className="relative">
          <input
            type="text"
            name="age"
            value={age}
            id=""
            onChange={handleChange}
            className="my-2 mx-1 w-[270px] h-[30] xs:w-[360px] xs:h-[40px] md:w-[450px] md:h-[50px] px-6 py-3 rounded-full outline-none border-[1px] border-gray-400 focus:border-purple-500 transition duration-200"
          />
          <span className="absolute w-[60px] top-5 text-gray-500 left-0 mx-6 px-2 transition duration-300 input-text">
            {age ? "" : "Age"}
          </span>
        </label>

        <div className="flex flex-col items-center justify-center gap-3 my-5 ">
          <p className="font-medium">Choose your profile picture :</p>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="ml-[80px]"
          />
        </div>
        <button
          type="submit"
          disabled={progress !== null && progress < 100}
          className={`${
            progress !== null && progress < 100
              ? "bg-gray-300"
              : "bg-violet-700  hover:bg-violet-800"
          } text-white text-base w-[270px] h-[30] xs:w-[360px] xs:h-[40px] md:w-[450px] md:h-[50px] p-2 md:p-0 rounded-full transition my-3`}
        >
          {progress > 1 && progress < 100 ? "Uploading" : "Submit"}
        </button>
        <ToastContainer />
      </form>
      <PopupModal open={isSubmit} name={firstName} className="z-50" />
    </div>
  );
};

export default HomePage;
