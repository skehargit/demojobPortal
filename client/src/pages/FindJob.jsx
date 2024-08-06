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
  const [searchQuery, setSearchQuery] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [filterJobTypes, setFilterJobTypes] = useState([]);
  const [filterExp, setFilterExp] = useState("");
  const [expVal, setExpVal] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [selectedCheckbox, setSelectedCheckbox] = useState(0);
  const explist = ["0-100", "1-2", "2-6", "6-100"];
  const location = useLocation();
  const navigate = useNavigate();

  const updateURL = ({ query, cmpLoc, exp, sort, pageNum, location }) => {
    const params = new URLSearchParams();

    if (query) params.append("query", query);
    if (cmpLoc) params.append("location", cmpLoc);
    if (exp) params.append("exp", exp);
    if (sort) params.append("sort", sort);
    if (pageNum) params.append("page", pageNum);

    return `${location.pathname}?${params.toString()}`;
  };

  const fetchJobs = async () => {
    setIsFetching(true);
    console.log(filterExp);
    const newURL = updateURL({
      query: searchQuery,
      cmpLoc: jobLocation,
      exp: explist[selectedCheckbox],
      sort: sort,
      pageNum: page,
      location: location,
    });
    try {
      const res = await apiRequest({
        url: "/jobs" + newURL,
        method: "GET",
      });
      setData(res?.data);
      setNumPage(res?.numOfPage);
      setRecordCount(res?.total);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setIsFetching(false);
    }
  };
  useEffect(() => {
    fetchJobs();
  }, [sort, filterJobTypes, selectedCheckbox, filterExp, page]);

  const handleCheckboxChange = (index) => {
    if (selectedCheckbox === index) {
      // If the currently selected checkbox is clicked again, deselect it
      setSelectedCheckbox(0);
    } else {
      // Select the clicked checkbox
      setSelectedCheckbox(index);
    }
  };
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
          <div className="py-2 mt-4">
            <div className="flex justify-between mb-3">
              <p className="flex items-center gap-2 font-semibold">
                <BsStars />
                Experience
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-col capitalize">
                {[0, 1, 2, 3].map((checkbox, index) => (
                  <label key={index} className="flex gap-2 p-1">
                    <input
                      type="checkbox"
                      checked={selectedCheckbox === index}
                      onChange={() => handleCheckboxChange(index)}
                    />
                    {index==0&&"All"}
                    {index==1&&"1-2 year"}
                    {index==2&&"2-6 year"}
                    {index==3&&"Over 6 Years"}
                  </label>
                ))}
              </div>
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
