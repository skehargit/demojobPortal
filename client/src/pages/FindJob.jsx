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
  const [showFilters, setShowFilters] = useState(false);
  // const [selectedCheckbox, setSelectedCheckbox] = useState(null);

  // const handleCheckboxChange = (index) => {
  //   setSelectedCheckbox(index);
  //   setShowFilters(false); // Hide filters after selecting
  // };
  const handleCheckboxChange = (index) => {
    setSelectedCheckbox(index === selectedCheckbox ? 0 : index);
    setShowFilters(false);
  };

  useEffect(() => {
    fetchJobs();
  }, [sort, filterJobTypes, selectedCheckbox, filterExp, page]);

  return (
    <div className="bg-gray-100">
      <Header
        type="home"
        handleClick={() => {}}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        location={jobLocation}
        setLocation={setJobLocation}
      />
      <div className="container mx-auto min-h-screen flex gap-4">

        {/* Job Listings */}
        <div className="w-full  px-3  md:px-8">
          <div className="flex items-center  gap-5 mb-2">
            <div className="flex items-center gap-2">
              {/* <p className="text-base text-gray-600">Sort By:</p> */}
              <ListBox sort={sort} setSort={setSort} />
              <div className="relative ">
                {/* Small box to toggle filters */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="p-2 bg-blue-500 text-white rounded shadow-sm focus:outline-none w-[8rem] md:w-[10rem] "
                >
                  Experience
                </button>

                {/* Filters container */}
                {showFilters && (
                  <div className="absolute top-12 left-0 w-64 bg-white shadow-lg rounded-lg z-10">
                    {/* <p className="text-xl font-semibold text-[#1176DB] mb-4 pl-5 pt-4">
                      Filter Search
                    </p> */}
                    <div className="py-4 border-t border-gray-200">
                      <div className="flex pl-5 justify-between items-center mb-4">
                        <p className="flex items-center gap-2 font-semibold text-gray-700">
                          <BsStars />
                          Experience
                        </p>
                      </div>
                      <div className="flex flex-col gap-3 pl-5">
                        <div className="flex flex-col capitalize">
                          {[
                            "All",
                            "1-2 years",
                            "2-6 years",
                            "Over 6 years",
                          ].map((label, index) => (
                            <div
                              key={index}
                              onClick={() => handleCheckboxChange(index)}
                              className={`flex items-center gap-2 p-2 rounded cursor-pointer transition ${
                                selectedCheckbox === index
                                  ? "bg-blue-100 border-l-4 border-blue-500"
                                  : "hover:bg-gray-100"
                              }`}
                            >
                              <label>
                                <input
                                  type="checkbox"
                                  checked={selectedCheckbox === index}
                                  onChange={() => {}}
                                  className="hidden"
                                />
                                {label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* <p className="text-lg text-gray-700 mb-3">
            Showing: <span className="font-semibold">{data.length}</span> Jobs
            Available
          </p> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {data.map((job, index) => (
              <JobCard job={job} key={index} />
            ))}
          </div>

          {numPage > page && !isFetching && (
            <div className="w-full flex items-center justify-center pt-10">
              <CustomButton
                title="Load More"
                containerStyles="text-blue-600 py-2 px-6 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600 transition"
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
