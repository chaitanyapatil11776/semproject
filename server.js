// // // // // // // // // // // // // // // // // // // // const express = require("express");
// // // // // // // // // // // // // // // // // // // // const cors = require("cors");
// // // // // // // // // // // // // // // // // // // // const axios = require("axios");
// // // // // // // // // // // // // // // // // // // // const path = require("path");

// // // // // // // // // // // // // // // // // // // // const app = express();
// // // // // // // // // // // // // // // // // // // // const PORT = 3000;

// // // // // // // // // // // // // // // // // // // // // ⚠️  PASTE YOUR SERPAPI KEY HERE
// // // // // // // // // // // // // // // // // // // // const SERPAPI_KEY = "00c9a4387fcafade828a6ac5aac8714e024d4e43dd4ee8f1b4d779cd8a0c10d3";

// // // // // // // // // // // // // // // // // // // // app.use(cors());
// // // // // // // // // // // // // // // // // // // // app.use(express.json());

// // // // // // // // // // // // // // // // // // // // // Serve the public HTML file
// // // // // // // // // // // // // // // // // // // // app.use(express.static(path.join(__dirname, "public")));

// // // // // // // // // // // // // // // // // // // // // Hotel Search Endpoint
// // // // // // // // // // // // // // // // // // // // // GET /api/hotels?q=Paris&check_in=2025-06-01&check_out=2025-06-05&adults=2
// // // // // // // // // // // // // // // // // // // // app.get("/api/hotels", async (req, res) => {
// // // // // // // // // // // // // // // // // // // //   const { q, check_in, check_out, adults = 2, currency = "USD" } = req.query;

// // // // // // // // // // // // // // // // // // // //   if (!q) {
// // // // // // // // // // // // // // // // // // // //     return res.status(400).json({ error: "Missing required param: q (location)" });
// // // // // // // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // // // // // // //     const params = {
// // // // // // // // // // // // // // // // // // // //       engine: "google_hotels",
// // // // // // // // // // // // // // // // // // // //       q,
// // // // // // // // // // // // // // // // // // // //       check_in_date: check_in,
// // // // // // // // // // // // // // // // // // // //       check_out_date: check_out,
// // // // // // // // // // // // // // // // // // // //       adults,
// // // // // // // // // // // // // // // // // // // //       currency,
// // // // // // // // // // // // // // // // // // // //       api_key: SERPAPI_KEY,
// // // // // // // // // // // // // // // // // // // //     };

// // // // // // // // // // // // // // // // // // // //     const response = await axios.get("https://serpapi.com/search", { params });

// // // // // // // // // // // // // // // // // // // //     const hotels = (response.data.properties || []).map((h) => ({
// // // // // // // // // // // // // // // // // // // //       name: h.name,
// // // // // // // // // // // // // // // // // // // //       description: h.description || "",
// // // // // // // // // // // // // // // // // // // //       rating: h.overall_rating,
// // // // // // // // // // // // // // // // // // // //       reviews: h.reviews,
// // // // // // // // // // // // // // // // // // // //       price: h.rate_per_night?.lowest || "N/A",
// // // // // // // // // // // // // // // // // // // //       total_price: h.total_rate?.lowest || "N/A",
// // // // // // // // // // // // // // // // // // // //       thumbnail: h.images?.[0]?.thumbnail || "",
// // // // // // // // // // // // // // // // // // // //       link: h.link || "",
// // // // // // // // // // // // // // // // // // // //       amenities: h.amenities || [],
// // // // // // // // // // // // // // // // // // // //     }));

// // // // // // // // // // // // // // // // // // // //     res.json({ hotels, total: hotels.length });
// // // // // // // // // // // // // // // // // // // //   } catch (err) {
// // // // // // // // // // // // // // // // // // // //     console.error("SerpAPI error:", err.response?.data || err.message);
// // // // // // // // // // // // // // // // // // // //     res.status(500).json({
// // // // // // // // // // // // // // // // // // // //       error: "Failed to fetch hotels",
// // // // // // // // // // // // // // // // // // // //       details: err.response?.data?.error || err.message,
// // // // // // // // // // // // // // // // // // // //     });
// // // // // // // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // // // // // // });

// // // // // // // // // // // // // // // // // // // // app.listen(PORT, () => {
// // // // // // // // // // // // // // // // // // // //   console.log(`\n🏨  Hotel Search API server running at http://localhost:${PORT}`);
// // // // // // // // // // // // // // // // // // // //   console.log(`   Open http://localhost:${PORT} in your browser\n`);
// // // // // // // // // // // // // // // // // // // // });











// // // // // // // // // // // // // // // // // // // const express = require("express");
// // // // // // // // // // // // // // // // // // // const cors = require("cors");
// // // // // // // // // // // // // // // // // // // const axios = require("axios");

// // // // // // // // // // // // // // // // // // // const app = express();
// // // // // // // // // // // // // // // // // // // const PORT = 3000;

// // // // // // // // // // // // // // // // // // // const SERPAPI_KEY = "00c9a4387fcafade828a6ac5aac8714e024d4e43dd4ee8f1b4d779cd8a0c10d3";

// // // // // // // // // // // // // // // // // // // app.use(cors());
// // // // // // // // // // // // // // // // // // // app.use(express.json());

// // // // // // // // // // // // // // // // // // // // Helper function to get YYYY-MM-DD date strings
// // // // // // // // // // // // // // // // // // // const getFutureDate = (daysAhead) => {
// // // // // // // // // // // // // // // // // // //   const date = new Date();
// // // // // // // // // // // // // // // // // // //   date.setDate(date.getDate() + daysAhead);
// // // // // // // // // // // // // // // // // // //   return date.toISOString().split('T')[0];
// // // // // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // // // // app.get("/api/hotels", async (req, res) => {
// // // // // // // // // // // // // // // // // // //   const { q } = req.query;

// // // // // // // // // // // // // // // // // // //   if (!q) {
// // // // // // // // // // // // // // // // // // //     return res.status(400).json({ error: "Place name is required" });
// // // // // // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // // // // // //   // Generate valid future dates
// // // // // // // // // // // // // // // // // // //   const checkIn = getFutureDate(1);  // Tomorrow
// // // // // // // // // // // // // // // // // // //   const checkOut = getFutureDate(4); // 4 days from now

// // // // // // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // // // // // //     console.log(`🚀 Searching: ${q} | Dates: ${checkIn} to ${checkOut}`);

// // // // // // // // // // // // // // // // // // //     const response = await axios.get("https://serpapi.com/search", {
// // // // // // // // // // // // // // // // // // //       params: {
// // // // // // // // // // // // // // // // // // //         engine: "google_hotels",
// // // // // // // // // // // // // // // // // // //         q: q + " hotels",
// // // // // // // // // // // // // // // // // // //         api_key: SERPAPI_KEY,
// // // // // // // // // // // // // // // // // // //         currency: "USD",
// // // // // // // // // // // // // // // // // // //         check_in_date: checkIn,
// // // // // // // // // // // // // // // // // // //         check_out_date: checkOut,
// // // // // // // // // // // // // // // // // // //         adults: 2
// // // // // // // // // // // // // // // // // // //       },
// // // // // // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // // // // // //     // Check if SerpAPI returned an error in the JSON body
// // // // // // // // // // // // // // // // // // //     if (response.data.error) {
// // // // // // // // // // // // // // // // // // //         return res.status(400).json({ error: response.data.error });
// // // // // // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // // // // // //     const rawHotels = response.data.properties || [];
// // // // // // // // // // // // // // // // // // //     const hotels = rawHotels.map((h) => ({
// // // // // // // // // // // // // // // // // // //       name: h.name || "Elite Stay",
// // // // // // // // // // // // // // // // // // //       rating: h.overall_rating || "4.2",
// // // // // // // // // // // // // // // // // // //       reviews: h.reviews || "0",
// // // // // // // // // // // // // // // // // // //       price: h.rate_per_night?.lowest ? h.rate_per_night.lowest.replace(/[^0-9]/g, "") : "199",
// // // // // // // // // // // // // // // // // // //       thumbnail: h.images?.[0]?.thumbnail || "https://images.unsplash.com/photo-1551882547-ff43c63efe81?w=400",
// // // // // // // // // // // // // // // // // // //     }));

// // // // // // // // // // // // // // // // // // //     res.json({ success: true, hotels });
// // // // // // // // // // // // // // // // // // //   } catch (err) {
// // // // // // // // // // // // // // // // // // //     console.error("❌ Backend Error:", err.response?.data || err.message);
// // // // // // // // // // // // // // // // // // //     res.status(500).json({ 
// // // // // // // // // // // // // // // // // // //         error: "Search failed", 
// // // // // // // // // // // // // // // // // // //         details: err.response?.data?.error || err.message 
// // // // // // // // // // // // // // // // // // //     });
// // // // // // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // // // // // });

// // // // // // // // // // // // // // // // // // // app.listen(PORT, "0.0.0.0", () => {
// // // // // // // // // // // // // // // // // // //   console.log(`🏨 AI Server active on Port ${PORT}`);
// // // // // // // // // // // // // // // // // // // });













// // // // // // // // // // // // // // // // // // const express = require("express");
// // // // // // // // // // // // // // // // // // const cors = require("cors");
// // // // // // // // // // // // // // // // // // const axios = require("axios");

// // // // // // // // // // // // // // // // // // const app = express();
// // // // // // // // // // // // // // // // // // const PORT = 3000;
// // // // // // // // // // // // // // // // // // const SERPAPI_KEY = "00c9a4387fcafade828a6ac5aac8714e024d4e43dd4ee8f1b4d779cd8a0c10d3";

// // // // // // // // // // // // // // // // // // app.use(cors());
// // // // // // // // // // // // // // // // // // app.use(express.json());

// // // // // // // // // // // // // // // // // // const getFutureDate = (days) => {
// // // // // // // // // // // // // // // // // //   const d = new Date();
// // // // // // // // // // // // // // // // // //   d.setDate(d.getDate() + days);
// // // // // // // // // // // // // // // // // //   return d.toISOString().split('T')[0];
// // // // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // // // app.get("/api/hotels", async (req, res) => {
// // // // // // // // // // // // // // // // // //   const { q } = req.query;
// // // // // // // // // // // // // // // // // //   if (!q) return res.status(400).json({ error: "Query required" });

// // // // // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // // // // //     const response = await axios.get("https://serpapi.com/search", {
// // // // // // // // // // // // // // // // // //       params: {
// // // // // // // // // // // // // // // // // //         engine: "google_hotels",
// // // // // // // // // // // // // // // // // //         q: q + " hotels",
// // // // // // // // // // // // // // // // // //         api_key: SERPAPI_KEY,
// // // // // // // // // // // // // // // // // //         check_in_date: getFutureDate(2),
// // // // // // // // // // // // // // // // // //         check_out_date: getFutureDate(5),
// // // // // // // // // // // // // // // // // //       },
// // // // // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // // // // //     const hotels = (response.data.properties || []).map((h) => ({
// // // // // // // // // // // // // // // // // //       name: h.name || "Luxury Hotel",
// // // // // // // // // // // // // // // // // //       rating: h.overall_rating || "4.0",
// // // // // // // // // // // // // // // // // //       price: h.rate_per_night?.lowest ? h.rate_per_night.lowest.replace(/[^0-9]/g, "") : "Price on request",
// // // // // // // // // // // // // // // // // //       thumbnail: h.images?.[0]?.thumbnail || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
// // // // // // // // // // // // // // // // // //       link: h.link // IMPORTANT: This is the URL that opens in the browser
// // // // // // // // // // // // // // // // // //     }));

// // // // // // // // // // // // // // // // // //     res.json({ hotels });
// // // // // // // // // // // // // // // // // //   } catch (err) {
// // // // // // // // // // // // // // // // // //     res.status(500).json({ error: "Failed to fetch data" });
// // // // // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // // // // });

// // // // // // // // // // // // // // // // // // app.listen(PORT, "0.0.0.0", () => console.log(`Backend running on ${PORT}`));









// // // // // // // // // // // // // // // // // const express = require("express");
// // // // // // // // // // // // // // // // // const cors = require("cors");
// // // // // // // // // // // // // // // // // const axios = require("axios");

// // // // // // // // // // // // // // // // // const app = express();
// // // // // // // // // // // // // // // // // const PORT = 3000;

// // // // // // // // // // // // // // // // // const SERPAPI_KEY = "00c9a4387fcafade828a6ac5aac8714e024d4e43dd4ee8f1b4d779cd8a0c10d3";

// // // // // // // // // // // // // // // // // app.use(cors());
// // // // // // // // // // // // // // // // // app.use(express.json());

// // // // // // // // // // // // // // // // // // Function to generate dynamic future dates
// // // // // // // // // // // // // // // // // const getFutureDate = (daysToAdd) => {
// // // // // // // // // // // // // // // // //   const date = new Date();
// // // // // // // // // // // // // // // // //   date.setDate(date.getDate() + daysToAdd);
// // // // // // // // // // // // // // // // //   return date.toISOString().split('T')[0];
// // // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // // app.get("/api/hotels", async (req, res) => {
// // // // // // // // // // // // // // // // //   const { q } = req.query;
// // // // // // // // // // // // // // // // //   if (!q) return res.status(400).json({ error: "City is required" });

// // // // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // // // //     const checkIn = getFutureDate(7);  // 1 week from now
// // // // // // // // // // // // // // // // //     const checkOut = getFutureDate(10); // 10 days from now

// // // // // // // // // // // // // // // // //     console.log(`🔎 Searching: ${q} | Dates: ${checkIn} to ${checkOut}`);

// // // // // // // // // // // // // // // // //     const response = await axios.get("https://serpapi.com/search", {
// // // // // // // // // // // // // // // // //       params: {
// // // // // // // // // // // // // // // // //         engine: "google_hotels",
// // // // // // // // // // // // // // // // //         q: q + " hotels",
// // // // // // // // // // // // // // // // //         api_key: SERPAPI_KEY,
// // // // // // // // // // // // // // // // //         check_in_date: checkIn,
// // // // // // // // // // // // // // // // //         check_out_date: checkOut,
// // // // // // // // // // // // // // // // //         currency: "USD"
// // // // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // // // //     // Handle SerpAPI errors returned in successful HTTP responses
// // // // // // // // // // // // // // // // //     if (response.data.error) {
// // // // // // // // // // // // // // // // //       console.error("SerpAPI JSON Error:", response.data.error);
// // // // // // // // // // // // // // // // //       return res.status(400).json({ error: response.data.error });
// // // // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // // // //     const hotels = (response.data.properties || []).map((h) => ({
// // // // // // // // // // // // // // // // //       name: h.name || "Starlight Suites",
// // // // // // // // // // // // // // // // //       rating: h.overall_rating || "4.5",
// // // // // // // // // // // // // // // // //       // Clean price string
// // // // // // // // // // // // // // // // //       price: h.rate_per_night?.lowest ? h.rate_per_night.lowest.replace(/[^0-9]/g, "") : "N/A",
// // // // // // // // // // // // // // // // //       thumbnail: h.images?.[0]?.thumbnail || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
// // // // // // // // // // // // // // // // //       link: h.link || ""
// // // // // // // // // // // // // // // // //     }));

// // // // // // // // // // // // // // // // //     res.json({ success: true, hotels });

// // // // // // // // // // // // // // // // //   } catch (err) {
// // // // // // // // // // // // // // // // //     console.error("❌ Backend 500 Error:", err.message);
// // // // // // // // // // // // // // // // //     res.status(500).json({ 
// // // // // // // // // // // // // // // // //       error: "Internal Server Error", 
// // // // // // // // // // // // // // // // //       details: err.response?.data?.error || err.message 
// // // // // // // // // // // // // // // // //     });
// // // // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // // // });

// // // // // // // // // // // // // // // // // app.listen(PORT, "0.0.0.0", () => {
// // // // // // // // // // // // // // // // //   console.log(`🚀 Node Server running on http://localhost:${PORT}`);
// // // // // // // // // // // // // // // // // });








// // // // // // // // // // // // // // // // const express = require("express");
// // // // // // // // // // // // // // // // const cors = require("cors");
// // // // // // // // // // // // // // // // const axios = require("axios");
// // // // // // // // // // // // // // // // const Groq = require("groq-sdk"); // 1. Import Groq

// // // // // // // // // // // // // // // // const app = express();
// // // // // // // // // // // // // // // // const PORT = 3000;

// // // // // // // // // // // // // // // // // API Keys
// // // // // // // // // // // // // // // // const SERPAPI_KEY = "00c9a4387fcafade828a6ac5aac8714e024d4e43dd4ee8f1b4d779cd8a0c10d3";
// // // // // // // // // // // // // // // // const GROQ_API_KEY = "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"; // 2. Paste your Groq Key here

// // // // // // // // // // // // // // // // // Initialize Groq
// // // // // // // // // // // // // // // // const groq = new Groq({ apiKey: GROQ_API_KEY });

// // // // // // // // // // // // // // // // app.use(cors());
// // // // // // // // // // // // // // // // app.use(express.json());

// // // // // // // // // // // // // // // // const getFutureDate = (daysToAdd) => {
// // // // // // // // // // // // // // // //   const date = new Date();
// // // // // // // // // // // // // // // //   date.setDate(date.getDate() + daysToAdd);
// // // // // // // // // // // // // // // //   return date.toISOString().split('T')[0];
// // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // /**
// // // // // // // // // // // // // // // //  * NEW: AI Itinerary Endpoint
// // // // // // // // // // // // // // // //  * Generates a 3-day plan using Groq Llama 3
// // // // // // // // // // // // // // // //  */
// // // // // // // // // // // // // // // // app.get("/api/ai-plan", async (req, res) => {
// // // // // // // // // // // // // // // //   const { city } = req.query;
// // // // // // // // // // // // // // // //   if (!city) return res.status(400).json({ error: "City is required" });

// // // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // // //     const chatCompletion = await groq.chat.completions.create({
// // // // // // // // // // // // // // // //       messages: [
// // // // // // // // // // // // // // // //         {
// // // // // // // // // // // // // // // //           role: "user",
// // // // // // // // // // // // // // // //           content: `Give me a short 2-sentence expert travel tip for ${city}. Focus on a hidden gem or a way to save money.`,
// // // // // // // // // // // // // // // //         },
// // // // // // // // // // // // // // // //       ],
// // // // // // // // // // // // // // // //       model: "llama3-8b-8192", // Fast and efficient model
// // // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // // //     const aiTip = chatCompletion.choices[0]?.message?.content || "Enjoy your trip!";
// // // // // // // // // // // // // // // //     res.json({ success: true, tip: aiTip });
// // // // // // // // // // // // // // // //   } catch (err) {
// // // // // // // // // // // // // // // //     console.error("Groq Error:", err.message);
// // // // // // // // // // // // // // // //     res.status(500).json({ error: "AI currently unavailable" });
// // // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // // });

// // // // // // // // // // // // // // // // /**
// // // // // // // // // // // // // // // //  * Hotel Search Endpoint (Existing)
// // // // // // // // // // // // // // // //  */
// // // // // // // // // // // // // // // // app.get("/api/hotels", async (req, res) => {
// // // // // // // // // // // // // // // //   const { q } = req.query;
// // // // // // // // // // // // // // // //   if (!q) return res.status(400).json({ error: "City is required" });

// // // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // // //     const checkIn = getFutureDate(7);
// // // // // // // // // // // // // // // //     const checkOut = getFutureDate(10);

// // // // // // // // // // // // // // // //     const response = await axios.get("https://serpapi.com/search", {
// // // // // // // // // // // // // // // //       params: {
// // // // // // // // // // // // // // // //         engine: "google_hotels",
// // // // // // // // // // // // // // // //         q: q + " hotels",
// // // // // // // // // // // // // // // //         api_key: SERPAPI_KEY,
// // // // // // // // // // // // // // // //         check_in_date: checkIn,
// // // // // // // // // // // // // // // //         check_out_date: checkOut,
// // // // // // // // // // // // // // // //         currency: "USD"
// // // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // // //     if (response.data.error) {
// // // // // // // // // // // // // // // //       return res.status(400).json({ error: response.data.error });
// // // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // // //     const hotels = (response.data.properties || []).map((h) => ({
// // // // // // // // // // // // // // // //       name: h.name || "Starlight Suites",
// // // // // // // // // // // // // // // //       rating: h.overall_rating || "4.5",
// // // // // // // // // // // // // // // //       price: h.rate_per_night?.lowest ? h.rate_per_night.lowest.replace(/[^0-9]/g, "") : "N/A",
// // // // // // // // // // // // // // // //       thumbnail: h.images?.[0]?.thumbnail || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
// // // // // // // // // // // // // // // //       link: h.link || ""
// // // // // // // // // // // // // // // //     }));

// // // // // // // // // // // // // // // //     res.json({ success: true, hotels });

// // // // // // // // // // // // // // // //   } catch (err) {
// // // // // // // // // // // // // // // //     console.error("❌ Backend Error:", err.message);
// // // // // // // // // // // // // // // //     res.status(500).json({ error: "Internal Server Error" });
// // // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // // });

// // // // // // // // // // // // // // // // app.listen(PORT, "0.0.0.0", () => {
// // // // // // // // // // // // // // // //   console.log(`🚀 AI Server running on Port ${PORT}`);
// // // // // // // // // // // // // // // // });










// // // // // // // // // // // // // // // const express = require("express");
// // // // // // // // // // // // // // // const cors = require("cors");
// // // // // // // // // // // // // // // const axios = require("axios");
// // // // // // // // // // // // // // // const Groq = require("groq-sdk");

// // // // // // // // // // // // // // // const app = express();
// // // // // // // // // // // // // // // const PORT = 3000;

// // // // // // // // // // // // // // // // API Keys
// // // // // // // // // // // // // // // const SERPAPI_KEY = "00c9a4387fcafade828a6ac5aac8714e024d4e43dd4ee8f1b4d779cd8a0c10d3";
// // // // // // // // // // // // // // // const GROQ_API_KEY = "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"; 

// // // // // // // // // // // // // // // // Initialize Groq AI
// // // // // // // // // // // // // // // const groq = new Groq({ apiKey: GROQ_API_KEY });

// // // // // // // // // // // // // // // app.use(cors());
// // // // // // // // // // // // // // // app.use(express.json());

// // // // // // // // // // // // // // // // Helper for dynamic dates
// // // // // // // // // // // // // // // const getFutureDate = (daysToAdd) => {
// // // // // // // // // // // // // // //   const date = new Date();
// // // // // // // // // // // // // // //   date.setDate(date.getDate() + daysToAdd);
// // // // // // // // // // // // // // //   return date.toISOString().split('T')[0];
// // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // //**
// // // // // // // // // // // // // // //  * 1. BUDGET ENDPOINT + GROQ AI INSIGHT
// // // // // // // // // // // // // // //  */
// // // // // // // // // // // // // // // app.get("/api/budget", async (req, res) => {
// // // // // // // // // // // // // // //   const totalLimit = 5000;
// // // // // // // // // // // // // // //   const spent = 2120;

// // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // //     const chatCompletion = await groq.chat.completions.create({
// // // // // // // // // // // // // // //       messages: [
// // // // // // // // // // // // // // //         {
// // // // // // // // // // // // // // //           role: "system",
// // // // // // // // // // // // // // //           content: "You are a savvy travel finance expert. Give a single, catchy, 1-sentence tip on how to save money specifically for a tourist based on their budget status."
// // // // // // // // // // // // // // //         },
// // // // // // // // // // // // // // //         {
// // // // // // // // // // // // // // //           role: "user",
// // // // // // // // // // // // // // //           content: `I have spent $${spent} out of my $${totalLimit} budget. Give me one expert tip to make my remaining money last longer.`
// // // // // // // // // // // // // // //         }
// // // // // // // // // // // // // // //       ],
// // // // // // // // // // // // // // //       // UPDATE THIS LINE:
// // // // // // // // // // // // // // //       model: "llama-3.3-70b-versatile", 
// // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // //     const aiTip = chatCompletion.choices[0]?.message?.content || "Avoid tourist traps and eat where locals eat!";

// // // // // // // // // // // // // // //     res.json({
// // // // // // // // // // // // // // //       totalLimit,
// // // // // // // // // // // // // // //       spent,
// // // // // // // // // // // // // // //       aiInsight: aiTip,
// // // // // // // // // // // // // // //       // ... rest of your transactions/breakdown data
// // // // // // // // // // // // // // //     });
// // // // // // // // // // // // // // //   } catch (err) {
// // // // // // // // // // // // // // //     console.error("Groq Budget Error:", err.message);
// // // // // // // // // // // // // // //     res.status(500).json({ error: "Could not fetch AI budget insights" });
// // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // });

// // // // // // // // // // // // // // // /**
// // // // // // // // // // // // // // //  * 2. AI ITINERARY TIP ENDPOINT
// // // // // // // // // // // // // // //  */
// // // // // // // // // // // // // // // app.get("/api/ai-plan", async (req, res) => {
// // // // // // // // // // // // // // //   const { city } = req.query;
// // // // // // // // // // // // // // //   if (!city) return res.status(400).json({ error: "City is required" });

// // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // //     const chatCompletion = await groq.chat.completions.create({
// // // // // // // // // // // // // // //       messages: [
// // // // // // // // // // // // // // //         {
// // // // // // // // // // // // // // //           role: "user",
// // // // // // // // // // // // // // //           content: `Give me a short 2-sentence expert travel tip for ${city}. Focus on a hidden gem or a way to save money.`,
// // // // // // // // // // // // // // //         },
// // // // // // // // // // // // // // //       ],
// // // // // // // // // // // // // // //       // UPDATE THIS LINE:
// // // // // // // // // // // // // // //       model: "llama-3.3-70b-versatile",
// // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // //     const aiTip = chatCompletion.choices[0]?.message?.content || "Enjoy your trip!";
// // // // // // // // // // // // // // //     res.json({ success: true, tip: aiTip });
// // // // // // // // // // // // // // //   } catch (err) {
// // // // // // // // // // // // // // //     console.error("Groq Plan Error:", err.message);
// // // // // // // // // // // // // // //     res.status(500).json({ error: "AI currently unavailable" });
// // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // });

// // // // // // // // // // // // // // // /**
// // // // // // // // // // // // // // //  * 3. HOTEL SEARCH ENDPOINT
// // // // // // // // // // // // // // //  */
// // // // // // // // // // // // // // // app.get("/api/hotels", async (req, res) => {
// // // // // // // // // // // // // // //   const { q } = req.query;
// // // // // // // // // // // // // // //   if (!q) return res.status(400).json({ error: "City is required" });

// // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // //     const checkIn = getFutureDate(7);
// // // // // // // // // // // // // // //     const checkOut = getFutureDate(10);

// // // // // // // // // // // // // // //     console.log(`🔎 Searching: ${q} | Dates: ${checkIn} to ${checkOut}`);

// // // // // // // // // // // // // // //     const response = await axios.get("https://serpapi.com/search", {
// // // // // // // // // // // // // // //       params: {
// // // // // // // // // // // // // // //         engine: "google_hotels",
// // // // // // // // // // // // // // //         q: q + " hotels",
// // // // // // // // // // // // // // //         api_key: SERPAPI_KEY,
// // // // // // // // // // // // // // //         check_in_date: checkIn,
// // // // // // // // // // // // // // //         check_out_date: checkOut,
// // // // // // // // // // // // // // //         currency: "USD"
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // //     if (response.data.error) {
// // // // // // // // // // // // // // //       return res.status(400).json({ error: response.data.error });
// // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // //     const hotels = (response.data.properties || []).map((h) => ({
// // // // // // // // // // // // // // //       name: h.name || "Starlight Suites",
// // // // // // // // // // // // // // //       rating: h.overall_rating || "4.5",
// // // // // // // // // // // // // // //       price: h.rate_per_night?.lowest ? h.rate_per_night.lowest.replace(/[^0-9]/g, "") : "N/A",
// // // // // // // // // // // // // // //       thumbnail: h.images?.[0]?.thumbnail || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
// // // // // // // // // // // // // // //       link: h.link || ""
// // // // // // // // // // // // // // //     }));

// // // // // // // // // // // // // // //     res.json({ success: true, hotels });

// // // // // // // // // // // // // // //   } catch (err) {
// // // // // // // // // // // // // // //     console.error("❌ Hotel API Error:", err.message);
// // // // // // // // // // // // // // //     res.status(500).json({ error: "Internal Server Error" });
// // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // });

// // // // // // // // // // // // // // // app.listen(PORT, "0.0.0.0", () => {
// // // // // // // // // // // // // // //   console.log(`
// // // // // // // // // // // // // // //   🏨 AI Travel Backend Active
// // // // // // // // // // // // // // //   --------------------------
// // // // // // // // // // // // // // //   Port: ${PORT}
// // // // // // // // // // // // // // //   Status: Ready
// // // // // // // // // // // // // // //   AI Model: Llama 3 (Groq)
// // // // // // // // // // // // // // //   `);
// // // // // // // // // // // // // // // });









// // // // // // // // // // // // // // const express = require("express");
// // // // // // // // // // // // // // const cors = require("cors");
// // // // // // // // // // // // // // const axios = require("axios");
// // // // // // // // // // // // // // const Groq = require("groq-sdk");

// // // // // // // // // // // // // // const app = express();
// // // // // // // // // // // // // // const PORT = 3000;

// // // // // // // // // // // // // // // API Keys
// // // // // // // // // // // // // // const SERPAPI_KEY = "00c9a4387fcafade828a6ac5aac8714e024d4e43dd4ee8f1b4d779cd8a0c10d3";
// // // // // // // // // // // // // // const GROQ_API_KEY = "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"; 

// // // // // // // // // // // // // // const groq = new Groq({ apiKey: GROQ_API_KEY });

// // // // // // // // // // // // // // app.use(cors());
// // // // // // // // // // // // // // app.use(express.json());

