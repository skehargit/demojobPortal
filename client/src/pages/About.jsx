import React from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaUsers, FaRegLightbulb } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center py-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8">
        <div>
          <h1 className="mt-6 text-center text-4xl font-extrabold text-[#14a800]">
            About Us
          </h1>
          <p className="mt-2 text-center text-lg text-gray-600">
            Welcome to our company. We are committed to delivering the best services to our clients.
          </p>
        </div>
        <div className="bg-white p-8 shadow rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FaRegLightbulb className="text-[#14a800]" /> Our Mission
          </h2>
          <p className="mt-4 text-gray-600">
            Our mission is to provide high-quality products and services that meet the needs and exceed the expectations of our customers.
          </p>
        </div>
        <div className="bg-white p-8 shadow rounded-lg mt-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FaUsers className="text-[#14a800]" /> Our Values
          </h2>
          <ul className="mt-4 list-disc list-inside text-gray-600">
            <li>Integrity</li>
            <li>Innovation</li>
            <li>Customer Focus</li>
            <li>Collaboration</li>
          </ul>
        </div>
        <div className="bg-white p-8 shadow rounded-lg mt-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FaUsers className="text-[#14a800]" /> Our Team
          </h2>
          <p className="mt-4 text-gray-600">
            We have a diverse team of skilled professionals dedicated to achieving our goals and delivering exceptional results.
          </p>
        </div>
        <div className="bg-white p-8 shadow rounded-lg mt-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FaMapMarkerAlt className="text-[#14a800]" /> Contact Information
          </h2>
          <div className="mt-4 text-gray-600">
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-[#14a800]" /> 1234 Main Street, Anytown, USA
            </p>
            <p className="flex items-center gap-2 mt-2">
              <FaEnvelope className="text-[#14a800]" /> info@company.com
            </p>
            <p className="flex items-center gap-2 mt-2">
              <FaPhone className="text-[#14a800]" /> +1 (123) 456-7890
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
