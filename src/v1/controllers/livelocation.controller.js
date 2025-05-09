import { getLatestLocation } from "../services/livelocation.service.js";

export const getLocation = (req, res) => {
  const { ambulance_uuid } = req.body;

  if (!ambulance_uuid) {
    return res.status(400).json({ error: "ambulance_uuid is required" });
  }

  const location = getLatestLocation(ambulance_uuid);

  if (!location) {
    return res
      .status(404)
      .json({ error: "Location not found for this ambulance_uuid" });
  }

  res.json({
    ambulance_uuid,
    ...location,
  });
};
