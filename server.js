import dotenv from "dotenv";

import app from "./src/app.js";

dotenv.config();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Prana backend server running on port http://localhost:${PORT}`);
});
