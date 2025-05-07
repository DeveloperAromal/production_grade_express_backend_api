import fetchDoctorMessage from "../services/doctor.service.js"; // Default import

// Controller to handle the doctor message route
export const getDoctorMessage = async (req, res) => {
  try {
    // Fetch doctor message based on request body
    const apiResponse = await fetchDoctorMessage(req.body);

    // Extract the message from the response
    const message = apiResponse?.result?.response?.message;

    if (!message) {
      return res.status(500).json({ error: "Failed to retrieve message" });
    }

    // Send the message in response
    res.json({ message });
  } catch (error) {
    console.error("Error fetching doctor message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