// // // // // // // // // // // // // // const getFutureDate = (days) => {
// // // // // // // // // // // // // //   const d = new Date();
// // // // // // // // // // // // // //   d.setDate(d.getDate() + days);
// // // // // // // // // // // // // //   return d.toISOString().split('T')[0];
// // // // // // // // // // // // // // };

// // // // // // // // // // // // // // /** 1. BUDGET & AI INSIGHT **/
// // // // // // // // // // // // // // app.get("/api/budget", async (req, res) => {
// // // // // // // // // // // // // //   const totalLimit = 5000;
// // // // // // // // // // // // // //   const spent = 2120;

// // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // //     const chatCompletion = await groq.chat.completions.create({
// // // // // // // // // // // // // //       messages: [
// // // // // // // // // // // // // //         { role: "system", content: "You are a savvy travel finance expert. Give a single, catchy, 1-sentence tip on how to save money specifically for a tourist based on their budget status." },
// // // // // // // // // // // // // //         { role: "user", content: `I have spent $${spent} out of $${totalLimit} budget. Give me one expert tip.` }
// // // // // // // // // // // // // //       ],
// // // // // // // // // // // // // //       model: "llama-3.3-70b-versatile", // UPDATED MODEL
// // // // // // // // // // // // // //     });

// // // // // // // // // // // // // //     const aiTip = chatCompletion.choices[0]?.message?.content || "Avoid tourist traps and eat where locals eat!";

// // // // // // // // // // // // // //     res.json({
// // // // // // // // // // // // // //       totalLimit,
// // // // // // // // // // // // // //       spent,
// // // // // // // // // // // // // //       aiInsight: aiTip,
// // // // // // // // // // // // // //       transactions: [
// // // // // // // // // // // // // //         { id: '1', title: 'Grand Hyatt Stay', category: 'Accommodation', amount: 850, date: 'Apr 02', icon: 'bed-outline' },
// // // // // // // // // // // // // //         { id: '2', title: 'Delta Airlines', category: 'Flights', amount: 1100, date: 'Mar 28', icon: 'airplane-outline' },
// // // // // // // // // // // // // //         { id: '3', title: 'Skyline Dining', category: 'Food', amount: 125, date: 'Apr 03', icon: 'food-outline' },
// // // // // // // // // // // // // //       ],
// // // // // // // // // // // // // //       breakdown: [
// // // // // // // // // // // // // //         { label: "Flights", amount: "$1,100", color: "#3B82F6", percent: 55 },
// // // // // // // // // // // // // //         { label: "Stay", amount: "$850", color: "#8B5CF6", percent: 35 },
// // // // // // // // // // // // // //       ]
// // // // // // // // // // // // // //     });
// // // // // // // // // // // // // //   } catch (err) {
// // // // // // // // // // // // // //     res.status(500).json({ error: "AI Insight failed" });
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // });

// // // // // // // // // // // // // // /** 2. HOTEL SEARCH **/
// // // // // // // // // // // // // // app.get("/api/hotels", async (req, res) => {
// // // // // // // // // // // // // //   const { q } = req.query;
// // // // // // // // // // // // // //   if (!q) return res.status(400).json({ error: "City required" });

// // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // //     const response = await axios.get("https://serpapi.com/search", {
// // // // // // // // // // // // // //       params: {
// // // // // // // // // // // // // //         engine: "google_hotels",
// // // // // // // // // // // // // //         q: q + " hotels",
// // // // // // // // // // // // // //         api_key: SERPAPI_KEY,
// // // // // // // // // // // // // //         check_in_date: getFutureDate(7),
// // // // // // // // // // // // // //         check_out_date: getFutureDate(10),
// // // // // // // // // // // // // //       }
// // // // // // // // // // // // // //     });

// // // // // // // // // // // // // //     const hotels = (response.data.properties || []).map((h) => ({
// // // // // // // // // // // // // //       name: h.name || "Luxury Stay",
// // // // // // // // // // // // // //       rating: h.overall_rating || "4.5",
// // // // // // // // // // // // // //       price: h.rate_per_night?.lowest ? h.rate_per_night.lowest.replace(/[^0-9]/g, "") : "N/A",
// // // // // // // // // // // // // //       thumbnail: h.images?.[0]?.thumbnail || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
// // // // // // // // // // // // // //       link: h.link || ""
// // // // // // // // // // // // // //     }));

// // // // // // // // // // // // // //     res.json({ success: true, hotels });
// // // // // // // // // // // // // //   } catch (err) {
// // // // // // // // // // // // // //     res.status(500).json({ error: "Search failed" });
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // });

// // // // // // // // // // // // // // app.listen(PORT, "0.0.0.0", () => {
// // // // // // // // // // // // // //   console.log(`🚀 AI Server running on http://localhost:${PORT}`);
// // // // // // // // // // // // // // });













// // // // // // // // // // // // // const express = require("express");
// // // // // // // // // // // // // const cors = require("cors");
// // // // // // // // // // // // // const axios = require("axios");
// // // // // // // // // // // // // const Groq = require("groq-sdk");

// // // // // // // // // // // // // const app = express();
// // // // // // // // // // // // // const PORT = 3000;

// // // // // // // // // // // // // // API Keys
// // // // // // // // // // // // // const SERPAPI_KEY = "00c9a4387fcafade828a6ac5aac8714e024d4e43dd4ee8f1b4d779cd8a0c10d3";
// // // // // // // // // // // // // const GROQ_API_KEY = "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"; 

// // // // // // // // // // // // // const groq = new Groq({ apiKey: GROQ_API_KEY });

// // // // // // // // // // // // // app.use(cors());
// // // // // // // // // // // // // app.use(express.json());

// // // // // // // // // // // // // // Helper for dynamic dates
// // // // // // // // // // // // // const getFutureDate = (days) => {
// // // // // // // // // // // // //   const d = new Date();
// // // // // // // // // // // // //   d.setDate(d.getDate() + days);
// // // // // // // // // // // // //   return d.toISOString().split('T')[0];
// // // // // // // // // // // // // };

// // // // // // // // // // // // // /**
// // // // // // // // // // // // //  * 1. AI DYNAMIC BUDGET CALCULATOR
// // // // // // // // // // // // //  * Takes a city name and returns a JSON 3-day budget breakdown
// // // // // // // // // // // // //  */
// // // // // // // // // // // // // app.post("/api/ai-budget", async (req, res) => {
// // // // // // // // // // // // //   const { city } = req.body;
// // // // // // // // // // // // //   if (!city) return res.status(400).json({ error: "City name is required" });

// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     const chatCompletion = await groq.chat.completions.create({
// // // // // // // // // // // // //       messages: [
// // // // // // // // // // // // //         {
// // // // // // // // // // // // //           role: "system",
// // // // // // // // // // // // //           content: "You are a travel budget expert. Return ONLY a JSON object with keys: total (number), stay (number), food (number), transport (number), and tip (1 short sentence). Base values on a 3-day mid-range trip."
// // // // // // // // // // // // //         },
// // // // // // // // // // // // //         {
// // // // // // // // // // // // //           role: "user",
// // // // // // // // // // // // //           content: `Calculate a 3-day travel budget for ${city} in USD.`
// // // // // // // // // // // // //         }
// // // // // // // // // // // // //       ],
// // // // // // // // // // // // //       model: "llama-3.3-70b-versatile",
// // // // // // // // // // // // //       response_format: { type: "json_object" } 
// // // // // // // // // // // // //     });

// // // // // // // // // // // // //     const aiData = JSON.parse(chatCompletion.choices[0].message.content);
// // // // // // // // // // // // //     res.json({ success: true, ...aiData });
// // // // // // // // // // // // //   } catch (err) {
// // // // // // // // // // // // //     console.error("Groq Error:", err.message);
// // // // // // // // // // // // //     res.status(500).json({ error: "AI failed to calculate budget" });
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // });

// // // // // // // // // // // // // /**
// // // // // // // // // // // // //  * 2. HOTEL SEARCH
// // // // // // // // // // // // //  */
// // // // // // // // // // // // // app.get("/api/hotels", async (req, res) => {
// // // // // // // // // // // // //   const { q } = req.query;
// // // // // // // // // // // // //   if (!q) return res.status(400).json({ error: "City required" });

// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     const response = await axios.get("https://serpapi.com/search", {
// // // // // // // // // // // // //       params: {
// // // // // // // // // // // // //         engine: "google_hotels",
// // // // // // // // // // // // //         q: q + " hotels",
// // // // // // // // // // // // //         api_key: SERPAPI_KEY,
// // // // // // // // // // // // //         check_in_date: getFutureDate(7),
// // // // // // // // // // // // //         check_out_date: getFutureDate(10),
// // // // // // // // // // // // //       }
// // // // // // // // // // // // //     });

// // // // // // // // // // // // //     const hotels = (response.data.properties || []).map((h) => ({
// // // // // // // // // // // // //       name: h.name || "Luxury Stay",
// // // // // // // // // // // // //       rating: h.overall_rating || "4.5",
// // // // // // // // // // // // //       price: h.rate_per_night?.lowest ? h.rate_per_night.lowest.replace(/[^0-9]/g, "") : "N/A",
// // // // // // // // // // // // //       thumbnail: h.images?.[0]?.thumbnail || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
// // // // // // // // // // // // //       link: h.link || ""
// // // // // // // // // // // // //     }));

// // // // // // // // // // // // //     res.json({ success: true, hotels });
// // // // // // // // // // // // //   } catch (err) {
// // // // // // // // // // // // //     res.status(500).json({ error: "Search failed" });
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // });

// // // // // // // // // // // // // app.listen(PORT, "0.0.0.0", () => {
// // // // // // // // // // // // //   console.log(`🚀 AI Server running on http://localhost:${PORT}`);
// // // // // // // // // // // // // });








// // // // // // // // // // // // const express = require("express");
// // // // // // // // // // // // const cors = require("cors");
// // // // // // // // // // // // const axios = require("axios");
// // // // // // // // // // // // const Groq = require("groq-sdk");

// // // // // // // // // // // // const app = express();
// // // // // // // // // // // // const PORT = 3000;

// // // // // // // // // // // // // API Keys
// // // // // // // // // // // // const SERPAPI_KEY = "00c9a4387fcafade828a6ac5aac8714e024d4e43dd4ee8f1b4d779cd8a0c10d3";
// // // // // // // // // // // // const GROQ_API_KEY = "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"; 

// // // // // // // // // // // // const groq = new Groq({ apiKey: GROQ_API_KEY });

// // // // // // // // // // // // app.use(cors());
// // // // // // // // // // // // app.use(express.json());

// // // // // // // // // // // // // Helper for dynamic dates
// // // // // // // // // // // // const getFutureDate = (days) => {
// // // // // // // // // // // //   const d = new Date();
// // // // // // // // // // // //   d.setDate(d.getDate() + days);
// // // // // // // // // // // //   return d.toISOString().split('T')[0];
// // // // // // // // // // // // };

// // // // // // // // // // // // /**
// // // // // // // // // // // //  * 1. AI DYNAMIC BUDGET CALCULATOR (5-Day India Based)
// // // // // // // // // // // //  * POST /api/ai-budget { "city": "Goa" }
// // // // // // // // // // // //  */
// // // // // // // // // // // // app.post("/api/ai-budget", async (req, res) => {
// // // // // // // // // // // //   const { city } = req.body;
// // // // // // // // // // // //   if (!city) return res.status(400).json({ error: "City name is required" });

// // // // // // // // // // // //   try {
// // // // // // // // // // // //     console.log(`🤖 AI calculating 5-day INR budget for: ${city}`);

// // // // // // // // // // // //     const chatCompletion = await groq.chat.completions.create({
// // // // // // // // // // // //       messages: [
// // // // // // // // // // // //         {
// // // // // // // // // // // //           role: "system",
// // // // // // // // // // // //           content: `You are an Indian travel expense expert. 
// // // // // // // // // // // //           Return ONLY a JSON object for a 5-day trip in Indian Rupees (INR).
// // // // // // // // // // // //           Structure: { 
// // // // // // // // // // // //             "total": number, 
// // // // // // // // // // // //             "stay": number, 
// // // // // // // // // // // //             "food": number, 
// // // // // // // // // // // //             "transport": number, 
// // // // // // // // // // // //             "tip": "1 short sentence about saving money in this specific city" 
// // // // // // // // // // // //           }. 
// // // // // // // // // // // //           Do not include commas or currency symbols in the numbers.`
// // // // // // // // // // // //         },
// // // // // // // // // // // //         {
// // // // // // // // // // // //           role: "user",
// // // // // // // // // // // //           content: `Calculate a 5-day mid-range travel budget for ${city}, India.`
// // // // // // // // // // // //         }
// // // // // // // // // // // //       ],
// // // // // // // // // // // //       model: "llama-3.3-70b-versatile",
// // // // // // // // // // // //       response_format: { type: "json_object" } 
// // // // // // // // // // // //     });

// // // // // // // // // // // //     const aiData = JSON.parse(chatCompletion.choices[0].message.content);
// // // // // // // // // // // //     res.json({ success: true, ...aiData });
// // // // // // // // // // // //   } catch (err) {
// // // // // // // // // // // //     console.error("Groq AI Error:", err.message);
// // // // // // // // // // // //     res.status(500).json({ error: "AI failed to calculate budget" });
// // // // // // // // // // // //   }
// // // // // // // // // // // // });

// // // // // // // // // // // // /**
// // // // // // // // // // // //  * 2. HOTEL SEARCH (SerpAPI)
// // // // // // // // // // // //  * GET /api/hotels?q=Mumbai
// // // // // // // // // // // //  */
// // // // // // // // // // // // app.get("/api/hotels", async (req, res) => {
// // // // // // // // // // // //   const { q } = req.query;
// // // // // // // // // // // //   if (!q) return res.status(400).json({ error: "City required" });

// // // // // // // // // // // //   try {
// // // // // // // // // // // //     const response = await axios.get("https://serpapi.com/search", {
// // // // // // // // // // // //       params: {
// // // // // // // // // // // //         engine: "google_hotels",
// // // // // // // // // // // //         q: q + " hotels",
// // // // // // // // // // // //         api_key: SERPAPI_KEY,
// // // // // // // // // // // //         check_in_date: getFutureDate(7),
// // // // // // // // // // // //         check_out_date: getFutureDate(12),
// // // // // // // // // // // //         currency: "INR" // Forces SerpAPI to return prices in Rupees
// // // // // // // // // // // //       }
// // // // // // // // // // // //     });

// // // // // // // // // // // //     const hotels = (response.data.properties || []).map((h) => ({
// // // // // // // // // // // //       name: h.name || "Luxury Stay",
// // // // // // // // // // // //       rating: h.overall_rating || "4.2",
// // // // // // // // // // // //       // Extract numeric price from string (e.g., "₹5,000" -> "5000")
// // // // // // // // // // // //       price: h.rate_per_night?.lowest ? h.rate_per_night.lowest.replace(/[^0-9]/g, "") : "N/A",
// // // // // // // // // // // //       thumbnail: h.images?.[0]?.thumbnail || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
// // // // // // // // // // // //       link: h.link || ""
// // // // // // // // // // // //     }));

// // // // // // // // // // // //     res.json({ success: true, hotels });
// // // // // // // // // // // //   } catch (err) {
// // // // // // // // // // // //     console.error("Hotel Search Error:", err.message);
// // // // // // // // // // // //     res.status(500).json({ error: "Search failed" });
// // // // // // // // // // // //   }
// // // // // // // // // // // // });

// // // // // // // // // // // // // Start Server
// // // // // // // // // // // // app.listen(PORT, "0.0.0.0", () => {
// // // // // // // // // // // //   console.log(`
// // // // // // // // // // // //   🚀 AI Travel Server (India Edition)
// // // // // // // // // // // //   ----------------------------------
// // // // // // // // // // // //   Status: Active
// // // // // // // // // // // //   Port: ${PORT}
// // // // // // // // // // // //   Currency: INR (₹)
// // // // // // // // // // // //   AI Model: Llama 3.3
// // // // // // // // // // // //   ----------------------------------
// // // // // // // // // // // //   `);
// // // // // // // // // // // // });














// // // // // // // // // // // const express = require("express");
// // // // // // // // // // // const cors = require("cors");
// // // // // // // // // // // const axios = require("axios");
// // // // // // // // // // // const Groq = require("groq-sdk");

// // // // // // // // // // // const app = express();
// // // // // // // // // // // const PORT = 3000;

// // // // // // // // // // // // API Keys (production madhe .env file madhe thev)
// // // // // // // // // // // const SERPAPI_KEY = "00c9a4387fcafade828a6ac5aac8714e024d4e43dd4ee8f1b4d779cd8a0c10d3";
// // // // // // // // // // // const GROQ_API_KEY = "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"; 

// // // // // // // // // // // const groq = new Groq({ apiKey: GROQ_API_KEY });

// // // // // // // // // // // app.use(cors());
// // // // // // // // // // // app.use(express.json());

// // // // // // // // // // // // Helper for dynamic dates
// // // // // // // // // // // const getFutureDate = (days) => {
// // // // // // // // // // //   const d = new Date();
// // // // // // // // // // //   d.setDate(d.getDate() + days);
// // // // // // // // // // //   return d.toISOString().split('T')[0];
// // // // // // // // // // // };

// // // // // // // // // // // /**
// // // // // // // // // // //  * 1. IMPROVED AI DYNAMIC BUDGET CALCULATOR 
// // // // // // // // // // //  * POST /api/ai-budget 
// // // // // // // // // // //  * Body: { "city": "Goa", "travelers": 4, "days": 5, "tripType": "family" }
// // // // // // // // // // //  */
// // // // // // // // // // // app.post("/api/ai-budget", async (req, res) => {
// // // // // // // // // // //   const { city, travelers = 4, days = 5, tripType = "family" } = req.body;

// // // // // // // // // // //   if (!city) {
// // // // // // // // // // //     return res.status(400).json({ error: "City name is required" });
// // // // // // // // // // //   }

// // // // // // // // // // //   try {
// // // // // // // // // // //     console.log(`🤖 AI calculating ${days}-day ${tripType} budget for: ${city}`);

// // // // // // // // // // //     const chatCompletion = await groq.chat.completions.create({
// // // // // // // // // // //       messages: [
// // // // // // // // // // //         {
// // // // // // // // // // //           role: "system",
// // // // // // // // // // //           content: `You are an expert Indian travel budget planner.
// // // // // // // // // // //           Return ONLY valid JSON object.
// // // // // // // // // // //           For a ${days}-day ${tripType} trip in ${city}, India for ${travelers} people.
// // // // // // // // // // //           Structure must be:
// // // // // // // // // // //           {
// // // // // // // // // // //             "total": number,
// // // // // // // // // // //             "hotel": number,
// // // // // // // // // // //             "food": number,
// // // // // // // // // // //             "transport": number,
// // // // // // // // // // //             "activities": number,
// // // // // // // // // // //             "misc": number,
// // // // // // // // // // //             "perPerson": number,
// // // // // // // // // // //             "tip": "1 short helpful saving tip for this city"
// // // // // // // // // // //           }
// // // // // // // // // // //           All numbers in INR without commas or symbols.
// // // // // // // // // // //           Make it realistic for Indian mid-range family trip.`
// // // // // // // // // // //         },
// // // // // // // // // // //         {
// // // // // // // // // // //           role: "user",
// // // // // // // // // // //           content: `Give realistic ${days}-day budget for ${city}, India.`
// // // // // // // // // // //         }
// // // // // // // // // // //       ],
// // // // // // // // // // //       model: "llama-3.3-70b-versatile",
// // // // // // // // // // //       response_format: { type: "json_object" }
// // // // // // // // // // //     });

// // // // // // // // // // //     let aiData = JSON.parse(chatCompletion.choices[0].message.content);

// // // // // // // // // // //     // Extra safety
// // // // // // // // // // //     aiData.total = aiData.total || (aiData.hotel + aiData.food + aiData.transport + aiData.activities + aiData.misc);
// // // // // // // // // // //     aiData.perPerson = Math.round(aiData.total / travelers);

// // // // // // // // // // //     res.json({ 
// // // // // // // // // // //       success: true, 
// // // // // // // // // // //       city,
// // // // // // // // // // //       days,
// // // // // // // // // // //       travelers,
// // // // // // // // // // //       tripType,
// // // // // // // // // // //       ...aiData 
// // // // // // // // // // //     });

// // // // // // // // // // //   } catch (err) {
// // // // // // // // // // //     console.error("Groq AI Budget Error:", err.message);
// // // // // // // // // // //     res.status(500).json({ error: "Failed to generate AI budget" });
// // // // // // // // // // //   }
// // // // // // // // // // // });

// // // // // // // // // // // /**
// // // // // // // // // // //  * 2. HOTEL SEARCH (Improved)
// // // // // // // // // // //  * GET /api/hotels?q=Goa&checkIn=2026-04-10&checkOut=2026-04-15
// // // // // // // // // // //  */
// // // // // // // // // // // app.get("/api/hotels", async (req, res) => {
// // // // // // // // // // //   const { q, checkIn, checkOut } = req.query;

// // // // // // // // // // //   if (!q) {
// // // // // // // // // // //     return res.status(400).json({ error: "City is required" });
// // // // // // // // // // //   }

// // // // // // // // // // //   try {
// // // // // // // // // // //     const response = await axios.get("https://serpapi.com/search", {
// // // // // // // // // // //       params: {
// // // // // // // // // // //         engine: "google_hotels",
// // // // // // // // // // //         q: `${q} hotels`,
// // // // // // // // // // //         api_key: SERPAPI_KEY,
// // // // // // // // // // //         check_in_date: checkIn || getFutureDate(7),
// // // // // // // // // // //         check_out_date: checkOut || getFutureDate(12),
// // // // // // // // // // //         currency: "INR",
// // // // // // // // // // //         hl: "en",
// // // // // // // // // // //         gl: "in"   // India focused
// // // // // // // // // // //       }
// // // // // // // // // // //     });

// // // // // // // // // // //     const hotels = (response.data.properties || []).slice(0, 15).map((h) => ({
// // // // // // // // // // //       name: h.name || "Unknown Hotel",
// // // // // // // // // // //       rating: h.overall_rating || 4.2,
// // // // // // // // // // //       price: h.rate_per_night?.lowest 
// // // // // // // // // // //         ? parseInt(h.rate_per_night.lowest.replace(/[^0-9]/g, "")) || 0 
// // // // // // // // // // //         : 0,
// // // // // // // // // // //       thumbnail: h.images?.[0]?.thumbnail || "https://picsum.photos/id/1015/400/250",
// // // // // // // // // // //       location: h.location || q,
// // // // // // // // // // //       link: h.link || ""
// // // // // // // // // // //     }));

// // // // // // // // // // //     res.json({ 
// // // // // // // // // // //       success: true, 
// // // // // // // // // // //       city: q,
// // // // // // // // // // //       count: hotels.length,
// // // // // // // // // // //       hotels 
// // // // // // // // // // //     });

// // // // // // // // // // //   } catch (err) {
// // // // // // // // // // //     console.error("Hotel Search Error:", err.message);
// // // // // // // // // // //     res.status(500).json({ error: "Failed to fetch hotels" });
// // // // // // // // // // //   }
// // // // // // // // // // // });

// // // // // // // // // // // // Start Server
// // // // // // // // // // // app.listen(PORT, "0.0.0.0", () => {
// // // // // // // // // // //   console.log(`
// // // // // // // // // // //   🚀 AI Travel Planner Server (Updated - April 2026)
// // // // // // // // // // //   ------------------------------------------------
// // // // // // // // // // //   Status     : Running
// // // // // // // // // // //   Port       : ${PORT}
// // // // // // // // // // //   Currency   : INR (₹)
// // // // // // // // // // //   AI Model   : Llama 3.3 70B
// // // // // // // // // // //   Features   : AI Budget + Hotel Search (Family Ready)
// // // // // // // // // // //   ------------------------------------------------
// // // // // // // // // // //   Endpoints:
// // // // // // // // // // //   → POST /api/ai-budget
// // // // // // // // // // //   → GET  /api/hotels?q=Goa
// // // // // // // // // // //   `);
// // // // // // // // // // // });














// // // // // // // // // // const express = require("express");
// // // // // // // // // // const cors = require("cors");
// // // // // // // // // // const axios = require("axios");
// // // // // // // // // // const Groq = require("groq-sdk");

// // // // // // // // // // const app = express();
// // // // // // // // // // const PORT = 3000;

// // // // // // // // // // // ====================== API KEYS ======================
// // // // // // // // // // const SERPAPI_KEY = "00c9a4387fcafade828a6ac5aac8714e024d4e43dd4ee8f1b4d779cd8a0c10d3";
// // // // // // // // // // const GROQ_API_KEY = "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"; 

// // // // // // // // // // const groq = new Groq({ apiKey: GROQ_API_KEY });

// // // // // // // // // // // ====================== MIDDLEWARE ======================
// // // // // // // // // // app.use(cors());
// // // // // // // // // // app.use(express.json());

// // // // // // // // // // // Helper Function - Future Date
// // // // // // // // // // const getFutureDate = (days) => {
// // // // // // // // // //   const d = new Date();
// // // // // // // // // //   d.setDate(d.getDate() + days);
// // // // // // // // // //   return d.toISOString().split('T')[0];
// // // // // // // // // // };

// // // // // // // // // // // ====================== 1. AI BUDGET ENDPOINT ======================
// // // // // // // // // // app.post("/api/ai-budget", async (req, res) => {
// // // // // // // // // //   const { city, travelers = 4, days = 5, tripType = "family" } = req.body;

// // // // // // // // // //   if (!city) {
// // // // // // // // // //     return res.status(400).json({ 
// // // // // // // // // //       success: false, 
// // // // // // // // // //       error: "City name is required" 
// // // // // // // // // //     });
// // // // // // // // // //   }

// // // // // // // // // //   try {
// // // // // // // // // //     console.log(`💰 AI Budget Request → ${city} | ${travelers} people | ${days} days`);

// // // // // // // // // //     const systemPrompt = `You are an expert Indian family travel budget planner for 2026.
// // // // // // // // // // Return ONLY a valid JSON object with realistic mid-range budget for a ${days}-day ${tripType} trip to ${city}, India for ${travelers} people.

// // // // // // // // // // Exact JSON structure:
// // // // // // // // // // {
// // // // // // // // // //   "total": number,
// // // // // // // // // //   "hotel": number,
// // // // // // // // // //   "food": number,
// // // // // // // // // //   "transport": number,
// // // // // // // // // //   "activities": number,
// // // // // // // // // //   "misc": number,
// // // // // // // // // //   "perPerson": number,
// // // // // // // // // //   "tip": "One short practical saving tip specific to this city"
// // // // // // // // // // }

// // // // // // // // // // All amounts in INR (no commas, no ₹ symbol).
// // // // // // // // // // Make numbers practical and realistic for Indian middle-class family trip.`;

// // // // // // // // // //     const chatCompletion = await groq.chat.completions.create({
// // // // // // // // // //       messages: [
// // // // // // // // // //         { role: "system", content: systemPrompt },
// // // // // // // // // //         { role: "user", content: `Calculate proper budget for ${city}, India.` }
// // // // // // // // // //       ],
// // // // // // // // // //       model: "llama-3.3-70b-versatile",
// // // // // // // // // //       response_format: { type: "json_object" }
// // // // // // // // // //     });

// // // // // // // // // //     let aiData = JSON.parse(chatCompletion.choices[0].message.content);

// // // // // // // // // //     // Safety calculations
// // // // // // // // // //     aiData.total = aiData.total || 
// // // // // // // // // //       (aiData.hotel + aiData.food + aiData.transport + aiData.activities + aiData.misc);

// // // // // // // // // //     aiData.perPerson = Math.round(aiData.total / travelers);

// // // // // // // // // //     // Round to nearest 100 for clean look
// // // // // // // // // //     Object.keys(aiData).forEach(key => {
// // // // // // // // // //       if (typeof aiData[key] === "number") {
// // // // // // // // // //         aiData[key] = Math.round(aiData[key] / 100) * 100;
// // // // // // // // // //       }
// // // // // // // // // //     });

// // // // // // // // // //     res.json({
// // // // // // // // // //       success: true,
// // // // // // // // // //       city: city.charAt(0).toUpperCase() + city.slice(1),
// // // // // // // // // //       days,
// // // // // // // // // //       travelers,
// // // // // // // // // //       tripType,
// // // // // // // // // //       ...aiData
// // // // // // // // // //     });

// // // // // // // // // //   } catch (err) {
// // // // // // // // // //     console.error("AI Budget Error:", err.message);
// // // // // // // // // //     res.status(500).json({
// // // // // // // // // //       success: false,
// // // // // // // // // //       error: "Failed to generate budget",
// // // // // // // // // //       fallback: {
// // // // // // // // // //         total: 52000,
// // // // // // // // // //         hotel: 22000,
// // // // // // // // // //         food: 9500,
// // // // // // // // // //         transport: 6500,
// // // // // // // // // //         activities: 8500,
// // // // // // // // // //         misc: 5500,
// // // // // // // // // //         perPerson: 13000,
// // // // // // // // // //         tip: "Book hotels and flights early to get better deals."
// // // // // // // // // //       }
// // // // // // // // // //     });
// // // // // // // // // //   }
// // // // // // // // // // });

// // // // // // // // // // // ====================== 2. HOTEL SEARCH ENDPOINT ======================
// // // // // // // // // // app.get("/api/hotels", async (req, res) => {
// // // // // // // // // //   const { q, checkIn, checkOut } = req.query;

// // // // // // // // // //   if (!q) {
// // // // // // // // // //     return res.status(400).json({ 
// // // // // // // // // //       success: false, 
// // // // // // // // // //       error: "City name is required (use ?q=Goa)" 
// // // // // // // // // //     });
// // // // // // // // // //   }

