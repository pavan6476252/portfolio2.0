import React from "react";
import { FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

function FooterSection() {
  const socialLinks = [
    { href: "https://www.linkedin.com/in/meesala-pavan-kumar/", icon: FaLinkedin },
    { href: "https://instagram.com/pavan_kumar_bluetick", icon: FaInstagram },
    { href: "https://www.youtube.com/@PavanKumar_Meesala", icon: FaYoutube },
    { href: "https://x.com/pavan_kumar_TG", icon: FaTwitter },
  ];

  return (
    <div className="container mx-auto text-white">
      <hr className="h-0.5 border-slate-600" />
      <div className="flex justify-between items-center py-4">
        <span>Made with ❤️ by Pavan Kumar Meesala</span>
        <div className="flex gap-4 text-2xl">
          {socialLinks.map(({ href, icon: Icon }, index) => (
            <Link
              key={index}
              to={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Link to ${href}`}
            >
              <Icon />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FooterSection;
