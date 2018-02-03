import axios from 'axios';

export default {
  /**
   * Job API
   */

  // Gets all jobs
  getJobs: () => axios.get('/api/jobs'),

  // Get my Jobs
  getMyJobs: uid => axios.get(`/api/jobs/uid/${uid}`),

  // Create a job
  createJob: jobInfo => axios.post('/api/jobs', jobInfo),

  // Gets the job with the given id
  getJob: id => axios.get(`/api/jobs/'${id}`),

  // Deletes the job with the given id
  deleteJob: id => axios.delete(`/api/jobs/${id}`),

  // Saves a job to the database
  saveJob: jobInfo => axios.put(`/api/jobs/${jobInfo._id}`, jobInfo),

  //add upvotes
  updateJob: (id, jobInfo) => axios.put(`/api/jobs/${id}`, jobInfo),
  /**
   * User API
   */

  // Authenticate user
  logIn: credential => axios.post('api/users/authenticate', credential),

  // Register user with basic info
  Register: userInfo => axios.post('api/users/register', userInfo),
};
