import React from "react";

const Footer = () => {
  return (
    <div className="bg-slate-800 text-white flex flex-col justify-center items-center w-full fixed bottom-0 h-20">
      <div className="logo font-bold text-white text-2xl ">
        <span className="text-green-500"> &lt;</span>

        <span>Pass</span>
        <span className="text-green-500">OP/&gt;</span>
      </div>
      <div>
        Created with <i className="fa-solid fa-heart" style={{color:"#d7472d"}} ></i> by Abhisek
      </div>
    </div>
  );
};

export default Footer;