// // // // // // // // // //   try {
// // // // // // // // // //     const response = await axios.get("https://serpapi.com/search", {
// // // // // // // // // //       params: {
// // // // // // // // // //         engine: "google_hotels",
// // // // // // // // // //         q: `${q} hotels`,
// // // // // // // // // //         api_key: SERPAPI_KEY,
// // // // // // // // // //         check_in_date: checkIn || getFutureDate(7),
// // // // // // // // // //         check_out_date: checkOut || getFutureDate(12),
// // // // // // // // // //         currency: "INR",
// // // // // // // // // //         hl: "en",
// // // // // // // // // //         gl: "in"
// // // // // // // // // //       }
// // // // // // // // // //     });

// // // // // // // // // //     const hotels = (response.data.properties || []).slice(0, 12).map((h) => ({
// // // // // // // // // //       id: h.id || Math.random().toString(36).substring(7),
// // // // // // // // // //       name: h.name || "Luxury Resort",
// // // // // // // // // //       rating: h.overall_rating || 4.3,
// // // // // // // // // //       price: h.rate_per_night?.lowest 
// // // // // // // // // //         ? parseInt(h.rate_per_night.lowest.replace(/[^0-9]/g, "")) || 4500 
// // // // // // // // // //         : 4500,
// // // // // // // // // //       thumbnail: h.images?.[0]?.thumbnail || "https://picsum.photos/id/1015/400/250",
// // // // // // // // // //       location: h.location || q,
// // // // // // // // // //       link: h.link || ""
// // // // // // // // // //     }));

// // // // // // // // // //     res.json({
// // // // // // // // // //       success: true,
// // // // // // // // // //       city: q,
// // // // // // // // // //       count: hotels.length,
// // // // // // // // // //       hotels
// // // // // // // // // //     });

// // // // // // // // // //   } catch (err) {
// // // // // // // // // //     console.error("Hotel Search Error:", err.message);
// // // // // // // // // //     res.status(500).json({
// // // // // // // // // //       success: false,
// // // // // // // // // //       error: "Failed to fetch hotels. Please try again."
// // // // // // // // // //     });
// // // // // // // // // //   }
// // // // // // // // // // });

// // // // // // // // // // // ====================== SERVER START ======================
// // // // // // // // // // app.listen(PORT, "0.0.0.0", () => {
// // // // // // // // // //   console.log(`
// // // // // // // // // //   🚀 AI Travel Planner Server - Updated (April 2026)
// // // // // // // // // //   ================================================
// // // // // // // // // //   Status     : ✅ Running
// // // // // // // // // //   Port       : ${PORT}
// // // // // // // // // //   Currency   : INR (₹)
// // // // // // // // // //   AI Model   : Llama 3.3 70B
// // // // // // // // // //   Features   : AI Budget + Smart Hotel Search
  
// // // // // // // // // //   Endpoints:
// // // // // // // // // //   → POST http://localhost:3000/api/ai-budget
// // // // // // // // // //   → GET  http://localhost:3000/api/hotels?q=Goa

// // // // // // // // // //   Ready for React Native frontend!
// // // // // // // // // //   `);
// // // // // // // // // // });











// // // // // // // // // const express = require("express");
// // // // // // // // // const cors = require("cors");
// // // // // // // // // const axios = require("axios");
// // // // // // // // // const Groq = require("groq-sdk");

// // // // // // // // // const app = express();
// // // // // // // // // const PORT = 3000;

// // // // // // // // // // ====================== CONFIGURATION ======================
// // // // // // // // // // Note: In production, move these to a .env file!
// // // // // // // // // const SERPAPI_KEY = "00c9a4387fcafade828a6ac5aac8714e024d4e43dd4ee8f1b4d779cd8a0c10d3";
// // // // // // // // // const GROQ_API_KEY = "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"; 

// // // // // // // // // const groq = new Groq({ apiKey: GROQ_API_KEY });

// // // // // // // // // app.use(cors());
// // // // // // // // // app.use(express.json());

// // // // // // // // // // Helper for dynamic dates
// // // // // // // // // const getFutureDate = (days) => {
// // // // // // // // //   const d = new Date();
// // // // // // // // //   d.setDate(d.getDate() + days);
// // // // // // // // //   return d.toISOString().split('T')[0];
// // // // // // // // // };

// // // // // // // // // // ====================== 1. AI BUDGET ENDPOINT ======================
// // // // // // // // // app.post("/api/ai-budget", async (req, res) => {
// // // // // // // // //   const { city, travelers = 2, days = 3, tripType = "mid-range" } = req.body;

// // // // // // // // //   if (!city) {
// // // // // // // // //     return res.status(400).json({ success: false, error: "Destination city is required" });
// // // // // // // // //   }

// // // // // // // // //   try {
// // // // // // // // //     const systemPrompt = `You are a professional Indian Travel Consultant for the year 2026.
// // // // // // // // //     Return ONLY a valid JSON object for a ${days}-day ${tripType} trip to ${city} for ${travelers} people.
    
// // // // // // // // //     Requirements:
// // // // // // // // //     - Currency: INR
// // // // // // // // //     - Round values to nearest 100.
// // // // // // // // //     - Focus on realistic 2026 prices (accounting for inflation).
    
// // // // // // // // //     Structure:
// // // // // // // // //     {
// // // // // // // // //       "hotel": number,
// // // // // // // // //       "food": number,
// // // // // // // // //       "transport": number,
// // // // // // // // //       "activities": number,
// // // // // // // // //       "misc": number,
// // // // // // // // //       "tip": "string"
// // // // // // // // //     }`;

// // // // // // // // //     const completion = await groq.chat.completions.create({
// // // // // // // // //       messages: [
// // // // // // // // //         { role: "system", content: systemPrompt },
// // // // // // // // //         { role: "user", content: `Calculate a detailed budget for ${city}.` }
// // // // // // // // //       ],
// // // // // // // // //       model: "llama-3.3-70b-versatile",
// // // // // // // // //       response_format: { type: "json_object" }
// // // // // // // // //     });

// // // // // // // // //     const aiResponse = JSON.parse(completion.choices[0].message.content);

// // // // // // // // //     // Calculate totals on the server to ensure math accuracy
// // // // // // // // //     const hotelTotal = aiResponse.hotel || 0;
// // // // // // // // //     const foodTotal = aiResponse.food || 0;
// // // // // // // // //     const transportTotal = aiResponse.transport || 0;
// // // // // // // // //     const activitiesTotal = aiResponse.activities || 0;
// // // // // // // // //     const miscTotal = aiResponse.misc || 0;

// // // // // // // // //     const grandTotal = hotelTotal + foodTotal + transportTotal + activitiesTotal + miscTotal;
// // // // // // // // //     const perPerson = Math.round(grandTotal / travelers);

// // // // // // // // //     res.json({
// // // // // // // // //       success: true,
// // // // // // // // //       data: {
// // // // // // // // //         destination: city,
// // // // // // // // //         travelers,
// // // // // // // // //         days,
// // // // // // // // //         currency: "INR",
// // // // // // // // //         breakdown: {
// // // // // // // // //           accommodation: hotelTotal,
// // // // // // // // //           dining: foodTotal,
// // // // // // // // //           commute: transportTotal,
// // // // // // // // //           sightseeing: activitiesTotal,
// // // // // // // // //           emergency_misc: miscTotal
// // // // // // // // //         },
// // // // // // // // //         totalBudget: grandTotal,
// // // // // // // // //         costPerPerson: perPerson,
// // // // // // // // //         travelTip: aiResponse.tip || "Carry a power bank and local cash."
// // // // // // // // //       }
// // // // // // // // //     });

// // // // // // // // //   } catch (err) {
// // // // // // // // //     console.error("Budget Gen Error:", err.message);
// // // // // // // // //     res.status(500).json({ success: false, error: "AI failed to crunch the numbers." });
// // // // // // // // //   }
// // // // // // // // // });

// // // // // // // // // // ====================== 2. HOTEL SEARCH ENDPOINT ======================
// // // // // // // // // app.get("/api/hotels", async (req, res) => {
// // // // // // // // //   const { q, checkIn, checkOut } = req.query;

// // // // // // // // //   if (!q) return res.status(400).json({ error: "Where are we going? (q=city)" });

// // // // // // // // //   try {
// // // // // // // // //     const response = await axios.get("https://serpapi.com/search", {
// // // // // // // // //       params: {
// // // // // // // // //         engine: "google_hotels",
// // // // // // // // //         q: `${q} best hotels`,
// // // // // // // // //         api_key: SERPAPI_KEY,
// // // // // // // // //         check_in_date: checkIn || getFutureDate(14),
// // // // // // // // //         check_out_date: checkOut || getFutureDate(17),
// // // // // // // // //         currency: "INR",
// // // // // // // // //         gl: "in"
// // // // // // // // //       }
// // // // // // // // //     });

// // // // // // // // //     const results = (response.data.properties || []).slice(0, 8).map(h => ({
// // // // // // // // //       name: h.name,
// // // // // // // // //       rating: h.overall_rating || "N/A",
// // // // // // // // //       pricePerNight: h.rate_per_night?.lowest || "Contact Hotel",
// // // // // // // // //       image: h.images?.[0]?.thumbnail || "https://via.placeholder.com/300",
// // // // // // // // //       link: h.link
// // // // // // // // //     }));

// // // // // // // // //     res.json({ success: true, city: q, hotels: results });

// // // // // // // // //   } catch (err) {
// // // // // // // // //     res.status(500).json({ success: false, error: "Google Hotel API is being shy. Try again later." });
// // // // // // // // //   }
// // // // // // // // // });

// // // // // // // // // app.listen(PORT, () => {
// // // // // // // // //   console.log(`✅ Server floating on http://localhost:${PORT}`);
// // // // // // // // // });











// // // // // // // // // --------
// // // // // // // // const express = require("express");
// // // // // // // // const cors = require("cors");
// // // // // // // // const axios = require("axios");
// // // // // // // // const Groq = require("groq-sdk");

// // // // // // // // const app = express();
// // // // // // // // const PORT = 3000;

// // // // // // // // // ====================== CONFIGURATION ======================
// // // // // // // // const SERPAPI_KEY = "00c9a4387fcafade828a6ac5aac8714e024d4e43dd4ee8f1b4d779cd8a0c10d3";
// // // // // // // // const GROQ_API_KEY = "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"; 

// // // // // // // // const groq = new Groq({ apiKey: GROQ_API_KEY });

// // // // // // // // app.use(cors());
// // // // // // // // app.use(express.json());

// // // // // // // // // Helper for dynamic dates
// // // // // // // // const getFutureDate = (days) => {
// // // // // // // //   const d = new Date();
// // // // // // // //   d.setDate(d.getDate() + days);
// // // // // // // //   return d.toISOString().split('T')[0];
// // // // // // // // };

// // // // // // // // // ====================== 1. AI BUDGET ENDPOINT ======================
// // // // // // // // app.post("/api/ai-budget", async (req, res) => {
// // // // // // // //   // New Fields: tripVibe (Budget/Mid-range/Luxury) and interests
// // // // // // // //   const { city, travelers = 2, days = 3, tripVibe = "Mid-range", interests = "sightseeing" } = req.body;

// // // // // // // //   if (!city) {
// // // // // // // //     return res.status(400).json({ success: false, error: "Destination city is required" });
// // // // // // // //   }

// // // // // // // //   try {
// // // // // // // //     const systemPrompt = `You are a professional 2026 Indian Travel Consultant.
// // // // // // // //     Provide a realistic budget for ${city}.
    
// // // // // // // //     Traveler Profile:
// // // // // // // //     - Style: ${tripVibe}
// // // // // // // //     - Group: ${travelers} people
// // // // // // // //     - Duration: ${days} days
// // // // // // // //     - Focus: ${interests}
    
// // // // // // // //     Requirements:
// // // // // // // //     - Currency: INR
// // // // // // // //     - Factor in 2026 inflation.
// // // // // // // //     - Return ONLY a valid JSON object.
    
// // // // // // // //     Structure:
// // // // // // // //     {
// // // // // // // //       "hotel_per_night": number,
// // // // // // // //       "food_per_person_per_day": number,
// // // // // // // //       "local_transport_total": number,
// // // // // // // //       "activities_total": number,
// // // // // // // //       "misc_total": number,
// // // // // // // //       "expert_tip": "string (Specific to ${city} and ${interests})"
// // // // // // // //     }`;

// // // // // // // //     const completion = await groq.chat.completions.create({
// // // // // // // //       messages: [
// // // // // // // //         { role: "system", content: systemPrompt },
// // // // // // // //         { role: "user", content: `Calculate detailed 2026 costs for ${city}.` }
// // // // // // // //       ],
// // // // // // // //       model: "llama-3.3-70b-versatile",
// // // // // // // //       response_format: { type: "json_object" }
// // // // // // // //     });

// // // // // // // //     const ai = JSON.parse(completion.choices[0].message.content);

// // // // // // // //     // Precise Math Calculations
// // // // // // // //     const hotelTotal = (ai.hotel_per_night || 0) * days;
// // // // // // // //     const foodTotal = (ai.food_per_person_per_day || 0) * days * travelers;
// // // // // // // //     const transportTotal = ai.local_transport_total || 0;
// // // // // // // //     const activitiesTotal = ai.activities_total || 0;
// // // // // // // //     const miscTotal = ai.misc_total || 0;

// // // // // // // //     const grandTotal = hotelTotal + foodTotal + transportTotal + activitiesTotal + miscTotal;

// // // // // // // //     res.json({
// // // // // // // //       success: true,
// // // // // // // //       data: {
// // // // // // // //         destination: city,
// // // // // // // //         travelers,
// // // // // // // //         days,
// // // // // // // //         vibe: tripVibe,
// // // // // // // //         totalBudget: grandTotal,
// // // // // // // //         costPerPerson: Math.round(grandTotal / travelers),
// // // // // // // //         breakdown: {
// // // // // // // //           accommodation: hotelTotal,
// // // // // // // //           dining: foodTotal,
// // // // // // // //           commute: transportTotal,
// // // // // // // //           sightseeing: activitiesTotal,
// // // // // // // //           emergency_misc: miscTotal
// // // // // // // //         },
// // // // // // // //         travelTip: ai.expert_tip
// // // // // // // //       }
// // // // // // // //     });

// // // // // // // //   } catch (err) {
// // // // // // // //     console.error("Budget Error:", err.message);
// // // // // // // //     res.status(500).json({ success: false, error: "AI failed to generate budget." });
// // // // // // // //   }
// // // // // // // // });

// // // // // // // // // ====================== 2. HOTEL SEARCH ENDPOINT ======================
// // // // // // // // app.get("/api/hotels", async (req, res) => {
// // // // // // // //   const { q, checkIn, checkOut } = req.query;

// // // // // // // //   if (!q) return res.status(400).json({ error: "City query is required" });

// // // // // // // //   try {
// // // // // // // //     const response = await axios.get("https://serpapi.com/search", {
// // // // // // // //       params: {
// // // // // // // //         engine: "google_hotels",
// // // // // // // //         q: `${q} ${req.query.vibe || ''} hotels`, // Added vibe to search query
// // // // // // // //         api_key: SERPAPI_KEY,
// // // // // // // //         check_in_date: checkIn || getFutureDate(14),
// // // // // // // //         check_out_date: checkOut || getFutureDate(17),
// // // // // // // //         currency: "INR",
// // // // // // // //         gl: "in"
// // // // // // // //       }
// // // // // // // //     });

// // // // // // // //     const results = (response.data.properties || []).slice(0, 8).map(h => ({
// // // // // // // //       name: h.name,
// // // // // // // //       rating: h.overall_rating || "N/A",
// // // // // // // //       pricePerNight: h.rate_per_night?.lowest || "Contact Hotel",
// // // // // // // //       image: h.images?.[0]?.thumbnail || "https://via.placeholder.com/300",
// // // // // // // //       link: h.link
// // // // // // // //     }));

// // // // // // // //     res.json({ success: true, city: q, hotels: results });

// // // // // // // //   } catch (err) {
// // // // // // // //     res.status(500).json({ success: false, error: "Hotel search failed." });
// // // // // // // //   }
// // // // // // // // });

// // // // // // // // app.listen(PORT, () => {
// // // // // // // //   console.log(`✅ Travel Server active on http://localhost:${PORT}`);
// // // // // // // // });












// // // // // // // // // // // // // // // // // // // const express = require("express");
// // // // // // // // // // // // // // // // // // // const cors = require("cors");
// // // // // // // // // // // // // // // // // // // const axios = require("axios");
// // // // // // // // // // // // // // // // // // // const path = require("path");

// // // // // // // // // // // // // // // // // // // const app = express();
// // // // // // // // // // // // // // // // // // // const PORT = 3000;

// // // // // // // // // // // // // // // // // // // // ⚠️  PASTE YOUR SERPAPI KEY HERE
// // // // // // // // // // // // // // // // // // // const SERPAPI_KEY = "00c9a4387fcafade828a6ac5aac8714e024d4e43dd4ee8f1b4d779cd8a0c10d3";

// // // // // // // // // // // // // // // // // // // app.use(cors());
// // // // // // // // // // // // // // // // // // // app.use(express.json());

// // // // // // // // // // // // // // // // // // // // Serve the public HTML file
// // // // // // // // // // // // // // // // // // // app.use(express.static(path.join(__dirname, "public")));

// // // // // // // // // // // // // // // // // // // // Hotel Search Endpoint
// // // // // // // // // // // // // // // // // // // // GET /api/hotels?q=Paris&check_in=2025-06-01&check_out=2025-06-05&adults=2
// // // // // // // // // // // // // // // // // // // app.get("/api/hotels", async (req, res) => {
// // // // // // // // // // // // // // // // // // //   const { q, check_in, check_out, adults = 2, currency = "USD" } = req.query;

// // // // // // // // // // // // // // // // // // //   if (!q) {
// // // // // // // // // // // // // // // // // // //     return res.status(400).json({ error: "Missing required param: q (location)" });
// // // // // // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // // // // // //     const params = {
// // // // // // // // // // // // // // // // // // //       engine: "google_hotels",
// // // // // // // // // // // // // // // // // // //       q,
// // // // // // // // // // // // // // // // // // //       check_in_date: check_in,
// // // // // // // // // // // // // // // // // // //       check_out_date: check_out,
// // // // // // // // // // // // // // // // // // //       adults,
// // // // // // // // // // // // // // // // // // //       currency,
// // // // // // // // // // // // // // // // // // //       api_key: SERPAPI_KEY,
// // // // // // // // // // // // // // // // // // //     };

// // // // // // // // // // // // // // // // // // //     const response = await axios.get("https://serpapi.com/search", { params });

// // // // // // // // // // // // // // // // // // //     const hotels = (response.data.properties || []).map((h) => ({
// // // // // // // // // // // // // // // // // // //       name: h.name,
// // // // // // // // // // // // // // // // // // //       description: h.description || "",
// // // // // // // // // // // // // // // // // // //       rating: h.overall_rating,
// // // // // // // // // // // // // // // // // // //       reviews: h.reviews,
// // // // // // // // // // // // // // // // // // //       price: h.rate_per_night?.lowest || "N/A",
// // // // // // // // // // // // // // // // // // //       total_price: h.total_rate?.lowest || "N/A",
// // // // // // // // // // // // // // // // // // //       thumbnail: h.images?.[0]?.thumbnail || "",
// // // // // // // // // // // // // // // // // // //       link: h.link || "",
// // // // // // // // // // // // // // // // // // //       amenities: h.amenities || [],
// // // // // // // // // // // // // // // // // // //     }));

// // // // // // // // // // // // // // // // // // //     res.json({ hotels, total: hotels.length });
// // // // // // // // // // // // // // // // // // //   } catch (err) {
// // // // // // // // // // // // // // // // // // //     console.error("SerpAPI error:", err.response?.data || err.message);
// // // // // // // // // // // // // // // // // // //     res.status(500).json({
// // // // // // // // // // // // // // // // // // //       error: "Failed to fetch hotels",
// // // // // // // // // // // // // // // // // // //       details: err.response?.data?.error || err.message,
// // // // // // // // // // // // // // // // // // //     });
// // // // // // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // // // // // });

// // // // // // // // // // // // // // // // // // // app.listen(PORT, () => {
// // // // // // // // // // // // // // // // // // //   console.log(`\n🏨  Hotel Search API server running at http://localhost:${PORT}`);
// // // // // // // // // // // // // // // // // // //   console.log(`   Open http://localhost:${PORT} in your browser\n`);
// // // // // // // // // // // // // // // // // // // });











// // // // // // // // // // // // // // // // // // const express = require("express");
// // // // // // // // // // // // // // // // // // const cors = require("cors");
// // // // // // // // // // // // // // // // // // const axios = require("axios");

// // // // // // // // // // // // // // // // // // const app = express();
// // // // // // // // // // // // // // // // // // const PORT = 3000;

// // // // // // // // // // // // // // // // // // const SERPAPI_KEY = "00c9a4387fcafade828a6ac5aac8714e024d4e43dd4ee8f1b4d779cd8a0c10d3";

// // // // // // // // // // // // // // // // // // app.use(cors());
// // // // // // // // // // // // // // // // // // app.use(express.json());

// // // // // // // // // // // // // // // // // // // Helper function to get YYYY-MM-DD date strings
// // // // // // // // // // // // // // // // // // const getFutureDate = (daysAhead) => {
// // // // // // // // // // // // // // // // // //   const date = new Date();
// // // // // // // // // // // // // // // // // //   date.setDate(date.getDate() + daysAhead);
// // // // // // // // // // // // // // // // // //   return date.toISOString().split('T')[0];
// // // // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // // // app.get("/api/hotels", async (req, res) => {
// // // // // // // // // // // // // // // // // //   const { q } = req.query;

// // // // // // // // // // // // // // // // // //   if (!q) {
// // // // // // // // // // // // // // // // // //     return res.status(400).json({ error: "Place name is required" });
// // // // // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // // // // //   // Generate valid future dates
// // // // // // // // // // // // // // // // // //   const checkIn = getFutureDate(1);  // Tomorrow
// // // // // // // // // // // // // // // // // //   const checkOut = getFutureDate(4); // 4 days from now

// // // // // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // // // // //     console.log(`🚀 Searching: ${q} | Dates: ${checkIn} to ${checkOut}`);

// // // // // // // // // // // // // // // // // //     const response = await axios.get("https://serpapi.com/search", {
// // // // // // // // // // // // // // // // // //       params: {
// // // // // // // // // // // // // // // // // //         engine: "google_hotels",
// // // // // // // // // // // // // // // // // //         q: q + " hotels",
// // // // // // // // // // // // // // // // // //         api_key: SERPAPI_KEY,
// // // // // // // // // // // // // // // // // //         currency: "USD",
// // // // // // // // // // // // // // // // // //         check_in_date: checkIn,
// // // // // // // // // // // // // // // // // //         check_out_date: checkOut,
// // // // // // // // // // // // // // // // // //         adults: 2
// // // // // // // // // // // // // // // // // //       },
// // // // // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // // // // //     // Check if SerpAPI returned an error in the JSON body
// // // // // // // // // // // // // // // // // //     if (response.data.error) {
// // // // // // // // // // // // // // // // // //         return res.status(400).json({ error: response.data.error });
// // // // // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // // // // //     const rawHotels = response.data.properties || [];
// // // // // // // // // // // // // // // // // //     const hotels = rawHotels.map((h) => ({
// // // // // // // // // // // // // // // // // //       name: h.name || "Elite Stay",
// // // // // // // // // // // // // // // // // //       rating: h.overall_rating || "4.2",
// // // // // // // // // // // // // // // // // //       reviews: h.reviews || "0",
// // // // // // // // // // // // // // // // // //       price: h.rate_per_night?.lowest ? h.rate_per_night.lowest.replace(/[^0-9]/g, "") : "199",
// // // // // // // // // // // // // // // // // //       thumbnail: h.images?.[0]?.thumbnail || "https://images.unsplash.com/photo-1551882547-ff43c63efe81?w=400",
// // // // // // // // // // // // // // // // // //     }));

// // // // // // // // // // // // // // // // // //     res.json({ success: true, hotels });
// // // // // // // // // // // // // // // // // //   } catch (err) {
// // // // // // // // // // // // // // // // // //     console.error("❌ Backend Error:", err.response?.data || err.message);
// // // // // // // // // // // // // // // // // //     res.status(500).json({ 
// // // // // // // // // // // // // // // // // //         error: "Search failed", 
// // // // // // // // // // // // // // // // // //         details: err.response?.data?.error || err.message 
// // // // // // // // // // // // // // // // // //     });
// // // // // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // // // // });

// // // // // // // // // // // // // // // // // // app.listen(PORT, "0.0.0.0", () => {
// // // // // // // // // // // // // // // // // //   console.log(`🏨 AI Server active on Port ${PORT}`);
// // // // // // // // // // // // // // // // // // });













// // // // // // // // // // // // // // // // // const express = require("express");
// // // // // // // // // // // // // // // // // const cors = require("cors");
// // // // // // // // // // // // // // // // // const axios = require("axios");

// // // // // // // // // // // // // // // // // const app = express();
// // // // // // // // // // // // // // // // // const PORT = 3000;
// // // // // // // // // // // // // // // // // const SERPAPI_KEY = "00c9a4387fcafade828a6ac5aac8714e024d4e43dd4ee8f1b4d779cd8a0c10d3";

// // // // // // // // // // // // // // // // // app.use(cors());
// // // // // // // // // // // // // // // // // app.use(express.json());

// // // // // // // // // // // // // // // // // const getFutureDate = (days) => {
// // // // // // // // // // // // // // // // //   const d = new Date();
// // // // // // // // // // // // // // // // //   d.setDate(d.getDate() + days);
// // // // // // // // // // // // // // // // //   return d.toISOString().split('T')[0];
// // // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // // app.get("/api/hotels", async (req, res) => {
// // // // // // // // // // // // // // // // //   const { q } = req.query;
// // // // // // // // // // // // // // // // //   if (!q) return res.status(400).json({ error: "Query required" });

// // // // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // // // //     const response = await axios.get("https://serpapi.com/search", {
// // // // // // // // // // // // // // // // //       params: {
// // // // // // // // // // // // // // // // //         engine: "google_hotels",
// // // // // // // // // // // // // // // // //         q: q + " hotels",
// // // // // // // // // // // // // // // // //         api_key: SERPAPI_KEY,
// // // // // // // // // // // // // // // // //         check_in_date: getFutureDate(2),
// // // // // // // // // // // // // // // // //         check_out_date: getFutureDate(5),
// // // // // // // // // // // // // // // // //       },
// // // // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // // // //     const hotels = (response.data.properties || []).map((h) => ({
// // // // // // // // // // // // // // // // //       name: h.name || "Luxury Hotel",
// // // // // // // // // // // // // // // // //       rating: h.overall_rating || "4.0",
// // // // // // // // // // // // // // // // //       price: h.rate_per_night?.lowest ? h.rate_per_night.lowest.replace(/[^0-9]/g, "") : "Price on request",
// // // // // // // // // // // // // // // // //       thumbnail: h.images?.[0]?.thumbnail || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
// // // // // // // // // // // // // // // // //       link: h.link // IMPORTANT: This is the URL that opens in the browser
// // // // // // // // // // // // // // // // //     }));

// // // // // // // // // // // // // // // // //     res.json({ hotels });
// // // // // // // // // // // // // // // // //   } catch (err) {
// // // // // // // // // // // // // // // // //     res.status(500).json({ error: "Failed to fetch data" });
// // // // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // // // });

// // // // // // // // // // // // // // // // // app.listen(PORT, "0.0.0.0", () => console.log(`Backend running on ${PORT}`));









// // // // // // // // // // // // // // // // const express = require("express");
// // // // // // // // // // // // // // // // const cors = require("cors");
// // // // // // // // // // // // // // // // const axios = require("axios");

// // // // // // // // // // // // // // // // const app = express();
// // // // // // // // // // // // // // // // const PORT = 3000;

// // // // // // // // // // // // // // // // const SERPAPI_KEY = "00c9a4387fcafade828a6ac5aac8714e024d4e43dd4ee8f1b4d779cd8a0c10d3";

// // // // // // // // // // // // // // // // app.use(cors());
// // // // // // // // // // // // // // // // app.use(express.json());

// // // // // // // // // // // // // // // // // Function to generate dynamic future dates
// // // // // // // // // // // // // // // // const getFutureDate = (daysToAdd) => {
// // // // // // // // // // // // // // // //   const date = new Date();
// // // // // // // // // // // // // // // //   date.setDate(date.getDate() + daysToAdd);
// // // // // // // // // // // // // // // //   return date.toISOString().split('T')[0];
// // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // app.get("/api/hotels", async (req, res) => {
// // // // // // // // // // // // // // // //   const { q } = req.query;
// // // // // // // // // // // // // // // //   if (!q) return res.status(400).json({ error: "City is required" });

// // // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // // //     const checkIn = getFutureDate(7);  // 1 week from now
// // // // // // // // // // // // // // // //     const checkOut = getFutureDate(10); // 10 days from now

// // // // // // // // // // // // // // // //     console.log(`🔎 Searching: ${q} | Dates: ${checkIn} to ${checkOut}`);

// // // // // // // // // // // // // // // //     const response = await axios.get("https://serpapi.com/search", {
// // // // // // // // // // // // // // // //       params: {
// // // // // // // // // // // // // // // //         engine: "google_hotels",
// // // // // // // // // // // // // // // //         q: q + " hotels",
// // // // // // // // // // // // // // // //         api_key: SERPAPI_KEY,
// // // // // // // // // // // // // // // //         check_in_date: checkIn,
// // // // // // // // // // // // // // // //         check_out_date: checkOut,
// // // // // // // // // // // // // // // //         currency: "USD"
// // // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // // //     // Handle SerpAPI errors returned in successful HTTP responses
// // // // // // // // // // // // // // // //     if (response.data.error) {
// // // // // // // // // // // // // // // //       console.error("SerpAPI JSON Error:", response.data.error);
// // // // // // // // // // // // // // // //       return res.status(400).json({ error: response.data.error });
// // // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // // //     const hotels = (response.data.properties || []).map((h) => ({
// // // // // // // // // // // // // // // //       name: h.name || "Starlight Suites",
// // // // // // // // // // // // // // // //       rating: h.overall_rating || "4.5",
// // // // // // // // // // // // // // // //       // Clean price string
// // // // // // // // // // // // // // // //       price: h.rate_per_night?.lowest ? h.rate_per_night.lowest.replace(/[^0-9]/g, "") : "N/A",
// // // // // // // // // // // // // // // //       thumbnail: h.images?.[0]?.thumbnail || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
// // // // // // // // // // // // // // // //       link: h.link || ""
// // // // // // // // // // // // // // // //     }));

