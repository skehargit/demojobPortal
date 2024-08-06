import React, { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BiChevronDown } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose, AiOutlineLogout } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomButton from "./CustomButton";
import { users } from "../utils/data";
import { useSelector, useDispatch } from "react-redux";
import { Logout } from "../redux/userSlice";
import logo from '../assets/logo.jpg'
function MenuList({ user, onClick }) {
  // const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(Logout());
    window.location.replace("/");
  };
  useEffect(()=>{
    console.log(user)
  })
  return (
    <div className="bg-white">
      <Menu as="div" className="inline-block text-left">
        <div className="flex">
          <Menu.Button className="inline-flex gap-2 w-full rounded-md bg-[#f8f8f8] md:px-4 py-2 text-sm font-medium text-slate-700 hover:bg-zinc-200 ">
            <div className="leading[80px] flex flex-col items-start">
              <p className="text-sm font-semibold ">
                {user?.firstName ?? user?.name}
              </p>
              <span className="text-sm text-[#1176DB] ">
                {user?.jobTitle ?? user?.email}
              </span>
            </div>

            <img
              // src={user?.profileUrl}
              src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png?20200919003010"
              alt="user profile"
              className="w-10 h-10 rounded-full object-cover "
            />
            <BiChevronDown
              className="h-8 w-8 text-slate-600"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-50 right-2 mt-2 w-56 origin-top-right divide-y dividfe-gray-100 rounded-md bg-white shadow-lg focus:outline-none ">
            <div className="p-1 ">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to={`${
                      user?.accountType ? `/user-profile/${user?._id}` : "company-profile"
                    }`}
                    className={`${
                      active ? "bg-[#1176DB] text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md p-2 text-sm`}
                    onClick={onClick}
                  >
                    <CgProfile
                      className={`${
                        active ? "text-white" : "text-gray-600"
                      } mr-2 h-5 w-5  `}
                      aria-hidden="true"
                    />
                    {user?.accountType ? "User Profile" : "Company Profile"}
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleLogout()}
                    className={`${
                      active ? "bg-red-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <AiOutlineLogout
                      className={`${
                        active ? "text-white" : "text-gray-600"
                      } mr-2 h-5 w-5  `}
                      aria-hidden="true"
                    />
                    Log Out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  // console.log(user ,user.token)
  const handleCloseNavbar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className="relative rounded-b-3xl z-50 ">
        <nav className=" container mx-auto flex items-center justify-between p-5">
          <div className="">
            <Link
              to="/"
              className="text-[#14a800] font- text-3xl tracking-tighter "
            >
              {/* Expert<span className="text-[#437a3c]">Ease</span> */}
              <div className="w-[50px] h-[50px] rounded-full overflow-hidden"><img src={logo} alt="" /></div>
            </Link>
          </div>

          <ul className="hidden lg:flex gap-10 text-base ">
            <li className="hover:text-[#1176DB]">
              <Link to="/find-jobs">Find Job</Link>
            </li>
            {user?.accountType == "seeker"&&<li className="hover:text-[#1176DB]">
              <Link to="/companies">Companies</Link>
            </li>}
            
            {/* {user?.token&&<li className="hover:text-[#1176DB]">
              <Link to={user?.accountType === "seeker" ? "" : "/upload-job"}>
              {user?.accountType != "seeker"&&"Upload Job"}</Link>
              {}
            </li>} */}
            {user?.token&&<li className="hover:text-[#1176DB]">
              <Link to={user?.accountType != "seeker"&&"/upload-job"}>
              {user?.accountType != "seeker"&&"Upload Job"}</Link>
              {}
            </li>}
            
            <li className="hover:text-[#1176DB]">
              <Link to="/about-us">About</Link>
            </li>
            <li className="hover:text-[#1176DB]">
              <Link to="/contact-us">Contact Us</Link>
            </li>
            {/* {user.token=='undefined'&&} */}
            {/* <li className="hover:text-[#1176DB] capitalize">
              <Link to="/upload-resume">{user?.accountType === "seeker"&&"upload resume"}</Link>
            </li> */}
            
            {/* <li className="hover:text-[#1176DB]">
              <Link to="/privacy-policy">Privacy & Policy</Link>
            </li> */}
          </ul>

          <div className="hidden lg:block">
            {!user?.token ? (
              <Link to="/user-auth">
                <CustomButton
                  title="Sign In"
                  containerStyles="text-[#14a800] py-1.5 px-5 focus:outline-none hover:bg-[#1176DB] hover:text-white rounded-full text-base border border-[#1176DB]"
                />
              </Link>
            ) : (
              <div>
                <MenuList user={user} />
              </div>
            )}
          </div>

          <button
            className="block lg:hidden text-slate-900"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <AiOutlineClose size={26} /> : <HiMenuAlt3 size={26} />}
          </button>
        </nav>

        {/* MOBILE MENU */}
        <div
          className={`${
            isOpen ? "absolute flex bg-[#f7fdfd] " : "hidden"
          } container mx-auto lg:hidden flex-col pl-8 gap-3 py-5`}
        >
          <Link to="/find-jobs" onClick={handleCloseNavbar}>
            Find Job
          </Link>
          <Link to="/companies" onClick={handleCloseNavbar}>
            Companies
          </Link>
          {user?.token&&<Link
            onClick={handleCloseNavbar}
            to={
              user?.accountType != "seeker"&& "/upload-job"
            }
          >
            {user?.accountType != "seeker"&&"Upload Job"}
          </Link>}
          
          

          <div className="w-full py-10">
            {!user?.token ? (
              <a href="/user-auth">
                <CustomButton
                  title="Sign In"
                  containerStyles={`text-[#14a800] py-1.5 px-5 focus:outline-none hover:bg-[#14a800] hover:text-white rounded-full text-base border border-[#14a800]`}
                />
              </a>
            ) : (
              <div>
                <MenuList user={user} onClick={handleCloseNavbar} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
