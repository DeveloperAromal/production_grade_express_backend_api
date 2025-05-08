/* eslint-disable no-undef */
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);
let latestLocations = {};

export const startPollingLocations = () => {
  setInterval(async () => {
    const { data, error } = await supabase
      .from("report")
      .select("ambulance_uuid, ambulance_location, site_location");

    if (error) {
      console.error("Supabase polling error:", error);
      return;
    }

    if (data) {
      data.forEach((report) => {
        const { ambulance_uuid, ambulance_location, site_location } = report;

        if (
          ambulance_location &&
          ambulance_location.latitude &&
          ambulance_location.longitude
        ) {
          latestLocations[ambulance_uuid] = {
            ambulance_location: {
              latitude: ambulance_location.latitude,
              longitude: ambulance_location.longitude,
            },
          };
        }

        if (
          site_location &&
          site_location.latitude &&
          site_location.longitude
        ) {
          latestLocations[ambulance_uuid] = {
            ...latestLocations[ambulance_uuid],
            site_location: {
              latitude: site_location.latitude,
              longitude: site_location.longitude,
            },
          };
        }
      });
    }
  }, 1000);
};

export const getLatestLocation = (ambulance_uuid) => {
  return latestLocations[ambulance_uuid] || null;
};
