/* eslint-disable no-undef */
import dotenv from "dotenv";
import app from "./src/app.js";
import { startReportCron } from "./src/v1/cron/initializeCron.js";

dotenv.config();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Prana backend server running on port http://localhost:${PORT}`);
});

startReportCron();
