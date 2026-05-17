import API from "../api/axios";

export const getDoctorsBySpecialization = async (specialization) => {

  const response = await API.get(
    `/doctor-profiles/specialization/${specialization}`
  );

  return response.data;
};