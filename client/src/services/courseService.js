import API from "../api/axios";

export const getCourses = async () => {
  const response = await API.get("/courses");
  return response.data;
};