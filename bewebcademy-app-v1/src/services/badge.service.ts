import axios from "axios";
import Badge from "../models/badge";

const badge = axios.create({
  baseURL: "http://api.bewebcademy.my/badge",
});

export const getBadgeById = async (id: string) => {
  try {
    const data = await badge.get(`/${id}`);
    return data.data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const getBadges = async () => {
  const badges = await badge.get("/");

  await badges.data.map((badge: Badge) => {
    badge._id = badge._id.toString();
  });
  return badges.data;
};

export const createBadge = async (formData: Badge) => {
  try {
    await badge.post("/", { formData });
  } catch (error: any) {
    console.log(error.message);
  }
};

export const updateBadge = async (formData: Badge, id: string) => {
  try {
    await badge.put(`/${id}`, { formData });
  } catch (error: any) {
    console.log(error.message);
  }
};

export const deleteBadge = async (id: string) => {
  try {
    await badge.delete(`/${id}`);
  } catch (error: any) {
    console.log(error.message);
  }
};
