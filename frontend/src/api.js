import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// 🔑 Generate idempotency key
export const generateKey = () => {
  return "key-" + Date.now() + "-" + Math.random();
};

export const createExpense = (data, key) => {
  return API.post("/expenses", data, {
    headers: {
      "Idempotency-Key": key,
    },
  });
};

export const getExpenses = (params) => {
  return API.get("/expenses", { params });
};