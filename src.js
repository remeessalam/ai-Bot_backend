const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();
app.use(cors());
app.use(express.json());
const genAI = new GoogleGenerativeAI(process.env.BARD_API);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
const ai = async (requestData) => {
  const prompt = requestData;
  const result = await model.generateContent(prompt);
  const response = await result.response.text();
  console.log(response, "This is ai response");
  return response;
};

// const text = response.text();
// console.log(text);
app.post("/", async (req, res) => {
  const requestData = req?.body?.Promt;
  const response = await ai(requestData);
  console.log(response, "req come here");
  res.send({ result: response });
});

app.listen(process.env.PORT_NUMBER, () => {
  console.log("app listen in port no :" + process.env.PORT_NUMBER);
});
