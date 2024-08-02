import { useEffect, useState } from "react";
import { Linkedin } from "../assets";
import moment from "moment";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { jobs } from "../utils/data";
import { CustomButton, JobCard } from "../components";
import { useSelector } from "react-redux";
import { apiRequest } from "../utils";
import axios from "axios";

const JobDetail = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const [job, setJob] = useState(null);
  const [similarJobs, setSimilarJobs] = useState([]);
  const [selected, setSelected] = useState("0");
  const [isFetching, setIsFetching] = useState(false);
  const [applied,setApplied]=useState(false)
  const [status,setStatus]=useState('applied')
  const navigate = useNavigate()
  const applyHandler = async (jobid,companyid,applicantid)=>{
    // alert('clicked')
    console.log(jobid,companyid,applicantid)
    // axios
    try {
      const res = await apiRequest({
        url: `https://demojobportal.onrender.com/api-v1/application/create`,
        data:{job:jobid,company:companyid,applicant:applicantid},
        method: "POST",
        
      });
      if(res){
        setApplied(true)
        console.log('applied',res)
      }
    } catch (error) {
      console.log('Error while apply for job')
    }
  }
  const getJobDetails = async () => {
    setIsFetching(true);
    try {
      const res = await apiRequest({
        url: `/jobs/get-job-detail/${id}`,
        method: "GET",
      });
      console.log("API Response:", res); // Log the entire response
      if (res && res.data) {
        setJob(res.data);
        console.log(job)
        setSimilarJobs(res.similarJobs);
      } else {
        console.error("Invalid response data:", res);
      }
    } catch (error) {
      console.error("Error fetching job details:", error); // Log the error
    } finally {
      setIsFetching(false);
    }
  };

  const handleDelete = async () => {
    console.log("Job ID to delete:", id);
    setIsFetching(true);
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        const res = await apiRequest({
          url: `/jobs/delete-job/${job?.id}`,
          token: user?.token,
          method: "DELETE",
        });
        console.log("Delete Response:", res);
        window.location.href = "/";
      } catch (error) {
        console.error("Error deleting job:", error);
      } finally {
        setIsFetching(false);
      }
    }
  };

  useEffect(() => {
    id && getJobDetails();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [id]);

  if (isFetching || !job) {
    return <div>Loading...</div>;
  }
  useEffect(()=>{
    console.log(job)
  })
  return (
    <div className="container mx-auto pb-4 " >
      <div className="w-full flex flex-col md:flex-row gap-10">
        {/* LEFT SIDE */}
        <div className="w-full h-fit md:w-2/3 2xl:2/4 bg-white px-5 py-10 md:px-10 shadow-md">
          <div className="w-full flex items-center justify-between">
            <div className="w-3/4 flex gap-2">
              <img
                src={job?.company?.profileUrl}
                alt={job?.company?.name}
                className="w-20 h-20 md:w-24 md:h-20 rounded"
              />

              <div className="flex flex-col">
                <p className="text-xl font-semibold text-gray-600">
                  {job?.jobTitle}
                </p>

                <span className="text-base">{job?.location}</span>

                <span className="text-base text-blue-600">
                  {job?.company?.name}
                </span>

                <span className="text-gray-500 text-sm">
                  {/* {moment(job?.createdAt).fromNow()} */}
                </span>
              </div>
            </div>

            <div className="">
              <AiOutlineSafetyCertificate className="text-3xl text-blue-500" />
            </div>
          </div>

          <div className="w-full flex flex-wrap md:flex-row gap-2 items-center justify-between my-10">
            <div className="bg-[#bdf4c8] w-40 h-16 rounded-lg flex gap-2 items-center justify-center ">
              <span className="text-sm">Anual Salary : </span>
              <p className="text-lg font-semibold text-gray-700">
                {job?.salary}
              </p>
            </div>

            {/* <div className="bg-[#bae5f4] w-40 h-16 rounded-lg flex flex-col items-center justify-center">
              <span className="text-sm">Job Type</span>
              <p className="text-lg font-semibold text-gray-700">
                {job?.jobType}
              </p>
            </div> */}


            {/* <div className="bg-[#cecdff] w-40 h-16 px-6 rounded-lg flex flex-col items-center justify-center">
              <span className="text-sm">No. of Vacancies</span>
              <p className="text-lg font-semibold text-gray-700">
                {job?.vacancies}
              </p>
            </div> */}
          </div>

          {/* <div className="w-full flex gap-4 py-5"> */}
            {/* <CustomButton
              onClick={() => setSelected("0")}
              title="Job Description"
              containerStyles={`w-full flex items-center justify-center py-3 px-5 outline-none rounded-full text-sm ${
                selected === "0"
                  ? "bg-black text-white"
                  : "bg-white text-black border border-gray-300"
              }`}
            /> */}
            {/* <div className="w-full flex items-center justify-center py-3 px-5 font-semibold">Job Description</div> */}

            {/* <CustomButton
              onClick={() => setSelected("1")}
              title="Company"
              containerStyles={`w-full flex items-center justify-center  py-3 px-5 outline-none rounded-full text-sm ${
                selected === "1"
                  ? "bg-black text-white"
                  : "bg-white text-black border border-gray-300"
              }`}
            /> */}
          {/* </div> */}

          <div className="my-6">
            {selected === "0" ? (
              <>
                <p className="text-xl font-semibold ">Job Description</p>

                <span className="text-base">{job?.detail?.[0]?.desc}</span>

                {job?.detail?.[0]?.requirements && (
                  <>
                    <p className="text-xl font-semibold mt-8">Requirements</p>
                    <span className="text-base">
                      {job?.detail?.[0]?.requirements || "No Requirements"}
                    </span>
                  </>
                )}
              </>
            ) : (
              <>
                <div className="mb-6 flex flex-col">
                  <p className="text-xl text-blue-600 font-semibold">
                    {job?.company?.name}
                  </p>
                  <span className="text-base">{job?.company?.location}</span>
                  <span className="text-sm">{job?.company?.email}</span>
                </div>

                <p className="text-xl font-semibold">About Company</p>
                <span>{job?.about}</span>
              </>
            )}
          </div>

          <div className="w-full">
            {user?.id === job?.company?._id ? (
              <CustomButton
                onClick={handleDelete}
                title="Delete Job"
                containerStyles="w-full flex items-center justify-center bg-red-500 py-3 px-5 outline-none rounded-full text-base"
              />
            ) : (
              <button
      onClick={()=>{
          !applied&&applyHandler(job._id,job.company._id,user._id)
          applied&&navigate('/application-tracking')
        }} 
      className={`py-2 px-4 flex bg-green-500 w-full text-white items-center justify-center text-black rounded-[10px]`}
    > 
      {applied?`view application status`:'apply now'}
    </button>

            )}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/3 2xl:w-2/4 p-5 md:mt-0">
          <p className="text-gray-500 font-semibold">Similar Job Post</p>

          <div className="w-full flex flex-wrap gap-4">
            {similarJobs.slice(0, 6).map((job, index) => {
              const data = {
                name: job?.company?.name,
                logo: job?.company?.profileUrl,
                ...job,
              };

              return <JobCard job={data} key={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
