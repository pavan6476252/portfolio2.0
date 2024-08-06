import React from "react";
import { FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

function FooterSection() {
  return (
    <div className=" container mx-auto text-white">
      <hr  className="h-0.5 border-slate-600"/>
      <div className=" flex justify-between items-center py-4">
        <span>Pavan Kumar Meesala </span>
        <div className="flex gap-4 text-2xl">
          <FaLinkedin />
          <FaInstagram />
          <FaYoutube />
          <FaTwitter />
        </div>
      </div>
    </div>
  );
}

export default FooterSection;
