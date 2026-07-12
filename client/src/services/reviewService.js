import API from "./axios";

// Add Review
export const addReview = async (
  courseId,
  rating,
 comment
) => {
  const { data } = await API.post(
    `/reviews/${courseId}`,
    {
      rating,
      comment,
    }
  );

  return data;
};

// Get Reviews
export const getCourseReviews = async (
  courseId
) => {
  const { data } = await API.get(
    `/reviews/${courseId}`
  );

  return data;
};