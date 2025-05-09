import { getEstimatedTime } from "../services/estimatedTime.service.js";

export const calculateEstimatedTime = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    // Validate required fields
    if (latitude === undefined || longitude === undefined) {
      return res
        .status(400)
        .json({ error: "Latitude and longitude are required" });
    }

    // Call service to calculate time
    const result = await getEstimatedTime(latitude, longitude);

    res.status(200).json({
      success: true,
      data: result,
      message: "Estimated travel time calculated successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
