import axios from "axios";
const token = JSON.parse(localStorage.getItem("applyflowtoken"));
console.log("applyFlowToken",token);
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  },
  withCredentials: true 
});


export const getData = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("GET Error:", error.response?.data || error.message);
    throw error.response?.data;
  }
};

export const postData = async (endpoint, payload) => {
  try {
    const response = await api.post(endpoint, payload);
    return response.data;
  } catch (error) {
    console.error("POST Error:", error.response?.data || error.message);
    throw error.response?.data;
  }
};

export const putData = async (endpoint, payload) => {
  try {
    const response = await api.put(endpoint, payload);
    return response.data;
  } catch (error) {
    console.error("PUT Error:", error.response?.data || error.message);
    throw errerror.response?.dataor;
  }
};

export const deleteData = async (endpoint) => {
  try {
    const response = await api.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error("DELETE Error:", error.response?.data || error.message);
    throw error.response?.data;
  }
};

