import API from "./axios";

export const loginUser = async (userData) => {
  const response = await API.post("/auth/login", userData);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await API.post("/auth/register", userData);
  return response.data;
};

export const logoutUser = async () => {
  const response = await API.post("/auth/logout");
  return response.data;
};

export const getProfile = async () => {
  const response = await API.get("/auth/profile");
  return response.data;
};

// ======================
// Update Profile
// ======================
export const updateProfile = async (formData) => {
  const response = await API.put(
    "/auth/update-profile",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// ======================
// Forgot Password
// ======================
export const forgotPassword = async (email) => {
  const response = await API.post("/auth/forgot-password", {
    email,
  });

  return response.data;
};

// ======================
// Reset Password
// ======================
export const resetPassword = async (token, password) => {
  const response = await API.put(
    `/auth/reset-password/${token}`,
    {
      password,
    }
  );

  return response.data;
};