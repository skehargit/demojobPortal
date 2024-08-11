import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../utils";
import { useDispatch } from "react-redux";
import { Login } from "../../redux/userSlice";
const AuthForm = () => {
  const [isUser, setIsUser] = useState(true);
  const dispatch = useDispatch();
  // State for User Registration Form
  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // State for Recruiter Registration Form
  const [recruiterForm, setRecruiterForm] = useState({
    email: "",
    companyName: "",
    isHiringAgency: false,
    isCompany: false,
    password: "",
    confirmPassword: "",
  });
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const checkPasswordMatch = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  };
  // Handle input change for User Form
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") checkPasswordStrength(value);
    setUserForm((prev) => ({ ...prev, [name]: value }));
    if (name === "confirmPassword") {
      checkPasswordMatch(userForm.password, value);
    }
  };
  // Handle input change for Recruiter Form
  const handleRecruiterChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "password") checkPasswordStrength(value);
    setRecruiterForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (name === "confirmPassword") {
      checkPasswordMatch(recruiterForm.password, value);
    }
  };
  // Check password strength
  const checkPasswordStrength = (password) => {
    const lengthCriteria = password.length >= 8;
    const uppercaseCriteria = /[A-Z]/.test(password);
    const lowercaseCriteria = /[a-z]/.test(password);
    const numberCriteria = /[0-9]/.test(password);
    const specialCharCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (
      lengthCriteria &&
      uppercaseCriteria &&
      lowercaseCriteria &&
      numberCriteria &&
      specialCharCriteria
    ) {
      setPasswordStrength("Strong");
      setPasswordError("");
    } else if (
      lengthCriteria &&
      (uppercaseCriteria || lowercaseCriteria) &&
      numberCriteria
    ) {
      setPasswordStrength("Medium");
      setPasswordError(
        "Password is medium. Consider adding more variety in characters."
      );
    } else {
      setPasswordStrength("Weak");
      setPasswordError(
        "Password is weak. It should include uppercase, lowercase, number, and special character."
      );
    }
  };
  const navigate = useNavigate();
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUser) {
      console.log("User Form Data:", userForm);
      navigate("/user-additional-details");
      // Submit userForm data to your API or handle it
      try {
        const res = await apiRequest({
          url: "user/register",
          method: "POST",
          data: userForm,
        });
        console.log(res);
        const userData = { token: res?.token, ...res?.user };
        dispatch(Login(userData));
        localStorage.setItem("userInfo", JSON.stringify(userData));
        navigate("/user-additional-details");
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Recruiter Form Data:", recruiterForm);
      // companies/register
      const res = await apiRequest({
        url: "companies/register",
        method: "POST",
        data: recruiterForm,
      });
      console.log(res);
      const userData = { token: res?.token, ...res?.user };
      dispatch(Login(userData));
      localStorage.setItem("userInfo", JSON.stringify(userData));
      navigate("/upload-a-job");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <div className="flex justify-around mb-2 w-full">
          <button
            className={`py-2 w-full px-4 rounded ${
              isUser ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setIsUser(true)}
          >
            User
          </button>
          <button
            className={`py-2 px-4 w-full rounded ${
              !isUser ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setIsUser(false)}
          >
            Recruiter
          </button>
        </div>

        {isUser ? (
          <form onSubmit={handleSubmit}>
            <h2 className="text-lg font-bold mb-3 text-center ">
              User Register
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={userForm.firstName}
                onChange={handleUserChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={userForm.lastName}
                onChange={handleUserChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={userForm.email}
                onChange={handleUserChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={userForm.password}
                onChange={handleUserChange}
                className="w-full p-2 border rounded"
                required
              />
              {passwordError && (
                <p className="mt-2 text-red-500 text-sm">{passwordError}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={userForm.confirmPassword} // or recruiterForm.confirmPassword
                onChange={handleUserChange} // or handleRecruiterChange
                className="w-full p-2 border rounded"
              />
              {confirmPasswordError && (
                <p className="mt-2 text-red-500 text-sm">
                  {confirmPasswordError}
                </p>
              )}
            </div>
            <button className="w-full bg-blue-500 text-white p-2 rounded">
              Register
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 className="text-lg font-bold mb-3 text-center">
              Recruiter Register
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={recruiterForm.email}
                onChange={handleRecruiterChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={recruiterForm.companyName}
                onChange={handleRecruiterChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Company Type</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isHiringAgency"
                    checked={recruiterForm.isHiringAgency}
                    onChange={handleRecruiterChange}
                    className="mr-2"
                    required
                  />
                  Hiring Agency
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isCompany"
                    checked={recruiterForm.isCompany}
                    onChange={handleRecruiterChange}
                    className="mr-2"
                    required
                  />
                  Company
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={recruiterForm.password}
                onChange={handleRecruiterChange}
                className="w-full p-2 border rounded"
                required
              />
              {passwordError && (
                <p className="mt-2 text-red-500 text-sm">{passwordError}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={userForm.confirmPassword} // or recruiterForm.confirmPassword
                onChange={handleUserChange} // or handleRecruiterChange
                className="w-full p-2 border rounded"
              />
              {confirmPasswordError && (
                <p className="mt-2 text-red-500 text-sm">
                  {confirmPasswordError}
                </p>
              )}
            </div>
            <button className="w-full bg-blue-500 text-white p-2 rounded">
              Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
