import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../utils";
// import React, { useState, useEffect } from "react";
// import axios from "axios";

const UploadResume = () => {
  const { user } = useSelector((state) => state.user);

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedFileURL, setUploadedFileURL] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");
    if (storedToken) {
      setToken(storedToken);
      console.log("Token retrieved:", storedToken);
    }
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "jobapp");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dtnxoaxcp/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    //   console.log(user?.token,response.data.secure_url);
      const data ={
        url:response.data.secure_url
      }
      
      const updateResume = await axios.post(
        "http://localhost:8800/api-v1/user/upload-resume",
        data,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "application/json",
          },
        }
      );
    //   if(!updateResume)
      console.log(updateResume);
    //   console.log("Upload successful:", response.data);
      setUploadedFileURL(response.data.secure_url);
    } catch (error) {
      if (error.response) {
        console.error("Upload failed with status:", error.response.status);
        console.error("Response data:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-100px)] flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className={`px-4 py-2 text-white rounded ${
          uploading ? "bg-gray-500" : "bg-[#1176DB]"
        }`}
      >
        {uploading ? "Uploading..." : "Upload Resume"}
      </button>
      {uploadedFileURL && (
        <div className="mt-4">
          <a
            href={uploadedFileURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            View Uploaded File
          </a>
          <iframe
            src={uploadedFileURL}
            title="Resume Preview"
            className="mt-4 w-full h-96"
          ></iframe>
        </div>
      )}
      </div>
    </div>
  );
};

export default UploadResume;
