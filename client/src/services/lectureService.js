import API from "./axios";

// Add Lecture
export const addLecture = async (courseId, lectureData) => {
  const response = await API.post(
    `/lectures/${courseId}`,
    lectureData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Get Lectures
export const getCourseLectures = async (courseId) => {
  const response = await API.get(`/lectures/${courseId}`);
  return response.data;
};

// Update Lecture
export const updateLecture = async (id, data) => {
  const response = await API.put(`/lectures/${id}`, data);
  return response.data;
};

// Delete Lecture
export const deleteLecture = async (id) => {
  const response = await API.delete(`/lectures/${id}`);
  return response.data;
};