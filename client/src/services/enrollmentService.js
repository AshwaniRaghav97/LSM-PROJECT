import API from "./axios";

// Enroll Course
export const enrollCourse = async (courseId) => {
  const response = await API.post(`/enrollment/${courseId}`);
  return response.data;
};

// My Learning
export const getMyLearning = async () => {
  const response = await API.get("/enrollment/my-learning");
  return response.data;
};