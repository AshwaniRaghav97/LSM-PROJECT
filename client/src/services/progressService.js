import API from "./axios";

// Mark Lecture Complete
export const markLectureComplete = async (
  courseId,
  lectureId
) => {
  const response = await API.put(
    `/progress/${courseId}/${lectureId}`
  );

  return response.data;
};

// Get Progress
export const getProgress = async (courseId) => {
  const response = await API.get(
    `/progress/${courseId}`
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