import React, { useState } from "react";

const UserInfoForm = () => {
  const [formData, setFormData] = useState({
    job: "",
    company: "",
    experience: "",
    about: "",
    salary: "",
    contactNumber: "",
    location: "",
    relocate: "no", // Set 'no' as default value
    joinConsulting: "",
    dateOfBirth: '',
    profilePic: null,
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      ...(name === "job" && value !== "Other" && { company: value }),
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="flex judtify-center border">
      <form
        onSubmit={handleSubmit}
        className="max-w-[1500px] w-full p-4 bg-white  "
      >
        <div className="grid max-[700px]:grid-cols-1 grid-cols-2 gap-2">
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm  mb-2">
                Current Job
              </label>
              <select
                name="job"
                value={formData.job}
                onChange={(e) => {
                  handleChange(e);
                  if (e.target.value !== "Other") {
                    setFormData((prevData) => ({
                      ...prevData,
                      company: e.target.value,
                    }));
                  }
                }}
                className="text-xs border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select job</option>
                <option value="Accenture strategy">Accenture strategy</option>
                <option value="Alvarez and marsal">Alvarez and marsal</option>
                <option value="Bain & Company">Bain & Company</option>
                <option value="Boston Consulting Group (BCG)">
                  Boston Consulting Group (BCG)
                </option>
                <option value="Deloitte">Deloitte</option>
                <option value="Ernst & Young">Ernst & Young</option>
                <option value="Everest">Everest</option>
                <option value="EY-Parthenon">EY-Parthenon</option>
                <option value="Kearney">Kearney</option>
                <option value="KPMG">KPMG</option>
                <option value="LEK">LEK</option>
                <option value="McKinsey">McKinsey</option>
                <option value="Oliver Wyman">Oliver Wyman</option>
                <option value="PricewaterhouseCoopers">
                  PricewaterhouseCoopers
                </option>
                <option value="Roland Berger">Roland Berger</option>
                <option value="Strategy&">Strategy&</option>
                <option value="TSMG">TSMG</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {formData.job === "Other" && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm  mb-2">
                  Other Company Name
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Please Specify Company name...."
                  className="text-xs capitalize border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
            )}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm  mb-2">
                Current Salary
              </label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="current salary"
                className="capitalize text-xs border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4 ">
              <label className="block text-gray-700 text-sm mb-2">
                Experience
              </label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="capitalize text-xs border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select experience</option>
                {Array.from({ length: 15 }, (_, i) => (
                  <option key={i + 1} value={`${i + 1}+`}>{`${i + 1}+`}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm  mb-2">
                Current Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="current loaction"
                className="capitalize text-xs border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm  mb-2">
                About/Summary
              </label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                placeholder="summary..."
                className="capitalize text-xs border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              ></textarea>
            </div>
          </div>
          <div>
            
          <div className="mb-4">
    <label className="block text-gray-700 text-sm  mb-2">Date of Birth</label>
    <input
        type="date"
        name="dateOfBirth"
        value={formData.dateOfBirth}
        onChange={handleChange}
        placeholder="date of birth"
        className="text-xs capitalize border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        required
    />
</div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm  mb-2">
                Contact Number
              </label>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="contact number"
                className="capitalize text-xs border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">
                Join Consulting
              </label>
              <select
                name="joinConsulting"
                value={formData.joinConsulting}
                onChange={handleChange}
                className="capitalize text-xs border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select consulting type</option>
                <option value="Lateral">Lateral</option>
                <option value="Post Graduation">Post Graduation</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm  mb-2">
                Open to Relocate
              </label>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="relocate"
                  value="yes"
                  checked={formData.relocate === "yes"}
                  onChange={handleChange}
                  className="mr-2 leading-tight"
                />
                <span className="mr-4">Yes</span>
                <input
                  type="radio"
                  name="relocate"
                  value="no"
                  checked={formData.relocate === "no"}
                  onChange={handleChange}
                  className="mr-2 leading-tight"
                />
                <span>No</span>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm  mb-2">
                Upload Profile Picture
              </label>
              <input
                type="file"
                name="profilePic"
                onChange={handleFileChange}
                accept="image/*"
                className="w-full py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm  mb-2">
                Upload Resume
              </label>
              <input
                type="file"
                name="resume"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="w-full py-2"
                required
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserInfoForm;
