/* eslint-disable no-undef */
import { createClient } from "@supabase/supabase-js";
import dayjs from "dayjs";
import dotenv from "dotenv";

dotenv.config();
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export async function markReportsCompleted() {
  const { data: reports, error } = await supabase
    .from("report")
    .select("*")
    .eq("completed", false);

  if (error) throw new Error("Error fetching reports: " + error.message);

  const now = dayjs();
  const oneHourAgoReports = reports.filter((report) => {
    const createdAt = dayjs(report.created_at);
    return now.diff(createdAt, "hour") >= 1;
  });

  const idsToUpdate = oneHourAgoReports.map((r) => r.id);

  if (idsToUpdate.length > 0) {
    const { error: updateError } = await supabase
      .from("report")
      .update({ completed: true })
      .in("id", idsToUpdate);

    if (updateError)
      throw new Error("Error updating reports: " + updateError.message);

    return { updatedCount: idsToUpdate.length };
  }

  return { updatedCount: 0 };
}
