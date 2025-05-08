import cron from "node-cron";
import { markReportsCompleted } from "../services/cron.service.js";

export function startReportCron() {
  cron.schedule("* * * * *", async () => {
    console.log("Running report cron job...");
    try {
      const result = await markReportsCompleted();
      console.log(`Cron: Updated ${result.updatedCount} reports.`);
    } catch (error) {
      console.error("Cron error:", error.message);
    }
  });
}