// // // // // // // // // // // // // // // //     res.json({ success: true, hotels });

// // // // // // // // // // // // // // // //   } catch (err) {
// // // // // // // // // // // // // // // //     console.error("❌ Backend 500 Error:", err.message);
// // // // // // // // // // // // // // // //     res.status(500).json({ 
// // // // // // // // // // // // // // // //       error: "Internal Server Error", 
// // // // // // // // // // // // // // // //       details: err.response?.data?.error || err.message 
// // // // // // // // // // // // // // // //     });
// // // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // // });

// // // // // // // // // // // // // // // // app.listen(PORT, "0.0.0.0", () => {
// // // // // // // // // // // // // // // //   console.log(`🚀 Node Server running on http://localhost:${PORT}`);
// // // // // // // // // // // // // // // // });








// // // // // // // // // // // // // // // const express = require("express");
// // // // // // // // // // // // // // // const cors = require("cors");
// // // // // // // // // // // // // // // const axios = require("axios");
// // // // // // // // // // // // // // // const Groq = require("groq-sdk"); // 1. Import Groq

// // // // // // // // // // // // // // // const app = express();
// // // // // // // // // // // // // // // const PORT = 3000;

// // // // // // // // // // // // // // // // API Keys
// // // // // // // // // // // // // // // const SERPAPI_KEY = "00c9a4387fcafade828a6ac5aac8714e024d4e43dd4ee8f1b4d779cd8a0c10d3";
// // // // // // // // // // // // // // // const GROQ_API_KEY = "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"; // 2. Paste your Groq Key here

// // // // // // // // // // // // // // // // Initialize Groq
// // // // // // // // // // // // // // // const groq = new Groq({ apiKey: GROQ_API_KEY });

// // // // // // // // // // // // // // // app.use(cors());
// // // // // // // // // // // // // // // app.use(express.json());

// // // // // // // // // // // // // // // const getFutureDate = (daysToAdd) => {
// // // // // // // // // // // // // // //   const date = new Date();
// // // // // // // // // // // // // // //   date.setDate(date.getDate() + daysToAdd);
// // // // // // // // // // // // // // //   return date.toISOString().split('T')[0];
// // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // /**
// // // // // // // // // // // // // // //  * NEW: AI Itinerary Endpoint
// // // // // // // // // // // // // // //  * Generates a 3-day plan using Groq Llama 3
// // // // // // // // // // // // // // //  */
// // // // // // // // // // // // // // // app.get("/api/ai-plan", async (req, res) => {
// // // // // // // // // // // // // // //   const { city } = req.query;
// // // // // // // // // // // // // // //   if (!city) return res.status(400).json({ error: "City is required" });

// // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // //     const chatCompletion = await groq.chat.completions.create({
// // // // // // // // // // // // // // //       messages: [
// // // // // // // // // // // // // // //         {
// // // // // // // // // // // // // // //           role: "user",
// // // // // // // // // // // // // // //           content: `Give me a short 2-sentence expert travel tip for ${city}. Focus on a hidden gem or a way to save money.`,
// // // // // // // // // // // // // // //         },
// // // // // // // // // // // // // // //       ],
// // // // // // // // // // // // // // //       model: "llama3-8b-8192", // Fast and efficient model
// // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // //     const aiTip = chatCompletion.choices[0]?.message?.content || "Enjoy your trip!";
// // // // // // // // // // // // // // //     res.json({ success: true, tip: aiTip });
// // // // // // // // // // // // // // //   } catch (err) {
// // // // // // // // // // // // // // //     console.error("Groq Error:", err.message);
// // // // // // // // // // // // // // //     res.status(500).json({ error: "AI currently unavailable" });
// // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // });

// // // // // // // // // // // // // // // /**
// // // // // // // // // // // // // // //  * Hotel Search Endpoint (Existing)
// // // // // // // // // // // // // // //  */
// // // // // // // // // // // // // // // app.get("/api/hotels", async (req, res) => {
// // // // // // // // // // // // // // //   const { q } = req.query;
// // // // // // // // // // // // // // //   if (!q) return res.status(400).json({ error: "City is required" });

// // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // //     const checkIn = getFutureDate(7);
// // // // // // // // // // // // // // //     const checkOut = getFutureDate(10);

// // // // // // // // // // // // // // //     const response = await axios.get("https://serpapi.com/search", {
// // // // // // // // // // // // // // //       params: {
// // // // // // // // // // // // // // //         engine: "google_hotels",
// // // // // // // // // // // // // // //         q: q + " hotels",
// // // // // // // // // // // // // // //         api_key: SERPAPI_KEY,
// // // // // // // // // // // // // // //         check_in_date: checkIn,
// // // // // // // // // // // // // // //         check_out_date: checkOut,
// // // // // // // // // // // // // // //         currency: "USD"
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // //     if (response.data.error) {
// // // // // // // // // // // // // // //       return res.status(400).json({ error: response.data.error });
// // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // //     const hotels = (response.data.properties || []).map((h) => ({
// // // // // // // // // // // // // // //       name: h.name || "Starlight Suites",
// // // // // // // // // // // // // // //       rating: h.overall_rating || "4.5",
// // // // // // // // // // // // // // //       price: h.rate_per_night?.lowest ? h.rate_per_night.lowest.replace(/[^0-9]/g, "") : "N/A",
// // // // // // // // // // // // // // //       thumbnail: h.images?.[0]?.thumbnail || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
// // // // // // // // // // // // // // //       link: h.link || ""
// // // // // // // // // // // // // // //     }));

// // // // // // // // // // // // // // //     res.json({ success: true, hotels });

// // // // // // // // // // // // // // //   } catch (err) {
// // // // // // // // // // // // // // //     console.error("❌ Backend Error:", err.message);
// // // // // // // // // // // // // // //     res.status(500).json({ error: "Internal Server Error" });
// // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // });

// // // // // // // // // // // // // // // app.listen(PORT, "0.0.0.0", () => {
// // // // // // // // // // // // // // //   console.log(`🚀 AI Server running on Port ${PORT}`);
// // // // // // // // // // // // // // // });










// // // // // // // // // // // // // // const express = require("express");
// // // // // // // // // // // // // // const cors = require("cors");
// // // // // // // // // // // // // // const axios = require("axios");
// // // // // // // // // // // // // // const Groq = require("groq-sdk");

// // // // // // // // // // // // // // const app = express();
// // // // // // // // // // // // // // const PORT = 3000;

// // // // // // // // // // // // // // // API Keys
// // // // // // // // // // // // // // const SERPAPI_KEY = "00c9a4387fcafade828a6ac5aac8714e024d4e43dd4ee8f1b4d779cd8a0c10d3";
// // // // // // // // // // // // // // const GROQ_API_KEY = "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"; 

// // // // // // // // // // // // // // // Initialize Groq AI
// // // // // // // // // // // // // // const groq = new Groq({ apiKey: GROQ_API_KEY });

// // // // // // // // // // // // // // app.use(cors());
// // // // // // // // // // // // // // app.use(express.json());

// // // // // // // // // // // // // // // Helper for dynamic dates
// // // // // // // // // // // // // // const getFutureDate = (daysToAdd) => {
// // // // // // // // // // // // // //   const date = new Date();
// // // // // // // // // // // // // //   date.setDate(date.getDate() + daysToAdd);
// // // // // // // // // // // // // //   return date.toISOString().split('T')[0];
// // // // // // // // // // // // // // };

// // // // // // // // // // // // // // //**
// // // // // // // // // // // // // //  * 1. BUDGET ENDPOINT + GROQ AI INSIGHT
// // // // // // // // // // // // // //  */
// // // // // // // // // // // // // // app.get("/api/budget", async (req, res) => {
// // // // // // // // // // // // // //   const totalLimit = 5000;
// // // // // // // // // // // // // //   const spent = 2120;

// // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // //     const chatCompletion = await groq.chat.completions.create({
// // // // // // // // // // // // // //       messages: [
// // // // // // // // // // // // // //         {
// // // // // // // // // // // // // //           role: "system",
// // // // // // // // // // // // // //           content: "You are a savvy travel finance expert. Give a single, catchy, 1-sentence tip on how to save money specifically for a tourist based on their budget status."
// // // // // // // // // // // // // //         },
// // // // // // // // // // // // // //         {
// // // // // // // // // // // // // //           role: "user",
// // // // // // // // // // // // // //           content: `I have spent $${spent} out of my $${totalLimit} budget. Give me one expert tip to make my remaining money last longer.`
// // // // // // // // // // // // // //         }
// // // // // // // // // // // // // //       ],
// // // // // // // // // // // // // //       // UPDATE THIS LINE:
// // // // // // // // // // // // // //       model: "llama-3.3-70b-versatile", 
// // // // // // // // // // // // // //     });

// // // // // // // // // // // // // //     const aiTip = chatCompletion.choices[0]?.message?.content || "Avoid tourist traps and eat where locals eat!";

// // // // // // // // // // // // // //     res.json({
// // // // // // // // // // // // // //       totalLimit,
// // // // // // // // // // // // // //       spent,
// // // // // // // // // // // // // //       aiInsight: aiTip,
// // // // // // // // // // // // // //       // ... rest of your transactions/breakdown data
// // // // // // // // // // // // // //     });
// // // // // // // // // // // // // //   } catch (err) {
// // // // // // // // // // // // // //     console.error("Groq Budget Error:", err.message);
// // // // // // // // // // // // // //     res.status(500).json({ error: "Could not fetch AI budget insights" });
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // });

// // // // // // // // // // // // // // /**
// // // // // // // // // // // // // //  * 2. AI ITINERARY TIP ENDPOINT
// // // // // // // // // // // // // //  */
// // // // // // // // // // // // // // app.get("/api/ai-plan", async (req, res) => {
// // // // // // // // // // // // // //   const { city } = req.query;
// // // // // // // // // // // // // //   if (!city) return res.status(400).json({ error: "City is required" });

// // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // //     const chatCompletion = await groq.chat.completions.create({
// // // // // // // // // // // // // //       messages: [
// // // // // // // // // // // // // //         {
// // // // // // // // // // // // // //           role: "user",
// // // // // // // // // // // // // //           content: `Give me a short 2-sentence expert travel tip for ${city}. Focus on a hidden gem or a way to save money.`,
// // // // // // // // // // // // // //         },
// // // // // // // // // // // // // //       ],
// // // // // // // // // // // // // //       // UPDATE THIS LINE:
// // // // // // // // // // // // // //       model: "llama-3.3-70b-versatile",
// // // // // // // // // // // // // //     });

// // // // // // // // // // // // // //     const aiTip = chatCompletion.choices[0]?.message?.content || "Enjoy your trip!";
// // // // // // // // // // // // // //     res.json({ success: true, tip: aiTip });
// // // // // // // // // // // // // //   } catch (err) {
// // // // // // // // // // // // // //     console.error("Groq Plan Error:", err.message);
// // // // // // // // // // // // // //     res.status(500).json({ error: "AI currently unavailable" });
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // });

// // // // // // // // // // // // // // /**
// // // // // // // // // // // // // //  * 3. HOTEL SEARCH ENDPOINT
// // // // // // // // // // // // // //  */
// // // // // // // // // // // // // // app.get("/api/hotels", async (req, res) => {
// // // // // // // // // // // // // //   const { q } = req.query;
// // // // // // // // // // // // // //   if (!q) return res.status(400).json({ error: "City is required" });

// // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // //     const checkIn = getFutureDate(7);
// // // // // // // // // // // // // //     const checkOut = getFutureDate(10);

// // // // // // // // // // // // // //     console.log(`🔎 Searching: ${q} | Dates: ${checkIn} to ${checkOut}`);

// // // // // // // // // // // // // //     const response = await axios.get("https://serpapi.com/search", {
// // // // // // // // // // // // // //       params: {
// // // // // // // // // // // // // //         engine: "google_hotels",
// // // // // // // // // // // // // //         q: q + " hotels",
// // // // // // // // // // // // // //         api_key: SERPAPI_KEY,
// // // // // // // // // // // // // //         check_in_date: checkIn,
// // // // // // // // // // // // // //         check_out_date: checkOut,
// // // // // // // // // // // // // //         currency: "USD"
// // // // // // // // // // // // // //       }
// // // // // // // // // // // // // //     });

// // // // // // // // // // // // // //     if (response.data.error) {
// // // // // // // // // // // // // //       return res.status(400).json({ error: response.data.error });
// // // // // // // // // // // // // //     }

// // // // // // // // // // // // // //     const hotels = (response.data.properties || []).map((h) => ({
// // // // // // // // // // // // // //       name: h.name || "Starlight Suites",
// // // // // // // // // // // // // //       rating: h.overall_rating || "4.5",
// // // // // // // // // // // // // //       price: h.rate_per_night?.lowest ? h.rate_per_night.lowest.replace(/[^0-9]/g, "") : "N/A",
// // // // // // // // // // // // // //       thumbnail: h.images?.[0]?.thumbnail || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
// // // // // // // // // // // // // //       link: h.link || ""
// // // // // // // // // // // // // //     }));

// // // // // // // // // // // // // //     res.json({ success: true, hotels });

// // // // // // // // // // // // // //   } catch (err) {
// // // // // // // // // // // // // //     console.error("❌ Hotel API Error:", err.message);
// // // // // // // // // // // // // //     res.status(500).json({ error: "Internal Server Error" });
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // });

// // // // // // // // // // // // // // app.listen(PORT, "0.0.0.0", () => {
// // // // // // // // // // // // // //   console.log(`
// // // // // // // // // // // // // //   🏨 AI Travel Backend Active
// // // // // // // // // // // // // //   --------------------------
// // // // // // // // // // // // // //   Port: ${PORT}
// // // // // // // // // // // // // //   Status: Ready
// // // // // // // // // // // // // //   AI Model: Llama 3 (Groq)
// // // // // // // // // // // // // //   `);
// // // // // // // // // // // // // // });









// // // // // // // // // // // // // const express = require("express");
// // // // // // // // // // // // // const cors = require("cors");
// // // // // // // // // // // // // const axios = require("axios");
// // // // // // // // // // // // // const Groq = require("groq-sdk");

// // // // // // // // // // // // // const app = express();
// // // // // // // // // // // // // const PORT = 3000;

// // // // // // // // // // // // // // API Keys
// // // // // // // // // // // // // const SERPAPI_KEY = "00c9a4387fcafade828a6ac5aac8714e024d4e43dd4ee8f1b4d779cd8a0c10d3";
// // // // // // // // // // // // // const GROQ_API_KEY = "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"; 

// // // // // // // // // // // // // const groq = new Groq({ apiKey: GROQ_API_KEY });

// // // // // // // // // // // // // app.use(cors());
// // // // // // // // // // // // // app.use(express.json());

// // // // // // // // // // // // // const getFutureDate = (days) => {
// // // // // // // // // // // // //   const d = new Date();
// // // // // // // // // // // // //   d.setDate(d.getDate() + days);
// // // // // // // // // // // // //   return d.toISOString().split('T')[0];
// // // // // // // // // // // // // };

// // // // // // // // // // // // // /** 1. BUDGET & AI INSIGHT **/
// // // // // // // // // // // // // app.get("/api/budget", async (req, res) => {
// // // // // // // // // // // // //   const totalLimit = 5000;
// // // // // // // // // // // // //   const spent = 2120;

// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     const chatCompletion = await groq.chat.completions.create({
// // // // // // // // // // // // //       messages: [
// // // // // // // // // // // // //         { role: "system", content: "You are a savvy travel finance expert. Give a single, catchy, 1-sentence tip on how to save money specifically for a tourist based on their budget status." },
// // // // // // // // // // // // //         { role: "user", content: `I have spent $${spent} out of $${totalLimit} budget. Give me one expert tip.` }
// // // // // // // // // // // // //       ],
// // // // // // // // // // // // //       model: "llama-3.3-70b-versatile", // UPDATED MODEL
// // // // // // // // // // // // //     });

// // // // // // // // // // // // //     const aiTip = chatCompletion.choices[0]?.message?.content || "Avoid tourist traps and eat where locals eat!";

// // // // // // // // // // // // //     res.json({
// // // // // // // // // // // // //       totalLimit,
// // // // // // // // // // // // //       spent,
// // // // // // // // // // // // //       aiInsight: aiTip,
// // // // // // // // // // // // //       transactions: [
// // // // // // // // // // // // //         { id: '1', title: 'Grand Hyatt Stay', category: 'Accommodation', amount: 850, date: 'Apr 02', icon: 'bed-outline' },
// // // // // // // // // // // // //         { id: '2', title: 'Delta Airlines', category: 'Flights', amount: 1100, date: 'Mar 28', icon: 'airplane-outline' },
// // // // // // // // // // // // //         { id: '3', title: 'Skyline Dining', category: 'Food', amount: 125, date: 'Apr 03', icon: 'food-outline' },
// // // // // // // // // // // // //       ],
// // // // // // // // // // // // //       breakdown: [
// // // // // // // // // // // // //         { label: "Flights", amount: "$1,100", color: "#3B82F6", percent: 55 },
// // // // // // // // // // // // //         { label: "Stay", amount: "$850", color: "#8B5CF6", percent: 35 },
// // // // // // // // // // // // //       ]
// // // // // // // // // // // // //     });
// // // // // // // // // // // // //   } catch (err) {
// // // // // // // // // // // // //     res.status(500).json({ error: "AI Insight failed" });
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // });

// // // // // // // // // // // // // /** 2. HOTEL SEARCH **/
// // // // // // // // // // // // // app.get("/api/hotels", async (req, res) => {
// // // // // // // // // // // // //   const { q } = req.query;
// // // // // // // // // // // // //   if (!q) return res.status(400).json({ error: "City required" });

// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     const response = await axios.get("https://serpapi.com/search", {
// // // // // // // // // // // // //       params: {
// // // // // // // // // // // // //         engine: "google_hotels",
// // // // // // // // // // // // //         q: q + " hotels",
// // // // // // // // // // // // //         api_key: SERPAPI_KEY,
// // // // // // // // // // // // //         check_in_date: getFutureDate(7),
// // // // // // // // // // // // //         check_out_date: getFutureDate(10),
// // // // // // // // // // // // //       }
// // // // // // // // // // // // //     });

// // // // // // // // // // // // //     const hotels = (response.data.properties || []).map((h) => ({
// // // // // // // // // // // // //       name: h.name || "Luxury Stay",
// // // // // // // // // // // // //       rating: h.overall_rating || "4.5",
// // // // // // // // // // // // //       price: h.rate_per_night?.lowest ? h.rate_per_night.lowest.replace(/[^0-9]/g, "") : "N/A",
// // // // // // // // // // // // //       thumbnail: h.images?.[0]?.thumbnail || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
// // // // // // // // // // // // //       link: h.link || ""
// // // // // // // // // // // // //     }));

// // // // // // // // // // // // //     res.json({ success: true, hotels });
// // // // // // // // // // // // //   } catch (err) {
// // // // // // // // // // // // //     res.status(500).json({ error: "Search failed" });
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // });

// // // // // // // // // // // // // app.listen(PORT, "0.0.0.0", () => {
// // // // // // // // // // // // //   console.log(`🚀 AI Server running on http://localhost:${PORT}`);
// // // // // // // // // // // // // });













// // // // // // // // // // // // const express = require("express");
// // // // // // // // // // // // const cors = require("cors");
// // // // // // // // // // // // const axios = require("axios");
// // // // // // // // // // // // const Groq = require("groq-sdk");

// // // // // // // // // // // // const app = express();
// // // // // // // // // // // // const PORT = 3000;

// // // // // // // // // // // // // API Keys
// // // // // // // // // // // // const SERPAPI_KEY = "00c9a4387fcafade828a6ac5aac8714e024d4e43dd4ee8f1b4d779cd8a0c10d3";
// // // // // // // // // // // // const GROQ_API_KEY = "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"; 

// // // // // // // // // // // // const groq = new Groq({ apiKey: GROQ_API_KEY });

// // // // // // // // // // // // app.use(cors());
// // // // // // // // // // // // app.use(express.json());

// // // // // // // // // // // // // Helper for dynamic dates
// // // // // // // // // // // // const getFutureDate = (days) => {
// // // // // // // // // // // //   const d = new Date();
// // // // // // // // // // // //   d.setDate(d.getDate() + days);
// // // // // // // // // // // //   return d.toISOString().split('T')[0];
// // // // // // // // // // // // };

// // // // // // // // // // // // /**
// // // // // // // // // // // //  * 1. AI DYNAMIC BUDGET CALCULATOR
// // // // // // // // // // // //  * Takes a city name and returns a JSON 3-day budget breakdown
// // // // // // // // // // // //  */
// // // // // // // // // // // // app.post("/api/ai-budget", async (req, res) => {
// // // // // // // // // // // //   const { city } = req.body;
// // // // // // // // // // // //   if (!city) return res.status(400).json({ error: "City name is required" });

// // // // // // // // // // // //   try {
// // // // // // // // // // // //     const chatCompletion = await groq.chat.completions.create({
// // // // // // // // // // // //       messages: [
// // // // // // // // // // // //         {
// // // // // // // // // // // //           role: "system",
// // // // // // // // // // // //           content: "You are a travel budget expert. Return ONLY a JSON object with keys: total (number), stay (number), food (number), transport (number), and tip (1 short sentence). Base values on a 3-day mid-range trip."
// // // // // // // // // // // //         },
// // // // // // // // // // // //         {
// // // // // // // // // // // //           role: "user",
// // // // // // // // // // // //           content: `Calculate a 3-day travel budget for ${city} in USD.`
// // // // // // // // // // // //         }
// // // // // // // // // // // //       ],
// // // // // // // // // // // //       model: "llama-3.3-70b-versatile",
// // // // // // // // // // // //       response_format: { type: "json_object" } 
// // // // // // // // // // // //     });

// // // // // // // // // // // //     const aiData = JSON.parse(chatCompletion.choices[0].message.content);
// // // // // // // // // // // //     res.json({ success: true, ...aiData });
// // // // // // // // // // // //   } catch (err) {
// // // // // // // // // // // //     console.error("Groq Error:", err.message);
// // // // // // // // // // // //     res.status(500).json({ error: "AI failed to calculate budget" });
// // // // // // // // // // // //   }
// // // // // // // // // // // // });

// // // // // // // // // // // // /**
// // // // // // // // // // // //  * 2. HOTEL SEARCH
// // // // // // // // // // // //  */
// // // // // // // // // // // // app.get("/api/hotels", async (req, res) => {
// // // // // // // // // // // //   const { q } = req.query;
// // // // // // // // // // // //   if (!q) return res.status(400).json({ error: "City required" });

// // // // // // // // // // // //   try {
// // // // // // // // // // // //     const response = await axios.get("https://serpapi.com/search", {
// // // // // // // // // // // //       params: {
// // // // // // // // // // // //         engine: "google_hotels",
// // // // // // // // // // // //         q: q + " hotels",
// // // // // // // // // // // //         api_key: SERPAPI_KEY,
// // // // // // // // // // // //         check_in_date: getFutureDate(7),
// // // // // // // // // // // //         check_out_date: getFutureDate(10),
// // // // // // // // // // // //       }
// // // // // // // // // // // //     });

// // // // // // // // // // // //     const hotels = (response.data.properties || []).map((h) => ({
// // // // // // // // // // // //       name: h.name || "Luxury Stay",
// // // // // // // // // // // //       rating: h.overall_rating || "4.5",
// // // // // // // // // // // //       price: h.rate_per_night?.lowest ? h.rate_per_night.lowest.replace(/[^0-9]/g, "") : "N/A",
// // // // // // // // // // // //       thumbnail: h.images?.[0]?.thumbnail || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
// // // // // // // // // // // //       link: h.link || ""
// // // // // // // // // // // //     }));

// // // // // // // // // // // //     res.json({ success: true, hotels });
// // // // // // // // // // // //   } catch (err) {
// // // // // // // // // // // //     res.status(500).json({ error: "Search failed" });
// // // // // // // // // // // //   }
// // // // // // // // // // // // });

// // // // // // // // // // // // app.listen(PORT, "0.0.0.0", () => {
// // // // // // // // // // // //   console.log(`🚀 AI Server running on http://localhost:${PORT}`);
// // // // // // // // // // // // });








// // // // // // // // // // // const express = require("express");
// // // // // // // // // // // const cors = require("cors");
// // // // // // // // // // // const axios = require("axios");
// // // // // // // // // // // const Groq = require("groq-sdk");

// // // // // // // // // // // const app = express();
// // // // // // // // // // // const PORT = 3000;

// // // // // // // // // // // // API Keys
// // // // // // // // // // // const SERPAPI_KEY = "00c9a4387fcafade828a6ac5aac8714e024d4e43dd4ee8f1b4d779cd8a0c10d3";
// // // // // // // // // // // const GROQ_API_KEY = "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"; 

// // // // // // // // // // // const groq = new Groq({ apiKey: GROQ_API_KEY });

// // // // // // // // // // // app.use(cors());
// // // // // // // // // // // app.use(express.json());

// // // // // // // // // // // // Helper for dynamic dates
// // // // // // // // // // // const getFutureDate = (days) => {
// // // // // // // // // // //   const d = new Date();
// // // // // // // // // // //   d.setDate(d.getDate() + days);
// // // // // // // // // // //   return d.toISOString().split('T')[0];
// // // // // // // // // // // };

// // // // // // // // // // // /**
// // // // // // // // // // //  * 1. AI DYNAMIC BUDGET CALCULATOR (5-Day India Based)
// // // // // // // // // // //  * POST /api/ai-budget { "city": "Goa" }
// // // // // // // // // // //  */
// // // // // // // // // // // app.post("/api/ai-budget", async (req, res) => {
// // // // // // // // // // //   const { city } = req.body;
// // // // // // // // // // //   if (!city) return res.status(400).json({ error: "City name is required" });

// // // // // // // // // // //   try {
// // // // // // // // // // //     console.log(`🤖 AI calculating 5-day INR budget for: ${city}`);

// // // // // // // // // // //     const chatCompletion = await groq.chat.completions.create({
// // // // // // // // // // //       messages: [
// // // // // // // // // // //         {
// // // // // // // // // // //           role: "system",
// // // // // // // // // // //           content: `You are an Indian travel expense expert. 
// // // // // // // // // // //           Return ONLY a JSON object for a 5-day trip in Indian Rupees (INR).
// // // // // // // // // // //           Structure: { 
// // // // // // // // // // //             "total": number, 
// // // // // // // // // // //             "stay": number, 
// // // // // // // // // // //             "food": number, 
// // // // // // // // // // //             "transport": number, 
// // // // // // // // // // //             "tip": "1 short sentence about saving money in this specific city" 
// // // // // // // // // // //           }. 
// // // // // // // // // // //           Do not include commas or currency symbols in the numbers.`
// // // // // // // // // // //         },
// // // // // // // // // // //         {
// // // // // // // // // // //           role: "user",
// // // // // // // // // // //           content: `Calculate a 5-day mid-range travel budget for ${city}, India.`
// // // // // // // // // // //         }
// // // // // // // // // // //       ],
// // // // // // // // // // //       model: "llama-3.3-70b-versatile",
// // // // // // // // // // //       response_format: { type: "json_object" } 
// // // // // // // // // // //     });

// // // // // // // // // // //     const aiData = JSON.parse(chatCompletion.choices[0].message.content);
// // // // // // // // // // //     res.json({ success: true, ...aiData });
// // // // // // // // // // //   } catch (err) {
// // // // // // // // // // //     console.error("Groq AI Error:", err.message);
// // // // // // // // // // //     res.status(500).json({ error: "AI failed to calculate budget" });
// // // // // // // // // // //   }
// // // // // // // // // // // });

// // // // // // // // // // // /**
// // // // // // // // // // //  * 2. HOTEL SEARCH (SerpAPI)
// // // // // // // // // // //  * GET /api/hotels?q=Mumbai
// // // // // // // // // // //  */
// // // // // // // // // // // app.get("/api/hotels", async (req, res) => {
// // // // // // // // // // //   const { q } = req.query;
// // // // // // // // // // //   if (!q) return res.status(400).json({ error: "City required" });

// // // // // // // // // // //   try {
// // // // // // // // // // //     const response = await axios.get("https://serpapi.com/search", {
// // // // // // // // // // //       params: {
// // // // // // // // // // //         engine: "google_hotels",
// // // // // // // // // // //         q: q + " hotels",
// // // // // // // // // // //         api_key: SERPAPI_KEY,
// // // // // // // // // // //         check_in_date: getFutureDate(7),
// // // // // // // // // // //         check_out_date: getFutureDate(12),
// // // // // // // // // // //         currency: "INR" // Forces SerpAPI to return prices in Rupees
// // // // // // // // // // //       }
// // // // // // // // // // //     });

// // // // // // // // // // //     const hotels = (response.data.properties || []).map((h) => ({
// // // // // // // // // // //       name: h.name || "Luxury Stay",
// // // // // // // // // // //       rating: h.overall_rating || "4.2",
// // // // // // // // // // //       // Extract numeric price from string (e.g., "₹5,000" -> "5000")
// // // // // // // // // // //       price: h.rate_per_night?.lowest ? h.rate_per_night.lowest.replace(/[^0-9]/g, "") : "N/A",
// // // // // // // // // // //       thumbnail: h.images?.[0]?.thumbnail || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
// // // // // // // // // // //       link: h.link || ""
// // // // // // // // // // //     }));

