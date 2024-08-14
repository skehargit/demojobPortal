import { GoLocation } from "react-icons/go";
import moment from "moment";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  return (
    <Link to={`/job-detail/${job?._id}`}>
      <div
        className="w-full md:w-[21rem] 2xl:w-[18rem] h-auto bg-white flex flex-col justify-between shadow-lg 
                rounded-lg p-5 transition-transform transform hover:scale-105 hover:shadow-xl overflow-hidden"
      >
        <div className="flex gap-4 mb-4">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzs8x_9_bjHF_paKJr8R5lgMWuoN8_aqs0upHo8xmlXgjhKmOX39-Jj4gxXTy_KminlFc&usqp=CAU"
            alt={job?.company?.name}
            className="w-12 h-12 object-cover"
          />

          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold truncate w-full md:w-[12rem]">
              {job?.jobTitle}
            </p>
            <div className="flex flex-col gap-1 mt-2">
              <span className="flex text-xs gap-2 items-center text-gray-600">
                <GoLocation className="text-blue-500" />
                {job?.jobLocation}
              </span>
              
            </div>
            
          </div>
        </div>
        <div className="flex flex-col gap-1"><span className="text-sm text-gray-600 flex">
                Experience : {job?.experience} years
              </span>
              <span className="text-sm text-gray-600">
                Company : {job?.company?.name}
              </span></div>
        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-800">Description:</p>
          <p className="text-sm text-gray-600">
            {job?.jobDescription?.slice(0, 100) + "..."}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-blue-500 text-sm">
            {moment(job?.createdAt).fromNow()}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
