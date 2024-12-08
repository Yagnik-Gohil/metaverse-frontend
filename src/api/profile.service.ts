import axiosInstance from "./axiosInstance";
import apiHelper from "./apiHelper";

export const updateProfile = async (data: { name: string; avatar: string }) => {
  return apiHelper(axiosInstance.patch("/user/profile", data), true);
};

export const getAvatar = async () => {
  return apiHelper(
    axiosInstance.get("/avatar", {
      params: {
        limit: 100,
        offset: 0,
      },
    })
  );
};

export const getProfile = async () => {
  return apiHelper(axiosInstance.get("/user/profile"));
};