// // // // // // // // // // //     res.json({ success: true, hotels });
// // // // // // // // // // //   } catch (err) {
// // // // // // // // // // //     console.error("Hotel Search Error:", err.message);
// // // // // // // // // // //     res.status(500).json({ error: "Search failed" });
// // // // // // // // // // //   }
// // // // // // // // // // // });

// // // // // // // // // // // // Start Server
// // // // // // // // // // // app.listen(PORT, "0.0.0.0", () => {
// // // // // // // // // // //   console.log(`
// // // // // // // // // // //   🚀 AI Travel Server (India Edition)
// // // // // // // // // // //   ----------------------------------
// // // // // // // // // // //   Status: Active
// // // // // // // // // // //   Port: ${PORT}
// // // // // // // // // // //   Currency: INR (₹)
// // // // // // // // // // //   AI Model: Llama 3.3
// // // // // // // // // // //   ----------------------------------
// // // // // // // // // // //   `);
// // // // // // // // // // // });














// // // // // // // // // // const express = require("express");
// // // // // // // // // // const cors = require("cors");
// // // // // // // // // // const axios = require("axios");
// // // // // // // // // // const Groq = require("groq-sdk");

// // // // // // // // // // const app = express();
// // // // // // // // // // const PORT = 3000;

// // // // // // // // // // // API Keys (production madhe .env file madhe thev)
// // // // // // // // // // const SERPAPI_KEY = "00c9a4387fcafade828a6ac5aac8714e024d4e43dd4ee8f1b4d779cd8a0c10d3";
// // // // // // // // // // const GROQ_API_KEY = "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"; 

// // // // // // // // // // const groq = new Groq({ apiKey: GROQ_API_KEY });

// // // // // // // // // // app.use(cors());
// // // // // // // // // // app.use(express.json());

// // // // // // // // // // // Helper for dynamic dates
// // // // // // // // // // const getFutureDate = (days) => {
// // // // // // // // // //   const d = new Date();
// // // // // // // // // //   d.setDate(d.getDate() + days);
// // // // // // // // // //   return d.toISOString().split('T')[0];
// // // // // // // // // // };

// // // // // // // // // // /**
// // // // // // // // // //  * 1. IMPROVED AI DYNAMIC BUDGET CALCULATOR 
// // // // // // // // // //  * POST /api/ai-budget 
// // // // // // // // // //  * Body: { "city": "Goa", "travelers": 4, "days": 5, "tripType": "family" }
// // // // // // // // // //  */
// // // // // // // // // // app.post("/api/ai-budget", async (req, res) => {
// // // // // // // // // //   const { city, travelers = 4, days = 5, tripType = "family" } = req.body;

// // // // // // // // // //   if (!city) {
// // // // // // // // // //     return res.status(400).json({ error: "City name is required" });
// // // // // // // // // //   }

// // // // // // // // // //   try {
// // // // // // // // // //     console.log(`🤖 AI calculating ${days}-day ${tripType} budget for: ${city}`);

// // // // // // // // // //     const chatCompletion = await groq.chat.completions.create({
// // // // // // // // // //       messages: [
// // // // // // // // // //         {
// // // // // // // // // //           role: "system",
// // // // // // // // // //           content: `You are an expert Indian travel budget planner.
// // // // // // // // // //           Return ONLY valid JSON object.
// // // // // // // // // //           For a ${days}-day ${tripType} trip in ${city}, India for ${travelers} people.
// // // // // // // // // //           Structure must be:
// // // // // // // // // //           {
// // // // // // // // // //             "total": number,
// // // // // // // // // //             "hotel": number,
// // // // // // // // // //             "food": number,
// // // // // // // // // //             "transport": number,
// // // // // // // // // //             "activities": number,
// // // // // // // // // //             "misc": number,
// // // // // // // // // //             "perPerson": number,
// // // // // // // // // //             "tip": "1 short helpful saving tip for this city"
// // // // // // // // // //           }
// // // // // // // // // //           All numbers in INR without commas or symbols.
// // // // // // // // // //           Make it realistic for Indian mid-range family trip.`
// // // // // // // // // //         },
// // // // // // // // // //         {
// // // // // // // // // //           role: "user",
// // // // // // // // // //           content: `Give realistic ${days}-day budget for ${city}, India.`
// // // // // // // // // //         }
// // // // // // // // // //       ],
// // // // // // // // // //       model: "llama-3.3-70b-versatile",
// // // // // // // // // //       response_format: { type: "json_object" }
// // // // // // // // // //     });

// // // // // // // // // //     let aiData = JSON.parse(chatCompletion.choices[0].message.content);

// // // // // // // // // //     // Extra safety
// // // // // // // // // //     aiData.total = aiData.total || (aiData.hotel + aiData.food + aiData.transport + aiData.activities + aiData.misc);
// // // // // // // // // //     aiData.perPerson = Math.round(aiData.total / travelers);

// // // // // // // // // //     res.json({ 
// // // // // // // // // //       success: true, 
// // // // // // // // // //       city,
// // // // // // // // // //       days,
// // // // // // // // // //       travelers,
// // // // // // // // // //       tripType,
// // // // // // // // // //       ...aiData 
// // // // // // // // // //     });

// // // // // // // // // //   } catch (err) {
// // // // // // // // // //     console.error("Groq AI Budget Error:", err.message);
// // // // // // // // // //     res.status(500).json({ error: "Failed to generate AI budget" });
// // // // // // // // // //   }
// // // // // // // // // // });

// // // // // // // // // // /**
// // // // // // // // // //  * 2. HOTEL SEARCH (Improved)
// // // // // // // // // //  * GET /api/hotels?q=Goa&checkIn=2026-04-10&checkOut=2026-04-15
// // // // // // // // // //  */
// // // // // // // // // // app.get("/api/hotels", async (req, res) => {
// // // // // // // // // //   const { q, checkIn, checkOut } = req.query;

// // // // // // // // // //   if (!q) {
// // // // // // // // // //     return res.status(400).json({ error: "City is required" });
// // // // // // // // // //   }

// // // // // // // // // //   try {
// // // // // // // // // //     const response = await axios.get("https://serpapi.com/search", {
// // // // // // // // // //       params: {
// // // // // // // // // //         engine: "google_hotels",
// // // // // // // // // //         q: `${q} hotels`,
// // // // // // // // // //         api_key: SERPAPI_KEY,
// // // // // // // // // //         check_in_date: checkIn || getFutureDate(7),
// // // // // // // // // //         check_out_date: checkOut || getFutureDate(12),
// // // // // // // // // //         currency: "INR",
// // // // // // // // // //         hl: "en",
// // // // // // // // // //         gl: "in"   // India focused
// // // // // // // // // //       }
// // // // // // // // // //     });

// // // // // // // // // //     const hotels = (response.data.properties || []).slice(0, 15).map((h) => ({
// // // // // // // // // //       name: h.name || "Unknown Hotel",
// // // // // // // // // //       rating: h.overall_rating || 4.2,
// // // // // // // // // //       price: h.rate_per_night?.lowest 
// // // // // // // // // //         ? parseInt(h.rate_per_night.lowest.replace(/[^0-9]/g, "")) || 0 
// // // // // // // // // //         : 0,
// // // // // // // // // //       thumbnail: h.images?.[0]?.thumbnail || "https://picsum.photos/id/1015/400/250",
// // // // // // // // // //       location: h.location || q,
// // // // // // // // // //       link: h.link || ""
// // // // // // // // // //     }));

// // // // // // // // // //     res.json({ 
// // // // // // // // // //       success: true, 
// // // // // // // // // //       city: q,
// // // // // // // // // //       count: hotels.length,
// // // // // // // // // //       hotels 
// // // // // // // // // //     });

// // // // // // // // // //   } catch (err) {
// // // // // // // // // //     console.error("Hotel Search Error:", err.message);
// // // // // // // // // //     res.status(500).json({ error: "Failed to fetch hotels" });
// // // // // // // // // //   }
// // // // // // // // // // });

// // // // // // // // // // // Start Server
// // // // // // // // // // app.listen(PORT, "0.0.0.0", () => {
// // // // // // // // // //   console.log(`
// // // // // // // // // //   🚀 AI Travel Planner Server (Updated - April 2026)
// // // // // // // // // //   ------------------------------------------------
// // // // // // // // // //   Status     : Running
// // // // // // // // // //   Port       : ${PORT}
// // // // // // // // // //   Currency   : INR (₹)
// // // // // // // // // //   AI Model   : Llama 3.3 70B
// // // // // // // // // //   Features   : AI Budget + Hotel Search (Family Ready)
// // // // // // // // // //   ------------------------------------------------
// // // // // // // // // //   Endpoints:
// // // // // // // // // //   → POST /api/ai-budget
// // // // // // // // // //   → GET  /api/hotels?q=Goa
// // // // // // // // // //   `);
// // // // // // // // // // });














// // // // // // // // // const express = require("express");
// // // // // // // // // const cors = require("cors");
// // // // // // // // // const axios = require("axios");
// // // // // // // // // const Groq = require("groq-sdk");

// // // // // // // // // const app = express();
// // // // // // // // // const PORT = 3000;

// // // // // // // // // // ====================== API KEYS ======================
// // // // // // // // // const SERPAPI_KEY = "00c9a4387fcafade828a6ac5aac8714e024d4e43dd4ee8f1b4d779cd8a0c10d3";
// // // // // // // // // const GROQ_API_KEY = "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"; 

// // // // // // // // // const groq = new Groq({ apiKey: GROQ_API_KEY });

// // // // // // // // // // ====================== MIDDLEWARE ======================
// // // // // // // // // app.use(cors());
// // // // // // // // // app.use(express.json());

// // // // // // // // // // Helper Function - Future Date
// // // // // // // // // const getFutureDate = (days) => {
// // // // // // // // //   const d = new Date();
// // // // // // // // //   d.setDate(d.getDate() + days);
// // // // // // // // //   return d.toISOString().split('T')[0];
// // // // // // // // // };

// // // // // // // // // // ====================== 1. AI BUDGET ENDPOINT ======================
// // // // // // // // // app.post("/api/ai-budget", async (req, res) => {
// // // // // // // // //   const { city, travelers = 4, days = 5, tripType = "family" } = req.body;

// // // // // // // // //   if (!city) {
// // // // // // // // //     return res.status(400).json({ 
// // // // // // // // //       success: false, 
// // // // // // // // //       error: "City name is required" 
// // // // // // // // //     });
// // // // // // // // //   }

// // // // // // // // //   try {
// // // // // // // // //     console.log(`💰 AI Budget Request → ${city} | ${travelers} people | ${days} days`);

// // // // // // // // //     const systemPrompt = `You are an expert Indian family travel budget planner for 2026.
// // // // // // // // // Return ONLY a valid JSON object with realistic mid-range budget for a ${days}-day ${tripType} trip to ${city}, India for ${travelers} people.

// // // // // // // // // Exact JSON structure:
// // // // // // // // // {
// // // // // // // // //   "total": number,
// // // // // // // // //   "hotel": number,
// // // // // // // // //   "food": number,
// // // // // // // // //   "transport": number,
// // // // // // // // //   "activities": number,
// // // // // // // // //   "misc": number,
// // // // // // // // //   "perPerson": number,
// // // // // // // // //   "tip": "One short practical saving tip specific to this city"
// // // // // // // // // }

// // // // // // // // // All amounts in INR (no commas, no ₹ symbol).
// // // // // // // // // Make numbers practical and realistic for Indian middle-class family trip.`;

// // // // // // // // //     const chatCompletion = await groq.chat.completions.create({
// // // // // // // // //       messages: [
// // // // // // // // //         { role: "system", content: systemPrompt },
// // // // // // // // //         { role: "user", content: `Calculate proper budget for ${city}, India.` }
// // // // // // // // //       ],
// // // // // // // // //       model: "llama-3.3-70b-versatile",
// // // // // // // // //       response_format: { type: "json_object" }
// // // // // // // // //     });

// // // // // // // // //     let aiData = JSON.parse(chatCompletion.choices[0].message.content);

// // // // // // // // //     // Safety calculations
// // // // // // // // //     aiData.total = aiData.total || 
// // // // // // // // //       (aiData.hotel + aiData.food + aiData.transport + aiData.activities + aiData.misc);

// // // // // // // // //     aiData.perPerson = Math.round(aiData.total / travelers);

// // // // // // // // //     // Round to nearest 100 for clean look
// // // // // // // // //     Object.keys(aiData).forEach(key => {
// // // // // // // // //       if (typeof aiData[key] === "number") {
// // // // // // // // //         aiData[key] = Math.round(aiData[key] / 100) * 100;
// // // // // // // // //       }
// // // // // // // // //     });

// // // // // // // // //     res.json({
// // // // // // // // //       success: true,
// // // // // // // // //       city: city.charAt(0).toUpperCase() + city.slice(1),
// // // // // // // // //       days,
// // // // // // // // //       travelers,
// // // // // // // // //       tripType,
// // // // // // // // //       ...aiData
// // // // // // // // //     });

// // // // // // // // //   } catch (err) {
// // // // // // // // //     console.error("AI Budget Error:", err.message);
// // // // // // // // //     res.status(500).json({
// // // // // // // // //       success: false,
// // // // // // // // //       error: "Failed to generate budget",
// // // // // // // // //       fallback: {
// // // // // // // // //         total: 52000,
// // // // // // // // //         hotel: 22000,
// // // // // // // // //         food: 9500,
// // // // // // // // //         transport: 6500,
// // // // // // // // //         activities: 8500,
// // // // // // // // //         misc: 5500,
// // // // // // // // //         perPerson: 13000,
// // // // // // // // //         tip: "Book hotels and flights early to get better deals."
// // // // // // // // //       }
// // // // // // // // //     });
// // // // // // // // //   }
// // // // // // // // // });

// // // // // // // // // // ====================== 2. HOTEL SEARCH ENDPOINT ======================
// // // // // // // // // app.get("/api/hotels", async (req, res) => {
// // // // // // // // //   const { q, checkIn, checkOut } = req.query;

// // // // // // // // //   if (!q) {
// // // // // // // // //     return res.status(400).json({ 
// // // // // // // // //       success: false, 
// // // // // // // // //       error: "City name is required (use ?q=Goa)" 
// // // // // // // // //     });
// // // // // // // // //   }

// // // // // // // // //   try {
// // // // // // // // //     const response = await axios.get("https://serpapi.com/search", {
// // // // // // // // //       params: {
// // // // // // // // //         engine: "google_hotels",
// // // // // // // // //         q: `${q} hotels`,
// // // // // // // // //         api_key: SERPAPI_KEY,
// // // // // // // // //         check_in_date: checkIn || getFutureDate(7),
// // // // // // // // //         check_out_date: checkOut || getFutureDate(12),
// // // // // // // // //         currency: "INR",
// // // // // // // // //         hl: "en",
// // // // // // // // //         gl: "in"
// // // // // // // // //       }
// // // // // // // // //     });

// // // // // // // // //     const hotels = (response.data.properties || []).slice(0, 12).map((h) => ({
// // // // // // // // //       id: h.id || Math.random().toString(36).substring(7),
// // // // // // // // //       name: h.name || "Luxury Resort",
// // // // // // // // //       rating: h.overall_rating || 4.3,
// // // // // // // // //       price: h.rate_per_night?.lowest 
// // // // // // // // //         ? parseInt(h.rate_per_night.lowest.replace(/[^0-9]/g, "")) || 4500 
// // // // // // // // //         : 4500,
// // // // // // // // //       thumbnail: h.images?.[0]?.thumbnail || "https://picsum.photos/id/1015/400/250",
// // // // // // // // //       location: h.location || q,
// // // // // // // // //       link: h.link || ""
// // // // // // // // //     }));

// // // // // // // // //     res.json({
// // // // // // // // //       success: true,
// // // // // // // // //       city: q,
// // // // // // // // //       count: hotels.length,
// // // // // // // // //       hotels
// // // // // // // // //     });

// // // // // // // // //   } catch (err) {
// // // // // // // // //     console.error("Hotel Search Error:", err.message);
// // // // // // // // //     res.status(500).json({
// // // // // // // // //       success: false,
// // // // // // // // //       error: "Failed to fetch hotels. Please try again."
// // // // // // // // //     });
// // // // // // // // //   }
// // // // // // // // // });

// // // // // // // // // // ====================== SERVER START ======================
// // // // // // // // // app.listen(PORT, "0.0.0.0", () => {
// // // // // // // // //   console.log(`
// // // // // // // // //   🚀 AI Travel Planner Server - Updated (April 2026)
// // // // // // // // //   ================================================
// // // // // // // // //   Status     : ✅ Running
// // // // // // // // //   Port       : ${PORT}
// // // // // // // // //   Currency   : INR (₹)
// // // // // // // // //   AI Model   : Llama 3.3 70B
// // // // // // // // //   Features   : AI Budget + Smart Hotel Search
  
// // // // // // // // //   Endpoints:
// // // // // // // // //   → POST http://localhost:3000/api/ai-budget
// // // // // // // // //   → GET  http://localhost:3000/api/hotels?q=Goa

// // // // // // // // //   Ready for React Native frontend!
// // // // // // // // //   `);
// // // // // // // // // });











// // // // // // // // const express = require("express");
// // // // // // // // const cors = require("cors");
// // // // // // // // const axios = require("axios");
// // // // // // // // const Groq = require("groq-sdk");

// // // // // // // // const app = express();
// // // // // // // // const PORT = 3000;

// // // // // // // // // ====================== CONFIGURATION ======================
// // // // // // // // // Note: In production, move these to a .env file!
// // // // // // // // const SERPAPI_KEY = "00c9a4387fcafade828a6ac5aac8714e024d4e43dd4ee8f1b4d779cd8a0c10d3";
// // // // // // // // const GROQ_API_KEY = "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"; 

// // // // // // // // const groq = new Groq({ apiKey: GROQ_API_KEY });

// // // // // // // // app.use(cors());
// // // // // // // // app.use(express.json());

// // // // // // // // // Helper for dynamic dates
// // // // // // // // const getFutureDate = (days) => {
// // // // // // // //   const d = new Date();
// // // // // // // //   d.setDate(d.getDate() + days);
// // // // // // // //   return d.toISOString().split('T')[0];
// // // // // // // // };

// // // // // // // // // ====================== 1. AI BUDGET ENDPOINT ======================
// // // // // // // // app.post("/api/ai-budget", async (req, res) => {
// // // // // // // //   const { city, travelers = 2, days = 3, tripType = "mid-range" } = req.body;

// // // // // // // //   if (!city) {
// // // // // // // //     return res.status(400).json({ success: false, error: "Destination city is required" });
// // // // // // // //   }

// // // // // // // //   try {
// // // // // // // //     const systemPrompt = `You are a professional Indian Travel Consultant for the year 2026.
// // // // // // // //     Return ONLY a valid JSON object for a ${days}-day ${tripType} trip to ${city} for ${travelers} people.
    
// // // // // // // //     Requirements:
// // // // // // // //     - Currency: INR
// // // // // // // //     - Round values to nearest 100.
// // // // // // // //     - Focus on realistic 2026 prices (accounting for inflation).
    
// // // // // // // //     Structure:
// // // // // // // //     {
// // // // // // // //       "hotel": number,
// // // // // // // //       "food": number,
// // // // // // // //       "transport": number,
// // // // // // // //       "activities": number,
// // // // // // // //       "misc": number,
// // // // // // // //       "tip": "string"
// // // // // // // //     }`;

// // // // // // // //     const completion = await groq.chat.completions.create({
// // // // // // // //       messages: [
// // // // // // // //         { role: "system", content: systemPrompt },
// // // // // // // //         { role: "user", content: `Calculate a detailed budget for ${city}.` }
// // // // // // // //       ],
// // // // // // // //       model: "llama-3.3-70b-versatile",
// // // // // // // //       response_format: { type: "json_object" }
// // // // // // // //     });

// // // // // // // //     const aiResponse = JSON.parse(completion.choices[0].message.content);

// // // // // // // //     // Calculate totals on the server to ensure math accuracy
// // // // // // // //     const hotelTotal = aiResponse.hotel || 0;
// // // // // // // //     const foodTotal = aiResponse.food || 0;
// // // // // // // //     const transportTotal = aiResponse.transport || 0;
// // // // // // // //     const activitiesTotal = aiResponse.activities || 0;
// // // // // // // //     const miscTotal = aiResponse.misc || 0;

// // // // // // // //     const grandTotal = hotelTotal + foodTotal + transportTotal + activitiesTotal + miscTotal;
// // // // // // // //     const perPerson = Math.round(grandTotal / travelers);

// // // // // // // //     res.json({
// // // // // // // //       success: true,
// // // // // // // //       data: {
// // // // // // // //         destination: city,
// // // // // // // //         travelers,
// // // // // // // //         days,
// // // // // // // //         currency: "INR",
// // // // // // // //         breakdown: {
// // // // // // // //           accommodation: hotelTotal,
// // // // // // // //           dining: foodTotal,
// // // // // // // //           commute: transportTotal,
// // // // // // // //           sightseeing: activitiesTotal,
// // // // // // // //           emergency_misc: miscTotal
// // // // // // // //         },
// // // // // // // //         totalBudget: grandTotal,
// // // // // // // //         costPerPerson: perPerson,
// // // // // // // //         travelTip: aiResponse.tip || "Carry a power bank and local cash."
// // // // // // // //       }
// // // // // // // //     });

// // // // // // // //   } catch (err) {
// // // // // // // //     console.error("Budget Gen Error:", err.message);
// // // // // // // //     res.status(500).json({ success: false, error: "AI failed to crunch the numbers." });
// // // // // // // //   }
// // // // // // // // });

// // // // // // // // // ====================== 2. HOTEL SEARCH ENDPOINT ======================
// // // // // // // // app.get("/api/hotels", async (req, res) => {
// // // // // // // //   const { q, checkIn, checkOut } = req.query;

// // // // // // // //   if (!q) return res.status(400).json({ error: "Where are we going? (q=city)" });

// // // // // // // //   try {
// // // // // // // //     const response = await axios.get("https://serpapi.com/search", {
// // // // // // // //       params: {
// // // // // // // //         engine: "google_hotels",
// // // // // // // //         q: `${q} best hotels`,
// // // // // // // //         api_key: SERPAPI_KEY,
// // // // // // // //         check_in_date: checkIn || getFutureDate(14),
// // // // // // // //         check_out_date: checkOut || getFutureDate(17),
// // // // // // // //         currency: "INR",
// // // // // // // //         gl: "in"
// // // // // // // //       }
// // // // // // // //     });

// // // // // // // //     const results = (response.data.properties || []).slice(0, 8).map(h => ({
// // // // // // // //       name: h.name,
// // // // // // // //       rating: h.overall_rating || "N/A",
// // // // // // // //       pricePerNight: h.rate_per_night?.lowest || "Contact Hotel",
// // // // // // // //       image: h.images?.[0]?.thumbnail || "https://via.placeholder.com/300",
// // // // // // // //       link: h.link
// // // // // // // //     }));

// // // // // // // //     res.json({ success: true, city: q, hotels: results });

// // // // // // // //   } catch (err) {
// // // // // // // //     res.status(500).json({ success: false, error: "Google Hotel API is being shy. Try again later." });
// // // // // // // //   }
// // // // // // // // });

// // // // // // // // app.listen(PORT, () => {
// // // // // // // //   console.log(`✅ Server floating on http://localhost:${PORT}`);
// // // // // // // // });











// // // // // // // // // --------
// // // // // // // // const express = require("express");
// // // // // // // // const cors = require("cors");
// // // // // // // // const axios = require("axios");
// // // // // // // // const Groq = require("groq-sdk");

// // // // // // // // const app = express();
// // // // // // // // const PORT = 3000;

// // // // // // // // // ====================== CONFIGURATION ======================
// // // // // // // // const SERPAPI_KEY = "00c9a4387fcafade828a6ac5aac8714e024d4e43dd4ee8f1b4d779cd8a0c10d3";
// // // // // // // // const GROQ_API_KEY = "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"; 

// // // // // // // // const groq = new Groq({ apiKey: GROQ_API_KEY });

// // // // // // // // app.use(cors());
// // // // // // // // app.use(express.json());

// // // // // // // // // Helper for dynamic dates
// // // // // // // // const getFutureDate = (days) => {
// // // // // // // //   const d = new Date();
// // // // // // // //   d.setDate(d.getDate() + days);
// // // // // // // //   return d.toISOString().split('T')[0];
// // // // // // // // };

// // // // // // // // // ====================== 1. IMPROVED AI BUDGET ENDPOINT ======================
// // // // // // // // app.post("/api/ai-budget", async (req, res) => {
// // // // // // // //   const { 
// // // // // // // //     city, 
// // // // // // // //     travelers = 2, 
// // // // // // // //     days = 3, 
// // // // // // // //     tripVibe = "Mid-range", 
// // // // // // // //     interests = "sightseeing",
// // // // // // // //     season = "Normal",           // New: Winter, Summer, Monsoon, Festival, Normal
// // // // // // // //     fromCity = "Mumbai"          // New: Flight assumption sathi
// // // // // // // //   } = req.body;

// // // // // // // //   if (!city) {
// // // // // // // //     return res.status(400).json({ success: false, error: "Destination city is required" });
// // // // // // // //   }

// // // // // // // //   try {
// // // // // // // //     const systemPrompt = `You are a professional 2026 Indian Travel Consultant.
// // // // // // // // Provide a realistic and detailed budget for a trip to ${city}, India.

// // // // // // // // Traveler Profile:
// // // // // // // // - Trip Style: ${tripVibe} (Budget / Mid-range / Luxury)
// // // // // // // // - Number of Travelers: ${travelers} people
// // // // // // // // - Duration: ${days} days
// // // // // // // // - Main Interests: ${interests}
// // // // // // // // - Season: ${season}
// // // // // // // // - Assuming departure from: ${fromCity}

// // // // // // // // Important Instructions:
// // // // // // // // - Use current 2026 prices with 6-8% inflation from 2025.
// // // // // // // // - In peak season (Dec-Feb or major festivals), increase hotel and activities cost by 25-40%.
// // // // // // // // - In monsoon (Jun-Sep), slightly reduce activities but increase indoor options.
// // // // // // // // - Be practical for Indian middle-class travelers.
// // // // // // // // - Return ONLY a valid JSON object. No extra text.

// // // // // // // // Required JSON Structure:
// // // // // // // // {
// // // // // // // //   "hotel_per_night": number,
// // // // // // // //   "food_per_person_per_day": number,
// // // // // // // //   "local_transport_total": number,
// // // // // // // //   "activities_total": number,
// // // // // // // //   "misc_total": number,
// // // // // // // //   "flights_estimated_per_person": number,
// // // // // // // //   "expert_tip": "string (specific to ${city} and ${interests})",
// // // // // // // //   "saving_tips": ["tip 1", "tip 2", "tip 3"]
// // // // // // // // }`;

// // // // // // // //     const completion = await groq.chat.completions.create({
// // // // // // // //       messages: [
// // // // // // // //         { role: "system", content: systemPrompt },
// // // // // // // //         { role: "user", content: `Generate detailed 2026 travel budget for ${city} for ${days} days.` }
// // // // // // // //       ],
// // // // // // // //       model: "llama-3.3-70b-versatile",
// // // // // // // //       response_format: { type: "json_object" },
// // // // // // // //       temperature: 0.7
// // // // // // // //     });

// // // // // // // //     let ai;
// // // // // // // //     try {
// // // // // // // //       ai = JSON.parse(completion.choices[0].message.content);
// // // // // // // //     } catch (parseErr) {
// // // // // // // //       console.error("JSON Parse Error:", parseErr);
// // // // // // // //       return res.status(500).json({ success: false, error: "AI response format invalid" });
// // // // // // // //     }

// // // // // // // //     // Precise Calculations
// // // // // // // //     const hotelTotal = (ai.hotel_per_night || 0) * days;
// // // // // // // //     const foodTotal = (ai.food_per_person_per_day || 0) * days * travelers;
// // // // // // // //     const transportTotal = ai.local_transport_total || 0;
// // // // // // // //     const activitiesTotal = ai.activities_total || 0;
// // // // // // // //     const miscTotal = ai.misc_total || 0;
// // // // // // // //     const flightsTotal = (ai.flights_estimated_per_person || 0) * travelers;

// // // // // // // //     const grandTotal = hotelTotal + foodTotal + transportTotal + activitiesTotal + miscTotal + flightsTotal;

// // // // // // // //     res.json({
// // // // // // // //       success: true,
// // // // // // // //       data: {
// // // // // // // //         destination: city,
// // // // // // // //         travelers,
// // // // // // // //         days,
// // // // // // // //         vibe: tripVibe,
// // // // // // // //         season: season,
// // // // // // // //         fromCity: fromCity,
        
// // // // // // // //         totalBudget: Math.round(grandTotal),
// // // // // // // //         costPerPerson: Math.round(grandTotal / travelers),

// // // // // // // //         breakdown: {
// // // // // // // //           flights: Math.round(flightsTotal),
// // // // // // // //           accommodation: Math.round(hotelTotal),
// // // // // // // //           dining: Math.round(foodTotal),
// // // // // // // //           commute: Math.round(transportTotal),
// // // // // // // //           sightseeing_activities: Math.round(activitiesTotal),
// // // // // // // //           emergency_misc: Math.round(miscTotal)
// // // // // // // //         },

// // // // // // // //         perPersonBreakdown: {
// // // // // // // //           flights: Math.round(ai.flights_estimated_per_person || 0),
// // // // // // // //           hotel: Math.round((ai.hotel_per_night || 0) * days / travelers),
// // // // // // // //           food: Math.round(ai.food_per_person_per_day || 0),
// // // // // // // //           activities: Math.round(activitiesTotal / travelers)
// // // // // // // //         },

// // // // // // // //         travelTip: ai.expert_tip,
// // // // // // // //         savingTips: ai.saving_tips || [],
        
// // // // // // // //         note: "This is an AI estimated budget for 2026. Actual prices may vary."
// // // // // // // //       }
// // // // // // // //     });

