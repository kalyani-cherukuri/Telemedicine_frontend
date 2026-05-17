import API from "../api/axios";

export const createPrescription = async (data) => {
  const response = await API.post(
    "/prescriptions",
    data
  );

  return response.data;
};

export const getPatientPrescriptions =
  async (patientId) => {

    const response = await API.get(
      `/prescriptions/patient/${patientId}`
    );

    return response.data;
  };

export const dispensePrescription =
  async (id) => {

    const response = await API.put(
      `/prescriptions/${id}/dispense`
    );

    return response.data;
  };

export const cancelPrescription =
  async (id) => {

    const response = await API.put(
      `/prescriptions/${id}/cancel`
    );

    return response.data;
  };

export const downloadPrescription =
  async (id) => {

    window.open(
      `http://localhost:8080/api/prescriptions/${id}/download`,
      "_blank"
    );
  };
  export const getDoctorPrescriptions =
  async (doctorId) => {

    const response =
      await API.get(
        "/prescriptions"
      );

    return response.data.filter(
      (prescription) =>
        String(prescription.doctorId) ===
        String(doctorId)
    );
  };
