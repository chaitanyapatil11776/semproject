require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const Groq = require("groq-sdk");

const app = express();
const PORT = process.env.PORT || 3000;

// ═══════════════════════════════════════════════════════════════
// 🔑  API KEYS — Loaded from process.env (.env or Vercel Environment Variables)
// ═══════════════════════════════════════════════════════════════
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const SERPAPI_KEY = process.env.SERPAPI_KEY;
const RAPID_API_KEY = process.env.RAPID_API_KEY;
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const SARVAM_API_KEY = process.env.SARVAM_API_KEY;
const CREATOMATE_API_KEY = process.env.CREATOMATE_API_KEY;
const CREATOMATE_TEMPLATE_ID = process.env.CREATOMATE_TEMPLATE_ID;
const GEOAPIFY_KEY = process.env.GEOAPIFY_KEY;

// Log key availability without exiting process
const REQUIRED_KEYS = [
  "GROQ_API_KEY",
  "SERPAPI_KEY",
  "RAPID_API_KEY",
  "UNSPLASH_ACCESS_KEY",
  "SARVAM_API_KEY",
  "CREATOMATE_API_KEY",
  "GEOAPIFY_KEY",
];

const missingKeys = REQUIRED_KEYS.filter((k) => !process.env[k]);
if (missingKeys.length > 0) {
  console.warn(`⚠️ Warning: Missing environment variables on server: ${missingKeys.join(", ")}`);
  console.warn("Make sure these keys are added in your Vercel Project Settings -> Environment Variables.");
} else {
  console.log("✅ All required environment variables are loaded.");
}

const groq = new Groq({ apiKey: GROQ_API_KEY || "dummy_key" });

// ═══════════════════════════════════════════════════════════════
// ⚙️  MIDDLEWARE
// ═══════════════════════════════════════════════════════════════
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static("public"));

app.use((req, _res, next) => {
  console.log(`📥 ${req.method} ${req.path}`);
  next();
});

// ═══════════════════════════════════════════════════════════════
// 🛠️  HELPERS
// ═══════════════════════════════════════════════════════════════
const getFormattedDate = (daysFromNow) => {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().split("T")[0];
};

const handleError = (res, statusCode, message, details = null) => {
  console.error(`❌ Error: ${message}`, details || "");
  res.status(statusCode).json({ success: false, error: message, details });
};

const normalizeToString = (val) => {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (Array.isArray(val)) return val.join(", ");
  if (typeof val === "object") {
    if (val.dishes)
      return Array.isArray(val.dishes) ? val.dishes.join(", ") : String(val.dishes);
    return Object.values(val).join(", ");
  }
  return String(val);
};

const sanitizeDestinationInfo = (info) => ({
  history: normalizeToString(info.history),
  bestTime: normalizeToString(info.bestTime),
  food: normalizeToString(info.food),
  culture: normalizeToString(info.culture),
  hiddenGem: normalizeToString(info.hiddenGem),
  summary: normalizeToString(info.summary),
});

const splitIntoChunks = (text, maxLen = 490) => {
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g) || [text];
  const chunks = [];
  let current = "";
  for (const sentence of sentences) {
    if ((current + sentence).length <= maxLen) {
      current += sentence;
    } else {
      if (current.trim()) chunks.push(current.trim());
      if (sentence.length > maxLen) {
        const words = sentence.split(" ");
        let wordChunk = "";
        for (const word of words) {
          if ((wordChunk + " " + word).length <= maxLen) {
            wordChunk += (wordChunk ? " " : "") + word;
          } else {
            if (wordChunk) chunks.push(wordChunk.trim());
            wordChunk = word;
          }
        }
        current = wordChunk;
      } else {
        current = sentence;
      }
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks.filter(Boolean);
};

const translateText = async (text, targetLang) => {
  if (targetLang === "en-IN" || !text || !SARVAM_API_KEY) return text;
  try {
    const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g) || [text];
    const translatedChunks = [];
    let currentChunk = "";
    for (const sentence of sentences) {
      if ((currentChunk + sentence).length < 900) {
        currentChunk += sentence;
      } else {
        if (currentChunk) {
          const res = await axios.post(
            "https://api.sarvam.ai/translate",
            {
              input: currentChunk,
              source_language_code: "en-IN",
              target_language_code: targetLang,
              speaker_gender: "Female",
            },
            {
              headers: {
                "api-subscription-key": SARVAM_API_KEY,
                "Content-Type": "application/json",
              },
              timeout: 6000,
            }
          );
          translatedChunks.push(res.data.translated_text || currentChunk);
        }
        currentChunk = sentence;
      }
    }
    if (currentChunk) {
      const res = await axios.post(
        "https://api.sarvam.ai/translate",
        {
          input: currentChunk,
          source_language_code: "en-IN",
          target_language_code: targetLang,
          speaker_gender: "Female",
        },
        {
          headers: {
            "api-subscription-key": SARVAM_API_KEY,
            "Content-Type": "application/json",
          },
          timeout: 6000,
        }
      );
      translatedChunks.push(res.data.translated_text || currentChunk);
    }
    return translatedChunks.join(" ");
  } catch (err) {
    console.warn("Translation Notice:", err.response?.data || err.message);
    return text; // Return original English text if translation fails
  }
};

