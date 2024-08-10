import React from 'react';
import { FaSearch, FaBriefcase, FaUsers } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Landing = () => {
    const { user } = useSelector((state) => state.user);
  return (
    <div className='overflow-x-hidden'>
      <div className='hero h-[calc(100vh-100px)]'>
        <div className=' h-full w-full bg-black/40 flex flex-col items-center justify-center relative'>
          <div className='flex flex-col gap-2 relative items-center justify-center animate-fadeIn'>
            <h1 className=' text-white flex flex-col items-center justify-center leading-none '>
              <span className='text-[6vw] max-[500px]:text-[7vw] leading-none font-semibold'>Transform Your Future</span>
              <span className=' text-[6vw] max-[500px]:text-[7vw] leading-none font-semibold'>with High Impact Talent</span>
            </h1>
            <p className='text-xl max-[900px]:text-lg max-w-[500px] text-white pt-4 flex text-center'>
              Bridging the Gap Between Top-Tier Strategic Professionals and Leading Organizations
            </p>
          </div>
          {user?.token==''&&<div className='flex gap-4 pt-8 absolute bottom-8'>
            <Link  to={'/user-auth'} className='bg-blue-500 p-4 text-white rounded-full flex items-center gap-2 animate-bounce'>
              <FaSearch /> Find Your Next Job
            </Link>
            <Link to={'/user-auth'} className='bg-blue-500 p-4 text-white rounded-full flex items-center gap-2 animate-bounce delay-200'>
              <FaBriefcase /> Post a Job
            </Link>
          </div>}
        </div>
      </div>
      <div>
      <div className=' flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-500 overflow-x-hidden'>
        <p className='text-xl max-[700px]:text-sm px-[3vw] py-8 text-center text-white  bg-black/40 '>
          Welcome to <span className='text-yellow-400 '>High Impact Talent</span>, your premier destination for connecting exceptional talent with high-impact roles. Whether you're a job seeker aiming to elevate your career or an employer searching for strategic professionals to drive your business forward, we are here to make it happen. <br /> Founded by seasoned experts from <span className='text-yellow-400'>Bain & Company</span> and the <span className='text-yellow-400'>Mahindra Group</span>, we specialize in strategic recruitment that aligns with your goals.
        </p>
      </div>
      <div className='h-fit py-6 px-2 flex items-center justify-center bg-gray-100 overflow-x-hidden'>
        <div className='flex flex-col w-full max-w-[600px] gap-8 text-xl'>
          <div className='border border-[#1176DB] p-6 flex items-center gap-2 bg-white rounded-lg shadow-md transform transition duration-300 hover:scale-105 animate-fadeIn'>
            <FaUsers className='text-[#1176DB] w-[80px]' />
            <p className='text-xl max-[600px]:text-sm '>Top-Tier Talent: Access a curated pool of professionals with expertise in digital transformation, sustainability, data-driven decision-making, and more.</p>
          </div>
          <div className='border border-[#1176DB] p-6 flex items-center gap-4 bg-white rounded-lg shadow-md transform transition duration-300 hover:scale-105 animate-fadeIn delay-200'>
            <FaUsers className='text-[#1176DB] w-[80px]' />
            <p className='text-xl max-[600px]:text-sm '>Industry Insights: Stay ahead with the latest hiring trends and strategies for 2024 and beyond.</p>
          </div>
          <div className='border border-[#1176DB] p-6 flex items-center gap-4 bg-white rounded-lg shadow-md transform transition duration-300 hover:scale-105 animate-fadeIn delay-400'>
            <FaUsers className='text-[#1176DB] w-[80px]' />
            <p className='text-xl max-[600px]:text-sm '>Personalized Matching: Our advanced algorithms and expert team ensure the best fit for both candidates and employers.</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Landing;