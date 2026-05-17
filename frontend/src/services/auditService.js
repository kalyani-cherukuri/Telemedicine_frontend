import API from "../api/axios";

export const getConsultationActivity =
  async (consultationId) => {

    const response = await API.get(
      `/consultations/${consultationId}/activity`
    );

    return response.data;
  };

export const getPatientAccessLogs =
  async (patientId) => {

    const response = await API.get(
      `/access-logs/patient/${patientId}`
    );

    return response.data;
  };