const generateSarvamAudio = async (text, language = "en-IN", speaker = "meera") => {
  if (!SARVAM_API_KEY || !text) return [];
  try {
    const chunks = splitIntoChunks(text, 490).slice(0, 3); // Max 3 chunks to stay well within timeout
    const audioSegments = [];
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const ttsRes = await axios.post(
        "https://api.sarvam.ai/text-to-speech",
        { inputs: [chunk], target_language_code: language, speaker_id: speaker },
        {
          headers: {
            "api-subscription-key": SARVAM_API_KEY,
            "Content-Type": "application/json",
          },
          timeout: 5000,
        }
      );
      if (ttsRes.data?.audios?.[0]) {
        audioSegments.push(ttsRes.data.audios[0]);
      }
    }
    return audioSegments;
  } catch (err) {
    console.warn("Sarvam TTS Notice:", err.response?.data || err.message);
    return []; // Return empty array if TTS fails so main data still works
  }
};

// ═══════════════════════════════════════════════════════════════
// ✅  HEALTH CHECK
// ═══════════════════════════════════════════════════════════════
app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "TravioX API is running ✈️",
    timestamp: new Date().toISOString(),
    keys_configured: {
      groq: !!GROQ_API_KEY,
      serpapi: !!SERPAPI_KEY,
      rapidapi: !!RAPID_API_KEY,
      unsplash: !!UNSPLASH_ACCESS_KEY,
      sarvam: !!SARVAM_API_KEY,
      creatomate: !!CREATOMATE_API_KEY,
      geoapify: !!GEOAPIFY_KEY,
    },
  });
});

// ═══════════════════════════════════════════════════════════════
// 🗺️  LIVE MAP — GEOCODE SEARCH (Geoapify)
// ═══════════════════════════════════════════════════════════════
app.post("/api/live-map/geocode", async (req, res) => {
  const { query } = req.body;
  if (!query || !query.trim()) {
    return handleError(res, 400, "query is required");
  }
  if (!GEOAPIFY_KEY) {
    return handleError(res, 500, "GEOAPIFY_KEY is not configured on server");
  }
  try {
    const response = await axios.get("https://api.geoapify.com/v1/geocode/search", {
      params: { text: query.trim(), apiKey: GEOAPIFY_KEY, limit: 1, format: "json" },
      timeout: 6000,
    });
    const results = response.data?.results;
    if (!results || results.length === 0) {
      return res.status(404).json({ success: false, error: "Location not found" });
    }
    const place = results[0];
    res.json({
      success: true,
      result: {
        latitude: place.lat,
        longitude: place.lon,
        label: place.formatted || query,
        country: place.country || "",
        city: place.city || place.county || "",
      },
    });
  } catch (err) {
    handleError(res, 500, "Geocoding failed", err.message);
  }
});

