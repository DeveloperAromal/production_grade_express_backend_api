import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ambulanceRoutes from "./routes/ambulance.route.js";
import doctorRoutes from "./routes/doctor.route.js";
import locationRoutes from "./routes/livelocation.route.js";
import { startPollingLocations } from "./services/livelocation.service.js";

dotenv.config();
const app = express();
// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Prana api");
});

startPollingLocations();

app.use("/livelocation", locationRoutes);
app.use("/doctor", doctorRoutes);
app.use("/ambulance", ambulanceRoutes);

app.listen(port, () => {
  console.log(`🚑 Server running on port ${port}`);
});

export default app;
