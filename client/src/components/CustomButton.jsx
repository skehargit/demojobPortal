import React from "react";

function CustomButton({ title, containerStyles, iconRight, type, onClick }) {
  return (
    <button
      // onClick={onClick}
      type={type || "button"}
      className={`py-2 px-4 flex items-center justify-center text-black rounded-[10px] ${containerStyles}`}
    > 
      {title}
    </button>
  );
}

export default CustomButton;
``