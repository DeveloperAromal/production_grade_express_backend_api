/* eslint-disable no-undef */
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import usersRoute from "./v1/routes/users.route.js";
import ambulanceRoutes from "./v1/routes/ambulance.route.js";
import doctorRoutes from "./v1/routes/doctor.route.js";
import cronRoute from "./v1/routes/cron.route.js";
import searchRoutes from "./v1/routes/search.route.js";
import locationRoutes from "./v1/routes/livelocation.route.js";
import estimatedTimeRoute from "./v1/routes/estimatedTime.route.js";
import { startPollingLocations } from "./v1/services/livelocation.service.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Prana api");
});

startPollingLocations();

app.use("/api/v1", locationRoutes);
app.use("/api/v1", doctorRoutes);
app.use("/api/v1", ambulanceRoutes);
app.use("/api/v1", searchRoutes);
app.use("/api/v1", estimatedTimeRoute);
// app.use("/api/v1", usersRoute);
app.use("/api/v1", cronRoute);

app.listen(port, () => {
  console.log(`🚑 Server running on port ${port}`);
});

export default app;