// ─────────────────────────────────────────────────────────────
// Routing
app.post("/api/live-map/route", async (req, res) => {
  const { startLat, startLon, endLat, endLon, mode = "drive" } = req.body;
  if (!startLat || !startLon || !endLat || !endLon) {
    return handleError(res, 400, "startLat, startLon, endLat, endLon are all required");
  }
  if (!GEOAPIFY_KEY) {
    return handleError(res, 500, "GEOAPIFY_KEY is not configured on server");
  }
  const validModes = ["drive", "walk", "bicycle", "transit"];
  const routeMode = validModes.includes(mode) ? mode : "drive";
  try {
    const url = "https://api.geoapify.com/v1/routing";
    const response = await axios.get(url, {
      params: {
        waypoints: `${startLat},${startLon}|${endLat},${endLon}`,
        mode: routeMode,
        apiKey: GEOAPIFY_KEY,
        format: "json",
      },
      timeout: 8000,
    });
    const features = response.data?.features;
    if (!features || features.length === 0) {
      return res.status(404).json({ success: false, error: "No route found" });
    }
    const feature = features[0];
    const props = feature.properties;
    let allCoords = [];
    const geom = feature.geometry;
    if (geom.type === "MultiLineString") {
      geom.coordinates.forEach((line) => {
        line.forEach(([lon, lat]) => allCoords.push({ latitude: lat, longitude: lon }));
      });
    } else if (geom.type === "LineString") {
      geom.coordinates.forEach(([lon, lat]) =>
        allCoords.push({ latitude: lat, longitude: lon })
      );
    }
    res.json({
      success: true,
      route: {
        coordinates: allCoords,
        distance_km: parseFloat((props.distance / 1000).toFixed(2)),
        duration_min: Math.round(props.time / 60),
        mode: routeMode,
      },
    });
  } catch (err) {
    handleError(res, 500, "Route calculation failed", err.message);
  }
});

// ─────────────────────────────────────────────────────────────
// Reverse Geocode
app.get("/api/live-map/reverse", async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) return handleError(res, 400, "lat and lon are required");
  if (!GEOAPIFY_KEY) {
    return handleError(res, 500, "GEOAPIFY_KEY is not configured on server");
  }
  try {
    const response = await axios.get("https://api.geoapify.com/v1/geocode/reverse", {
      params: { lat, lon, apiKey: GEOAPIFY_KEY, format: "json" },
      timeout: 6000,
    });
    const results = response.data?.results;
    const label =
      results?.[0]?.formatted || `${parseFloat(lat).toFixed(4)}, ${parseFloat(lon).toFixed(4)}`;
    res.json({ success: true, label });
  } catch (err) {
    handleError(res, 500, "Reverse geocoding failed", err.message);
  }
});

// ═══════════════════════════════════════════════════════════════
// 📰  NEWS (RapidAPI)
// ═══════════════════════════════════════════════════════════════
app.get("/api/startup-news", async (req, res) => {
  const userQuery = req.query.q || "Travel";
  if (!RAPID_API_KEY) {
    return handleError(res, 500, "RAPID_API_KEY is not configured on server");
  }
  try {
    const response = await axios.get("https://real-time-news-data.p.rapidapi.com/search", {
      params: {
        query: userQuery,
        limit: 10,
        time_published: "anytime",
        country: "US",
        lang: "en",
      },
      headers: {
        "x-rapidapi-key": RAPID_API_KEY,
        "x-rapidapi-host": "real-time-news-data.p.rapidapi.com",
      },
      timeout: 8000,
    });
    const formattedNews = (response.data.data || []).map((item) => ({
      title: item.title,
      summary: item.snippet || item.summary || "No summary available",
      link: item.link,
      published_date: item.published_datetime_utc || "",
      image_url:
        item.photo_url || item.thumbnail || "https://via.placeholder.com/400x200",
    }));
    res.json({ success: true, results: formattedNews });
  } catch (err) {
    handleError(res, 500, "News fetch failed", err.message);
  }
});