// // // // // // // //   } catch (err) {
// // // // // // // //     console.error("Budget Error:", err.message);
// // // // // // // //     res.status(500).json({ 
// // // // // // // //       success: false, 
// // // // // // // //       error: "Failed to generate budget. Please try again." 
// // // // // // // //     });
// // // // // // // //   }
// // // // // // // // });
// // // // // // // // // ====================== 2. HOTEL SEARCH ENDPOINT ======================
// // // // // // // // app.get("/api/hotels", async (req, res) => {
// // // // // // // //   const { q, checkIn, checkOut } = req.query;

// // // // // // // //   if (!q) return res.status(400).json({ error: "City query is required" });

// // // // // // // //   try {
// // // // // // // //     const response = await axios.get("https://serpapi.com/search", {
// // // // // // // //       params: {
// // // // // // // //         engine: "google_hotels",
// // // // // // // //         q: `${q} ${req.query.vibe || ''} hotels`, // Added vibe to search query
// // // // // // // //         api_key: SERPAPI_KEY,
// // // // // // // //         check_in_date: checkIn || getFutureDate(14),
// // // // // // // //         check_out_date: checkOut || getFutureDate(17),
// // // // // // // //         currency: "INR",
// // // // // // // //         gl: "in"
// // // // // // // //       }
// // // // // // // //     });

// // // // // // // //     const results = (response.data.properties || []).slice(0, 8).map(h => ({
// // // // // // // //       name: h.name,
// // // // // // // //       rating: h.overall_rating || "N/A",
// // // // // // // //       pricePerNight: h.rate_per_night?.lowest || "Contact Hotel",
// // // // // // // //       image: h.images?.[0]?.thumbnail || "https://via.placeholder.com/300",
// // // // // // // //       link: h.link
// // // // // // // //     }));

// // // // // // // //     res.json({ success: true, city: q, hotels: results });

// // // // // // // //   } catch (err) {
// // // // // // // //     res.status(500).json({ success: false, error: "Hotel search failed." });
// // // // // // // //   }
// // // // // // // // });

// // // // // // // // app.listen(PORT, () => {
// // // // // // // //   console.log(`✅ Travel Server active on http://localhost:${PORT}`);
// // // // // // // // });













// // // // // // // // server.js
// // // // // // // const express = require("express");
// // // // // // // const cors = require("cors");
// // // // // // // const axios = require("axios");
// // // // // // // const Groq = require("groq-sdk");

// // // // // // // const app = express();
// // // // // // // const PORT = 3000;

// // // // // // // // ====================== CONFIGURATION ======================
// // // // // // // const SERPAPI_KEY = "00c9a4387fcafade828a6ac5aac8714e024d4e43dd4ee8f1b4d779cd8a0c10d3";
// // // // // // // const GROQ_API_KEY = "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"; 

// // // // // // // const groq = new Groq({ apiKey: GROQ_API_KEY });

// // // // // // // app.use(cors());
// // // // // // // app.use(express.json());

// // // // // // // // Helper for dynamic dates
// // // // // // // const getFutureDate = (days) => {
// // // // // // //   const d = new Date();
// // // // // // //   d.setDate(d.getDate() + days);
// // // // // // //   return d.toISOString().split('T')[0];
// // // // // // // };

// // // // // // // // ====================== AI BUDGET GENERATION ENDPOINT ======================
// // // // // // // app.post("/api/ai-budget", async (req, res) => {
// // // // // // //   const { 
// // // // // // //     city, 
// // // // // // //     travelers = 2, 
// // // // // // //     days = 4, 
// // // // // // //     tripVibe = "Mid-range", 
// // // // // // //     interests = "sightseeing",
// // // // // // //     season = "Normal",           
// // // // // // //     fromCity = "Mumbai"          
// // // // // // //   } = req.body;

// // // // // // //   if (!city) {
// // // // // // //     return res.status(400).json({ success: false, error: "Destination city is required" });
// // // // // // //   }

// // // // // // //   try {
// // // // // // //     console.log(`📊 Generating budget for ${city} - ${travelers} travelers, ${days} days, ${tripVibe} vibe`);

// // // // // // //     const systemPrompt = `You are a strict, experienced Indian travel budget expert for 2026. 
// // // // // // // You always give practical, realistic, and slightly higher estimates. Never give cheap fantasy numbers.

// // // // // // // Destination: ${city}, India
// // // // // // // Trip Vibe: ${tripVibe}
// // // // // // // Travelers: ${travelers} people
// // // // // // // Days: ${days} days
// // // // // // // Season: ${season}
// // // // // // // Departure City: ${fromCity}
// // // // // // // Interests: ${interests}

// // // // // // // Realistic 2026 Price Guidelines (Follow strictly):
// // // // // // // - Hotel per night (double room): Budget ₹2200-3500 | Mid-range ₹4200-8000 | Luxury ₹12000+
// // // // // // // - Food per person/day: Budget ₹1000-1500 | Mid-range ₹1800-3000 | Luxury ₹4000+
// // // // // // // - Round-trip Flight: ₹7000 - ₹22000 per person (higher in peak season)
// // // // // // // - Local Transport total: ₹4000 - ₹15000
// // // // // // // - Activities total: ₹4000 - ₹18000

// // // // // // // Apply 7% inflation for 2026. Increase hotel & activities by 25-40% in Winter/Festival season.

// // // // // // // Return ONLY valid JSON with these exact fields:
// // // // // // // {
// // // // // // //   "hotel_per_night": number,
// // // // // // //   "food_per_person_per_day": number,
// // // // // // //   "local_transport_total": number,
// // // // // // //   "activities_total": number,
// // // // // // //   "misc_total": number,
// // // // // // //   "flights_estimated_per_person": number,
// // // // // // //   "expert_tip": "string with practical travel advice",
// // // // // // //   "saving_tips": ["tip1", "tip2", "tip3"]
// // // // // // // }`;

// // // // // // //     const completion = await groq.chat.completions.create({
// // // // // // //       messages: [
// // // // // // //         { role: "system", content: systemPrompt },
// // // // // // //         { role: "user", content: `Generate realistic budget for ${days} days trip to ${city} for ${travelers} travelers.` }
// // // // // // //       ],
// // // // // // //       model: "llama-3.3-70b-versatile",
// // // // // // //       response_format: { type: "json_object" },
// // // // // // //       temperature: 0.5,
// // // // // // //       max_tokens: 1000
// // // // // // //     });

// // // // // // //     let ai = JSON.parse(completion.choices[0].message.content);
// // // // // // //     console.log("🤖 AI Response:", ai);

// // // // // // //     // Safety Floors - Prevent unrealistic low prices
// // // // // // //     const vibeLower = tripVibe.toLowerCase();
// // // // // // //     ai.hotel_per_night = Math.max(ai.hotel_per_night || 0, 
// // // // // // //       vibeLower.includes("budget") ? 2200 : vibeLower.includes("luxury") ? 12000 : 4200);
    
// // // // // // //     ai.food_per_person_per_day = Math.max(ai.food_per_person_per_day || 0, 
// // // // // // //       vibeLower.includes("budget") ? 1000 : vibeLower.includes("luxury") ? 4000 : 2000);
    
// // // // // // //     ai.flights_estimated_per_person = Math.max(ai.flights_estimated_per_person || 0, 7000);
// // // // // // //     ai.activities_total = Math.max(ai.activities_total || 0, 4000);
// // // // // // //     ai.local_transport_total = Math.max(ai.local_transport_total || 0, 3500);
// // // // // // //     ai.misc_total = Math.max(ai.misc_total || 0, 2000);

// // // // // // //     // Calculations
// // // // // // //     const hotelTotal = ai.hotel_per_night * days;
// // // // // // //     const foodTotal = ai.food_per_person_per_day * days * travelers;
// // // // // // //     const flightsTotal = ai.flights_estimated_per_person * travelers;
// // // // // // //     const grandTotal = hotelTotal + foodTotal + ai.local_transport_total + ai.activities_total + ai.misc_total + flightsTotal;

// // // // // // //     const budgetData = {
// // // // // // //       destination: city,
// // // // // // //       travelers,
// // // // // // //       days,
// // // // // // //       vibe: tripVibe,
// // // // // // //       season,
// // // // // // //       fromCity,
// // // // // // //       totalBudget: Math.round(grandTotal),
// // // // // // //       costPerPerson: Math.round(grandTotal / travelers),
// // // // // // //       breakdown: {
// // // // // // //         flights: Math.round(flightsTotal),
// // // // // // //         accommodation: Math.round(hotelTotal),
// // // // // // //         dining: Math.round(foodTotal),
// // // // // // //         commute: Math.round(ai.local_transport_total),
// // // // // // //         sightseeing_activities: Math.round(ai.activities_total),
// // // // // // //         emergency_misc: Math.round(ai.misc_total)
// // // // // // //       },
// // // // // // //       travelTip: ai.expert_tip || "Book flights and hotels early for best deals.",
// // // // // // //       savingTips: ai.saving_tips || ["Travel during off-peak season", "Book in advance", "Use public transport"],
// // // // // // //       note: "This is a realistic AI estimated budget for 2026. Actual prices may vary by 10-15%."
// // // // // // //     };

// // // // // // //     console.log("✅ Budget generated successfully");
// // // // // // //     res.json({
// // // // // // //       success: true,
// // // // // // //       data: budgetData
// // // // // // //     });

// // // // // // //   } catch (err) {
// // // // // // //     console.error("❌ Budget Error:", err.message);
// // // // // // //     console.error(err.stack);
// // // // // // //     res.status(500).json({ 
// // // // // // //       success: false, 
// // // // // // //       error: "Failed to generate budget. Please try again.",
// // // // // // //       details: err.message 
// // // // // // //     });
// // // // // // //   }
// // // // // // // });

// // // // // // // // ====================== HOTEL SEARCH ENDPOINT ======================
// // // // // // // app.get("/api/hotels", async (req, res) => {
// // // // // // //   const { q, checkIn, checkOut, vibe } = req.query;

// // // // // // //   if (!q) {
// // // // // // //     return res.status(400).json({ success: false, error: "City query is required" });
// // // // // // //   }

// // // // // // //   try {
// // // // // // //     console.log(`🏨 Searching hotels in ${q}`);
    
// // // // // // //     const response = await axios.get("https://serpapi.com/search", {
// // // // // // //       params: {
// // // // // // //         engine: "google_hotels",
// // // // // // //         q: `${q} ${vibe || ''} hotels`,
// // // // // // //         api_key: SERPAPI_KEY,
// // // // // // //         check_in_date: checkIn || getFutureDate(14),
// // // // // // //         check_out_date: checkOut || getFutureDate(17),
// // // // // // //         currency: "INR",
// // // // // // //         gl: "in"
// // // // // // //       }
// // // // // // //     });

// // // // // // //     const results = (response.data.properties || []).slice(0, 8).map(h => ({
// // // // // // //       name: h.name,
// // // // // // //       rating: h.overall_rating || "N/A",
// // // // // // //       pricePerNight: h.rate_per_night?.lowest || "Contact Hotel",
// // // // // // //       image: h.images?.[0]?.thumbnail || "https://via.placeholder.com/300",
// // // // // // //       link: h.link
// // // // // // //     }));

// // // // // // //     console.log(`✅ Found ${results.length} hotels`);
// // // // // // //     res.json({ success: true, city: q, hotels: results });

// // // // // // //   } catch (err) {
// // // // // // //     console.error("❌ Hotel search error:", err.message);
// // // // // // //     res.status(500).json({ success: false, error: "Hotel search failed." });
// // // // // // //   }
// // // // // // // });

// // // // // // // // ====================== HEALTH CHECK ENDPOINT ======================
// // // // // // // app.get("/api/health", (req, res) => {
// // // // // // //   res.json({ 
// // // // // // //     status: "ok", 
// // // // // // //     message: "Travel Budget API is running",
// // // // // // //     timestamp: new Date().toISOString()
// // // // // // //   });
// // // // // // // });

// // // // // // // // ====================== START SERVER ======================
// // // // // // // app.listen(PORT, () => {
// // // // // // //   console.log(`\n${'='.repeat(60)}`);
// // // // // // //   console.log(`✅ Travel Budget API Server Running`);
// // // // // // //   console.log(`${'='.repeat(60)}`);
// // // // // // //   console.log(`📍 Local:     http://localhost:${PORT}`);
// // // // // // //   console.log(`🏥 Health:    http://localhost:${PORT}/api/health`);
// // // // // // //   console.log(`💰 Budget:    POST http://localhost:${PORT}/api/ai-budget`);
// // // // // // //   console.log(`🏨 Hotels:    GET  http://localhost:${PORT}/api/hotels`);
// // // // // // //   console.log(`${'='.repeat(60)}\n`);
// // // // // // // });




// // // // // // const express = require("express");
// // // // // // const cors = require("cors");
// // // // // // const axios = require("axios");
// // // // // // const Groq = require("groq-sdk");

// // // // // // const app = express();
// // // // // // const PORT = 3000;

// // // // // // // ====================== CONFIGURATION ======================
// // // // // // const SERPAPI_KEY = "00c9a4387fcafade828a6ac5aac8714e024d4e43dd4ee8f1b4d779cd8a0c10d3";
// // // // // // const GROQ_API_KEY = "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"; 

// // // // // // const groq = new Groq({ apiKey: GROQ_API_KEY });

// // // // // // app.use(cors());
// // // // // // app.use(express.json());

// // // // // // // Helper for dynamic dates
// // // // // // const getFutureDate = (days) => {
// // // // // //   const d = new Date();
// // // // // //   d.setDate(d.getDate() + days);
// // // // // //   return d.toISOString().split('T')[0];
// // // // // // };

// // // // // // // ====================== AI BUDGET GENERATION ENDPOINT ======================
// // // // // // app.post("/api/ai-budget", async (req, res) => {
// // // // // //   const { 
// // // // // //     city, 
// // // // // //     travelers, 
// // // // // //     days, 
// // // // // //     tripVibe = "Mid-range", 
// // // // // //     interests = "general sightseeing",
// // // // // //     season = "Normal",           
// // // // // //     fromCity = "Mumbai"          
// // // // // //   } = req.body;

// // // // // //   if (!city) {
// // // // // //     return res.status(400).json({ success: false, error: "Destination city is required" });
// // // // // //   }

// // // // // //   // Detect Mode: If travelers or days are missing, provide a Quick Summary
// // // // // //   const isQuickMode = !travelers || !days;

// // // // // //   try {
// // // // // //     console.log(`📊 Mode: ${isQuickMode ? 'QUICK' : 'FULL'} | Destination: ${city}`);

// // // // // //     let systemPrompt = "";

// // // // // //     if (isQuickMode) {
// // // // // //       systemPrompt = `You are an Indian travel expert. Provide a 2-sentence budget overview for ${city} in 2026. 
// // // // // //       Mention if it is luxury or budget-friendly. 
// // // // // //       Return ONLY JSON: { "summary": "string", "avg_daily_inr": number }`;
// // // // // //     } else {
// // // // // //       systemPrompt = `You are a strict, experienced Indian travel budget expert for 2026. 
// // // // // //       Destination: ${city} | Vibe: ${tripVibe} | Travelers: ${travelers} | Days: ${days} | From: ${fromCity}.

// // // // // //       Guidelines:
// // // // // //       - Hotel/night: Budget ₹2500 | Mid ₹5000 | Luxury ₹15000+
// // // // // //       - Food/day/person: Budget ₹1200 | Mid ₹2500 | Luxury ₹5000+
// // // // // //       - Include 7% inflation for 2026.
      
// // // // // //       Return ONLY JSON with these exact fields:
// // // // // //       {
// // // // // //         "hotel_per_night": number,
// // // // // //         "food_per_person_per_day": number,
// // // // // //         "local_transport_total": number,
// // // // // //         "activities_total": number,
// // // // // //         "flights_estimated_per_person": number,
// // // // // //         "top_places": [{"name": "string", "importance": "string", "cost": number}],
// // // // // //         "expert_tip": "string",
// // // // // //         "saving_tips": ["tip1", "tip2", "tip3"]
// // // // // //       }`;
// // // // // //     }

// // // // // //     const completion = await groq.chat.completions.create({
// // // // // //       messages: [{ role: "system", content: systemPrompt }],
// // // // // //       model: "llama-3.3-70b-versatile",
// // // // // //       response_format: { type: "json_object" },
// // // // // //       temperature: 0.4
// // // // // //     });

// // // // // //     const ai = JSON.parse(completion.choices[0].message.content);

// // // // // //     // --- CASE 1: QUICK SUMMARY ---
// // // // // //     if (isQuickMode) {
// // // // // //       return res.json({
// // // // // //         success: true,
// // // // // //         mode: "QUICK",
// // // // // //         data: {
// // // // // //           destination: city,
// // // // // //           summary: ai.summary,
// // // // // //           avgDaily: ai.avg_daily_inr,
// // // // // //           note: "Add days and travelers for a full detailed report."
// // // // // //         }
// // // // // //       });
// // // // // //     }

// // // // // //     // --- CASE 2: FULL DETAILED PLAN ---
// // // // // //     // Apply Safety Floors
// // // // // //     const vibeLower = tripVibe.toLowerCase();
// // // // // //     const hotelRate = Math.max(ai.hotel_per_night, vibeLower.includes("budget") ? 2200 : vibeLower.includes("luxury") ? 12000 : 4200);
// // // // // //     const foodRate = Math.max(ai.food_per_person_per_day, vibeLower.includes("budget") ? 1000 : vibeLower.includes("luxury") ? 4000 : 1800);
    
// // // // // //     const hotelTotal = hotelRate * days;
// // // // // //     const foodTotal = foodRate * days * travelers;
// // // // // //     const flightsTotal = (ai.flights_estimated_per_person || 7000) * travelers;
// // // // // //     const grandTotal = hotelTotal + foodTotal + ai.local_transport_total + ai.activities_total + flightsTotal;

// // // // // //     res.json({
// // // // // //       success: true,
// // // // // //       mode: "FULL",
// // // // // //       data: {
// // // // // //         destination: city,
// // // // // //         totalBudget: Math.round(grandTotal),
// // // // // //         costPerPerson: Math.round(grandTotal / travelers),
// // // // // //         breakdown: {
// // // // // //           accommodation: hotelTotal,
// // // // // //           dining: foodTotal,
// // // // // //           flights: flightsTotal,
// // // // // //           commute: ai.local_transport_total,
// // // // // //           sightseeing: ai.activities_total
// // // // // //         },
// // // // // //         importantPlaces: ai.top_places || [],
// // // // // //         expertTip: ai.expert_tip,
// // // // // //         savingTips: ai.saving_tips,
// // // // // //         meta: { travelers, days, vibe: tripVibe, fromCity }
// // // // // //       }
// // // // // //     });

// // // // // //   } catch (err) {
// // // // // //     console.error("Budget Error:", err.message);
// // // // // //     res.status(500).json({ success: false, error: "AI failed to generate budget." });
// // // // // //   }
// // // // // // });

// // // // // // app.get("/api/hotels", async (req, res) => {
// // // // // //   const { q, vibe } = req.query;
  
// // // // // //   // 1. Validation: Ensure q is a string and not just whitespace
// // // // // //   if (!q || q.trim() === "") {
// // // // // //     return res.status(400).json({ success: false, error: "City query 'q' is required" });
// // // // // //   }

// // // // // //   try {
// // // // // //     const response = await axios.get("https://serpapi.com/search", {
// // // // // //       params: {
// // // // // //         engine: "google_hotels",
// // // // // //         q: `${q.trim()} ${vibe || ''} hotels`,
// // // // // //         api_key: SERPAPI_KEY,
// // // // // //         currency: "INR",
// // // // // //         gl: "in",
// // // // // //         hl: "en" // Added language parameter for stability
// // // // // //       }
// // // // // //     });

// // // // // //     const hotels = (response.data.properties || []).slice(0, 8).map(h => ({
// // // // // //       name: h.name,
// // // // // //       rating: h.overall_rating || "N/A",
// // // // // //       price: h.rate_per_night?.lowest || "N/A", 
// // // // // //       thumbnail: h.images?.[0]?.thumbnail || "https://via.placeholder.com/300",
// // // // // //       link: h.link
// // // // // //     }));

// // // // // //     res.json({ success: true, hotels });
// // // // // //   } catch (err) {
// // // // // //     // 2. Enhanced Error Logging: This tells you EXACTLY what SerpAPI didn't like
// // // // // //     if (err.response) {
// // // // // //       console.error("SerpAPI Error Data:", err.response.data);
// // // // // //       return res.status(err.response.status).json({ 
// // // // // //         success: false, 
// // // // // //         error: err.response.data.error || "SerpAPI Request Failed" 
// // // // // //       });
// // // // // //     }
// // // // // //     console.error("Server Error:", err.message);
// // // // // //     res.status(500).json({ success: false, error: "Hotel search failed." });
// // // // // //   }
// // // // // // });
// // // // // // // ... (keep your app.listen)

// // // // // // app.listen(PORT, () => {
// // // // // //   console.log(`✅ TravioX Server running on http://localhost:${PORT}`);
// // // // // // });








// // // // // const express = require("express");
// // // // // const cors = require("cors");
// // // // // const axios = require("axios");
// // // // // const Groq = require("groq-sdk");

// // // // // const app = express();
// // // // // const PORT = 3000;

// // // // // const SERPAPI_KEY = "00c9a4387fcafade828a6ac5aac8714e024d4e43dd4ee8f1b4d779cd8a0c10d3";
// // // // // const GROQ_API_KEY = "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"; 

// // // // // const groq = new Groq({ apiKey: GROQ_API_KEY });

// // // // // app.use(cors());
// // // // // app.use(express.json());

// // // // // // Helper for dynamic dates (YYYY-MM-DD)
// // // // // const getFormattedDate = (daysFromNow) => {
// // // // //   const d = new Date();
// // // // //   d.setDate(d.getDate() + daysFromNow);
// // // // //   return d.toISOString().split('T')[0];
// // // // // };

// // // // // // ====================== AI BUDGET ENDPOINT ======================
// // // // // app.post("/api/ai-budget", async (req, res) => {
// // // // //   const { city, travelers, days, tripVibe = "Mid-range", fromCity = "Mumbai" } = req.body;
// // // // //   if (!city) return res.status(400).json({ success: false, error: "City required" });

// // // // //   const isQuickMode = !travelers || !days;

// // // // //   try {
// // // // //     let systemPrompt = isQuickMode 
// // // // //       ? `Provide a 2-sentence 2026 budget overview for ${city}. Return JSON: { "summary": "string", "avg_daily_inr": number }`
// // // // //       : `Strict Indian travel expert 2026. Destination: ${city}, Vibe: ${tripVibe}. Return JSON with fields: hotel_per_night, food_per_person_per_day, local_transport_total, activities_total, flights_estimated_per_person, top_places, expert_tip, saving_tips.`;

// // // // //     const completion = await groq.chat.completions.create({
// // // // //       messages: [{ role: "system", content: systemPrompt }],
// // // // //       model: "llama-3.3-70b-versatile",
// // // // //       response_format: { type: "json_object" },
// // // // //       temperature: 0.4
// // // // //     });

// // // // //     const ai = JSON.parse(completion.choices[0].message.content);
// // // // //     if (isQuickMode) return res.json({ success: true, mode: "QUICK", data: ai });

// // // // //     // Detailed Math
// // // // //     const hotelTotal = ai.hotel_per_night * days;
// // // // //     const foodTotal = ai.food_per_person_per_day * days * travelers;
// // // // //     const flightsTotal = (ai.flights_estimated_per_person || 7000) * travelers;
// // // // //     const grandTotal = hotelTotal + foodTotal + ai.local_transport_total + ai.activities_total + flightsTotal;

// // // // //     res.json({
// // // // //       success: true,
// // // // //       mode: "FULL",
// // // // //       data: {
// // // // //         destination: city,
// // // // //         totalBudget: Math.round(grandTotal),
// // // // //         breakdown: { accommodation: hotelTotal, dining: foodTotal, flights: flightsTotal, commute: ai.local_transport_total, sightseeing: ai.activities_total },
// // // // //         importantPlaces: ai.top_places,
// // // // //         expertTip: ai.expert_tip,
// // // // //         savingTips: ai.saving_tips
// // // // //       }
// // // // //     });
// // // // //   } catch (err) {
// // // // //     res.status(500).json({ success: false, error: "AI Budget failed" });
// // // // //   }
// // // // // });

// // // // // // ====================== HOTEL SEARCH ENDPOINT ======================
// // // // // app.get("/api/hotels", async (req, res) => {
// // // // //   const { q } = req.query;
// // // // //   if (!q) return res.status(400).json({ success: false, error: "City required" });

// // // // //   try {
// // // // //     const response = await axios.get("https://serpapi.com/search", {
// // // // //       params: {
// // // // //         engine: "google_hotels",
// // // // //         q: `${q} hotels`,
// // // // //         check_in_date: getFormattedDate(1),  // Mandatory for Google Hotels
// // // // //         check_out_date: getFormattedDate(3), // Mandatory for Google Hotels
// // // // //         api_key: SERPAPI_KEY,
// // // // //         currency: "INR",
// // // // //         gl: "in"
// // // // //       }
// // // // //     });

// // // // //     const hotels = (response.data.properties || []).slice(0, 8).map(h => ({
// // // // //       name: h.name,
// // // // //       rating: h.overall_rating || "N/A",
// // // // //       price: h.rate_per_night?.lowest || "N/A", 
// // // // //       thumbnail: h.images?.[0]?.thumbnail || "https://via.placeholder.com/300",
// // // // //       link: h.link
// // // // //     }));

// // // // //     res.json({ success: true, hotels });
// // // // //   } catch (err) {
// // // // //     console.error("SerpAPI Error:", err.response?.data || err.message);
// // // // //     res.status(500).json({ success: false, error: "Hotel API failed" });
// // // // //   }
// // // // // });

// // // // // app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));













// // // // const express = require("express");
// // // // const cors = require("cors");
// // // // const axios = require("axios");
// // // // const Groq = require("groq-sdk");

// // // // const app = express();
// // // // const PORT = 3000;

// // // // // ====================== CONFIGURATION ======================
// // // // const SERPAPI_KEY = "00c9a4387fcafade828a6ac5aac8714e024d4e43dd4ee8f1b4d779cd8a0c10d3";
// // // // const GROQ_API_KEY = "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"; 

// // // // const groq = new Groq({ apiKey: GROQ_API_KEY });

// // // // app.use(cors());
// // // // app.use(express.json());

// // // // const getFormattedDate = (daysFromNow) => {
// // // //   const d = new Date();
// // // //   d.setDate(d.getDate() + daysFromNow);
// // // //   return d.toISOString().split('T')[0];
// // // // };

// // // // // ====================== AI BUDGET ENDPOINT ======================
// // // // app.post("/api/ai-budget", async (req, res) => {
// // // //   const { city, travelers, days, tripVibe = "Mid-range" } = req.body;
// // // //   if (!city) return res.status(400).json({ success: false, error: "City required" });

// // // //   const isQuickMode = !travelers || !days;

// // // //   try {
// // // //     let systemPrompt = isQuickMode 
// // // //       ? `Indian travel expert. 2-sentence 2026 budget for ${city}. Return JSON: { "summary": "string", "avg_daily_inr": number }`
// // // //       : `Strict 2026 Budget Expert. Destination: ${city}, Vibe: ${tripVibe}, Travelers: ${travelers}, Days: ${days}. Include 7% inflation. Return JSON: { "hotel_per_night": number, "food_per_person_per_day": number, "local_transport_total": number, "activities_total": number, "flights_estimated_per_person": number, "top_places": [{"name": "string", "importance": "string", "cost": number}], "expert_tip": "string" }`;

// // // //     const completion = await groq.chat.completions.create({
// // // //       messages: [{ role: "system", content: systemPrompt }],
// // // //       model: "llama-3.3-70b-versatile",
// // // //       response_format: { type: "json_object" },
// // // //       temperature: 0.4
// // // //     });

// // // //     const ai = JSON.parse(completion.choices[0].message.content);

// // // //     if (isQuickMode) {
// // // //       return res.json({
// // // //         success: true,
// // // //         mode: "QUICK",
// // // //         data: { destination: city, summary: ai.summary, avgDaily: ai.avg_daily_inr }
// // // //       });
// // // //     }

// // // //     const hotelTotal = ai.hotel_per_night * days;
// // // //     const foodTotal = ai.food_per_person_per_day * days * travelers;
// // // //     const flightsTotal = (ai.flights_estimated_per_person || 7000) * travelers;
// // // //     const grandTotal = hotelTotal + foodTotal + ai.local_transport_total + ai.activities_total + flightsTotal;

// // // //     res.json({
// // // //       success: true,
// // // //       mode: "FULL",
// // // //       data: {
// // // //         destination: city,
// // // //         totalBudget: Math.round(grandTotal),
// // // //         breakdown: { accommodation: hotelTotal, dining: foodTotal, flights: flightsTotal, commute: ai.local_transport_total, sightseeing: ai.activities_total },
// // // //         importantPlaces: ai.top_places || [],
// // // //         expertTip: ai.expert_tip || "Travel light and stay hydrated!"
// // // //       }
// // // //     });
// // // //   } catch (err) {
// // // //     res.status(500).json({ success: false, error: "AI Budget failed" });
// // // //   }
// // // // });
// // // // // ====================== AI PLANNER ENDPOINT ======================
// // // // app.post("/api/ai-planner", async (req, res) => {
// // // //   const { city, days, tripVibe = "Balanced" } = req.body;
// // // //   if (!city || !days) return res.status(400).json({ success: false, error: "City and days required" });

