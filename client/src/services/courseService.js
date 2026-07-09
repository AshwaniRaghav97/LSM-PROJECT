import API from "./axios";

// Get All Courses
export const getCourses = async () => {
  const response = await API.get("/courses");
  return response.data;
};

// Get Single Course
export const getCourseById = async (id) => {
  const response = await API.get(`/courses/${id}`);
  return response.data;
};

// Create Course
export const createCourse = async (courseData) => {
  const response = await API.post("/courses", courseData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Update Course
export const updateCourse = async (id, courseData) => {
  const response = await API.put(`/courses/${id}`, courseData);
  return response.data;
};

// Delete Course
export const deleteCourse = async (id) => {
  const response = await API.delete(`/courses/${id}`);
  return response.data;
};

export const getMyCourses = async () => {
  const response = await API.get("/courses/my-courses");
  return response.data;
};

