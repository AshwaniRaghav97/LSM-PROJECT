import API from "./axios";

// Create Order
export const createOrder = async (courseId) => {
  const response = await API.post("/payments/create-order", {
    courseId,
  });

  return response.data;
};

// Verify Payment
export const verifyPayment = async (data) => {
  const response = await API.post("/payments/verify", data);

  return response.data;
};