// // // //   try {
// // // //     const systemPrompt = `Expert Travel Architect. Create a detailed ${days}-day itinerary for ${city}. 
// // // //     Vibe: ${tripVibe}. 
// // // //     Return JSON ONLY: {
// // // //       "itinerary": [
// // // //         {
// // // //           "day": 1,
// // // //           "theme": "string",
// // // //           "activities": [
// // // //             {"time": "Morning", "task": "string", "description": "string"},
// // // //             {"time": "Afternoon", "task": "string", "description": "string"},
// // // //             {"time": "Evening", "task": "string", "description": "string"}
// // // //           ]
// // // //         }
// // // //       ],
// // // //       "travel_tips": ["string"]
// // // //     }`;

// // // //     const completion = await groq.chat.completions.create({
// // // //       messages: [{ role: "system", content: systemPrompt }],
// // // //       model: "llama-3.3-70b-versatile",
// // // //       response_format: { type: "json_object" },
// // // //       temperature: 0.5
// // // //     });

// // // //     const plan = JSON.parse(completion.choices[0].message.content);
// // // //     res.json({ success: true, data: plan });
// // // //   } catch (err) {
// // // //     res.status(500).json({ success: false, error: "AI Planner failed" });
// // // //   }
// // // // });
// // // // /* ============================================
// // // //     📰 NEW: STARTUP NEWS SEARCH
// // // // ============================================ */
// // // // app.get("/api/startup-news", async (req, res) => {
// // // //   try {
// // // //     const query = req.query.q || "Travel Startups"; // Default query if empty

// // // //     const response = await axios.get(
// // // //       "https://real-time-news-data.p.rapidapi.com/search",
// // // //       {
// // // //         params: {
// // // //           query,
// // // //           limit: 10,
// // // //           time_published: "anytime",
// // // //           country: "US",
// // // //           lang: "en"
// // // //         },
// // // //         headers: {
// // // //           "x-rapidapi-key": RAPID_API_KEY,
// // // //           "x-rapidapi-host": "real-time-news-data.p.rapidapi.com"
// // // //         }
// // // //       }
// // // //     );

// // // //     const formattedNews = (response.data.data || []).map(item => ({
// // // //       title: item.title,
// // // //       summary: item.snippet || item.summary || "No summary available",
// // // //       link: item.link,
// // // //       published_date: item.published_datetime_utc || "",
// // // //       image_url: item.photo_url || item.thumbnail || "https://via.placeholder.com/400x200"
// // // //     }));

// // // //     res.json({ success: true, results: formattedNews });

// // // //   } catch (error) {
// // // //     console.error("News API Error:", error.response?.data || error.message);
// // // //     res.status(500).json({ success: false, message: "Failed to fetch startup news" });
// // // //   }
// // // // });
// // // // // ====================== HOTEL SEARCH ENDPOINT ======================
// // // // app.get("/api/hotels", async (req, res) => {
// // // //   const { q } = req.query;
// // // //   if (!q) return res.status(400).json({ success: false, error: "City required" });

// // // //   try {
// // // //     const response = await axios.get("https://serpapi.com/search", {
// // // //       params: {
// // // //         engine: "google_hotels",
// // // //         q: `${q} hotels`,
// // // //         check_in_date: getFormattedDate(1),
// // // //         check_out_date: getFormattedDate(3),
// // // //         api_key: SERPAPI_KEY,
// // // //         currency: "INR",
// // // //         gl: "in"
// // // //       }
// // // //     });

// // // //     const hotels = (response.data.properties || []).slice(0, 8).map(h => ({
// // // //       name: h.name,
// // // //       rating: h.overall_rating || "N/A",
// // // //       price: h.rate_per_night?.lowest || "N/A", 
// // // //       thumbnail: h.images?.[0]?.thumbnail || "https://via.placeholder.com/300",
// // // //       link: h.link
// // // //     }));

// // // //     res.json({ success: true, hotels });
// // // //   } catch (err) {
// // // //     res.status(500).json({ success: false, error: "Hotel API failed" });
// // // //   }
// // // // });

// // // // app.listen(PORT, () => console.log(`✅ Server: http://localhost:${PORT}`));








// // // const express = require("express");
// // // const cors = require("cors");
// // // const axios = require("axios");
// // // const Groq = require("groq-sdk");

// // // const app = express();
// // // const PORT = 3000;

// // // // ====================== CONFIGURATION ======================
// // // const SERPAPI_KEY = "00c9a4387fcafade828a6ac5aac8714e024d4e43dd4ee8f1b4d779cd8a0c10d3";
// // // const GROQ_API_KEY = "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"; 
// // // const RAPID_API_KEY = "c63e325403msh8778b1b6f1e9ef1p16c4bfjsn64db53486227"; // Added here

// // // const groq = new Groq({ apiKey: GROQ_API_KEY });

// // // app.use(cors());
// // // app.use(express.json());

// // // const getFormattedDate = (daysFromNow) => {
// // //   const d = new Date();
// // //   d.setDate(d.getDate() + daysFromNow);
// // //   return d.toISOString().split('T')[0];
// // // };

// // // // ====================== AI BUDGET ENDPOINT ======================
// // // app.post("/api/ai-budget", async (req, res) => {
// // //   const { city, travelers, days, tripVibe = "Mid-range" } = req.body;
// // //   if (!city) return res.status(400).json({ success: false, error: "City required" });

// // //   const isQuickMode = !travelers || !days;

// // //   try {
// // //     let systemPrompt = isQuickMode 
// // //       ? `Indian travel expert. 2-sentence 2026 budget for ${city}. Return JSON: { "summary": "string", "avg_daily_inr": number }`
// // //       : `Strict 2026 Budget Expert. Destination: ${city}, Vibe: ${tripVibe}, Travelers: ${travelers}, Days: ${days}. Include 7% inflation. Return JSON: { "hotel_per_night": number, "food_per_person_per_day": number, "local_transport_total": number, "activities_total": number, "flights_estimated_per_person": number, "top_places": [{"name": "string", "importance": "string", "cost": number}], "expert_tip": "string" }`;

// // //     const completion = await groq.chat.completions.create({
// // //       messages: [{ role: "system", content: systemPrompt }],
// // //       model: "llama-3.3-70b-versatile",
// // //       response_format: { type: "json_object" },
// // //       temperature: 0.4
// // //     });

// // //     const ai = JSON.parse(completion.choices[0].message.content);

// // //     if (isQuickMode) {
// // //       return res.json({
// // //         success: true,
// // //         mode: "QUICK",
// // //         data: { destination: city, summary: ai.summary, avgDaily: ai.avg_daily_inr }
// // //       });
// // //     }

// // //     const hotelTotal = ai.hotel_per_night * days;
// // //     const foodTotal = ai.food_per_person_per_day * days * travelers;
// // //     const flightsTotal = (ai.flights_estimated_per_person || 7000) * travelers;
// // //     const grandTotal = hotelTotal + foodTotal + ai.local_transport_total + ai.activities_total + flightsTotal;

// // //     res.json({
// // //       success: true,
// // //       mode: "FULL",
// // //       data: {
// // //         destination: city,
// // //         totalBudget: Math.round(grandTotal),
// // //         breakdown: { accommodation: hotelTotal, dining: foodTotal, flights: flightsTotal, commute: ai.local_transport_total, sightseeing: ai.activities_total },
// // //         importantPlaces: ai.top_places || [],
// // //         expertTip: ai.expert_tip || "Travel light and stay hydrated!"
// // //       }
// // //     });
// // //   } catch (err) {
// // //     res.status(500).json({ success: false, error: "AI Budget failed" });
// // //   }
// // // });

// // // // ====================== AI PLANNER ENDPOINT ======================
// // // app.post("/api/ai-planner", async (req, res) => {
// // //   const { city, days, tripVibe = "Balanced" } = req.body;
// // //   if (!city || !days) return res.status(400).json({ success: false, error: "City and days required" });

// // //   try {
// // //     const systemPrompt = `Expert Travel Architect. Create a detailed ${days}-day itinerary for ${city}. 
// // //     Vibe: ${tripVibe}. 
// // //     Return JSON ONLY: {
// // //       "itinerary": [
// // //         {
// // //           "day": 1,
// // //           "theme": "string",
// // //           "activities": [
// // //             {"time": "Morning", "task": "string", "description": "string"},
// // //             {"time": "Afternoon", "task": "string", "description": "string"},
// // //             {"time": "Evening", "task": "string", "description": "string"}
// // //           ]
// // //         }
// // //       ],
// // //       "travel_tips": ["string"]
// // //     }`;

// // //     const completion = await groq.chat.completions.create({
// // //       messages: [{ role: "system", content: systemPrompt }],
// // //       model: "llama-3.3-70b-versatile",
// // //       response_format: { type: "json_object" },
// // //       temperature: 0.5
// // //     });

// // //     const plan = JSON.parse(completion.choices[0].message.content);
// // //     res.json({ success: true, data: plan });
// // //   } catch (err) {
// // //     res.status(500).json({ success: false, error: "AI Planner failed" });
// // //   }
// // // });

// // // // ... [Keep other imports and configuration]

// // // /* ============================================
// // //     📰 UPDATED: DYNAMIC NEWS SEARCH
// // // ============================================ */
// // // app.get("/api/startup-news", async (req, res) => {
// // //   try {
// // //     // Get city or topic from request, default to 'Travel'
// // //     const userQuery = req.query.q || "Travel"; 
    
// // //     const response = await axios.get(
// // //       "https://real-time-news-data.p.rapidapi.com/search",
// // //       {
// // //         params: {
// // //           query: userQuery, // This now takes the city name
// // //           limit: 10,
// // //           time_published: "anytime",
// // //           country: "US",
// // //           lang: "en"
// // //         },
// // //         headers: {
// // //           "x-rapidapi-key": RAPID_API_KEY,
// // //           "x-rapidapi-host": "real-time-news-data.p.rapidapi.com"
// // //         }
// // //       }
// // //     );

// // //     const formattedNews = (response.data.data || []).map(item => ({
// // //       title: item.title,
// // //       summary: item.snippet || item.summary || "No summary available",
// // //       link: item.link,
// // //       published_date: item.published_datetime_utc || "",
// // //       image_url: item.photo_url || item.thumbnail || "https://via.placeholder.com/400x200"
// // //     }));

// // //     res.json({ success: true, results: formattedNews });
// // //   } catch (error) {
// // //     res.status(500).json({ success: false, message: "News fetch failed" });
// // //   }
// // // });

// // // // ... [Keep app.listen]

// // // // ====================== HOTEL SEARCH ENDPOINT ======================
// // // app.get("/api/hotels", async (req, res) => {
// // //   const { q } = req.query;
// // //   if (!q) return res.status(400).json({ success: false, error: "City required" });

// // //   try {
// // //     const response = await axios.get("https://serpapi.com/search", {
// // //       params: {
// // //         engine: "google_hotels",
// // //         q: `${q} hotels`,
// // //         check_in_date: getFormattedDate(1),
// // //         check_out_date: getFormattedDate(3),
// // //         api_key: SERPAPI_KEY,
// // //         currency: "INR",
// // //         gl: "in"
// // //       }
// // //     });

// // //     const hotels = (response.data.properties || []).slice(0, 8).map(h => ({
// // //       name: h.name,
// // //       rating: h.overall_rating || "N/A",
// // //       price: h.rate_per_night?.lowest || "N/A", 
// // //       thumbnail: h.images?.[0]?.thumbnail || "https://via.placeholder.com/300",
// // //       link: h.link
// // //     }));

// // //     res.json({ success: true, hotels });
// // //   } catch (err) {
// // //     res.status(500).json({ success: false, error: "Hotel API failed" });
// // //   }
// // // });

// // // app.listen(PORT, () => console.log(`✅ Server: http://localhost:${PORT}`));





















// // // const express = require("express");
// // // const cors = require("cors");
// // // const axios = require("axios");
// // // const Groq = require("groq-sdk");

// // // const app = express();
// // // const PORT = 3000;

// // // // ====================== CONFIGURATION ======================
// // // const SERPAPI_KEY = "00c9a4387fcafade828a6ac5aac8714e024d4e43dd4ee8f1b4d779cd8a0c10d3";
// // // const GROQ_API_KEY = "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"; 
// // // const RAPID_API_KEY = "c63e325403msh8778b1b6f1e9ef1p16c4bfjsn64db53486227";
// // // const UNSPLASH_ACCESS_KEY = "Dyh7pLfiX-jO-JZPdL3NBrlgjpVzzqyT7OX1IwXe7QA"; // Added Unsplash Key

// // // const groq = new Groq({ apiKey: GROQ_API_KEY });

// // // app.use(cors());
// // // app.use(express.json());

// // // const getFormattedDate = (daysFromNow) => {
// // //   const d = new Date();
// // //   d.setDate(d.getDate() + daysFromNow);
// // //   return d.toISOString().split('T')[0];
// // // };

// // // /* ============================================
// // //     📸 NEW: UNSPLASH IMAGE ENDPOINT
// // // ============================================ */
// // // app.get("/api/photos", async (req, res) => {
// // //   const { query } = req.query;
// // //   if (!query) return res.status(400).json({ success: false, error: "Query required" });

// // //   try {
// // //     const response = await axios.get("https://api.unsplash.com/search/photos", {
// // //       params: {
// // //         query: query,
// // //         per_page: 5,
// // //         orientation: "landscape",
// // //         client_id: UNSPLASH_ACCESS_KEY
// // //       }
// // //     });

// // //     const photos = response.data.results.map(img => ({
// // //       id: img.id,
// // //       url: img.urls.regular,
// // //       thumb: img.urls.thumb,
// // //       photographer: img.user.name,
// // //       unsplash_link: img.links.html
// // //     }));

// // //     res.json({ success: true, photos });
// // //   } catch (error) {
// // //     console.error("Unsplash Error:", error.response?.data || error.message);
// // //     res.status(500).json({ success: false, error: "Failed to fetch images" });
// // //   }
// // // });

// // // // ====================== AI BUDGET ENDPOINT ======================
// // // app.post("/api/ai-budget", async (req, res) => {
// // //   const { city, travelers, days, tripVibe = "Mid-range" } = req.body;
// // //   if (!city) return res.status(400).json({ success: false, error: "City required" });

// // //   const isQuickMode = !travelers || !days;

// // //   try {
// // //     let systemPrompt = isQuickMode 
// // //       ? `Indian travel expert. 2-sentence 2026 budget for ${city}. Return JSON: { "summary": "string", "avg_daily_inr": number }`
// // //       : `Strict 2026 Budget Expert. Destination: ${city}, Vibe: ${tripVibe}, Travelers: ${travelers}, Days: ${days}. Include 7% inflation. Return JSON: { "hotel_per_night": number, "food_per_person_per_day": number, "local_transport_total": number, "activities_total": number, "flights_estimated_per_person": number, "top_places": [{"name": "string", "importance": "string", "cost": number}], "expert_tip": "string" }`;

// // //     const completion = await groq.chat.completions.create({
// // //       messages: [{ role: "system", content: systemPrompt }],
// // //       model: "llama-3.3-70b-versatile",
// // //       response_format: { type: "json_object" },
// // //       temperature: 0.4
// // //     });

// // //     const ai = JSON.parse(completion.choices[0].message.content);

// // //     if (isQuickMode) {
// // //       return res.json({
// // //         success: true,
// // //         mode: "QUICK",
// // //         data: { destination: city, summary: ai.summary, avgDaily: ai.avg_daily_inr }
// // //       });
// // //     }

// // //     const hotelTotal = ai.hotel_per_night * days;
// // //     const foodTotal = ai.food_per_person_per_day * days * travelers;
// // //     const flightsTotal = (ai.flights_estimated_per_person || 7000) * travelers;
// // //     const grandTotal = hotelTotal + foodTotal + ai.local_transport_total + ai.activities_total + flightsTotal;

// // //     res.json({
// // //       success: true,
// // //       mode: "FULL",
// // //       data: {
// // //         destination: city,
// // //         totalBudget: Math.round(grandTotal),
// // //         breakdown: { accommodation: hotelTotal, dining: foodTotal, flights: flightsTotal, commute: ai.local_transport_total, sightseeing: ai.activities_total },
// // //         importantPlaces: ai.top_places || [],
// // //         expertTip: ai.expert_tip || "Travel light and stay hydrated!"
// // //       }
// // //     });
// // //   } catch (err) {
// // //     res.status(500).json({ success: false, error: "AI Budget failed" });
// // //   }
// // // });

// // // // ====================== AI PLANNER ENDPOINT ======================
// // // app.post("/api/ai-planner", async (req, res) => {
// // //   const { city, days, tripVibe = "Balanced" } = req.body;
// // //   if (!city || !days) return res.status(400).json({ success: false, error: "City and days required" });

// // //   try {
// // //     const systemPrompt = `Expert Travel Architect. Create a detailed ${days}-day itinerary for ${city}. 
// // //     Vibe: ${tripVibe}. 
// // //     Return JSON ONLY: {
// // //       "itinerary": [
// // //         {
// // //           "day": 1,
// // //           "theme": "string",
// // //           "activities": [
// // //             {"time": "Morning", "task": "string", "description": "string"},
// // //             {"time": "Afternoon", "task": "string", "description": "string"},
// // //             {"time": "Evening", "task": "string", "description": "string"}
// // //           ]
// // //         }
// // //       ],
// // //       "travel_tips": ["string"]
// // //     }`;

// // //     const completion = await groq.chat.completions.create({
// // //       messages: [{ role: "system", content: systemPrompt }],
// // //       model: "llama-3.3-70b-versatile",
// // //       response_format: { type: "json_object" },
// // //       temperature: 0.5
// // //     });

// // //     const plan = JSON.parse(completion.choices[0].message.content);
// // //     res.json({ success: true, data: plan });
// // //   } catch (err) {
// // //     res.status(500).json({ success: false, error: "AI Planner failed" });
// // //   }
// // // });

// // // /* ============================================
// // //     📰 NEWS SEARCH
// // // ============================================ */
// // // app.get("/api/startup-news", async (req, res) => {
// // //   try {
// // //     const userQuery = req.query.q || "Travel"; 
// // //     const response = await axios.get(
// // //       "https://real-time-news-data.p.rapidapi.com/search",
// // //       {
// // //         params: {
// // //           query: userQuery,
// // //           limit: 10,
// // //           time_published: "anytime",
// // //           country: "US",
// // //           lang: "en"
// // //         },
// // //         headers: {
// // //           "x-rapidapi-key": RAPID_API_KEY,
// // //           "x-rapidapi-host": "real-time-news-data.p.rapidapi.com"
// // //         }
// // //       }
// // //     );

// // //     const formattedNews = (response.data.data || []).map(item => ({
// // //       title: item.title,
// // //       summary: item.snippet || item.summary || "No summary available",
// // //       link: item.link,
// // //       published_date: item.published_datetime_utc || "",
// // //       image_url: item.photo_url || item.thumbnail || "https://via.placeholder.com/400x200"
// // //     }));

// // //     res.json({ success: true, results: formattedNews });
// // //   } catch (error) {
// // //     res.status(500).json({ success: false, message: "News fetch failed" });
// // //   }
// // // });

// // // // ====================== HOTEL SEARCH ENDPOINT ======================
// // // app.get("/api/hotels", async (req, res) => {
// // //   const { q } = req.query;
// // //   if (!q) return res.status(400).json({ success: false, error: "City required" });

// // //   try {
// // //     const response = await axios.get("https://serpapi.com/search", {
// // //       params: {
// // //         engine: "google_hotels",
// // //         q: `${q} hotels`,
// // //         check_in_date: getFormattedDate(1),
// // //         check_out_date: getFormattedDate(3),
// // //         api_key: SERPAPI_KEY,
// // //         currency: "INR",
// // //         gl: "in"
// // //       }
// // //     });

// // //     const hotels = (response.data.properties || []).slice(0, 8).map(h => ({
// // //       name: h.name,
// // //       rating: h.overall_rating || "N/A",
// // //       price: h.rate_per_night?.lowest || "N/A", 
// // //       thumbnail: h.images?.[0]?.thumbnail || "https://via.placeholder.com/300",
// // //       link: h.link
// // //     }));

// // //     res.json({ success: true, hotels });
// // //   } catch (err) {
// // //     res.status(500).json({ success: false, error: "Hotel API failed" });
// // //   }
// // // });

// // // app.listen(PORT, () => console.log(`✅ Server: http://localhost:${PORT}`));







// // // --new

// const express = require("express");
// const cors = require("cors");
// const axios = require("axios");
// const Groq = require("groq-sdk");

// const app = express();
// const PORT = 3000;

// // ====================== CONFIGURATION ======================
// const SERPAPI_KEY = "00c9a4387fcafade828a6ac5aac8714e024d4e43dd4ee8f1b4d779cd8a0c10d3";
// const GROQ_API_KEY = "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"; 
// const RAPID_API_KEY = "c63e325403msh8778b1b6f1e9ef1p16c4bfjsn64db53486227";
// const UNSPLASH_ACCESS_KEY = "Dyh7pLfiX-jO-JZPdL3NBrlgjpVzzqyT7OX1IwXe7QA"; // Added Unsplash Key
// const AVIATIONSTACK_KEY = "75dda96fd03b97e7683209a1f7ad8280";
// const groq = new Groq({ apiKey: GROQ_API_KEY });

// app.use(cors());
// app.use(express.json());

// const getFormattedDate = (daysFromNow) => {
//   const d = new Date();
//   d.setDate(d.getDate() + daysFromNow);
//   return d.toISOString().split('T')[0];
// };

// /* ============================================
//     📸 NEW: UNSPLASH IMAGE ENDPOINT
// ============================================ */
// app.get("/api/photos", async (req, res) => {
//   const { query } = req.query;
//   if (!query) return res.status(400).json({ success: false, error: "Query required" });

//   try {
//     const response = await axios.get("https://api.unsplash.com/search/photos", {
//       params: {
//         query: query,
//         per_page: 5,
//         orientation: "landscape",
//         client_id: UNSPLASH_ACCESS_KEY
//       }
//     });

//     const photos = response.data.results.map(img => ({
//       id: img.id,
//       url: img.urls.regular,
//       thumb: img.urls.thumb,
//       photographer: img.user.name,
//       unsplash_link: img.links.html
//     }));

//     res.json({ success: true, photos });
//   } catch (error) {
//     console.error("Unsplash Error:", error.response?.data || error.message);
//     res.status(500).json({ success: false, error: "Failed to fetch images" });
//   }
// });

// // ====================== AI BUDGET ENDPOINT ======================
// // ====================== DYNAMIC CITY BUDGET ENDPOINT ======================
// // ====================== DYNAMIC CITY BUDGET ENDPOINT ======================
// app.post('/api/ai-budget', async (req, res) => {
//   const {
//     city,
//     travelers = 2,
//     days = 5,
//     tripVibe = 'Mid-range'
//   } = req.body;
 
//   // ===== INPUT VALIDATION =====
//   if (!city || typeof city !== 'string') {
//     return res.status(400).json({
//       success: false,
//       error: 'City name is required and must be a string'
//     });
//   }
 
//   if (travelers < 1 || travelers > 20) {
//     return res.status(400).json({
//       success: false,
//       error: 'Travelers must be between 1 and 20'
//     });
//   }
 
//   if (days < 1 || days > 30) {
//     return res.status(400).json({
//       success: false,
//       error: 'Days must be between 1 and 30'
//     });
//   }
 
//   const validVibes = ['Budget', 'Mid-range', 'Comfort', 'Luxury'];
//   if (!validVibes.includes(tripVibe)) {
//     return res.status(400).json({
//       success: false,
//       error: 'Invalid trip vibe. Choose: Budget, Mid-range, Comfort, or Luxury'
//     });
//   }
 
//   try {
//     // ===== OPTIMIZED AI PROMPT FOR GROQ =====
//     const prompt = `
// You are a professional Travel Financial Planner specializing in India travel in 2026.
// Generate a realistic travel budget in valid JSON format ONLY. No markdown, no explanations.
 
// Trip Details:
// - Destination: ${city}, India
// - Travelers: ${travelers}
// - Duration: ${days} days (${days - 1} nights)
// - Travel Style: ${tripVibe}
// - Current Date: April 2026
 
// Guidelines:
// 1. Calculate in INR (Indian Rupees)
// 2. For groups: assume 2 people share accommodation
// 3. Include realistic costs for April weather/season
// 4. Accommodation includes hotels, hostels, guesthouses depending on vibe
// 5. Food includes meals at local restaurants and cafes
// 6. Transport includes local travel, taxis, auto-rickshaws
// 7. Activities are major attractions and experiences
// 8. Extras: tips, emergencies, misc shopping
 
// Return EXACTLY this JSON structure with no additional text:
// {
//   "stayTotal": <number - total accommodation cost for all ${travelers} travelers>,
//   "foodTotal": <number - total food cost for all ${travelers} travelers>,
//   "transportTotal": <number - local transport and taxis>,
//   "activitiesTotal": <number - major attractions and tours>,
//   "extraTotal": <number - miscellaneous, tips, shopping>,
//   "totalBudget": <number - sum of all above>,
//   "currency": "INR",
//   "topPlaces": [
//     {"name": "<attraction name>", "importance": "Must-see/Recommended/Optional", "estCost": <number>},
//     {"name": "<attraction name>", "importance": "Must-see/Recommended/Optional", "estCost": <number>},
//     {"name": "<attraction name>", "importance": "Must-see/Recommended/Optional", "estCost": <number>},
//     {"name": "<attraction name>", "importance": "Must-see/Recommended/Optional", "estCost": <number>},
//     {"name": "<attraction name>", "importance": "Must-see/Recommended/Optional", "estCost": <number>}
//   ],
//   "expertTip": "<2 sentence practical tip about traveling to ${city} in April 2026>",
//   "whatsappSummary": "✈️ Trip to ${city} for ${travelers} travelers\\n📅 ${days} days\\n💰 Total Budget: ₹<totalBudget>\\n\\n📊 Breakdown:\\n🏨 Stay: ₹<stayTotal>\\n🍽️ Food: ₹<foodTotal>\\n🚗 Transport: ₹<transportTotal>\\n🎫 Activities: ₹<activitiesTotal>\\n💳 Misc: ₹<extraTotal>\\n\\n📈 Daily Average: ₹<avgDaily>\\n\\nGenerated with TravioX AI 🤖"
// }`;
 
//     // ===== GROQ API CALL =====
//     const chatCompletion = await groq.chat.completions.create({
//       messages: [
//         {
//           role: 'system',
//           content: 'You are a travel budget expert. Output ONLY valid JSON. No markdown, no backticks, no explanation text.'
//         },
//         {
//           role: 'user',
//           content: prompt
//         }
//       ],
//       model: 'llama-3.3-70b-versatile',
//       response_format: { type: 'json_object' },
//       temperature: 0.7,
//       max_tokens: 2000,
//       top_p: 0.95
//     });
 
//     // ===== PARSE AI RESPONSE =====
//     let aiData;
//     const responseContent = chatCompletion.choices[0].message.content.trim();
 
//     try {
//       aiData = JSON.parse(responseContent);
//     } catch (parseError) {
//       console.error('JSON Parse Error:', responseContent);
//       return res.status(500).json({
//         success: false,
//         error: 'Invalid response from AI. Please try again.'
//       });
//     }
 
//     // ===== VALIDATE AI RESPONSE =====
//     const requiredFields = [
//       'stayTotal', 'foodTotal', 'transportTotal',
//       'activitiesTotal', 'extraTotal', 'totalBudget',
//       'topPlaces', 'expertTip', 'whatsappSummary', 'currency'
//     ];
 
//     for (const field of requiredFields) {
//       if (!(field in aiData)) {
//         return res.status(500).json({
//           success: false,
//           error: `Missing required field: ${field}`
//         });
//       }
//     }
 
//     // ===== CALCULATE DAILY SPEND =====
//     const avgDaily = Math.round(aiData.totalBudget / days);
 
//     // ===== SEND SUCCESS RESPONSE =====
//     res.json({
//       success: true,
//       data: {
//         ...aiData,
//         avgDaily,
//         metadata: {
//           destination: city,
//           travelers,
//           days,
//           vibe: tripVibe,
//           generatedAt: new Date().toISOString()
//         }
//       }
//     });
 
//   } catch (err) {
//     console.error('TravioX AI Error:', err.message);
//     res.status(500).json({
//       success: false,
//       error: 'AI Budget Service failed. Please check your Groq API key or try again later.'
//     });
//   }
// });
 
// // ====================== HEALTH CHECK ENDPOINT ======================
// app.get('/api/health', (req, res) => {
//   res.json({
//     success: true,
//     message: 'TravioX API is running',
//     timestamp: new Date().toISOString()
//   });
// });
 
// // ====================== ERROR HANDLING MIDDLEWARE ======================
// app.use((err, req, res, next) => {
//   console.error('Unhandled Error:', err);
//   res.status(500).json({
//     success: false,
//     error: 'Internal server error',
//     message: process.env.NODE_ENV === 'development' ? err.message : undefined
//   });
// });
 
// // ====================== 404 HANDLER ======================
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     error: 'Endpoint not found'
//   });
// });
 
// // ====================== AI PLANNER ENDPOINT ======================
// app.post("/api/ai-planner", async (req, res) => {
//   const { city, days, tripVibe = "Balanced" } = req.body;
//   if (!city || !days) return res.status(400).json({ success: false, error: "City and days required" });

//   try {
//     const systemPrompt = `Expert Travel Architect. Create a detailed ${days}-day itinerary for ${city}. 
//     Vibe: ${tripVibe}. 
//     Return JSON ONLY: {
//       "itinerary": [
//         {
//           "day": 1,
//           "theme": "string",
//           "activities": [
//             {"time": "Morning", "task": "string", "description": "string"},
//             {"time": "Afternoon", "task": "string", "description": "string"},
//             {"time": "Evening", "task": "string", "description": "string"}
//           ]
//         }
//       ],
//       "travel_tips": ["string"]
//     }`;

//     const completion = await groq.chat.completions.create({
//       messages: [{ role: "system", content: systemPrompt }],
//       model: "llama-3.3-70b-versatile",
//       response_format: { type: "json_object" },
//       temperature: 0.5
//     });

