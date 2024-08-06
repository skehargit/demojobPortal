import { GoLocation } from "react-icons/go";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { apiRequest } from "../utils";
import axios from "axios";

function Card({ jobId, name, location, job }) {
  const params = useParams();
    console.log(jobId, name, location,job);
  const [info, setInfo] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const jobDets = async () => {
    setIsLoading(true);
    let id = params.id ? params.id : user?._id;
    try {
      console.log(jobId)
      const res = await axios.get(`https://demojobportal.onrender.com/api-v1/jobs/get-job-detail/${jobId}`)
      console.log('card -',res)
        console.log(res.data.data.jobTitle);
      setInfo(res?.data?.data);
      
      setIsLoading(false);
    } catch (error) {
      //   console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    jobDets();
  }, []);
  return (
    <>
      <Link to={`/job-detail/${jobId}`}>
        <div
        // h-[16rem] md:h-[18rem]
          className="w-full md:w-[16rem] 2xl:w-[18rem]  bg-white flex flex-col justify-between shadow-lg 
          rounded-md px-3 py-5 "
        >
          <div className="flex gap-3">
            {/* <img
              src={jobId?.company?.profileUrl}
              alt={jobId?.company?.name}
              className="w-14 h-14"
            /> */}
            <h1>{name}</h1>

            <div className="">
              <p className="text-sm font-semibold truncate">
                {info&&info?.jobTitle.slice(0,25) + "..."}
              </p>
              <span className="flex gap-2 items-center">
                <GoLocation className="text-slate-900 text-xs" />
                {info&&info?.location}
              </span>
            </div>
          </div>

          <div className="py-3">
            <p className="text-sm">
              {info&&info?.detail[0]?.desc?.slice(0, 150) + "..."}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <p className="bg-[#1d4fd826] text-[#1d4fd8] py-0.5 px-1.5 rounded font-semibold text-sm">
              {info&&info?.jobType}
            </p>
            <span className="text-gray-500 text-sm">
              {moment(info&&info?.createdAt).fromNow()}
            </span>
          </div>
        </div>
      </Link>
    </>
  );
}

export default Card;
