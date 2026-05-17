import API from "../api/axios";

export const bookConsultation = async (consultationData) => {
  const response = await API.post(
    "/consultations",
    consultationData
  );

  return response.data;
};

export const getPatientConsultations = async (patientId) => {
  const response = await API.get(
    `/consultations/patient/${patientId}`
  );

  return response.data;
};

export const getDoctorConsultations = async (doctorId) => {
  const response = await API.get(
    `/consultations/doctor/${doctorId}`
  );

  return response.data;
};

export const cancelConsultation = async (id) => {
  const response = await API.put(
    `/consultations/${id}/cancel`
  );

  return response.data;
};

export const startConsultation = async (id) => {
  const response = await API.put(
    `/consultations/${id}/start`
  );

  return response.data;
};

export const completeConsultation = async (
  id,
  data
) => {

  const response = await API.put(
    `/consultations/${id}/complete`,
    data
  );

  return response.data;
};