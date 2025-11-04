import express from "express";
import AWS from "aws-sdk";
import auth from "../middleware/auth.js";
import { Weather } from "../models/Weather.js";

const router = express.Router();

// Configure AWS
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Save weather data and screenshot

router.post("/save", auth, async (req, res) => {
  try {
    const { city, temperature, description, humidity, windSpeed, screenshot } =
      req.body;

    // Upload screenshot to S3
    const base64Data = Buffer.from(
      screenshot.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );
    const fileName = `screenshot-${Date.now()}.png`;

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: base64Data,
      ContentType: "image/png",
    };

    const uploadResult = await s3.upload(params).promise();

    // Save to MongoDB
    const weather = new Weather({
      userId: req.userId,
      city,
      temperature,
      description,
      humidity,
      windSpeed,
      screenshotUrl: uploadResult.Location,
    });

    await weather.save();

    res.json({ msg: "Weather data saved successfully", weather });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