//     const plan = JSON.parse(completion.choices[0].message.content);
//     res.json({ success: true, data: plan });
//   } catch (err) {
//     res.status(500).json({ success: false, error: "AI Planner failed" });
//   }
// });

// /* ============================================
//     📰 NEWS SEARCH
// ============================================ */
// app.get("/api/startup-news", async (req, res) => {
//   try {
//     const userQuery = req.query.q || "Travel"; 
//     const response = await axios.get(
//       "https://real-time-news-data.p.rapidapi.com/search",
//       {
//         params: {
//           query: userQuery,
//           limit: 10,
//           time_published: "anytime",
//           country: "US",
//           lang: "en"
//         },
//         headers: {
//           "x-rapidapi-key": RAPID_API_KEY,
//           "x-rapidapi-host": "real-time-news-data.p.rapidapi.com"
//         }
//       }
//     );

//     const formattedNews = (response.data.data || []).map(item => ({
//       title: item.title,
//       summary: item.snippet || item.summary || "No summary available",
//       link: item.link,
//       published_date: item.published_datetime_utc || "",
//       image_url: item.photo_url || item.thumbnail || "https://via.placeholder.com/400x200"
//     }));

//     res.json({ success: true, results: formattedNews });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "News fetch failed" });
//   }
// });

// // ====================== HOTEL SEARCH ENDPOINT ======================
// app.get("/api/hotels", async (req, res) => {
//   const { q } = req.query;
//   if (!q) return res.status(400).json({ success: false, error: "City required" });

//   try {
//     const response = await axios.get("https://serpapi.com/search", {
//       params: {
//         engine: "google_hotels",
//         q: `${q} hotels`,
//         check_in_date: getFormattedDate(1),
//         check_out_date: getFormattedDate(3),
//         api_key: SERPAPI_KEY,
//         currency: "INR",
//         gl: "in"
//       }
//     });

//     const hotels = (response.data.properties || []).slice(0, 8).map(h => ({
//       name: h.name,
//       rating: h.overall_rating || "N/A",
//       price: h.rate_per_night?.lowest || "N/A", 
//       thumbnail: h.images?.[0]?.thumbnail || "https://via.placeholder.com/300",
//       link: h.link
//     }));

//     res.json({ success: true, hotels });
//   } catch (err) {
//     res.status(500).json({ success: false, error: "Hotel API failed" });
//   }
// });
// // Add this at the top of your server.js if not already there
// // const { getJson } = require("serpapi");
// // ====================== ✈️ AVIATIONSTACK ENDPOINT ======================
// // ====================== ✈️ GOOGLE FLIGHTS (LIVE BOOKING LINKS) ======================
// app.get("/api/flights", async (req, res) => {
//   const { departure_id, arrival_id } = req.query;
//   const travelDate = "2026-04-20"; 

//   try {
//     const response = await axios.get("https://serpapi.com/search", {
//       params: {
//         engine: "google_flights",
//         departure_id: departure_id?.toUpperCase() || "BOM",
//         arrival_id: arrival_id?.toUpperCase() || "DEL",
//         outbound_date: travelDate,
//         type: "2", 
//         currency: "INR",
//         api_key: "00c9a4387fcafade828a6ac5aac8714e024d4e43dd4ee8f1b4d779cd8a0c10d3"
//       }
//     });

//     const results = [...(response.data.best_flights || []), ...(response.data.other_flights || [])];

//     const formatted = results.map(f => {
//       const leg = f.flights[0];
      
//       // We generate a direct URL. If a booking_token exists, we could use it, 
//       // but a Search Query URL is more stable for mobile browsers.
//       const directWebLink = `https://www.google.com/travel/flights/search?tfs=CBwQAhoeEgoyMDI2LTA0LTIwagcIARID${departure_id?.toUpperCase()}rccIARID${arrival_id?.toUpperCase()}pIAQDAEAB`;

//       return {
//         airline: leg.airline,
//         logo: leg.airline_logo,
//         flight_number: leg.flight_number,
//         departure: leg.departure_airport.id,
//         departure_name: leg.departure_airport.name,
//         arrival: leg.arrival_airport.id,
//         arrival_name: leg.arrival_airport.name,
//         departure_time: leg.departure_airport.time.split(' ')[1],
//         arrival_time: leg.arrival_airport.time.split(' ')[1],
//         duration: f.total_duration,
//         price: f.price ? f.price.toLocaleString('en-IN') : "Check Price",
//         status: f.type || "Available",
//         url: directWebLink // This is the live link
//       };
//     });

//     res.json({ success: true, flights: formatted });
//   } catch (err) {
//     res.status(500).json({ success: false });
//   }
// });
// app.listen(PORT, () => console.log(`✅ Server: http://localhost:${PORT}`));













// // // ---3

// // ---3
// // ====================== TRAVELIO X - COMPLETE BACKEND SERVER ======================
// // Production-ready with budget, flights, hotels, images, news, and planner endpoints

// const express = require("express");
// const cors = require("cors");
// const axios = require("axios");
// const Groq = require("groq-sdk");
// require("dotenv").config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// // ====================== SECURITY & CONFIGURATION ======================
// // ⚠️ CRITICAL: Move all API keys to .env file!
// const GROQ_API_KEY = process.env.GROQ_API_KEY || "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";
// const SERPAPI_KEY = process.env.SERPAPI_KEY || "00c9a4387fcafade828a6ac5aac8714e024d4e43dd4ee8f1b4d779cd8a0c10d3";
// const RAPID_API_KEY = process.env.RAPID_API_KEY || "c63e325403msh8778b1b6f1e9ef1p16c4bfjsn64db53486227";
// const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || "Dyh7pLfiX-jO-JZPdL3NBrlgjpVzzqyT7OX1IwXe7QA";

// // Initialize Groq client
// const groq = new Groq({ apiKey: GROQ_API_KEY });

// // ====================== MIDDLEWARE ======================
// app.use(cors());
// app.use(express.json({ limit: "10mb" }));
// app.use(express.static("public"));

// // Request logging middleware
// app.use((req, res, next) => {
//   console.log(`📥 ${req.method} ${req.path}`);
//   next();
// });

// // ====================== UTILITY FUNCTIONS ======================
// const getFormattedDate = (daysFromNow) => {
//   const d = new Date();
//   d.setDate(d.getDate() + daysFromNow);
//   return d.toISOString().split("T")[0];
// };

// const handleError = (res, statusCode, message, details = null) => {
//   console.error(`❌ Error: ${message}`, details);
//   res.status(statusCode).json({
//     success: false,
//     error: message,
//     ...(process.env.NODE_ENV === "development" && details && { details })
//   });
// };

// // ====================== HEALTH CHECK ======================
// app.get("/api/health", (req, res) => {
//   res.json({
//     success: true,
//     message: "TravioX API is running",
//     timestamp: new Date().toISOString(),
//     version: "1.0.0"
//   });
// });

// // ====================== 💰 AI BUDGET ENDPOINT ======================
// app.post("/api/ai-budget", async (req, res) => {
//   const { city, travelers = 2, days = 5, tripVibe = "Mid-range" } = req.body;

//   // ===== INPUT VALIDATION =====
//   if (!city || typeof city !== "string") {
//     return handleError(res, 400, "City name is required and must be a string");
//   }

//   if (travelers < 1 || travelers > 20) {
//     return handleError(res, 400, "Travelers must be between 1 and 20");
//   }

//   if (days < 1 || days > 30) {
//     return handleError(res, 400, "Days must be between 1 and 30");
//   }

//   const validVibes = ["Budget", "Mid-range", "Comfort", "Luxury"];
//   if (!validVibes.includes(tripVibe)) {
//     return handleError(res, 400, "Invalid trip vibe. Choose: Budget, Mid-range, Comfort, or Luxury");
//   }

//   try {
//     // ===== OPTIMIZED AI PROMPT =====
//     const prompt = `
// You are a professional Travel Financial Planner specializing in India travel in 2026.
// Generate a realistic travel budget in valid JSON format ONLY. No markdown, no explanations.

// Trip Details:
// - Destination: ${city}, India
// - Travelers: ${travelers}
// - Duration: ${days} days (${days - 1} nights)
// - Travel Style: ${tripVibe}
// - Current Date: April 2026

// Guidelines:
// 1. Calculate in INR (Indian Rupees)
// 2. For groups: assume 2 people share accommodation
// 3. Include realistic costs for April weather/season
// 4. Accommodation includes hotels, hostels, guesthouses depending on vibe
// 5. Food includes meals at local restaurants and cafes
// 6. Transport includes local travel, taxis, auto-rickshaws
// 7. Activities are major attractions and experiences
// 8. Extras: tips, emergencies, misc shopping

// Return EXACTLY this JSON structure with no additional text:
// {
//   "stayTotal": <number>,
//   "foodTotal": <number>,
//   "transportTotal": <number>,
//   "activitiesTotal": <number>,
//   "extraTotal": <number>,
//   "totalBudget": <number>,
//   "currency": "INR",
//   "topPlaces": [
//     {"name": "<attraction>", "importance": "Must-see/Recommended/Optional", "estCost": <number>},
//     {"name": "<attraction>", "importance": "Must-see/Recommended/Optional", "estCost": <number>},
//     {"name": "<attraction>", "importance": "Must-see/Recommended/Optional", "estCost": <number>},
//     {"name": "<attraction>", "importance": "Must-see/Recommended/Optional", "estCost": <number>},
//     {"name": "<attraction>", "importance": "Must-see/Recommended/Optional", "estCost": <number>}
//   ],
//   "expertTip": "<2 sentence practical tip about traveling to ${city} in April 2026>",
//   "whatsappSummary": "✈️ Trip to ${city} for ${travelers} travelers\\n📅 ${days} days\\n💰 Total Budget: ₹<totalBudget>\\n\\n📊 Breakdown:\\n🏨 Stay: ₹<stayTotal>\\n🍽️ Food: ₹<foodTotal>\\n🚗 Transport: ₹<transportTotal>\\n🎫 Activities: ₹<activitiesTotal>\\n💳 Misc: ₹<extraTotal>\\n\\n📈 Daily Average: ₹<avgDaily>\\n\\nGenerated with TravioX AI 🤖"
// }`;

//     // ===== GROQ API CALL =====
//     const chatCompletion = await groq.chat.completions.create({
//       messages: [
//         {
//           role: "system",
//           content: "You are a travel budget expert. Output ONLY valid JSON. No markdown, no backticks, no explanation."
//         },
//         { role: "user", content: prompt }
//       ],
//       model: "llama-3.3-70b-versatile",
//       response_format: { type: "json_object" },
//       temperature: 0.7,
//       max_tokens: 2000,
//       top_p: 0.95
//     });

//     // ===== PARSE RESPONSE =====
//     let aiData;
//     const responseContent = chatCompletion.choices[0].message.content.trim();

//     try {
//       aiData = JSON.parse(responseContent);
//     } catch (parseError) {
//       return handleError(res, 500, "Invalid JSON response from AI", parseError.message);
//     }

//     // ===== VALIDATE REQUIRED FIELDS =====
//     const requiredFields = [
//       "stayTotal",
//       "foodTotal",
//       "transportTotal",
//       "activitiesTotal",
//       "extraTotal",
//       "totalBudget",
//       "topPlaces",
//       "expertTip",
//       "whatsappSummary",
//       "currency"
//     ];

//     for (const field of requiredFields) {
//       if (!(field in aiData)) {
//         return handleError(res, 500, `Missing required field: ${field}`);
//       }
//     }

//     // ===== CALCULATE DAILY SPEND =====
//     const avgDaily = Math.round(aiData.totalBudget / days);

//     // ===== SEND RESPONSE =====
//     res.json({
//       success: true,
//       data: {
//         ...aiData,
//         avgDaily,
//         metadata: {
//           destination: city,
//           travelers,
//           days,
//           vibe: tripVibe,
//           generatedAt: new Date().toISOString()
//         }
//       }
//     });
//   } catch (err) {
//     handleError(res, 500, "AI Budget Service failed", err.message);
//   }
// });

// // ====================== 📸 UNSPLASH IMAGES ======================
// app.get("/api/photos", async (req, res) => {
//   const { query } = req.query;

//   if (!query) {
//     return handleError(res, 400, "Query parameter required");
//   }

//   try {
//     const response = await axios.get("https://api.unsplash.com/search/photos", {
//       params: {
//         query: query,
//         per_page: 5,
//         orientation: "landscape",
//         client_id: UNSPLASH_ACCESS_KEY
//       },
//       timeout: 10000
//     });

//     const photos = response.data.results.map((img) => ({
//       id: img.id,
//       url: img.urls.regular,
//       thumb: img.urls.thumb,
//       photographer: img.user.name,
//       unsplash_link: img.links.html
//     }));

//     res.json({ success: true, photos });
//   } catch (err) {
//     handleError(res, 500, "Failed to fetch images", err.message);
//   }
// });

// // ====================== ✈️ FLIGHTS ======================
// app.get("/api/flights", async (req, res) => {
//   const { departure_id = "BOM", arrival_id = "DEL" } = req.query;
//   const travelDate = "2026-04-20";

//   try {
//     const response = await axios.get("https://serpapi.com/search", {
//       params: {
//         engine: "google_flights",
//         departure_id: departure_id.toUpperCase(),
//         arrival_id: arrival_id.toUpperCase(),
//         outbound_date: travelDate,
//         type: "2",
//         currency: "INR",
//         api_key: SERPAPI_KEY
//       },
//       timeout: 15000
//     });

//     const results = [
//       ...(response.data.best_flights || []),
//       ...(response.data.other_flights || [])
//     ];

//     const formatted = results.slice(0, 10).map((f) => {
//       const leg = f.flights[0];
//       return {
//         airline: leg.airline,
//         logo: leg.airline_logo,
//         flight_number: leg.flight_number,
//         departure: leg.departure_airport.id,
//         departure_name: leg.departure_airport.name,
//         arrival: leg.arrival_airport.id,
//         arrival_name: leg.arrival_airport.name,
//         departure_time: leg.departure_airport.time.split(" ")[1],
//         arrival_time: leg.arrival_airport.time.split(" ")[1],
//         duration: f.total_duration,
//         price: f.price ? f.price.toLocaleString("en-IN") : "Check Price",
//         status: f.type || "Available",
//         url: `https://www.google.com/travel/flights/search?tfs=CBwQAhoeEgoyMDI2LTA0LTIwagcIARID${departure_id.toUpperCase()}rccIARID${arrival_id.toUpperCase()}pIAQDAEAB`
//       };
//     });

//     res.json({ success: true, flights: formatted });
//   } catch (err) {
//     handleError(res, 500, "Flight search failed", err.message);
//   }
// });

// // ====================== 🏨 HOTELS ======================
// app.get("/api/hotels", async (req, res) => {
//   const { q = "Mumbai" } = req.query;

//   if (!q) {
//     return handleError(res, 400, "City name required");
//   }

//   try {
//     const response = await axios.get("https://serpapi.com/search", {
//       params: {
//         engine: "google_hotels",
//         q: `${q} hotels`,
//         check_in_date: getFormattedDate(1),
//         check_out_date: getFormattedDate(3),
//         api_key: SERPAPI_KEY,
//         currency: "INR",
//         gl: "in"
//       },
//       timeout: 15000
//     });

//     const hotels = (response.data.properties || []).slice(0, 8).map((h) => ({
//       name: h.name,
//       rating: h.overall_rating || "N/A",
//       price: h.rate_per_night?.lowest || "N/A",
//       thumbnail: h.images?.[0]?.thumbnail || "https://via.placeholder.com/300",
//       link: h.link || "#"
//     }));

//     res.json({ success: true, hotels });
//   } catch (err) {
//     handleError(res, 500, "Hotel search failed", err.message);
//   }
// });

// // ====================== 📰 NEWS ======================
// app.get("/api/startup-news", async (req, res) => {
//   const userQuery = req.query.q || "Travel";

//   try {
//     const response = await axios.get(
//       "https://real-time-news-data.p.rapidapi.com/search",
//       {
//         params: {
//           query: userQuery,
//           limit: 10,
//           time_published: "anytime",
//           country: "US",
//           lang: "en"
//         },
//         headers: {
//           "x-rapidapi-key": RAPID_API_KEY,
//           "x-rapidapi-host": "real-time-news-data.p.rapidapi.com"
//         },
//         timeout: 10000
//       }
//     );

//     const formattedNews = (response.data.data || []).map((item) => ({
//       title: item.title,
//       summary: item.snippet || item.summary || "No summary available",
//       link: item.link,
//       published_date: item.published_datetime_utc || "",
//       image_url: item.photo_url || item.thumbnail || "https://via.placeholder.com/400x200"
//     }));

//     res.json({ success: true, results: formattedNews });
//   } catch (err) {
//     handleError(res, 500, "News fetch failed", err.message);
//   }
// });

// // ====================== 📋 AI PLANNER ======================
// app.post("/api/ai-planner", async (req, res) => {
//   const { city, days = 5, tripVibe = "Balanced" } = req.body;

//   if (!city || !days) {
//     return handleError(res, 400, "City and days are required");
//   }

//   try {
//     const systemPrompt = `Expert Travel Architect. Create a detailed ${days}-day itinerary for ${city}. 
//     Vibe: ${tripVibe}. 
//     Return JSON ONLY: {
//       "itinerary": [
//         {
//           "day": 1,
//           "theme": "string",
//           "activities": [
//             {"time": "Morning", "task": "string", "description": "string"},
//             {"time": "Afternoon", "task": "string", "description": "string"},
//             {"time": "Evening", "task": "string", "description": "string"}
//           ]
//         }
//       ],
//       "travel_tips": ["string"]
//     }`;

//     const completion = await groq.chat.completions.create({
//       messages: [{ role: "system", content: systemPrompt }],
//       model: "llama-3.3-70b-versatile",
//       response_format: { type: "json_object" },
//       temperature: 0.5,
//       max_tokens: 1500
//     });

//     const plan = JSON.parse(completion.choices[0].message.content);
//     res.json({ success: true, data: plan });
//   } catch (err) {
//     handleError(res, 500, "AI Planner failed", err.message);
//   }
// });

// // ====================== ERROR HANDLING ======================
// // 404 Handler
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     error: "Endpoint not found",
//     availableEndpoints: [
//       "POST /api/ai-budget",
//       "POST /api/ai-planner",
//       "GET /api/flights",
//       "GET /api/hotels",
//       "GET /api/photos",
//       "GET /api/startup-news",
//       "GET /api/health"
//     ]
//   });
// });

// // Error handler middleware
// app.use((err, req, res, next) => {
//   console.error("❌ Unhandled Error:", err);
//   res.status(500).json({
//     success: false,
//     error: "Internal server error",
//     message: process.env.NODE_ENV === "development" ? err.message : undefined
//   });
// });

// // ====================== SERVER STARTUP ======================
// app.listen(PORT, () => {
//   console.log(`
// ╔════════════════════════════════════════╗
// ║     🌍 TravioX Backend Started 🌍      ║
// ║     Server running on port ${PORT}         ║
// ║     API: http://localhost:${PORT}          ║
// ║     Environment: ${process.env.NODE_ENV || "development"}       ║
// ╚════════════════════════════════════════╝

// 📍 Available Endpoints:
// ✅ POST   /api/ai-budget       - Generate AI budget
// ✅ POST   /api/ai-planner      - Create itinerary
// ✅ GET    /api/flights         - Search flights
// ✅ GET    /api/hotels          - Search hotels
// ✅ GET    /api/photos          - Get destination photos
// ✅ GET    /api/startup-news    - Get travel news
// ✅ GET    /api/health          - Health check
//   `);
// });

// module.exports = app;




















// // ---3

// ---3
// ====================== TRAVELIO X - COMPLETE BACKEND SERVER ======================
// Production-ready with budget, flights, hotels, images, news, and planner endpoints

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const Groq = require("groq-sdk");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// ====================== SECURITY & CONFIGURATION ======================
// ⚠️ CRITICAL: Move all API keys to .env file!
const GROQ_API_KEY = process.env.GROQ_API_KEY || "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";
const SERPAPI_KEY = process.env.SERPAPI_KEY || "00c9a4387fcafade828a6ac5aac8714e024d4e43dd4ee8f1b4d779cd8a0c10d3";
const RAPID_API_KEY = process.env.RAPID_API_KEY || "c63e325403msh8778b1b6f1e9ef1p16c4bfjsn64db53486227";
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || "Dyh7pLfiX-jO-JZPdL3NBrlgjpVzzqyT7OX1IwXe7QA";

// Initialize Groq client
const groq = new Groq({ apiKey: GROQ_API_KEY });

// ====================== MIDDLEWARE ======================
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.static("public"));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.path}`);
  next();
});

// ====================== UTILITY FUNCTIONS ======================
const getFormattedDate = (daysFromNow) => {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().split("T")[0];
};

const handleError = (res, statusCode, message, details = null) => {
  console.error(`❌ Error: ${message}`, details);
  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === "development" && details && { details })
  });
};

// ====================== HEALTH CHECK ======================
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "TravioX API is running",
    timestamp: new Date().toISOString(),
    version: "1.0.0"
  });
});

// ====================== 💰 AI BUDGET ENDPOINT ======================
app.post("/api/ai-budget", async (req, res) => {
  const { city, travelers = 2, days = 5, tripVibe = "Mid-range" } = req.body;

  // ===== INPUT VALIDATION (Kept from your original) =====
  if (!city || typeof city !== "string") {
    return handleError(res, 400, "City name is required");
  }
  
  const validVibes = ["Budget", "Mid-range", "Comfort", "Luxury"];
  const vibe = validVibes.includes(tripVibe) ? tripVibe : "Mid-range";

  try {
    // ===== UPDATED PROMPT FOR STEP-BY-STEP BREAKDOWN =====
    const prompt = `
You are a Travel Financial Architect. Create a detailed, day-by-day spending itinerary for ${city}, India for April 2026.
Format: STRICT JSON ONLY.

Parameters:
- Travelers: ${travelers}
- Duration: ${days} days
- Style: ${vibe}

Requirements:
1. Provide a "dailyPlan" array where each object is one day.
2. Inside each day, list "activities" with specific costs in INR.
3. Factor in the April heat (prefer indoor/AC transport).
4. For groups (>1), assume shared twin/double rooms.

Return this exact structure:
{
  "dailyPlan": [
    {
      "day": 1,
      "title": "Day Title",
      "activities": [
        {"item": "Description", "cost": 0}
      ],
      "accommodation": 0,
      "food": 0,
      "transport": 0
    }
  ],
  "summary": {
    "stayTotal": 0,
    "foodTotal": 0,
    "transportTotal": 0,
    "activitiesTotal": 0,
    "miscellaneous": 0,
    "grandTotal": 0
  },
  "expertAdvice": "Short advice on April weather/costs."
}`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { 
          role: "system", 
          content: "You are a JSON-only response bot. No markdown, no conversational filler." 
        },
        { role: "user", content: prompt }
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      temperature: 0.6 // Slightly lower for more consistent math
    });

    const aiData = JSON.parse(chatCompletion.choices[0].message.content);

    // ===== ENHANCED RESPONSE WITH AGGREGATES =====
    res.json({
      success: true,
      data: {
        ...aiData,
        averageDailyBudget: Math.round(aiData.summary.grandTotal / days),
        metadata: {
          destination: city,
          vibe: vibe,
          currency: "INR",
          generated_for_date: "April 2026"
        }
      }
    });

  } catch (err) {
    console.error("AI Error:", err);
    res.status(500).json({ success: false, error: "Failed to generate itinerary" });
  }
});

// ====================== 📸 UNSPLASH IMAGES ======================
app.get("/api/photos", async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return handleError(res, 400, "Query parameter required");
  }

  try {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query: query,
        per_page: 5,
        orientation: "landscape",
        client_id: UNSPLASH_ACCESS_KEY
      },
      timeout: 10000
    });

    const photos = response.data.results.map((img) => ({
      id: img.id,
      url: img.urls.regular,
      thumb: img.urls.thumb,
      photographer: img.user.name,
      unsplash_link: img.links.html
    }));

    res.json({ success: true, photos });
  } catch (err) {
    handleError(res, 500, "Failed to fetch images", err.message);
  }
});

// ====================== ✈️ FLIGHTS ======================
app.get("/api/flights", async (req, res) => {
  const { departure_id = "BOM", arrival_id = "DEL" } = req.query;
  const travelDate = "2026-04-20";

  try {
    const response = await axios.get("https://serpapi.com/search", {
      params: {
        engine: "google_flights",
        departure_id: departure_id.toUpperCase(),
        arrival_id: arrival_id.toUpperCase(),
        outbound_date: travelDate,
        type: "2",
        currency: "INR",
        api_key: SERPAPI_KEY
      },
      timeout: 15000
    });

    const results = [
      ...(response.data.best_flights || []),
      ...(response.data.other_flights || [])
    ];

    const formatted = results.slice(0, 10).map((f) => {
      const leg = f.flights[0];
      return {
        airline: leg.airline,
        logo: leg.airline_logo,
        flight_number: leg.flight_number,
        departure: leg.departure_airport.id,
        departure_name: leg.departure_airport.name,
        arrival: leg.arrival_airport.id,
        arrival_name: leg.arrival_airport.name,
        departure_time: leg.departure_airport.time.split(" ")[1],
        arrival_time: leg.arrival_airport.time.split(" ")[1],
        duration: f.total_duration,
        price: f.price ? f.price.toLocaleString("en-IN") : "Check Price",
        status: f.type || "Available",
        url: `https://www.google.com/travel/flights/search?tfs=CBwQAhoeEgoyMDI2LTA0LTIwagcIARID${departure_id.toUpperCase()}rccIARID${arrival_id.toUpperCase()}pIAQDAEAB`
      };
    });

    res.json({ success: true, flights: formatted });
  } catch (err) {
    handleError(res, 500, "Flight search failed", err.message);
  }
});

// ====================== 🏨 HOTELS ======================
app.get("/api/hotels", async (req, res) => {
  const { q = "Mumbai" } = req.query;

  if (!q) {
    return handleError(res, 400, "City name required");
  }

  try {
    const response = await axios.get("https://serpapi.com/search", {
      params: {
        engine: "google_hotels",
        q: `${q} hotels`,
        check_in_date: getFormattedDate(1),
        check_out_date: getFormattedDate(3),
        api_key: SERPAPI_KEY,
        currency: "INR",
        gl: "in"
      },
      timeout: 15000
    });

    const hotels = (response.data.properties || []).slice(0, 8).map((h) => ({
      name: h.name,
      rating: h.overall_rating || "N/A",
      price: h.rate_per_night?.lowest || "N/A",
      thumbnail: h.images?.[0]?.thumbnail || "https://via.placeholder.com/300",
      link: h.link || "#"
    }));

    res.json({ success: true, hotels });
  } catch (err) {
    handleError(res, 500, "Hotel search failed", err.message);
  }
});

// ====================== 📰 NEWS ======================
app.get("/api/startup-news", async (req, res) => {
  const userQuery = req.query.q || "Travel";

  try {
    const response = await axios.get(
      "https://real-time-news-data.p.rapidapi.com/search",
      {
        params: {
          query: userQuery,
          limit: 10,
          time_published: "anytime",
          country: "US",
          lang: "en"
        },
        headers: {
          "x-rapidapi-key": RAPID_API_KEY,
          "x-rapidapi-host": "real-time-news-data.p.rapidapi.com"
        },
        timeout: 10000
      }
    );

    const formattedNews = (response.data.data || []).map((item) => ({
      title: item.title,
      summary: item.snippet || item.summary || "No summary available",
      link: item.link,
      published_date: item.published_datetime_utc || "",
      image_url: item.photo_url || item.thumbnail || "https://via.placeholder.com/400x200"
    }));

    res.json({ success: true, results: formattedNews });
  } catch (err) {
    handleError(res, 500, "News fetch failed", err.message);
  }
});

// ====================== 📋 AI PLANNER ======================
app.post("/api/ai-planner", async (req, res) => {
  const { city, days = 5, tripVibe = "Balanced" } = req.body;

  if (!city || !days) {
    return handleError(res, 400, "City and days are required");
  }

  try {
    const systemPrompt = `Expert Travel Architect. Create a detailed ${days}-day itinerary for ${city}. 
    Vibe: ${tripVibe}. 
    Return JSON ONLY: {
      "itinerary": [
        {
          "day": 1,
          "theme": "string",
          "activities": [
            {"time": "Morning", "task": "string", "description": "string"},
            {"time": "Afternoon", "task": "string", "description": "string"},
            {"time": "Evening", "task": "string", "description": "string"}
          ]
        }
      ],
      "travel_tips": ["string"]
    }`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "system", content: systemPrompt }],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      temperature: 0.5,
      max_tokens: 1500
    });

    const plan = JSON.parse(completion.choices[0].message.content);
    res.json({ success: true, data: plan });
  } catch (err) {
    handleError(res, 500, "AI Planner failed", err.message);
  }
});

// ====================== ERROR HANDLING ======================
// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Endpoint not found",
    availableEndpoints: [
      "POST /api/ai-budget",
      "POST /api/ai-planner",
      "GET /api/flights",
      "GET /api/hotels",
      "GET /api/photos",
      "GET /api/startup-news",
      "GET /api/health"
    ]
  });
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error("❌ Unhandled Error:", err);
  res.status(500).json({
    success: false,
    error: "Internal server error",
    message: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

// ====================== SERVER STARTUP ======================
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║     🌍 TravioX Backend Started 🌍      ║
║     Server running on port ${PORT}         ║
║     API: http://localhost:${PORT}          ║
║     Environment: ${process.env.NODE_ENV || "development"}       ║
╚════════════════════════════════════════╝

📍 Available Endpoints:
✅ POST   /api/ai-budget       - Generate AI budget
✅ POST   /api/ai-planner      - Create itinerary
✅ GET    /api/flights         - Search flights
✅ GET    /api/hotels          - Search hotels
✅ GET    /api/photos          - Get destination photos
✅ GET    /api/startup-news    - Get travel news
✅ GET    /api/health          - Health check
  `);
});

module.exports = app;














