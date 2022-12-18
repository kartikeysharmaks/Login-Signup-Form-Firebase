import React from "react";

const PopupModal = ({ open, name }) => {
  if (!open) return null;
  return (
    <div className="overlay">
      <div className="modalContainer cursor-pointer">
        <div className="modalRight">
          <p className="closeBtn">X</p>
          <div className="content ">
            <p className="text-2xl sm:text-3xl font-semibold p-1">Hey {name}</p>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-purple-500 p-2">
              Congratulations!
            </h1>
            <p className="text-xl p-2">
              You have successfully submitted the form.
            </p>
            <img
              src={require("../assets/Thankyou.png")}
              alt="thank-you-img"
              className="h-[150px] animate-pulse"
            />
            <p className="text-lg p-1">
              Wait, you are being redirected to the profile page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