// ═══════════════════════════════════════════════════════════════
// 🧳  SMART PACKING LIST (Groq)
// ═══════════════════════════════════════════════════════════════
app.post("/api/smart-packing", async (req, res) => {
  const {
    destination,
    tripType = "Leisure",
    duration = 5,
    gender = "Unspecified",
    luggageType = "Backpack",
    specialActivities = [],
  } = req.body;

  if (!destination) {
    return res.status(400).json({ success: false, error: "Destination is required" });
  }
  if (!GROQ_API_KEY) {
    return handleError(res, 500, "GROQ_API_KEY is not configured on server");
  }

  try {
    const activitiesStr = specialActivities.length > 0 ? specialActivities.join(", ") : "None";
    const prompt = `You are a geo-climate travel expert. Analyze location "${destination}".
Trip: ${tripType} | ${duration} days | Gender: ${gender} | Luggage: ${luggageType} | Activities: ${activitiesStr}
${tripType === "Family" ? "Include 'Kids & Baby Essentials' (icon: '🍼') category." : ""}
Return STRICT JSON:
{
  "weather_summary": "Climate analysis for ${destination}",
  "categories": [
    {
      "name": "Layering & Clothing",
      "icon": "🧥",
      "items": [{"item": "Item + quantity", "essential": true, "reason": "Why needed"}]
    },
    {"name": "Footwear", "icon": "🥾", "items": [{"item": "Walking shoes", "essential": true, "reason": "Comfort"}]},
    {"name": "Toiletries & Health", "icon": "🧴", "items": [{"item": "Sunscreen", "essential": true, "reason": "Protection"}]},
    {"name": "Electronics", "icon": "🔌", "items": [{"item": "Power bank", "essential": true, "reason": "Charging"}]},
    {"name": "Documents & Essentials", "icon": "📄", "items": [{"item": "ID Proof", "essential": true, "reason": "Identity"}]}
  ],
  "pro_tips": ["Hyper-specific tip for ${destination}"]
}`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "Return valid JSON only. No markdown." },
        { role: "user", content: prompt },
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      temperature: 0.4,
      max_tokens: 1500,
    });

    let packingData = JSON.parse(completion.choices[0].message.content);
    res.json({ success: true, data: packingData });
  } catch (err) {
    handleError(res, 500, "Failed to generate packing list", err.message);
  }
});

// ═══════════════════════════════════════════════════════════════
// 🗺️  DESTINATION INFO + AUDIO (Groq + Sarvam Fallback)
// ═══════════════════════════════════════════════════════════════
app.post("/api/destination-info", async (req, res) => {
  const { city, language = "en-IN" } = req.body;
  if (!city) return handleError(res, 400, "City is required");
  if (!GROQ_API_KEY) return handleError(res, 500, "GROQ_API_KEY is not configured");

  try {
    const prompt = `You are an expert travel guide. Generate travel summary for ${city}, India.
Return STRICT JSON:
{
  "history": "3 sentences covering origin, historical significance.",
  "bestTime": "Which months/season and exactly why.",
  "food": "Name 3 must-try local dishes as a comma-separated string.",
  "culture": "2 sentences on local traditions.",
  "hiddenGem": "One underrated spot.",
  "summary": "A vivid 3-sentence overview."
}`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      temperature: 0.6,
      max_tokens: 1000,
    });

    const rawInfo = JSON.parse(completion.choices[0].message.content);
    const infoData = sanitizeDestinationInfo(rawInfo);

    let narrationScript = `Welcome to ${city}. ${infoData.summary} Best time to visit is ${infoData.bestTime}. Must-try foods: ${infoData.food}.`;

    // Attempt translation and audio generation gracefully (will not crash if Sarvam fails)
    let audioSegments = [];
    if (SARVAM_API_KEY) {
      if (language !== "en-IN") {
        narrationScript = await translateText(narrationScript, language);
      }
      audioSegments = await generateSarvamAudio(narrationScript, language);
    }

    res.json({
      success: true,
      data: {
        info: infoData,
        audioSegments,
        audioBase64: audioSegments[0] || null,
        generatedLanguage: language,
      },
    });
  } catch (err) {
    handleError(res, 500, "Failed to generate destination info", err.message);
  }
});

