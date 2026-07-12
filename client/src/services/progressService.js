import API from "./axios";

// Get Progress
export const getProgress = async (courseId) => {
  const response = await API.get(`/progress/${courseId}`);
  return response.data;
};

// Mark Lecture Complete
export const markLectureComplete = async (
  courseId,
  lectureId
) => {
  const response = await API.post(
    `/progress/${courseId}/${lectureId}`
  );

  return response.data;
};

// Reset Progress
export const resetProgress = async (courseId) => {
  const response = await API.delete(
    `/progress/${courseId}`
  );

  return response.data;
};