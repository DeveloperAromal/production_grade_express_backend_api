/* eslint-disable no-undef */
import https from "https";

// Function to fetch doctor message
const fetchDoctorMessage = (data) => {
  return new Promise((resolve, reject) => {
    const options = {
      method: "POST",
      hostname:
        "ai-doctor-api-ai-medical-chatbot-healthcare-ai-assistant.p.rapidapi.com",
      path: "/chat?noqueue=1",
      headers: {
        "x-rapidapi-key": process.env.X_RAPID_API_KEY,
        "x-rapidapi-host": process.env.X_RAPID_API_HOST,
        "Content-Type": "application/json",
      },
    };

    const req = https.request(options, (res) => {
      const chunks = [];

      res.on("data", (chunk) => {
        chunks.push(chunk);
      });

      res.on("end", () => {
        const body = Buffer.concat(chunks);
        try {
          const json = JSON.parse(body.toString());
          resolve(json);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.write(JSON.stringify(data));
    req.end();
  });
};

export default fetchDoctorMessage; // Default export
