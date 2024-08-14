import { useEffect, useState } from "react";
import { Linkedin } from "../assets";
import moment from "moment";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { jobs } from "../utils/data";
import { CustomButton, JobCard } from "../components";
import { useSelector } from "react-redux";
import { apiRequest } from "../utils";
import axios from "axios";
import ScreeningQuestions from "./ScreeningQuestions";

const JobDetail = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const [job, setJob] = useState(null);
  const [similarJobs, setSimilarJobs] = useState([]);
  const [selected, setSelected] = useState("0");
  const [isFetching, setIsFetching] = useState(false);
  const [applied, setApplied] = useState(false);
  const [status, setStatus] = useState("applied");
  const navigate = useNavigate();

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
        console.log(job);
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
    console.log(job);
    id && getJobDetails();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [id]);

  if (isFetching || !job) {
    return <div>Loading...</div>;
  }
  // useEffect(()=>{
  //   console.log(job)
  // })
  return (
    <div className="container mx-auto pb-4 ">
      <div className="w-full flex flex-col md:flex-row gap-10">
        {/* LEFT SIDE */}
        <div className="w-full h-fit md:w-2/3 2xl:2/4 bg-white px-5 py-10 md:px-10 shadow-md">
          <div className="w-full flex items-center justify-between">
            <div className="w-3/4 flex gap-2">
              {/* <img
                src={job?.company?.profileUrl}
                alt={job?.company?.name}
                className="w-20 h-20 md:w-24 md:h-20 rounded"
              /> */}

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

          <div className="my-6">
            <div>
              <p className="text-xl font-semibold ">Job Description</p>

              <span className="text-base text-sm">{job?.jobDescription}</span>

              <div className="flex gap-1 ">
                <p className="font-semibold">Experience :</p>
                <span>{job?.experience}</span> <span>Year</span>
              </div>
            </div>
          </div>
          {job?.requirements.length>0&&<div className="my-6">
            <div>
            {job.requirements[0]!=""&&<p className="text-xl font-semibold ">Requirements</p>}
                <div>
                  {job.requirements.map((para,index)=>{
                    return para!=''&&<li key={index} className="pl-2 text-sm">{para}</li>
                  })}
                </div>
            </div>
          </div>}
          {job?.qualifications.length>0&&<div className="my-6">
            <div>
            {job.qualifications[0]!=""&&<p className="text-xl font-semibold ">Qualifications</p>}
                <div>
                  {job.qualifications.map((para,index)=>{
                    return para!=''&&<li key={index} className="pl-2 text-sm">{para}</li>
                  })}
                </div>
            </div>
          </div>}
          

          {user?.token == null ? (
            <div
              onClick={() => {
                navigate("/user-auth");
              }}
              className="p-2 bg-blue-500 my-2 text-white rounded-lg text-center"
            >
              Login/Register To Apply
            </div>
          ) : user?.accountType == "seeker" ? (
            <div
              onClick={() => {
                navigate("screening-questions", {
                  state: {
                    questions: job?.screeningQuestions,
                    jobid: job._id,
                    companyid: job?.company?._id,
                    userid: user._id,
                  },
                });
                // navigate("/screening-questions")
              }}
              className="p-2 bg-blue-500 my-2 text-white rounded-lg text-center"
            >
              {" "}
              Apply now
            </div>
          ) : (
            <></>
          )}

          <div className="w-full">
            {user?.id === job?.company?._id ? (
              <CustomButton
                onClick={handleDelete}
                title="Delete Job"
                containerStyles="w-full flex items-center justify-center bg-red-500 py-3 px-5 outline-none rounded-full text-base"
              />
            ) : (
              <></>
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
