import API from "./axios";

// Download Certificate
export const downloadCertificate = async (courseId) => {
  const response = await API.get(
    `/certificates/${courseId}`,
    {
      responseType: "blob",
    }
  );

  return response.data;
};

// Verify Certificate
export const verifyCertificate = async (certificateId) => {
  const response = await API.get(
    `/certificates/verify/${certificateId}`
  );

  return response.data;
};