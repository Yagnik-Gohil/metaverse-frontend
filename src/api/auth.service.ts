import axiosInstance from "./axiosInstance";
import apiHelper from "./apiHelper";

export const signup = async (credentials: {
  name: string;
  email: string;
  password: string;
}) => {
  return apiHelper(axiosInstance.post("/auth/signup", credentials), true);
};

export const resendOtp = async (credentials: {
  email: string;
}) => {
  return apiHelper(
    axiosInstance.post("/auth/signup/resend-otp", credentials),
    true, 5000
  );
};

export const verifyOtp = async (credentials: {
  email: string;
  otp: number;
  device_id: string;
}) => {
  return apiHelper(
    axiosInstance.post("/auth/signup/verify-otp", credentials),
    true
  );
};

export const login = async (credentials: {
  email: string;
  password: string;
  device_id: string;
}) => {
  return apiHelper(axiosInstance.post("/auth/login", credentials), true);
};

export const logout = async () => {
  return apiHelper(axiosInstance.post("/auth/logout"), true);
};
