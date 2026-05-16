import API from "../api/axios";

export const createDoctorProfile =
  async (data) => {

    const response = await API.post(
      "/doctor-profiles",
      data
    );

    return response.data;
  };

export const createPatientProfile =
  async (data) => {

    const response = await API.post(
      "/patient-profiles",
      data
    );

    return response.data;
  };