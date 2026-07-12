import API from "./axios";

export const getInstructorDashboard = async () => {
  const response = await API.get("/dashboard");
  return response.data;
};