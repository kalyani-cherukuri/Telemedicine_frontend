import API from "../api/axios";

export const uploadMedicalRecord =
  async (formData) => {

    const response = await API.post(
      "/medical-records",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    return response.data;
  };

export const getPatientRecords =
  async (patientId) => {

    const response = await API.get(
      `/medical-records/patient/${patientId}`
    );

    return response.data;
  };

export const downloadMedicalRecord =
  async (id) => {

    window.open(
      `http://localhost:8080/api/medical-records/${id}/download`,
      "_blank"
    );
  };