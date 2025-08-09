import express from "express";
import bodyParser from "body-parser";

const PORT = 4100
const app = express();
app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
  // TODO: verify signature, parse payload
  console.log("webhook payload:", req.body);
  res.status(200).send("received");
});

const url = `http://localhost:${PORT}`
app.listen(PORT, () => console.log(`Webhook listener on ${PORT} , url : ${url}`));