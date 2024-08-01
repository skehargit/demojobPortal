import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Dashboard/Sidebar';
import Navbar from '../components/Dashboard/Navbar';
import StatsCard from '../components/Dashboard/StatsCard';
import DataTable from '../components/Dashboard/DataTable';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await axios.get('http://localhost:8800/api/users');
        const jobsRes = await axios.get('http://localhost:8800/api/jobs');
        const appsRes = await axios.get('http://localhost:8800/api/applications');
        
        console.log('Users:', usersRes.data); // Ensure this is an array
        console.log('Jobs:', jobsRes.data);   // Ensure this is an array
        console.log('Applications:', appsRes.data); // Ensure this is an array

        setUsers(Array.isArray(usersRes.data) ? usersRes.data : []);
        setJobs(Array.isArray(jobsRes.data) ? jobsRes.data : []);
        setApplications(Array.isArray(appsRes.data) ? appsRes.data : []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    

    fetchData();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        <Navbar />
        <div className="grid grid-cols-3 gap-4 my-4">
          <StatsCard title="Total Users" value={users.length} />
          <StatsCard title="Total Jobs" value={jobs.length} />
          <StatsCard title="Applications" value={applications.length} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Recent Users</h2>
          <DataTable data={users} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md mt-4">
          <h2 className="text-xl font-bold mb-4">Recent Jobs</h2>
          <DataTable data={jobs} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md mt-4">
          <h2 className="text-xl font-bold mb-4">Recent Applications</h2>
          <DataTable data={applications} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
