import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
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
    } else if (profession === "") {
      toast.error("Enter your profession!");
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
      setTimeout(()=> {
        navigate("/profile");
      },5000);
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
          if(progress === 1){
            toast.success(`Uploading image`);
          };
          if(progress === 100){
            toast.success("Uploaded successfully");
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
          toast.error(`${error.message}`)
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
      {error && <div> {error} </div>}
      <div className=" flex items-center justify-evenly pt-10 md:p-10">
        <button
          className="bg-purple-700 text-white text-xs sm:text-base px-5 py-2 rounded-full"
          onClick={() => navigate("/profile")}
        >
          Profile
        </button>
        <div className="text-white bg-gray-600 text-xs sm:text-base py-2 px-5 rounded-full">
          Hello {user && user.email}{" "}
        </div>{" "}
        <div
          onClick={logout}
          className="bg-purple-700 text-white  text-xs sm:text-base rounded-full py-2 px-5"
        >
          Logout
        </div>
      </div>
      <h1 className="mt-6 p-2 text-4xl ">User Details Form </h1>
      <p className="pb-2">Fill all the details to create your profile</p>
      <form onSubmit={handleSubmit}>
        <label className="relative">
          <input
            type="text"
            name="firstName"
            value={firstName}
            id=""
            onChange={handleChange}
            className="my-2 mx-1 w-[300px] h-[50] sm:w-[248px] sm:h-[60px] md:w-[500px] md:h-[60px] px-6 py-3 rounded-full outline-none border-[1px] border-gray-400 focus:border-purple-500 transition duration-200"
          />
          <span className=" absolute w-[100px] -top-[2px] text-gray-500 left-0 mx-4 pr-2 transition duration-300 input-text">
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
            className="my-2 mx-1 w-[300px] h-[50] sm:w-[248px] sm:h-[60px] md:w-[500px] md:h-[60px] px-6 py-3 rounded-full outline-none border-[1px] border-gray-400 focus:border-purple-500 transition duration-200"
          />
          <span className="absolute w-[100px] -top-[2px] text-gray-500 left-0 mx-4 pr-2 transition duration-300 input-text">
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
            className="my-2 mx-1 w-[300px] h-[50] sm:w-[248px] sm:h-[60px] md:w-[500px] md:h-[60px] px-6 py-3 rounded-full outline-none border-[1px] border-gray-400 focus:border-purple-500 transition duration-200"
          />
          <span className="absolute w-[90px] -top-[2px] text-gray-500 left-0 mx-4 pr-2 transition duration-300 input-text">
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
            className="my-2 mx-1 w-[300px] h-[50] sm:w-[248px] sm:h-[60px] md:w-[500px] md:h-[60px] px-6 py-3 rounded-full outline-none border-[1px] border-gray-400 focus:border-purple-500 transition duration-200"
          />
          <span className="absolute w-[110px] -top-[2px] text-gray-500 left-0 mx-4 pr-2 transition duration-300 input-text">
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
            className="my-2 mx-1 w-[300px] h-[50] sm:w-[248px] sm:h-[60px] md:w-[500px] md:h-[60px] px-6 py-3 rounded-full outline-none border-[1px] border-gray-400 focus:border-purple-500 transition duration-200"
          />
          <span className="absolute w-[60px] -top-[2px] text-gray-500 left-0 mx-4 pr-2 transition duration-300 input-text">
            {age ? "" : "Age"}
          </span>
        </label>
        <div className="flex flex-col items-center justify-center gap-3 my-5">
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
          } text-white text-base w-[248px] md:w-[500px] h-[60px] rounded-full transition my-5`}
        >
          {progress < 100 ? "Loading" : "Submit"}
        </button>
        <ToastContainer />
      </form>
      <PopupModal open = {isSubmit} name={firstName} className="z-50"/>
    </div>
  );
};

export default HomePage;
