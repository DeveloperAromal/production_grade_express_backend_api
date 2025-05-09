import { markReportsCompleted } from "../services/cron.service.js";

export async function runCronUpdate(req, res) {
  try {
    const result = await markReportsCompleted();
    res.json({
      success: true,
      message: `${result.updatedCount} reports updated.`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
