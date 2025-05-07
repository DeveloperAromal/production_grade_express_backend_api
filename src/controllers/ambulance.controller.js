import { supabase } from "../config/supabaseClient.js";
import { haversineDistance } from "../utils/harversin.js";

export const findNearestAmbulance = async (req, res) => {
  const { latitude, longitude } = req.body;

  if (latitude === undefined || longitude === undefined) {
    return res
      .status(400)
      .json({ error: "Latitude and longitude are required." });
  }

  try {
    const { data, error } = await supabase
      .from("ambulance")
      .select("phoneNumber, location, status, uuid");

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No ambulances found." });
    }

    let nearestAmbulance = null;
    let minDistance = Infinity;

    data.forEach((ambulance) => {
      if (ambulance.status !== "Available") return;

      const ambLat = ambulance.location.latitude;
      const ambLon = ambulance.location.longitude;
      const dist = haversineDistance(latitude, longitude, ambLat, ambLon);

      if (dist < minDistance) {
        minDistance = dist;
        nearestAmbulance = {
          uuid: ambulance.uuid,
          phone: ambulance.phoneNumber,
          location: ambulance.location,
          distance_km: dist,
        };
      }
    });

    if (!nearestAmbulance) {
      return res.status(404).json({ message: "No active ambulances found." });
    }

    res.json({ nearestAmbulance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};
