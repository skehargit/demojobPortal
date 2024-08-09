import React, { useEffect, useState } from "react";
import { AiOutlineSearch, AiOutlineCloseCircle } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import CustomButton from "./CustomButton";
import { popularSearch } from "../utils/data";
// import { HeroImage } from "../assets";

const SearchInput = ({ placeholder, icon, value,jname,name, setValue, styles }) => {
  // const handleChange = (e) => {
  //   setValue(e.target.value);
  // };
  // console.log(value,name)
  // setValue.setSearchQuery(value)
  const [search,setSearch] =useState({
    jobname:'',
    joblocation:'',
  })
  const handleChange=(e)=>{
    const {name,value}=e.target;
    // console.log(name,value)
    
    setSearch((data) => ({ ...data, [name]: value }))
    console.log(search)
    // setSearchQuery(value)
  }
  const clearInput = () => setValue("");
  useEffect(()=>{
    // console.log(search);
    // setValue(search.jobname)
    // console.log('yes',  value)
  },[setSearch])
  return (
    <div className={`flex w-full md:w-1/3 items-center ${styles}`}>
      {icon}

      <input
        name={`${name}`}
        value={name=='jobname'?search.jobname:search.joblocation}
        onChange={handleChange}
        type="text"
        className="w-full md:w-64 p-2 outline-none bg-transparent text-base"
        placeholder={placeholder}
      />

      <AiOutlineCloseCircle
        className="hidden md:flex text-gray-600 text-xl cursor-pointer"
        onClick={clearInput}
      />
    </div>
  );
};

const Header = ({
  title,
  type,
  handleClick,
  searchQuery,
  setSearchQuery,
  location,
  setLocation,
}) => {
  return (
    <div className="bg-[#ffffff]">
      <div
        className={`container mx-auto px-5 ${
          type ? "h-[200px]" : "h-[200px]"
        } flex items-center relative`}
      >
        <div className=" w-full z-10">
          <div className=" mb-3 flex justify-center ">
            <p className="  font-semibold text-5xl font-[Poppins] ">
              {/* The Right{" "} */}
              <span className="font-[silk-serif] text-[#1176DB] italic text-7xl border-b-2 border-[#1176DB]">
                {" "}
                Find your Next Opportunity
              </span>{" "}
            </p>
          </div>

          <div className="w-full  flex items-center justify-around bg-white px-2 md:px-5 py-2.5 md:py-3 shadow-2xl rounded-full">
            <SearchInput
              placeholder='Job Title or Keywords'
              icon={<AiOutlineSearch className='text-gray-600 text-xl' />}
              // onChange={()=>{}}
              name="jobname"
              value={searchQuery}
              setValue={setSearchQuery}
            />
            <SearchInput
              placeholder='Add Country or City'
              icon={<CiLocationOn className='text-gray-600 text-xl' />}
              name='joblocation'
              value={location}
              setValue={setLocation}
              styles={"hidden md:flex"}
            />

            <div>
              <CustomButton
                onClick={handleClick}
                title="Search"
                className=''
                containerStyles={
                  " text-white py-2 md:py3 px-3 md:px-10 focus:outline-none bg-[#1176DB] hover:bg-[#1176DB]/70 rounded-full md:rounded-md text-sm md:text-base"
                }
              />
            </div>
          </div>

          {/* {type && (
            <div className="w-full lg:1/2 flex flex-wrap gap-3 md:gap-6 py-10 md:py-14">
              {popularSearch.map((search, index) => (
                <span
                  key={index}
                  className="bg-[#1176DB] text-white py-2 px-4 rounded-full text-sm md:text-base"
                >
                  {search}
                </span>
              ))}
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Header;