// ═══════════════════════════════════════════════════════════════
// 🔊  TEXT-TO-SPEECH (Direct)
// ═══════════════════════════════════════════════════════════════
app.post("/api/text-to-speech", async (req, res) => {
  const { prompt, text, language = "en-IN", speaker = "meera" } = req.body;
  try {
    let finalText = text;
    if (!finalText && prompt && GROQ_API_KEY) {
      const completion = await groq.chat.completions.create({
        messages: [
          { role: "system", content: "You are a helpful travel assistant. Keep responses under 200 words." },
          { role: "user", content: prompt },
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        max_tokens: 300,
      });
      finalText = completion.choices[0].message.content;
    }

    if (!finalText) return handleError(res, 400, "Either 'text' or 'prompt' is required");
    finalText = normalizeToString(finalText);

    const audioSegments = await generateSarvamAudio(finalText, language, speaker);
    res.json({
      success: true,
      audioSegments,
      audioBase64: audioSegments[0] || null,
      textUsed: finalText,
      totalChunks: audioSegments.length,
    });
  } catch (err) {
    handleError(res, 500, "Failed to generate speech", err.message);
  }
});

// ═══════════════════════════════════════════════════════════════
// 💰  AI BUDGET PLANNER (Groq)
// ═══════════════════════════════════════════════════════════════
app.post("/api/ai-budget", async (req, res) => {
  const { city, travelers = 2, days = 5, tripVibe = "Mid-range" } = req.body;
  if (!city) return handleError(res, 400, "City name is required");
  if (!GROQ_API_KEY) return handleError(res, 500, "GROQ_API_KEY is not configured");

  try {
    const prompt = `Create a detailed day-by-day travel budget for ${city}, India.
Travelers: ${travelers} | Days: ${days} | Style: ${tripVibe}.
Return STRICT JSON:
{
  "dailyPlan": [
    {
      "day": 1,
      "title": "Arrival & Exploration",
      "activities": [{"item": "City Walk", "cost": 300}],
      "accommodation": 2000,
      "food": 800,
      "transport": 400
    }
  ],
  "summary": {
    "stayTotal": ${days * 2000}, "foodTotal": ${days * 800}, "transportTotal": ${days * 400},
    "activitiesTotal": ${days * 300}, "miscellaneous": 500, "grandTotal": ${days * 3500 + 500}
  },
  "expertAdvice": "3 money-saving tips for ${city}",
  "bestDeals": ["Use local transit", "Eat at local dhabas", "Book tickets online"]
}`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "Return JSON only." },
        { role: "user", content: prompt },
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      temperature: 0.5,
      max_tokens: 1500,
    });

    const aiData = JSON.parse(completion.choices[0].message.content);
    res.json({
      success: true,
      data: {
        ...aiData,
        averageDailyBudget: Math.round((aiData.summary?.grandTotal || 3500 * days) / days),
      },
    });
  } catch (err) {
    handleError(res, 500, "Failed to generate budget", err.message);
  }
});

// ═══════════════════════════════════════════════════════════════
// 📋  AI ITINERARY PLANNER (Groq)
// ═══════════════════════════════════════════════════════════════
app.post("/api/ai-planner", async (req, res) => {
  const { city, days = 5, tripVibe = "Balanced" } = req.body;
  if (!city) return handleError(res, 400, "City is required");
  if (!GROQ_API_KEY) return handleError(res, 500, "GROQ_API_KEY is not configured");

  try {
    const prompt = `Create a detailed ${days}-day travel itinerary for ${city}, India. Vibe: ${tripVibe}.
Return JSON:
{
  "itinerary": [
    {
      "day": 1,
      "theme": "Arrival & City Highlights",
      "activities": [
        {"time": "Morning", "task": "Sightseeing", "description": "Visit iconic spot", "tips": "Start early"},
        {"time": "Afternoon", "task": "Lunch & Culture", "description": "Try local food", "tips": "Famous market"},
        {"time": "Evening", "task": "Sunset view", "description": "Relax at viewpoint", "tips": "Bring camera"}
      ]
    }
  ],
  "travel_tips": ["Carry cash for local markets", "Wear comfortable shoes"],
  "must_try_experiences": ["Local street food walk", "Historical heritage tour"]
}`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      temperature: 0.5,
      max_tokens: 1800,
    });

    res.json({ success: true, data: JSON.parse(completion.choices[0].message.content) });
  } catch (err) {
    handleError(res, 500, "AI Planner failed", err.message);
  }
});

// ═══════════════════════════════════════════════════════════════
// 🤖  AI CHAT (Groq)
// ═══════════════════════════════════════════════════════════════
app.post("/api/ai-chat", async (req, res) => {
  const { message, history = [] } = req.body;
  if (!message) return handleError(res, 400, "Message is required");
  if (!GROQ_API_KEY) return handleError(res, 500, "GROQ_API_KEY is not configured");

  try {
    const messages = [
      { role: "system", content: "You are TravioX, an expert Indian travel assistant. Keep responses helpful, engaging and concise." },
      ...history.slice(-8),
      { role: "user", content: message },
    ];
    const completion = await groq.chat.completions.create({
      messages,
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 400,
    });
    res.json({ success: true, reply: completion.choices[0].message.content });
  } catch (err) {
    handleError(res, 500, "AI Chat failed", err.message);
  }
});

