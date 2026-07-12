import API from "./axios";

export const downloadCertificate = async (courseId) => {
  const response = await API.get(
    `/certificates/${courseId}`,
    {
      responseType: "blob",
    }
  );

  return response.data;
};