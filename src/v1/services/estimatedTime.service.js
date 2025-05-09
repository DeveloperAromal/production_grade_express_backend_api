import { supabase } from "../config/supabaseClient.js";
import {
  haversineDistance,
  calculateTravelTime,
} from "../utils/harversinTime.js";

const VELOCITY = 60; // Constant velocity in km/h

export const getEstimatedTime = async (userLat, userLon) => {
  // Validate inputs
  if (userLat === undefined || userLon === undefined) {
    throw new Error("Latitude and longitude are required");
  }
  if (isNaN(userLat) || isNaN(userLon)) {
    throw new Error("Invalid numeric parameters");
  }

  // Fetch all available ambulances
  const { data, error } = await supabase
    .from("ambulance")
    .select("phoneNumber, location, status, uuid")
    .eq("status", "Available");

  if (error) {
    throw new Error(`Supabase error: ${error.message}`);
  }
  if (!data || data.length === 0) {
    throw new Error("No available ambulances found");
  }

  let nearestAmbulance = null;
  let minDistance = Infinity;

  // Find nearest ambulance
  data.forEach((ambulance) => {
    const ambLat = ambulance.location.latitude;
    const ambLon = ambulance.location.longitude;
    const dist = haversineDistance(userLat, userLon, ambLat, ambLon);

    if (dist < minDistance) {
      minDistance = dist;
      // Calculate time
      const timeInHours = calculateTravelTime(dist, VELOCITY);
      const hours = Math.floor(timeInHours);
      const minutes = Math.round((timeInHours - hours) * 60);

      nearestAmbulance = {
        uuid: ambulance.uuid,
        phone: ambulance.phoneNumber,
        location: ambulance.location,
        distance: parseFloat(dist.toFixed(2)), // Distance in km, rounded to 2 decimals
        time: {
          hours,
          minutes,
          totalHours: parseFloat(timeInHours.toFixed(2)), // Total time in hours, rounded
        },
      };
    }
  });

  if (!nearestAmbulance) {
    throw new Error("No available ambulances found");
  }

  return nearestAmbulance;
};
