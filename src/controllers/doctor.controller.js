import fetchDoctorMessage from "../services/doctor.service.js";

export const getDoctorMessage = async (req, res) => {
  try {
    const apiResponse = await fetchDoctorMessage(req.body);
    const message = apiResponse?.result?.response?.message;

    if (!message) {
      return res.status(500).json({ error: "Failed to retrieve message" });
    }
    res.json({ message });
  } catch (error) {
    console.error("Error fetching doctor message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
