import { GoLocation } from "react-icons/go";
import moment from "moment";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  return (
    <Link to={`/job-detail/${job?._id}`}>
      <div
        className='w-full md:w-[21rem] 2xl:w-[18rem] h-[16re  bg-white flex flex-col justify-between shadow-md 
                rounded-md px-3 py-5'
      >
        <div className='flex gap-3'>
          <img
            // src={job?.company?.profileUrl}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzs8x_9_bjHF_paKJr8R5lgMWuoN8_aqs0upHo8xmlXgjhKmOX39-Jj4gxXTy_KminlFc&usqp=CAU"
            alt={job?.company?.name}
            className='w-14 h-14'
          />

          <div className='flex flex-col flex-wrap flex-grow'>
            <p className='text-lg font-semibold truncate md:w-[50%]'>
              {job?.jobTitle}
            </p>
            <div className="flex flex-col gap-1">
              <span className='flex gap-2 items-center'>
                <GoLocation className='text-slate-900 text-sm' />
                {job?.jobLocation}
              </span>
              {/* <span className='flex gap-2 items-center'>
                <span>Anual salary:</span>{job?.salary}
              </span> */}
              <span className='flex gap-2 items-center'>
                <span>Experience:</span>{job?.experience} years
              </span>
              <span className='flex gap-2 items-center'>
                <span>Company:</span>{job?.company?.name}
              </span>
            </div>
          </div>
        </div>

        <div className='py-3'>
          <p>Description:</p>
          <p className='text-sm'>
            {job?.jobDescription?.slice(0, 150) + "..."}
          </p>
        </div>

        <div className='flex items-center justify-between'>
          <p className='bg-[#14a8001c] text-[#14a800] py-0.5 px-1.5 rounded font-semibold text-sm'>
            {/* {job?.jobType} */}
          </p>
          <span className='text-blue-500 text-sm'>
            {moment(job?.createdAt).fromNow()}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;