// ═══════════════════════════════════════════════════════════════
// 📷  PHOTOS (Unsplash)
// ═══════════════════════════════════════════════════════════════
app.get("/api/photos", async (req, res) => {
  const query = req.query.q;
  if (!query || query.trim() === "") {
    return res.status(400).json({ success: false, error: "Query parameter 'q' is required" });
  }
  if (!UNSPLASH_ACCESS_KEY) {
    return handleError(res, 500, "UNSPLASH_ACCESS_KEY is not configured");
  }
  try {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: { query: query.trim(), per_page: 8, client_id: UNSPLASH_ACCESS_KEY },
      timeout: 6000,
    });
    res.json({
      success: true,
      photos: response.data.results.map((img) => ({
        id: img.id,
        url: img.urls.regular,
        thumb: img.urls.thumb,
        description: img.alt_description || "",
        credit: img.user?.name || "Unsplash",
      })),
    });
  } catch (err) {
    handleError(res, 500, "Failed to fetch images", err.message);
  }
});

// ═══════════════════════════════════════════════════════════════
// ✈️  FLIGHTS (SerpApi)
// ═══════════════════════════════════════════════════════════════
app.get("/api/flights", async (req, res) => {
  let { departure_id = "BOM", arrival_id = "DEL" } = req.query;
  if (!departure_id || !arrival_id || departure_id.length !== 3 || arrival_id.length !== 3) {
    return res.status(400).json({
      success: false,
      error: "Please use valid 3-letter airport codes (e.g., BOM, DEL)",
    });
  }
  if (!SERPAPI_KEY) {
    return handleError(res, 500, "SERPAPI_KEY is not configured");
  }

  const nextMonth = new Date();
  nextMonth.setDate(nextMonth.getDate() + 30);
  const travelDate = nextMonth.toISOString().split("T")[0];

  try {
    const response = await axios.get("https://serpapi.com/search", {
      params: {
        engine: "google_flights",
        departure_id: departure_id.toUpperCase(),
        arrival_id: arrival_id.toUpperCase(),
        outbound_date: travelDate,
        type: "2",
        currency: "INR",
        hl: "en",
        gl: "us",
        api_key: SERPAPI_KEY,
      },
      timeout: 10000,
    });

    const results = [
      ...(response.data.best_flights || []),
      ...(response.data.other_flights || []),
    ];

    if (results.length === 0) {
      return res.json({ success: true, flights: [], message: "No flights found." });
    }

    const formatted = results.slice(0, 10).map((f) => {
      const leg = f.flights?.[0] || {};
      return {
        airline: leg.airline || "Airline",
        logo: leg.airline_logo || "",
        flight_number: leg.flight_number || "",
        departure: leg.departure_airport?.id || departure_id,
        departure_name: leg.departure_airport?.name || departure_id,
        arrival: leg.arrival_airport?.id || arrival_id,
        arrival_name: leg.arrival_airport?.name || arrival_id,
        departure_time: leg.departure_airport?.time?.split(" ")[1] || "10:00",
        arrival_time: leg.arrival_airport?.time?.split(" ")[1] || "12:30",
        duration: f.total_duration || 120,
        status: f.type || "Available",
        url: `https://www.google.com/travel/flights?q=flights%20from%20${departure_id}%20to%20${arrival_id}%20on%20${travelDate}`,
      };
    });

    res.json({ success: true, flights: formatted });
  } catch (err) {
    handleError(res, 500, "Flight search failed", err.message);
  }
});

// ═══════════════════════════════════════════════════════════════
// 🏨  HOTELS (SerpApi)
// ═══════════════════════════════════════════════════════════════
app.get("/api/hotels", async (req, res) => {
  const { q = "Mumbai" } = req.query;
  if (!SERPAPI_KEY) {
    return handleError(res, 500, "SERPAPI_KEY is not configured");
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
        gl: "in",
      },
      timeout: 10000,
    });
    const hotels = (response.data.properties || []).slice(0, 8).map((h) => ({
      name: h.name,
      rating: h.overall_rating || "N/A",
      price: h.rate_per_night?.lowest || "N/A",
      thumbnail: h.images?.[0]?.thumbnail || "https://via.placeholder.com/300",
      link: h.link || "#",
    }));
    res.json({ success: true, hotels });
  } catch (err) {
    handleError(res, 500, "Hotel search failed", err.message);
  }
});

