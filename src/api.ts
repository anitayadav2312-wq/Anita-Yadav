import axios from "axios";

const API = axios.create({ baseURL: "/api" });

export const getHotels = async () => {
  const res = await API.get("/hotels");
  return Array.isArray(res.data) ? res.data : [];
};

export const getTrains = async () => {
  const res = await API.get("/trains");
  return Array.isArray(res.data) ? res.data : [];
};

export const planTrip = async (budget: number) => {
  const res = await API.post("/plan", { budget });
  return res.data;
};
