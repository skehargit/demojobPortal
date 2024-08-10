import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { footerLinks } from "../utils/data";
import { Link } from "react-router-dom";
import TextInput from "./TextInput.jsx";
import CustomButton from "./CustomButton";

const Footer = () => {
  return (
    <footer className="text-white mp-20 overflow-x-hidden">
      <div className="overflow-x-hidden -mb-0.5"></div>

      <div className="bg-zinc-800">
        <div className="container px-5 py-20 mx-auto">
          <div className="w-full flex flex-wrap gap-10 justify-between -mb-10 -px-4">
            {footerLinks.map(({ id, title, links }) => (
              <div className="w-auto px-4" key={id + title}>
                <h2 className="font-bold text-[#1176DB] text-mb-3 uppercase">
                  {title}
                </h2>

                <div className="mb-10 flex flex-col gap-2">
                  {links.map((link, index) => (
                    <a
                      key={link + index}
                      href="/"
                      className="text-gray-300 text-sm hover:text-white"
                    >
                      {link}
                    </a>
                  ))}
                </div>
                <Link to="/privacy-policy">Privacy & Policy</Link>
              </div>
            ))}
          </div>
        </div>

        {/* <div>
          <span className="inline-flex lg:ml-auto lg:mt-0 mt-6 w-full justify-center md:justify-center md:w-auto container mx-auto px-5 pt-6 pb-8 flex-wrap items-center">
            <a className="text-white text-xl hover:scale-125 ease-in-out duration-300">
              <FaFacebookF />
            </a>
            <a className="ml-3 text-white text-xl hover:scale-125 ease-in-out duration-300">
              <FaTwitter />
            </a>
            <a className="ml-3 text-white text-xl hover:scale-125 ease-in-out duration-300">
              <FiInstagram />
            </a>
            <a className="ml-3 text-white text-xl hover:scale-125 ease-in-out duration-300">
              <FaLinkedinIn />
            </a>
          </span>
        </div> */}

        <div className="bg-[#424242]">
          <div className=" py-4 px-5 flex  ">
            <div className="text-gray-300 text-sm flex flex-col ">
              <span>&copy; 2024 HighImpactTalentenquiry</span>
              <a
                href=""
                className="text-[#1176DB] ml-1 font-semibold"
                target="_blank"
                rel="noopener noreferrer"
              >
                highimpacttalentenquiry@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
