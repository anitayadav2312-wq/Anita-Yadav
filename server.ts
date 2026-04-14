import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import axios from "axios";
import { GoogleGenAI } from "@google/genai";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  
  // Hotels Route (Google Places API)
  app.get("/api/hotels", async (req, res) => {
    try {
      const apiKey = process.env.GOOGLE_API_KEY;
      if (!apiKey) {
        return res.json([
          { name: "Taj Mahal Palace (Demo)", rating: 4.9 },
          { name: "Trident Nariman Point (Demo)", rating: 4.7 },
          { name: "The Oberoi (Demo)", rating: 4.8 }
        ]);
      }
      const response = await axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json", {
        params: {
          location: "19.0760,72.8777",
          radius: 5000,
          type: "lodging",
          key: apiKey
        }
      });
      const results = (response.data.results || []).map((h: any) => ({
        ...h,
        photoUrl: h.photos?.[0]?.photo_reference 
          ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${h.photos[0].photo_reference}&key=${apiKey}`
          : null
      }));
      res.json(results);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch hotels" });
    }
  });

  // Trains Route (Mocked)
  app.get("/api/trains", (req, res) => {
    res.json([
      { line: "Western", from: "Churchgate", to: "Virar", freq: "5 min", color: "bg-red-500" },
      { line: "Central", from: "CST", to: "Kalyan", freq: "4 min", color: "bg-yellow-500" },
      { line: "Harbour", from: "CST", to: "Panvel", freq: "8 min", color: "bg-blue-500" }
    ]);
  });

  // Planning Route (Moved to frontend as per guidelines)
  app.post("/api/plan", async (req, res) => {
    res.status(400).json({ error: "Please use the frontend Gemini integration for planning." });
  });

  // Payment Verification (Razorpay)
  app.post("/api/payment/verify", (req, res) => {
    try {
      const { order_id, payment_id, signature } = req.body;
      const secret = process.env.RAZORPAY_SECRET;

      if (!secret) {
        return res.json({ success: true, message: "Demo mode: Secret not configured" });
      }

      const generated = crypto
        .createHmac("sha256", secret)
        .update(order_id + "|" + payment_id)
        .digest("hex");

      if (generated === signature) {
        return res.json({ success: true });
      }
      res.json({ success: false });
    } catch (err) {
      res.status(500).json({ success: false });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
