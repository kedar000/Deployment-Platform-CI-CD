import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
  // TODO: verify signature, parse payload
  console.log("webhook payload:", req.body);
  res.status(200).send("received");
});

app.listen(4100, () => console.log("Webhook listener on 4100"));