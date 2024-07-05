import axios from "axios";

const api = axios.create({ baseURL: "/api" });

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

async function getAllSelfcares() {
  try {
    const response = await api.get(`/selfcares`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function getOneSelfcare(selfcareId) {
  try {
    const response = await api.get(`/selfcares/${selfcareId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function createSelfcare(selfcare) {
  try {
    const response = await api.post("/selfcares/create", selfcare);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function editSelfcare(selfcareId, selfcareData) {
  try {
    const response = await api.patch(
      `/selfcares/${selfcareId}/update`,
      selfcareData
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function deleteSelfcare(selfcareId) {
  try {
    const response = await api.post(`/selfcares/${selfcareId}/delete`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export {
  getAllSelfcares,
  getOneSelfcare,
  createSelfcare,
  editSelfcare,
  deleteSelfcare,
};
