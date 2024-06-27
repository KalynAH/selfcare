import axios from "axios";

const api = axios.create({ baseURL: "/api" });

async function getAllSelfcares() {
  try {
    const response = await api.get("/selfcares");
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

async function createSelfcare(selfcareData) {
  try {
    const response = await api.post("/selfcares/create", selfcareData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function editSelfcare(selfcareId, selfcareData) {
  try {
    const response = await api.post(
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
