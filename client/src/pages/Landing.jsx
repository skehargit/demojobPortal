import React from 'react';
import { FaSearch, FaBriefcase, FaUsers } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import man from '../assets/man.png'
import tlogo from '../assets/transparentlogo.png'
import toptt from '../assets/top-tier-talent.jpg'
import industry from '../assets/industri.jpg'
import personlized from '../assets/personlized.jpg'
const Landing = () => {
    const { user } = useSelector((state) => state.user);
  return (
    <div className='overflow-x-hidden bg-[#234e94]'>
      <div className='hero h-screen max-[900px]:h-fit'>
        <div className=' h-full w-full bg-black/40 flex max-[900px]:flex-col justify-evenly relative '>
          <div className='max-[900px]:py-10 flex flex-col gap-2 relative p-5 justify-center animate-fadeIn'>
            <h1 className=' text-white flex flex-col justify-center leading-none '>
              <span className='text-[4vw] max-[900px]:text-[8vw] leading-none font-semibold'>Transform Your Future</span>
              <span className=' text-[4vw] max-[900px]:text-[7.5vw] leading-none font-semibold'>with High Impact Talent</span>
            </h1>
            <p className='text-xl max-[500px]:text-sm max-[900px]:text-lg max-w-[500px] text-white pt-4 flex'>
              Bridging the Gap Between Top-Tier Strategic Professionals and Leading Organizations
            </p>
            <div className='flex gap-2 max-[500px]:flex-col'>
              <Link to={'/authform'} className='text-white bg-blue-500 w-fit text-sm p-2 rounded'>Find Your Next Opportunity</Link>
              <Link to={'/authform'} className='text-white w-fit p-2 rounded text-sm bg-blue-500'>Find Candidate's For Your Team</Link>
            </div>
          </div>
          <div className=' flex items-center justify-center py-10'>
            <div className='w-[400px]'><img src={man} alt="" /></div>
          </div>
        </div>
      </div>
      <div>
      <div className=' flex items-center justify-center bg-[#234e94] overflow-x-hidden py-10 max-[600px]:flex-col'>
        <div className='w-1/4 bg-white rounded-r-full max-[600px]:rounded-full'>
          <img src={tlogo} alt="" />
        </div>
        <div className='w-3/4 max-[600px]:w-full'>
        <p className='text-xl max-[700px]:text-sm px-[3vw] py-8 text-center text-white  '>
          Welcome to <span className='text-yellow-400 '>High Impact Talent</span>, your premier destination for connecting exceptional talent with high-impact roles. Whether you're a job seeker aiming to elevate your career or an employer searching for strategic professionals to drive your business forward, we are here to make it happen. <br /> Founded by seasoned experts from <span className='text-yellow-400'>Bain & Company</span> and the <span className='text-yellow-400'>Mahindra Group</span>, we specialize in strategic recruitment that aligns with your goals.
        </p>
        </div>
      </div>
      <div className='h-fit py-6 px-2 flex items-center justify-center bg-gray-100 overflow-x-hidden'>
        <div className='flex flex-col items-center w-full gap-8 text-xl px-2'>
          <div className='border border-[#1176DB] w-full max-w-[800px] p-6 flex max-[400px]:flex-col items-center gap-2 bg-white rounded-lg shadow-md '>
            {/* <FaUsers className='text-[#1176DB] w-[80px]' /> */}
            <div className='max-w-[400px] w-full'><img src={toptt} alt="" /></div>
            <div className='text-xl max-[600px]:text-sm flex flex-col'><strong>Top-Tier Talent:</strong> <p className='pl-5'>Access a curated pool of professionals with expertise in digital transformation, sustainability, data-driven decision-making, and more.</p></div>
          </div>
          <div className='border border-[#1176DB] w-full max-w-[800px] p-6 flex max-[400px]:flex-col items-center gap-4 bg-white rounded-lg shadow-md'>
            {/* <FaUsers className='text-[#1176DB] w-[80px]' /> */}
            
            <div className='text-xl max-[600px]:text-sm flex flex-col'><strong>Industry Insights: </strong><p className='pl-5 '>Stay ahead with the latest hiring trends and strategies for 2024 and beyond.</p></div>
            <div className='max-w-[400px] w-full'><img src={industry} alt="" /></div>
          </div>
          <div className='border border-[#1176DB] w-full p-6 max-w-[800px] flex max-[400px]:flex-col items-center gap-4 bg-white rounded-lg shadow-md '>
            {/* <FaUsers className='text-[#1176DB] w-[80px]' /> */}
            <div className='max-w-[400px] w-full'><img src={personlized} alt="" /></div>
            <div className='text-xl max-[600px]:text-sm flex flex-col'><strong>Personalized Matching:</strong> <p className='pl-5'>Our advanced algorithms and expert team ensure the best fit for both candidates and employers.</p></div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Landing;