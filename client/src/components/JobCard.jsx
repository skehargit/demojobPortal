import { GoLocation } from "react-icons/go";
import moment from "moment";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { BsPersonFillCheck } from "react-icons/bs";
const JobCard = ({ job }) => {
  return (
    <Link to={`/job-detail/${job?._id}`}>
      <div
        className="w-full md:w-[21rem] 2xl:w-[18rem] h-auto bg-white flex flex-col justify-between shadow-lg 
                rounded-lg p-3 transition-transform transform hover:scale-105 hover:shadow-xl overflow-hidden"
      >
        <div className="flex gap-2 items-center mb-1">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzs8x_9_bjHF_paKJr8R5lgMWuoN8_aqs0upHo8xmlXgjhKmOX39-Jj4gxXTy_KminlFc&usqp=CAU"
            alt={job?.company?.name}
            className="w-5 h-5 object-cover"
          />
          <span className="text-sm text-gray-600 uppercase">{job?.company?.name}</span>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold truncate w-full text-wrap">
            {job?.jobTitle}
          </p>
        </div>

        <div className="mb-1">
          {/* <p className="text-sm font-semibold text-gray-800">Description:</p> */}
          <p className="text-xs text-gray-600">
            {job?.jobDescription?.slice(0, 70) + "..."}
          </p>
        </div>
        <div className="flex flex-col gap-1 mt-2">
          <span className="flex text-xs gap-2 items-center text-gray-600">
            <MdLocationOn className="text-blue-500 font-semibold" />
            {job?.jobLocation}
          </span>
        </div>
        <div className="flex flex-col gap-1 mb-3">
          <span className="text-xs text-gray-600 flex gap-2 ">
          <BsPersonFillCheck className="text-blue-500 font-semibold" />
          {job?.experience} year+
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-blue-500 text-xs">
            {moment(job?.createdAt).fromNow()}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
