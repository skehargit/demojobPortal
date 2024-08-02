import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiRequest } from "../utils";

const ScreeningQuestions = () => {
  const { state } = useLocation();
  const [applied,setApplied]=useState(false)
  const [status,setStatus]=useState('applied')
  const [formData, setFormData] = useState({
    answers: ["", ""], // Assuming there are 2 screening questions
  });
  const handleAnswerChange = (index, value) => {
    const newAnswers = [...formData.answers];
    newAnswers[index] = value;
    setFormData({
      ...formData,
      answers: newAnswers,
    });
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form submitted:", formData);
//   };

  const applyHandler = async (jobid,companyid,applicantid)=>{
    // alert('clicked')
    // e.preventDefault();
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
  const navigate=useNavigate()
  useEffect(() => {
    console.log(formData)
    console.log(state);
  });
  return (
    <div className="h-screen">
        {/* onSubmit={handleSubmit} */}
        <div >
      <div>
        <label>
          <div><span>Question 1:</span><span>{state?.questions?.[0]}</span></div>
          <input
            type="text"
            className="p-2 bg-zinc-200 w-full rounded-lg"
            value={formData.answers[0]}
            onChange={(e) => handleAnswerChange(0, e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
        <div><span>Question 2:</span><span>{state?.questions?.[1]}</span></div>
          <input
            type="text"
            className="p-2 bg-zinc-200 w-full rounded-lg"
            value={formData.answers[1]}
            onChange={(e) => handleAnswerChange(1, e.target.value)}
            required
          />
        </label>
      </div>
      <div
      onClick={()=>{
          !applied&&applyHandler(state.jobid,state.companyid,state.userid)
          applied&&navigate('/application-tracking')
        }} 
      className={`py-2 px-4 flex bg-green-500 w-full text-white items-center justify-center text-black rounded-[10px]`}
    > 
      {applied?`view application status`:'apply now'}
        </div>
    </div>
    </div>
  );
};

export default ScreeningQuestions;
