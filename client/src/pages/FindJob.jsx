import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BiBriefcaseAlt2 } from "react-icons/bi";
import { BsStars } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

import Header from "../components/Header.jsx";
import { experience } from "../utils/data";
import { CustomButton, JobCard, ListBox } from "../components";
import { apiRequest } from "../utils";

const FindJobs = () => {
  const [sort, setSort] = useState("Newest");
  const [page, setPage] = useState(1);
  const [numPage, setNumPage] = useState(1);
  const [recordCount, setRecordCount] = useState(0);
  const [data, setData] = useState([]);
  const [checkboxes, setCheckboxes] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
  });
  const handleCheckboxChange = (e) => {
    const { name } = e.target;

    setCheckboxes((prevState) => {
      const newCheckboxes = {
        checkbox1: false,
        checkbox2: false,
        checkbox3: false,
        checkbox4: false,
        [name]: !prevState[name], // Toggle the clicked checkbox
      };

      // If all checkboxes are false, set the first one to true
      if (!Object.values(newCheckboxes).includes(true)) {
        newCheckboxes.checkbox1 = true;
      }

      return newCheckboxes;
    });
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [filterJobTypes, setFilterJobTypes] = useState([]);
  const [filterExp, setFilterExp] = useState([]);
  const [expVal, setExpVal] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const updateURL = ({
    query,
    cmpLoc,
    // jType,
    exp,
    sort,
    pageNum,
    location,
  }) => {
    const params = new URLSearchParams();

    if (query) params.append("query", query);
    if (cmpLoc) params.append("location", cmpLoc);
    // if (jType.length > 0) params.append("jType", jType.join(","));
    if (exp) params.append("exp", exp);
    if (sort) params.append("sort", sort);
    if (pageNum) params.append("page", pageNum);

    return `${location.pathname}?${params.toString()}`;
  };

  const fetchJobs = async () => {
    setIsFetching(true);

    const newURL = updateURL({
      query: searchQuery,
      cmpLoc: jobLocation,
      exp: filterExp,
      sort: sort,
      pageNum: page,
      location: location,
    });
    try {
      const res = await apiRequest({
        url: "/jobs" + newURL,
        method: "GET",
      });
      // console.log(newURL,res)
      setData(res?.data);
      setNumPage(res?.numOfPage);
      setRecordCount(res?.total);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const filterJobs = (val) => {
    console.log("Filtering by Job Type:", val);
    if (filterJobTypes.includes(val)) {
      setFilterJobTypes(filterJobTypes.filter((el) => el !== val));
    } else {
      setFilterJobTypes([...filterJobTypes, val]);
    }
  };

  const filterExperience = (e, idx) => {
    // console.log("Filtering by Experience:", e,e.checked);
    // e.checked?e.checked=false:e.checked=true
    if (idx == 0) {
      document.querySelector(".check1").checked = false;
      document.querySelector(".check2").checked = false;
      document.querySelector(".check3").checked = false;
    } else if (idx == 1) {
      document.querySelector(".check0").checked = false;
      document.querySelector(".check2").checked = false;
      document.querySelector(".check3").checked = false;
    } else if (idx == 2) {
      document.querySelector(".check0").checked = false;
      document.querySelector(".check1").checked = false;
      document.querySelector(".check3").checked = false;
    } else if (idx == 3) {
      document.querySelector(".check0").checked = false;
      document.querySelector(".check1").checked = false;
      document.querySelector(".check2").checked = false;
    }
    setFilterExp(e.value);
  };

  useEffect(() => {
    // document.querySelector(".check0").checked = true;
    console.log(searchQuery, jobLocation);
    console.log(data.length);
    if (expVal.length > 0) {
      let newExpVal = [];
      expVal.forEach((el) => {
        const newEl = el.split("-");
        newExpVal.push(Number(newEl[0]), Number(newEl[1]));
      });
      newExpVal.sort((a, b) => a - b);

      setFilterExp([`${newExpVal[0]}-${newExpVal[newExpVal.length - 1]}`]);
    }
  }, [expVal]);

  useEffect(() => {
    fetchJobs();
  }, [sort, filterJobTypes, filterExp, page]);

  return (
    <div>
      <Header
        type="home"
        handleClick={() => {}}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        location={jobLocation}
        setLocation={setJobLocation}
      />

      <div className="container mx-auto flex gap-6 2xl:gap-10 py-0 pb-4 ">
        <div className="hidden md:flex flex-col py-2 w-1/6 shadow-sm rounded-lg xed">
          <p className="text-lg font-semibold text-[#1176DB]">Filter Search</p>
          {/* <div>
            <label>
              <input
                type="checkbox"
                name="checkbox1"
                checked={checkboxes.checkbox1}
                onChange={handleCheckboxChange}
              />
              Checkbox 1
            </label>
            <label>
              <input
                type="checkbox"
                name="checkbox2"
                checked={checkboxes.checkbox2}
                onChange={handleCheckboxChange}
              />
              Checkbox 2
            </label>
            <label>
              <input
                type="checkbox"
                name="checkbox3"
                checked={checkboxes.checkbox3}
                onChange={handleCheckboxChange}
              />
              Checkbox 3
            </label>
            <label>
              <input
                type="checkbox"
                name="checkbox4"
                checked={checkboxes.checkbox4}
                onChange={handleCheckboxChange}
              />
              Checkbox 4
            </label>
          </div> */}
          {/* <div className="py-2">
            <div className="flex justify-between mb-3">
              <p className="flex items-center gap-2 font-semibold">
                <BiBriefcaseAlt2 />
                Job Type
              </p>
            </div>

            <div className="flex flex-col gap-2">
              {jobTypes.map((jtype, index) => (
                <div
                  key={index}
                  className="flex gap-2 items-center text-sm md:text-base"
                >
                  <input
                    type="checkbox"
                    value={jtype}
                    className="w-4 h-4"
                    onChange={(e) => filterJobs(e.target.value)}
                  />
                  <span>{jtype}</span>
                </div>
              ))}
            </div>
          </div> */}

          <div className="py-2 mt-4">
            <div className="flex justify-between mb-3">
              <p className="flex items-center gap-2 font-semibold">
                <BsStars />
                Experience
              </p>
            </div>

            <div className="flex flex-col gap-2">
              {experience.map((exp, idx) => (
                <div key={exp.title} className="flex items-center gap-3">
                  <input
                    // checked={idx==0?true:false}
                    type="checkbox"
                    value={exp.value}
                    className={`check${idx} w-4 h-4`}
                    onChange={(e) => filterExperience(e.target, idx)}
                  />
                  <span className="capitalize">{exp.title}</span>
                </div>
              ))}
              {/* {experience.map((exp, idx) => (
                <div key={exp.title} className="flex items-center gap-3">
                  <label>
              <input
                type="checkbox"
                name={`checkbox${idx+1}`}
                checked={`checkboxes.checkbox${idx}`}
                onChange={handleCheckboxChange}
              />
              Checkbox 4
            </label>
                </div> */}
              {/* ))} */}
              
            </div>
          </div>
        </div>

        <div className="w-full md:w-5/6 px-5 md:px-0">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm md:text-base text-[#1176DB] border-b-1">
              Showing: <span className="font-semibold">{data.length}</span> Jobs
              Available
            </p>

            <div className="flex flex-col md:flex-row gap-0 md:gap-2 md:items-center md:justify-center">
              <p className="text-sm md:text-base">Sort By:</p>
              <ListBox sort={sort} setSort={setSort} className="mb-4" />
            </div>
          </div>

          <div className="w-full flex flex-wrap gap-4 justify-between ">
            {data.map((job, index) => (
              <JobCard job={job} key={index} />
            ))}
          </div>

          {numPage > page && !isFetching && (
            <div className="w-full flex items-center justify-center pt-16">
              <CustomButton
                title="Load More"
                containerStyles={`text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600`}
                onClick={() => setPage((prevPage) => prevPage + 1)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindJobs;