// ═══════════════════════════════════════════════════════════════
// 📖  TRAVEL MEMORY BUILDER (Groq Vision + Fast Story Generation)
// ═══════════════════════════════════════════════════════════════
async function analyzeTravelMoment(m, i) {
  const userNote = (m.user_note || "").trim();
  const rawBase64 = m.image_base64 || "";
  const cleanBase64 = rawBase64.replace(/^data:image\/\w+;base64,/, "").trim();

  // Try Groq Vision model
  if (cleanBase64 && GROQ_API_KEY) {
    try {
      const visionPrompt = `Analyze this travel photo. Traveler note: "${userNote || "Vacation"}". Return JSON: {"mood":"One word","mood_emoji":"emoji","scene_description":"1 sentence"}`;
      const visionRes = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: visionPrompt },
              { type: "image_url", image_url: { url: `data:image/jpeg;base64,${cleanBase64}` } },
            ],
          },
        ],
        model: "llama-3.2-11b-vision-preview",
        response_format: { type: "json_object" },
        temperature: 0.4,
        max_tokens: 120,
      });
      const parsed = JSON.parse(visionRes.choices[0].message.content);
      return {
        index: i,
        user_note: userNote,
        mood: parsed.mood || "Adventurous",
        mood_emoji: parsed.mood_emoji || "✨",
        scene_description: parsed.scene_description || userNote || "A special travel memory.",
      };
    } catch (visionErr) {
      console.warn(`Vision fallback for moment #${i + 1}`);
    }
  }

  // Fast text fallback
  return {
    index: i,
    user_note: userNote,
    mood: "Memorable",
    mood_emoji: "📸",
    scene_description: userNote || "A wonderful travel moment captured in time.",
  };
}

app.post("/api/travel-memory-builder", async (req, res) => {
  const { moments } = req.body;
  if (!moments || !Array.isArray(moments) || moments.length < 2) {
    return res.status(400).json({ success: false, error: "Provide at least 2 moments" });
  }
  if (!GROQ_API_KEY) {
    return handleError(res, 500, "GROQ_API_KEY is not configured");
  }

  try {
    const scenePromises = moments.map((m, i) => analyzeTravelMoment(m, i));
    const scenes = await Promise.all(scenePromises);

    const storyPrompt = `Create a travel diary and social captions from moments: ${JSON.stringify(scenes)}.
Return JSON:
{
  "trip_title": "4-6 word evocative title",
  "travel_story": "A rich 3-4 paragraph narrative connecting these moments.",
  "timeline": [{"moment_index": 0, "social_caption": "Caption with 3 hashtags"}],
  "tags": ["travel", "wanderlust", "explore", "memories", "adventure"],
  "highlight_quote": "One unforgettable quote"
}`;

    const storyRes = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "Return JSON only without markdown." },
        { role: "user", content: storyPrompt },
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      temperature: 0.6,
      max_tokens: 1800,
    });

    let storyData;
    try {
      storyData = JSON.parse(storyRes.choices[0].message.content);
    } catch {
      storyData = {
        trip_title: "Echoes of the Road",
        travel_story: "Every journey writes a new chapter in our memories.",
        tags: ["wanderlust", "explore", "memories"],
        highlight_quote: "Collect moments, not things.",
        timeline: [],
      };
    }

    const timeline = scenes.map((s, i) => {
      const match = storyData.timeline?.find((t) => t.moment_index === i || t.index === i);
      return {
        ...s,
        social_caption: match?.social_caption || `${s.scene_description || s.user_note} ✨ #travel #adventure`,
      };
    });

    res.json({
      success: true,
      data: {
        trip_title: storyData.trip_title || "A Journey Remembered",
        travel_story: storyData.travel_story || "Memories forged along the open road.",
        tags: storyData.tags || ["travel", "wanderlust", "memories"],
        highlight_quote: storyData.highlight_quote || "Collect moments, not things.",
        timeline,
        created_at: new Date().toISOString(),
      },
    });
  } catch (err) {
    handleError(res, 500, "Memory builder failed", err.message);
  }
});

// ═══════════════════════════════════════════════════════════════
// 🎬  CREATOMATE VIDEO GENERATOR (Vercel Fast Handler)
// ═══════════════════════════════════════════════════════════════
function buildSlideshowRenderScript(imageUrls, captions = []) {
  const photos = imageUrls.slice(0, 4);
  const slideDuration = 3.5;
  const elements = [];

  photos.forEach((url, i) => {
    elements.push({
      type: "image",
      source: url,
      track: 1,
      duration: slideDuration,
      clip: true,
      animations: [
        { type: "scale", start_scale: i % 2 === 0 ? "100%" : "112%", end_scale: i % 2 === 0 ? "112%" : "100%", easing: "linear" },
        ...(i > 0 ? [{ type: "fade", transition: true, duration: 0.6 }] : []),
      ],
    });
  });

  if (Array.isArray(captions) && captions.length > 0) {
    photos.forEach((_, i) => {
      const cap = captions[i];
      if (cap && typeof cap === "string" && cap.trim()) {
        elements.push({
          type: "text",
          text: cap.trim().substring(0, 100),
          track: 2,
          time: i * slideDuration,
          duration: slideDuration,
          y: "85%",
          width: "86%",
          fill_color: "#ffffff",
          background_color: "rgba(10, 10, 10, 0.75)",
          background_border_radius: "12 px",
          padding: "14 px",
          font_size: "30 px",
          font_weight: "700",
          text_alignment: "center",
          animations: [
            { type: "fade", duration: 0.4 },
            { type: "fade", duration: 0.4, transition: false, time: slideDuration - 0.4, reversed: true },
          ],
        });
      }
    });
  }

  return {
    output_format: "mp4",
    width: 1080,
    height: 1920,
    frame_rate: 30,
    elements,
  };
}

app.post("/api/generate-video", async (req, res) => {
  const { imageUrls, captions } = req.body;
  if (!imageUrls || !Array.isArray(imageUrls) || imageUrls.length < 2) {
    return res.status(400).json({ success: false, error: "Provide at least 2 image URLs" });
  }
  if (!CREATOMATE_API_KEY) {
    return handleError(res, 500, "CREATOMATE_API_KEY is not configured");
  }

  try {
    const videoMoments = imageUrls.slice(0, 4);
    let renderResponse = null;

    if (CREATOMATE_TEMPLATE_ID) {
      try {
        const modifications = {};
        videoMoments.forEach((url, i) => {
          modifications[`Background-${i + 1}.source`] = url;
        });
        if (captions && captions.length > 0) {
          captions.slice(0, videoMoments.length).forEach((caption, i) => {
            modifications[`Text-${i + 1}.text`] = (caption || "").substring(0, 150);
          });
        }
        const tplRes = await axios.post(
          "https://api.creatomate.com/v2/renders",
          { template_id: CREATOMATE_TEMPLATE_ID, modifications },
          {
            headers: {
              Authorization: `Bearer ${CREATOMATE_API_KEY}`,
              "Content-Type": "application/json",
            },
            timeout: 6000,
          }
        );
        renderResponse = tplRes.data;
      } catch (tplErr) {
        console.warn("Template render notice:", tplErr.message);
      }
    }

    if (!renderResponse) {
      const source = buildSlideshowRenderScript(videoMoments, captions);
      const scriptRes = await axios.post(
        "https://api.creatomate.com/v2/renders",
        { source },
        {
          headers: {
            Authorization: `Bearer ${CREATOMATE_API_KEY}`,
            "Content-Type": "application/json",
          },
          timeout: 6000,
        }
      );
      renderResponse = scriptRes.data;
    }

    const initialRender = Array.isArray(renderResponse) ? renderResponse[0] : renderResponse;
    if (!initialRender || !initialRender.id) {
      throw new Error("Invalid response from Creatomate");
    }

    // Return immediately to avoid Vercel 10s Serverless timeout
    res.json({
      success: true,
      videoUrl: initialRender.url,
      status: initialRender.status,
      renderId: initialRender.id,
    });
  } catch (err) {
    handleError(res, 500, "Failed to generate video", err.message);
  }
});

app.get("/api/video-status/:id", async (req, res) => {
  if (!CREATOMATE_API_KEY) {
    return handleError(res, 500, "CREATOMATE_API_KEY is not configured");
  }
  try {
    const statusRes = await axios.get(`https://api.creatomate.com/v2/renders/${req.params.id}`, {
      headers: { Authorization: `Bearer ${CREATOMATE_API_KEY}` },
      timeout: 6000,
    });
    const data = Array.isArray(statusRes.data) ? statusRes.data[0] : statusRes.data;
    res.json({
      success: true,
      status: data.status,
      videoUrl: data.url,
      errorMessage: data.error_message,
    });
  } catch (err) {
    handleError(res, 500, "Failed to fetch video status", err.message);
  }
});

// ═══════════════════════════════════════════════════════════════
// 🚀  START SERVER
// ═══════════════════════════════════════════════════════════════
app.listen(PORT, () => {
  console.log(`\n✈️  TravioX Server running on port ${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/api/health\n`);
});

module.exports = app;
