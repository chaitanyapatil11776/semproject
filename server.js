









// // // // w
// // // require("dotenv").config();   // ← MUST BE FIRST LINE
// // // const express = require("express");
// // // const cors    = require("cors");
// // // const axios   = require("axios");
// // // const Groq    = require("groq-sdk");

// // // const app  = express();
// // // const PORT = process.env.PORT || 3000;

// // // // ═══════════════════════════════════════════════════════════════
// // // // 🔑  API KEYS — Loaded from .env
// // // // ═══════════════════════════════════════════════════════════════
// // // const GROQ_API_KEY           = process.env.GROQ_API_KEY;
// // // const SERPAPI_KEY            = process.env.SERPAPI_KEY;
// // // const RAPID_API_KEY          = process.env.RAPID_API_KEY;
// // // const UNSPLASH_ACCESS_KEY    = process.env.UNSPLASH_ACCESS_KEY;
// // // const SARVAM_API_KEY         = process.env.SARVAM_API_KEY;
// // // const CREATOMATE_API_KEY     = process.env.CREATOMATE_API_KEY;
// // // const CREATOMATE_TEMPLATE_ID = process.env.CREATOMATE_TEMPLATE_ID;

// // // // ─── Validate all keys at startup ─────────────────────────────
// // // const REQUIRED_KEYS = [
// // //   "GROQ_API_KEY",
// // //   "SERPAPI_KEY",
// // //   "RAPID_API_KEY",
// // //   "UNSPLASH_ACCESS_KEY",
// // //   "SARVAM_API_KEY",
// // //   "CREATOMATE_API_KEY",
// // //   "CREATOMATE_TEMPLATE_ID",
// // // ];
// // // const missingKeys = REQUIRED_KEYS.filter((k) => !process.env[k]);
// // // if (missingKeys.length > 0) {
// // //   console.error(`\n❌ Missing environment variables:\n   ${missingKeys.join("\n   ")}\n`);
// // //   console.error('💡 Copy .env.example to .env and fill in your keys.\n');
// // //   process.exit(1);
// // // }

// // // const groq = new Groq({ apiKey: GROQ_API_KEY });

// // // // ═══════════════════════════════════════════════════════════════
// // // // ⚙️  MIDDLEWARE
// // // // ═══════════════════════════════════════════════════════════════
// // // app.use(cors());
// // // app.use(express.json({ limit: "10mb" }));
// // // app.use(express.static("public"));
// // // app.use((req, _res, next) => {
// // //   console.log(`📥 ${req.method} ${req.path}`);
// // //   next();
// // // });

// // // // ═══════════════════════════════════════════════════════════════
// // // // 🛠️  HELPERS
// // // // ═══════════════════════════════════════════════════════════════
// // // const getFormattedDate = (daysFromNow) => {
// // //   const d = new Date();
// // //   d.setDate(d.getDate() + daysFromNow);
// // //   return d.toISOString().split("T")[0];
// // // };

// // // const handleError = (res, statusCode, message, details = null) => {
// // //   console.error(`❌ Error: ${message}`, details || "");
// // //   res.status(statusCode).json({ success: false, error: message });
// // // };

// // // const normalizeToString = (val) => {
// // //   if (!val) return "";
// // //   if (typeof val === "string") return val;
// // //   if (Array.isArray(val)) return val.join(", ");
// // //   if (typeof val === "object") {
// // //     if (val.dishes) return Array.isArray(val.dishes) ? val.dishes.join(", ") : String(val.dishes);
// // //     return Object.values(val).join(", ");
// // //   }
// // //   return String(val);
// // // };

// // // const sanitizeDestinationInfo = (info) => {
// // //   return {
// // //     history:   normalizeToString(info.history),
// // //     bestTime:  normalizeToString(info.bestTime),
// // //     food:      normalizeToString(info.food),
// // //     culture:   normalizeToString(info.culture),
// // //     hiddenGem: normalizeToString(info.hiddenGem),
// // //     summary:   normalizeToString(info.summary),
// // //   };
// // // };

// // // // ─── Split text into chunks for TTS ───────────────────────────
// // // const splitIntoChunks = (text, maxLen = 490) => {
// // //   const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g) || [text];
// // //   const chunks = [];
// // //   let current = "";
// // //   for (const sentence of sentences) {
// // //     if ((current + sentence).length <= maxLen) {
// // //       current += sentence;
// // //     } else {
// // //       if (current.trim()) chunks.push(current.trim());
// // //       if (sentence.length > maxLen) {
// // //         const words = sentence.split(" ");
// // //         let wordChunk = "";
// // //         for (const word of words) {
// // //           if ((wordChunk + " " + word).length <= maxLen) {
// // //             wordChunk += (wordChunk ? " " : "") + word;
// // //           } else {
// // //             if (wordChunk) chunks.push(wordChunk.trim());
// // //             wordChunk = word;
// // //           }
// // //         }
// // //         current = wordChunk;
// // //       } else {
// // //         current = sentence;
// // //       }
// // //     }
// // //   }
// // //   if (current.trim()) chunks.push(current.trim());
// // //   return chunks.filter(Boolean);
// // // };

// // // // ─── 🌞 Chunked Translation (Fixes the 1000 char limit) ──────
// // // const translateText = async (text, targetLang) => {
// // //   if (targetLang === "en-IN" || !text) return text;

// // //   try {
// // //     console.log(`🌐 Translating text to ${targetLang}...`);

// // //     const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g) || [text];
// // //     const translatedChunks = [];
// // //     let currentChunk = "";

// // //     for (const sentence of sentences) {
// // //       if ((currentChunk + sentence).length < 900) {
// // //         currentChunk += sentence;
// // //       } else {
// // //         if (currentChunk) {
// // //           const res = await axios.post(
// // //             "https://api.sarvam.ai/translate",
// // //             {
// // //               input: currentChunk,
// // //               source_language_code: "en-IN",
// // //               target_language_code: targetLang,
// // //               speaker_gender: "Female"
// // //             },
// // //             {
// // //               headers: {
// // //                 "api-subscription-key": SARVAM_API_KEY,
// // //                 "Content-Type": "application/json"
// // //               }
// // //             }
// // //           );
// // //           translatedChunks.push(res.data.translated_text || currentChunk);
// // //         }
// // //         currentChunk = sentence;
// // //       }
// // //     }

// // //     if (currentChunk) {
// // //       const res = await axios.post(
// // //         "https://api.sarvam.ai/translate",
// // //         {
// // //           input: currentChunk,
// // //           source_language_code: "en-IN",
// // //           target_language_code: targetLang,
// // //           speaker_gender: "Female"
// // //         },
// // //         {
// // //           headers: {
// // //             "api-subscription-key": SARVAM_API_KEY,
// // //             "Content-Type": "application/json"
// // //           }
// // //         }
// // //       );
// // //       translatedChunks.push(res.data.translated_text || currentChunk);
// // //     }

// // //     return translatedChunks.join(" ");
// // //   } catch (err) {
// // //     console.error("Translation Error:", err.response?.data || err.message);
// // //     return text;
// // //   }
// // // };

// // // // ─── 🔊 TTS Generator ─────────────────────────────────────────
// // // const generateSarvamAudio = async (text, language = "en-IN", speaker = "meera") => {
// // //   const chunks = splitIntoChunks(text, 490);
// // //   console.log(`🔊 TTS: ${chunks.length} chunk(s) for ${language}`);

// // //   const audioSegments = [];
// // //   for (let i = 0; i < chunks.length; i++) {
// // //     const chunk = chunks[i];
// // //     const ttsRes = await axios.post(
// // //       "https://api.sarvam.ai/text-to-speech",
// // //       {
// // //         inputs: [chunk],
// // //         target_language_code: language,
// // //         speaker_id: speaker
// // //       },
// // //       { headers: { "api-subscription-key": SARVAM_API_KEY, "Content-Type": "application/json" } }
// // //     );
// // //     audioSegments.push(ttsRes.data.audios[0]);
// // //   }
// // //   return audioSegments;
// // // };

// // // // ═══════════════════════════════════════════════════════════════
// // // // ✅  HEALTH CHECK
// // // // ═══════════════════════════════════════════════════════════════
// // // app.get("/api/health", (_req, res) => {
// // //   res.json({ success: true, message: "TravioX API is running ✈️", timestamp: new Date().toISOString() });
// // // });

// // // // ====================== 📰 NEWS ======================
// // // app.get("/api/startup-news", async (req, res) => {
// // //   const userQuery = req.query.q || "Travel";

// // //   try {
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
// // //           "x-rapidapi-key":  RAPID_API_KEY,
// // //           "x-rapidapi-host": "real-time-news-data.p.rapidapi.com"
// // //         },
// // //         timeout: 10000
// // //       }
// // //     );

// // //     const formattedNews = (response.data.data || []).map((item) => ({
// // //       title:          item.title,
// // //       summary:        item.snippet || item.summary || "No summary available",
// // //       link:           item.link,
// // //       published_date: item.published_datetime_utc || "",
// // //       image_url:      item.photo_url || item.thumbnail || "https://via.placeholder.com/400x200"
// // //     }));

// // //     res.json({ success: true, results: formattedNews });
// // //   } catch (err) {
// // //     handleError(res, 500, "News fetch failed", err.message);
// // //   }
// // // });

// // // // ═══════════════════════════════════════════════════════════════
// // // // 🧳  SMART PACKING LIST
// // // // ═══════════════════════════════════════════════════════════════
// // // app.post("/api/smart-packing", async (req, res) => {
// // //   const {
// // //     destination,
// // //     tripType       = "Leisure",
// // //     duration       = 5,
// // //     gender         = "Unspecified",
// // //     luggageType    = "Backpack",
// // //     specialActivities = [],
// // //   } = req.body;

// // //   if (!destination) return res.status(400).json({ success: false, error: "Destination is required" });

// // //   try {
// // //     const activitiesStr = specialActivities.length > 0 ? specialActivities.join(", ") : "None";

// // //     const prompt = `You are a geo-climate travel expert. Analyze the EXACT location of "${destination}" — altitude, proximity to equator, micro-climate, season.
// // // Trip: ${tripType} | ${duration} days | Gender: ${gender} | Luggage: ${luggageType} | Activities: ${activitiesStr}
// // //  ${tripType === "Family" ? "⚠️ MANDATORY: Include a 'Kids & Baby Essentials' (icon: '🍼') category." : ""}
// // // Return STRICT JSON:
// // // {
// // //   "weather_summary": "Exact climate analysis for ${destination} right now",
// // //   "categories": [
// // //     {
// // //       "name": "Layering & Clothing",
// // //       "icon": "🧥",
// // //       "items": [{"item": "Specific item + quantity", "essential": true, "reason": "Why needed here"}]
// // //     },
// // //     {"name": "Footwear",              "icon": "🥾", "items": []},
// // //     {"name": "Toiletries & Health",   "icon": "🧴", "items": []},
// // //     {"name": "Electronics",           "icon": "🔌", "items": []},
// // //     {"name": "Documents & Essentials","icon": "📄", "items": []},
// // //     {"name": "Location-Specific Gear","icon": "🎒", "items": []}
// // //   ],
// // //   "pro_tips": ["Hyper-specific tip for ${destination}"]
// // // }`;

// // //     const completion = await groq.chat.completions.create({
// // //       messages: [
// // //         { role: "system", content: "Return valid JSON only. No markdown." },
// // //         { role: "user", content: prompt },
// // //       ],
// // //       model: "llama-3.3-70b-versatile",
// // //       response_format: { type: "json_object" },
// // //       temperature: 0.4,
// // //       max_tokens: 2500,
// // //     });

// // //     let packingData = JSON.parse(completion.choices[0].message.content);

// // //     if (tripType === "Family") {
// // //       const has = packingData.categories.some(
// // //         (c) => c.name.toLowerCase().includes("kid") || c.name.toLowerCase().includes("baby")
// // //       );
// // //       if (!has) {
// // //         packingData.categories.push({
// // //           name: "Kids & Baby Essentials",
// // //           icon: "🍼",
// // //           items: [
// // //             { item: "Diapers & Wet Wipes", essential: true, reason: "Absolute necessity for infant travel" },
// // //             { item: "Ready-to-eat Baby Food/Snacks", essential: true, reason: "Avoid hunger meltdowns on the go" },
// // //             { item: "Portable Baby Carrier / Stroller", essential: false, reason: "Explore hands-free" },
// // //           ],
// // //         });
// // //       }
// // //     }

// // //     res.json({ success: true, data: packingData });
// // //   } catch (err) {
// // //     res.status(500).json({ success: false, error: "Failed to generate packing list", details: err.message });
// // //   }
// // // });

// // // // ═══════════════════════════════════════════════════════════════
// // // // 🗺️  DESTINATION INFO + LANGUAGE AUDIO
// // // // ═══════════════════════════════════════════════════════════════
// // // app.post("/api/destination-info", async (req, res) => {
// // //   const { city, language = 'en-IN' } = req.body;
// // //   if (!city) return handleError(res, 400, "City is required");

// // //   try {
// // //     console.log(`🤖 Generating info for: ${city} (Audio: ${language})`);

// // //     const prompt = `You are an expert travel guide. Generate a rich, engaging travel summary for ${city}, India.
// // // Return STRICT JSON with these exact fields, ALL values must be plain strings:
// // // {
// // //   "history":    "3 sentences covering origin, historical significance.",
// // //   "bestTime":   "Which months/season and exactly why.",
// // //   "food":       "Name exactly 3 must-try local dishes as a comma-separated string.",
// // //   "culture":    "2 sentences on local traditions.",
// // //   "hiddenGem":  "One underrated spot.",
// // //   "summary":    "A vivid 4-sentence overview."
// // // }`;

// // //     const completion = await groq.chat.completions.create({
// // //       messages: [{ role: "user", content: prompt }],
// // //       model: "llama-3.3-70b-versatile",
// // //       response_format: { type: "json_object" },
// // //       temperature: 0.7,
// // //     });

// // //     const rawInfo = JSON.parse(completion.choices[0].message.content);
// // //     const infoData = sanitizeDestinationInfo(rawInfo);

// // //     let narrationScript = [
// // //       `Welcome to ${city}.`,
// // //       infoData.summary,
// // //       `A little history. ${infoData.history}`,
// // //       `The best time to visit is ${infoData.bestTime}.`,
// // //       `When it comes to food, you must try ${infoData.food}.`,
// // //       `On the cultural side, ${infoData.culture}`,
// // //       `Here is a hidden gem most tourists miss: ${infoData.hiddenGem}`,
// // //       `We hope you enjoy your journey to ${city}. Safe travels!`,
// // //     ].join(" ");

// // //     if (language !== 'en-IN') {
// // //       narrationScript = await translateText(narrationScript, language);
// // //     }

// // //     const audioSegments = await generateSarvamAudio(narrationScript, language);

// // //     res.json({
// // //       success: true,
// // //       data: {
// // //         info: infoData,
// // //         audioSegments,
// // //         audioBase64: audioSegments[0],
// // //         generatedLanguage: language
// // //       },
// // //     });
// // //   } catch (err) {
// // //     console.error("Destination Info Error:", err.response?.data || err.message);
// // //     handleError(res, 500, "Failed to generate destination info", err.message);
// // //   }
// // // });

// // // // ═══════════════════════════════════════════════════════════════
// // // // 🔊  TEXT-TO-SPEECH (Direct)
// // // // ═══════════════════════════════════════════════════════════════
// // // app.post("/api/text-to-speech", async (req, res) => {
// // //   const { prompt, text, language = "en-IN", speaker = "meera" } = req.body;

// // //   try {
// // //     let finalText = text;

// // //     if (!finalText && prompt) {
// // //       const completion = await groq.chat.completions.create({
// // //         messages: [
// // //           { role: "system", content: "You are a helpful travel assistant. Keep responses under 400 words." },
// // //           { role: "user", content: prompt },
// // //         ],
// // //         model: "llama-3.3-70b-versatile",
// // //         temperature: 0.7,
// // //         max_tokens: 500,
// // //       });
// // //       finalText = completion.choices[0].message.content;
// // //     }

// // //     if (!finalText) return handleError(res, 400, "Either 'text' or 'prompt' is required");
// // //     finalText = normalizeToString(finalText);

// // //     const audioSegments = await generateSarvamAudio(finalText, language, speaker);

// // //     res.json({
// // //       success: true,
// // //       audioSegments,
// // //       audioBase64: audioSegments[0],
// // //       textUsed: finalText,
// // //       totalChunks: audioSegments.length,
// // //     });
// // //   } catch (err) {
// // //     handleError(res, 500, "Failed to generate speech", err.response?.data || err.message);
// // //   }
// // // });

// // // // ═══════════════════════════════════════════════════════════════
// // // // 💰  AI BUDGET PLANNER
// // // // ═══════════════════════════════════════════════════════════════
// // // app.post("/api/ai-budget", async (req, res) => {
// // //   const { city, travelers = 2, days = 5, tripVibe = "Mid-range" } = req.body;
// // //   if (!city) return handleError(res, 400, "City name is required");

// // //   try {
// // //     const prompt = `Create a detailed day-by-day travel budget for ${city}, India.
// // // Travelers: ${travelers} | Days: ${days} | Style: ${tripVibe} | Date: April 2026.
// // // Return STRICT JSON:
// // // {
// // //   "dailyPlan": [
// // //     {
// // //       "day": 1,
// // //       "title": "Day theme title",
// // //       "activities": [{"item": "Activity name", "cost": 500}],
// // //       "accommodation": 2000,
// // //       "food": 800,
// // //       "transport": 400
// // //     }
// // //   ],
// // //   "summary": {
// // //     "stayTotal": 0, "foodTotal": 0, "transportTotal": 0,
// // //     "activitiesTotal": 0, "miscellaneous": 0, "grandTotal": 0
// // //   },
// // //   "expertAdvice": "3 money-saving tips specific to ${city}",
// // //   "bestDeals": ["deal1", "deal2", "deal3"]
// // // }`;

// // //     const completion = await groq.chat.completions.create({
// // //       messages: [{ role: "system", content: "Return JSON only." }, { role: "user", content: prompt }],
// // //       model: "llama-3.3-70b-versatile",
// // //       response_format: { type: "json_object" },
// // //       temperature: 0.6,
// // //     });

// // //     const aiData = JSON.parse(completion.choices[0].message.content);
// // //     res.json({
// // //       success: true,
// // //       data: { ...aiData, averageDailyBudget: Math.round(aiData.summary.grandTotal / days) },
// // //     });
// // //   } catch (err) {
// // //     handleError(res, 500, "Failed to generate budget", err.message);
// // //   }
// // // });

// // // // ═══════════════════════════════════════════════════════════════
// // // // 📋  AI ITINERARY PLANNER
// // // // ═══════════════════════════════════════════════════════════════
// // // app.post("/api/ai-planner", async (req, res) => {
// // //   const { city, days = 5, tripVibe = "Balanced" } = req.body;
// // //   if (!city) return handleError(res, 400, "City is required");

// // //   try {
// // //     const prompt = `Create a detailed ${days}-day travel itinerary for ${city}, India. Vibe: ${tripVibe}.
// // // Return JSON:
// // // {
// // //   "itinerary": [
// // //     {
// // //       "day": 1,
// // //       "theme": "Day theme",
// // //       "activities": [
// // //         {"time": "Morning", "task": "Place", "description": "Detail", "tips": "Tip"},
// // //         {"time": "Afternoon", "task": "Place", "description": "Detail", "tips": "Tip"},
// // //         {"time": "Evening", "task": "Place", "description": "Detail", "tips": "Tip"}
// // //       ]
// // //     }
// // //   ],
// // //   "travel_tips": ["tip1", "tip2"],
// // //   "must_try_experiences": ["exp1", "exp2"]
// // // }`;

// // //     const completion = await groq.chat.completions.create({
// // //       messages: [{ role: "user", content: prompt }],
// // //       model: "llama-3.3-70b-versatile",
// // //       response_format: { type: "json_object" },
// // //       temperature: 0.5,
// // //       max_tokens: 3000,
// // //     });

// // //     res.json({ success: true, data: JSON.parse(completion.choices[0].message.content) });
// // //   } catch (err) {
// // //     handleError(res, 500, "AI Planner failed", err.message);
// // //   }
// // // });

// // // // ═══════════════════════════════════════════════════════════════
// // // // 🤖  AI CHAT
// // // // ═══════════════════════════════════════════════════════════════
// // // app.post("/api/ai-chat", async (req, res) => {
// // //   const { message, history = [] } = req.body;
// // //   if (!message) return handleError(res, 400, "Message is required");

// // //   try {
// // //     const messages = [
// // //       { role: "system", content: "You are TravioX, an expert Indian travel assistant." },
// // //       ...history.slice(-10),
// // //       { role: "user", content: message },
// // //     ];

// // //     const completion = await groq.chat.completions.create({
// // //       messages,
// // //       model: "llama-3.3-70b-versatile",
// // //       temperature: 0.7,
// // //       max_tokens: 500,
// // //     });

// // //     res.json({ success: true, reply: completion.choices[0].message.content });
// // //   } catch (err) {
// // //     handleError(res, 500, "AI Chat failed", err.message);
// // //   }
// // // });

// // // // ═══════════════════════════════════════════════════════════════
// // // // 📷  PHOTOS (Unsplash)
// // // // ═══════════════════════════════════════════════════════════════
// // // app.get("/api/photos", async (req, res) => {
// // //   const query = req.query.q;

// // //   if (!query || query.trim() === "") {
// // //     return res.status(400).json({ success: false, error: "Query parameter 'q' is required" });
// // //   }

// // //   try {
// // //     const response = await axios.get("https://api.unsplash.com/search/photos", {
// // //       params: {
// // //         query: query.trim(),
// // //         per_page: 8,
// // //         client_id: UNSPLASH_ACCESS_KEY
// // //       },
// // //     });
// // //     res.json({
// // //       success: true,
// // //       photos: response.data.results.map(img => ({
// // //         id: img.id,
// // //         url: img.urls.regular,
// // //         thumb: img.urls.thumb,
// // //         description: img.alt_description || "",
// // //         credit: img.user.name
// // //       }))
// // //     });
// // //   } catch (err) {
// // //     console.error("Unsplash Error:", err.response?.data || err.message);
// // //     handleError(res, 500, "Failed to fetch images", err.message);
// // //   }
// // // });

// // // // ====================== ✈️ FLIGHTS ======================
// // // app.get("/api/flights", async (req, res) => {
// // //   let { departure_id = "BOM", arrival_id = "DEL" } = req.query;

// // //   if (!departure_id || !arrival_id || departure_id.length !== 3 || arrival_id.length !== 3) {
// // //     return res.status(400).json({
// // //       success: false,
// // //       error: "Please use valid 3-letter airport codes (e.g., BOM, DEL)"
// // //     });
// // //   }

// // //   const today = new Date();
// // //   const nextMonth = new Date();
// // //   nextMonth.setDate(today.getDate() + 30);
// // //   const travelDate = nextMonth.toISOString().split('T')[0];

// // //   console.log(`[FLIGHTS] Searching: ${departure_id} -> ${arrival_id} on ${travelDate}`);

// // //   try {
// // //     const response = await axios.get("https://serpapi.com/search", {
// // //       params: {
// // //         engine: "google_flights",
// // //         departure_id: departure_id.toUpperCase(),
// // //         arrival_id: arrival_id.toUpperCase(),
// // //         outbound_date: travelDate,
// // //         type: "2",
// // //         currency: "INR",
// // //         hl: "en",
// // //         gl: "us",
// // //         api_key: SERPAPI_KEY
// // //       },
// // //       timeout: 15000
// // //     });

// // //     const results = [
// // //       ...(response.data.best_flights || []),
// // //       ...(response.data.other_flights || [])
// // //     ];

// // //     if (results.length === 0) {
// // //       return res.json({ success: true, flights: [], message: "No flights found." });
// // //     }

// // //     const formatted = results.slice(0, 10).map((f) => {
// // //       const leg = f.flights[0];
// // //       return {
// // //         airline: leg.airline,
// // //         logo: leg.airline_logo,
// // //         flight_number: leg.flight_number,
// // //         departure: leg.departure_airport.id,
// // //         departure_name: leg.departure_airport.name,
// // //         arrival: leg.arrival_airport.id,
// // //         arrival_name: leg.arrival_airport.name,
// // //         departure_time: leg.departure_airport.time.split(" ")[1],
// // //         arrival_time: leg.arrival_airport.time.split(" ")[1],
// // //         duration: f.total_duration,
// // //         status: f.type || "Available",
// // //         url: `https://www.google.com/travel/flights?q=flights%20from%20${departure_id}%20to%20${arrival_id}%20on%20${travelDate}`
// // //       };
// // //     });

// // //     res.json({ success: true, flights: formatted });

// // //   } catch (err) {
// // //     console.error("❌ SerpAPI Error:", err.response?.data || err.message);
// // //     const status = err.response?.status || 500;
// // //     const message = err.response?.data?.error || "Flight search failed";

// // //     res.status(status).json({ success: false, error: message });
// // //   }
// // // });

// // // // ═══════════════════════════════════════════════════════════════
// // // // 📖  TRAVEL MEMORY BUILDER
// // // // ═══════════════════════════════════════════════════════════════
// // // app.post("/api/travel-memory-builder", async (req, res) => {
// // //   const { moments } = req.body;

// // //   if (!moments || moments.length < 2) {
// // //     return res.status(400).json({ success: false, error: "Provide at least 2 moments" });
// // //   }

// // //   try {
// // //     const scenePromises = moments.map((m, i) => {
// // //       const cleanBase64 = m.image_base64.replace(/^data:image\/\w+;base64,/, "");
// // //       return groq.chat.completions.create({
// // //         messages: [{
// // //           role: "user",
// // //           content: [
// // //             { type: "text", text: `Look at this travel photo. Traveler's note: "${m.user_note}". Return JSON: {"mood":"One word","mood_emoji":"emoji","scene_description":"1 sentence"}` },
// // //             { type: "image_url", image_url: { url: `data:image/jpeg;base64,${cleanBase64}` } },
// // //           ],
// // //         }],
// // //         model: "meta-llama/llama-4-scout-17b-16e-instruct",
// // //         response_format: { type: "json_object" },
// // //         temperature: 0.4,
// // //         max_tokens: 80,
// // //       }).then((r) => ({ index: i, user_note: m.user_note, ...JSON.parse(r.choices[0].message.content) }));
// // //     });

// // //     const scenes = (await Promise.allSettled(scenePromises))
// // //       .filter((r) => r.status === "fulfilled")
// // //       .map((r) => r.value);

// // //     const storyPrompt = `Create a beautiful travel diary from these moments: ${JSON.stringify(scenes)}.
// // // Return JSON:
// // // {
// // //   "trip_title": "4-6 word evocative title",
// // //   "travel_story": "5-7 paragraph story weaving the traveler's notes and scene descriptions naturally.",
// // //   "timeline": [{"moment_index": 0, "social_caption": "Instagram caption with 3 hashtags"}],
// // //   "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
// // //   "highlight_quote": "One unforgettable line from the trip"
// // // }`;

// // //     const storyRes = await groq.chat.completions.create({
// // //       messages: [
// // //         { role: "system", content: "Return JSON only." },
// // //         { role: "user", content: storyPrompt },
// // //       ],
// // //       model: "llama-3.3-70b-versatile",
// // //       response_format: { type: "json_object" },
// // //       temperature: 0.7,
// // //       max_tokens: 2500,
// // //     });

// // //     const finalData = JSON.parse(storyRes.choices[0].message.content);
// // //     const timeline  = scenes.map((s, i) => ({
// // //       ...s,
// // //       social_caption: finalData.timeline?.find((t) => t.moment_index === i)?.social_caption || "Beautiful moment ✨",
// // //     }));

// // //     res.json({ success: true, data: { ...finalData, timeline, created_at: new Date().toISOString() } });
// // //   } catch (err) {
// // //     res.status(500).json({ success: false, error: "Memory builder failed", details: err.message });
// // //   }
// // // });

// // // // ═══════════════════════════════════════════════════════════════
// // // // 🎬  CREATOMATE VIDEO GENERATOR
// // // // ═══════════════════════════════════════════════════════════════
// // // app.post("/api/generate-video", async (req, res) => {
// // //   const { imageUrls, captions } = req.body;

// // //   if (!imageUrls || imageUrls.length < 2) {
// // //     return res.status(400).json({ success: false, error: "Provide at least 2 image URLs" });
// // //   }

// // //   try {
// // //     const modifications = {};
// // //     imageUrls.slice(0, 4).forEach((url, i) => {
// // //       modifications[`Background-${i + 1}.source`] = url;
// // //     });
// // //     if (captions?.length > 0) {
// // //       captions.slice(0, 4).forEach((caption, i) => {
// // //         modifications[`Text-${i + 1}.text`] = caption.substring(0, 150);
// // //       });
// // //     }

// // //     console.log("🎬 Calling Creatomate API...");
// // //     const response = await axios.post(
// // //       "https://api.creatomate.com/v2/renders",
// // //       { template_id: CREATOMATE_TEMPLATE_ID, modifications },
// // //       {
// // //         headers: { Authorization: `Bearer ${CREATOMATE_API_KEY}`, "Content-Type": "application/json" },
// // //         timeout: 120000,
// // //       }
// // //     );

// // //     const videoUrl = response.data?.url || response.data?.[0]?.url;
// // //     if (videoUrl) {
// // //       console.log("✅ Video Generated:", videoUrl);
// // //       res.json({ success: true, videoUrl });
// // //     } else {
// // //       throw new Error("Could not get video URL from Creatomate response");
// // //     }
// // //   } catch (err) {
// // //     console.error("Video Error:", err.response?.data || err.message);
// // //     res.status(500).json({ success: false, error: "Failed to generate video", details: err.message });
// // //   }
// // // });

// // // // ═══════════════════════════════════════════════════════════════
// // // // 🏨  HOTELS
// // // // ═══════════════════════════════════════════════════════════════
// // // app.get("/api/hotels", async (req, res) => {
// // //   const { q = "Mumbai" } = req.query;

// // //   try {
// // //     const response = await axios.get("https://serpapi.com/search", {
// // //       params: {
// // //         engine: "google_hotels",
// // //         q: `${q} hotels`,
// // //         check_in_date:  getFormattedDate(1),
// // //         check_out_date: getFormattedDate(3),
// // //         api_key:  SERPAPI_KEY,
// // //         currency: "INR",
// // //         gl: "in"
// // //       },
// // //       timeout: 15000
// // //     });

// // //     const hotels = (response.data.properties || []).slice(0, 8).map((h) => ({
// // //       name:      h.name,
// // //       rating:    h.overall_rating || "N/A",
// // //       price:     h.rate_per_night?.lowest || "N/A",
// // //       thumbnail: h.images?.[0]?.thumbnail || "https://via.placeholder.com/300",
// // //       link:      h.link || "#"
// // //     }));

// // //     res.json({ success: true, hotels });
// // //   } catch (err) {
// // //     handleError(res, 500, "Hotel search failed", err.message);
// // //   }
// // // });

// // // // ═══════════════════════════════════════════════════════════════
// // // // 🚀  START SERVER
// // // // ═══════════════════════════════════════════════════════════════
// // // app.listen(PORT, () => {
// // //   console.log(`\n✈️  TravioX Server running on port ${PORT}`);
// // //   console.log(`   Environment: ${process.env.NODE_ENV || "development"}`);
// // //   console.log(`   Health: http://localhost:${PORT}/api/health\n`);
// // // });











// dddd
require("dotenv").config(); // ← MUST BE FIRST LINE
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const Groq = require("groq-sdk");

const app = express();
const PORT = process.env.PORT || 3000;

// ═══════════════════════════════════════════════════════════════
// 🔑  API KEYS — Loaded from .env
// ═══════════════════════════════════════════════════════════════
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const SERPAPI_KEY = process.env.SERPAPI_KEY;
const RAPID_API_KEY = process.env.RAPID_API_KEY;
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const SARVAM_API_KEY = process.env.SARVAM_API_KEY;
const CREATOMATE_API_KEY = process.env.CREATOMATE_API_KEY;
const CREATOMATE_TEMPLATE_ID = process.env.CREATOMATE_TEMPLATE_ID;
const GEOAPIFY_KEY = process.env.GEOAPIFY_KEY;

// ─── Validate all keys at startup ─────────────────────────────
const REQUIRED_KEYS = [
  "GROQ_API_KEY",
  "SERPAPI_KEY",
  "RAPID_API_KEY",
  "UNSPLASH_ACCESS_KEY",
  "SARVAM_API_KEY",
  "CREATOMATE_API_KEY",
  "CREATOMATE_TEMPLATE_ID",
  "GEOAPIFY_KEY",
];
const missingKeys = REQUIRED_KEYS.filter((k) => !process.env[k]);
if (missingKeys.length > 0) {
  console.error(
    `\n❌ Missing environment variables:\n   ${missingKeys.join("\n   ")}\n`
  );
  console.error("💡 Copy .env.example to .env and fill in your keys.\n");
  process.exit(1);
}

const groq = new Groq({ apiKey: GROQ_API_KEY });

// ═══════════════════════════════════════════════════════════════
// ⚙️  MIDDLEWARE
// ═══════════════════════════════════════════════════════════════
app.use(cors());
app.use(express.json({ limit: "10mb" }));
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
  res.status(statusCode).json({ success: false, error: message });
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
  if (targetLang === "en-IN" || !text) return text;
  try {
    console.log(`🌐 Translating text to ${targetLang}...`);
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
        }
      );
      translatedChunks.push(res.data.translated_text || currentChunk);
    }
    return translatedChunks.join(" ");
  } catch (err) {
    console.error("Translation Error:", err.response?.data || err.message);
    return text;
  }
};

const generateSarvamAudio = async (
  text,
  language = "en-IN",
  speaker = "meera"
) => {
  const chunks = splitIntoChunks(text, 490);
  console.log(`🔊 TTS: ${chunks.length} chunk(s) for ${language}`);
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
      }
    );
    audioSegments.push(ttsRes.data.audios[0]);
  }
  return audioSegments;
};

// ═══════════════════════════════════════════════════════════════
// ✅  HEALTH CHECK
// ═══════════════════════════════════════════════════════════════
app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "TravioX API is running ✈️",
    timestamp: new Date().toISOString(),
  });
});

// ═══════════════════════════════════════════════════════════════
// 🗺️  LIVE MAP — GEOCODE SEARCH (via Geoapify, proxied)
// ═══════════════════════════════════════════════════════════════
/**
 * POST /api/live-map/geocode
 * Body: { query: "Taj Mahal, Agra" }
 * Returns: { success, result: { latitude, longitude, label } }
 */
app.post("/api/live-map/geocode", async (req, res) => {
  const { query } = req.body;
  if (!query || !query.trim()) {
    return handleError(res, 400, "query is required");
  }
  try {
    const response = await axios.get(
      "https://api.geoapify.com/v1/geocode/search",
      {
        params: {
          text: query.trim(),
          apiKey: GEOAPIFY_KEY,
          limit: 1,
          format: "json",
        },
        timeout: 8000,
      }
    );

    const results = response.data?.results;
    if (!results || results.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Location not found" });
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
    console.error("Geocode Error:", err.response?.data || err.message);
    handleError(res, 500, "Geocoding failed", err.message);
  }
});

// ─────────────────────────────────────────────────────────────
/**
 * POST /api/live-map/route
 * Body: { startLat, startLon, endLat, endLon, mode? }
 * Returns: { success, route: { coordinates[], distance_km, duration_min } }
 */
app.post("/api/live-map/route", async (req, res) => {
  const { startLat, startLon, endLat, endLon, mode = "drive" } = req.body;

  if (!startLat || !startLon || !endLat || !endLon) {
    return handleError(
      res,
      400,
      "startLat, startLon, endLat, endLon are all required"
    );
  }

  const validModes = ["drive", "walk", "bicycle", "transit"];
  const routeMode = validModes.includes(mode) ? mode : "drive";

  try {
    const url = `https://api.geoapify.com/v1/routing`;
    const response = await axios.get(url, {
      params: {
        waypoints: `${startLat},${startLon}|${endLat},${endLon}`,
        mode: routeMode,
        apiKey: GEOAPIFY_KEY,
        format: "json",
      },
      timeout: 10000,
    });

    const features = response.data?.features;
    if (!features || features.length === 0) {
      return res.status(404).json({ success: false, error: "No route found" });
    }

    const feature = features[0];
    const props = feature.properties;

    // Flatten all coordinate arrays from the geometry
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
    console.error("Route Error:", err.response?.data || err.message);
    handleError(res, 500, "Route calculation failed", err.message);
  }
});

// ─────────────────────────────────────────────────────────────
/**
 * GET /api/live-map/reverse?lat=XX&lon=YY
 * Returns: { success, label }  (human-readable address for a coordinate)
 */
app.get("/api/live-map/reverse", async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) return handleError(res, 400, "lat and lon are required");

  try {
    const response = await axios.get(
      "https://api.geoapify.com/v1/geocode/reverse",
      {
        params: { lat, lon, apiKey: GEOAPIFY_KEY, format: "json" },
        timeout: 6000,
      }
    );

    const results = response.data?.results;
    const label =
      results?.[0]?.formatted || `${parseFloat(lat).toFixed(4)}, ${parseFloat(lon).toFixed(4)}`;

    res.json({ success: true, label });
  } catch (err) {
    console.error("Reverse Geocode Error:", err.message);
    handleError(res, 500, "Reverse geocoding failed", err.message);
  }
});

// ═══════════════════════════════════════════════════════════════
// 📰  NEWS
// ═══════════════════════════════════════════════════════════════
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
          lang: "en",
        },
        headers: {
          "x-rapidapi-key": RAPID_API_KEY,
          "x-rapidapi-host": "real-time-news-data.p.rapidapi.com",
        },
        timeout: 10000,
      }
    );
    const formattedNews = (response.data.data || []).map((item) => ({
      title: item.title,
      summary: item.snippet || item.summary || "No summary available",
      link: item.link,
      published_date: item.published_datetime_utc || "",
      image_url:
        item.photo_url ||
        item.thumbnail ||
        "https://via.placeholder.com/400x200",
    }));
    res.json({ success: true, results: formattedNews });
  } catch (err) {
    handleError(res, 500, "News fetch failed", err.message);
  }
});

// ═══════════════════════════════════════════════════════════════
// 🧳  SMART PACKING LIST
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
  if (!destination)
    return res
      .status(400)
      .json({ success: false, error: "Destination is required" });
  try {
    const activitiesStr =
      specialActivities.length > 0 ? specialActivities.join(", ") : "None";
    const prompt = `You are a geo-climate travel expert. Analyze the EXACT location of "${destination}" — altitude, proximity to equator, micro-climate, season.
Trip: ${tripType} | ${duration} days | Gender: ${gender} | Luggage: ${luggageType} | Activities: ${activitiesStr}
 ${
   tripType === "Family"
     ? "⚠️ MANDATORY: Include a 'Kids & Baby Essentials' (icon: '🍼') category."
     : ""
 }
Return STRICT JSON:
{
  "weather_summary": "Exact climate analysis for ${destination} right now",
  "categories": [
    {
      "name": "Layering & Clothing",
      "icon": "🧥",
      "items": [{"item": "Specific item + quantity", "essential": true, "reason": "Why needed here"}]
    },
    {"name": "Footwear",              "icon": "🥾", "items": []},
    {"name": "Toiletries & Health",   "icon": "🧴", "items": []},
    {"name": "Electronics",           "icon": "🔌", "items": []},
    {"name": "Documents & Essentials","icon": "📄", "items": []},
    {"name": "Location-Specific Gear","icon": "🎒", "items": []}
  ],
  "pro_tips": ["Hyper-specific tip for ${destination}"]
}`;
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "Return valid JSON only. No markdown." },
        { role: "user", content: prompt },
      ],
      model: "openai/gpt-oss-120b",
      response_format: { type: "json_object" },
      temperature: 0.4,
      max_tokens: 2500,
    });
    let packingData = JSON.parse(completion.choices[0].message.content);
    if (tripType === "Family") {
      const has = packingData.categories.some(
        (c) =>
          c.name.toLowerCase().includes("kid") ||
          c.name.toLowerCase().includes("baby")
      );
      if (!has) {
        packingData.categories.push({
          name: "Kids & Baby Essentials",
          icon: "🍼",
          items: [
            {
              item: "Diapers & Wet Wipes",
              essential: true,
              reason: "Absolute necessity for infant travel",
            },
            {
              item: "Ready-to-eat Baby Food/Snacks",
              essential: true,
              reason: "Avoid hunger meltdowns on the go",
            },
            {
              item: "Portable Baby Carrier / Stroller",
              essential: false,
              reason: "Explore hands-free",
            },
          ],
        });
      }
    }
    res.json({ success: true, data: packingData });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Failed to generate packing list",
      details: err.message,
    });
  }
});

// ═══════════════════════════════════════════════════════════════
// 🗺️  DESTINATION INFO + LANGUAGE AUDIO
// ═══════════════════════════════════════════════════════════════
app.post("/api/destination-info", async (req, res) => {
  const { city, language = "en-IN" } = req.body;
  if (!city) return handleError(res, 400, "City is required");
  try {
    console.log(`🤖 Generating info for: ${city} (Audio: ${language})`);
    const prompt = `You are an expert travel guide. Generate a rich, engaging travel summary for ${city}, India.
Return STRICT JSON with these exact fields, ALL values must be plain strings:
{
  "history":    "3 sentences covering origin, historical significance.",
  "bestTime":   "Which months/season and exactly why.",
  "food":       "Name exactly 3 must-try local dishes as a comma-separated string.",
  "culture":    "2 sentences on local traditions.",
  "hiddenGem":  "One underrated spot.",
  "summary":    "A vivid 4-sentence overview."
}`;
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "openai/gpt-oss-120b",
      response_format: { type: "json_object" },
      temperature: 0.7,
    });
    const rawInfo = JSON.parse(completion.choices[0].message.content);
    const infoData = sanitizeDestinationInfo(rawInfo);
    let narrationScript = [
      `Welcome to ${city}.`,
      infoData.summary,
      `A little history. ${infoData.history}`,
      `The best time to visit is ${infoData.bestTime}.`,
      `When it comes to food, you must try ${infoData.food}.`,
      `On the cultural side, ${infoData.culture}`,
      `Here is a hidden gem most tourists miss: ${infoData.hiddenGem}`,
      `We hope you enjoy your journey to ${city}. Safe travels!`,
    ].join(" ");
    if (language !== "en-IN") {
      narrationScript = await translateText(narrationScript, language);
    }
    const audioSegments = await generateSarvamAudio(narrationScript, language);
    res.json({
      success: true,
      data: {
        info: infoData,
        audioSegments,
        audioBase64: audioSegments[0],
        generatedLanguage: language,
      },
    });
  } catch (err) {
    console.error("Destination Info Error:", err.response?.data || err.message);
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
    if (!finalText && prompt) {
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You are a helpful travel assistant. Keep responses under 400 words.",
          },
          { role: "user", content: prompt },
        ],
        model: "openai/gpt-oss-120b",
        temperature: 0.7,
        max_tokens: 500,
      });
      finalText = completion.choices[0].message.content;
    }
    if (!finalText)
      return handleError(res, 400, "Either 'text' or 'prompt' is required");
    finalText = normalizeToString(finalText);
    const audioSegments = await generateSarvamAudio(finalText, language, speaker);
    res.json({
      success: true,
      audioSegments,
      audioBase64: audioSegments[0],
      textUsed: finalText,
      totalChunks: audioSegments.length,
    });
  } catch (err) {
    handleError(
      res,
      500,
      "Failed to generate speech",
      err.response?.data || err.message
    );
  }
});

// ═══════════════════════════════════════════════════════════════
// 💰  AI BUDGET PLANNER
// ═══════════════════════════════════════════════════════════════
app.post("/api/ai-budget", async (req, res) => {
  const { city, travelers = 2, days = 5, tripVibe = "Mid-range" } = req.body;
  if (!city) return handleError(res, 400, "City name is required");
  try {
    const prompt = `Create a detailed day-by-day travel budget for ${city}, India.
Travelers: ${travelers} | Days: ${days} | Style: ${tripVibe} | Date: April 2026.
Return STRICT JSON:
{
  "dailyPlan": [
    {
      "day": 1,
      "title": "Day theme title",
      "activities": [{"item": "Activity name", "cost": 500}],
      "accommodation": 2000,
      "food": 800,
      "transport": 400
    }
  ],
  "summary": {
    "stayTotal": 0, "foodTotal": 0, "transportTotal": 0,
    "activitiesTotal": 0, "miscellaneous": 0, "grandTotal": 0
  },
  "expertAdvice": "3 money-saving tips specific to ${city}",
  "bestDeals": ["deal1", "deal2", "deal3"]
}`;
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "Return JSON only." },
        { role: "user", content: prompt },
      ],
      model: "openai/gpt-oss-120b",
      response_format: { type: "json_object" },
      temperature: 0.6,
    });
    const aiData = JSON.parse(completion.choices[0].message.content);
    res.json({
      success: true,
      data: {
        ...aiData,
        averageDailyBudget: Math.round(aiData.summary.grandTotal / days),
      },
    });
  } catch (err) {
    handleError(res, 500, "Failed to generate budget", err.message);
  }
});

// ═══════════════════════════════════════════════════════════════
// 📋  AI ITINERARY PLANNER
// ═══════════════════════════════════════════════════════════════
app.post("/api/ai-planner", async (req, res) => {
  const { city, days = 5, tripVibe = "Balanced" } = req.body;
  if (!city) return handleError(res, 400, "City is required");
  try {
    const prompt = `Create a detailed ${days}-day travel itinerary for ${city}, India. Vibe: ${tripVibe}.
Return JSON:
{
  "itinerary": [
    {
      "day": 1,
      "theme": "Day theme",
      "activities": [
        {"time": "Morning", "task": "Place", "description": "Detail", "tips": "Tip"},
        {"time": "Afternoon", "task": "Place", "description": "Detail", "tips": "Tip"},
        {"time": "Evening", "task": "Place", "description": "Detail", "tips": "Tip"}
      ]
    }
  ],
  "travel_tips": ["tip1", "tip2"],
  "must_try_experiences": ["exp1", "exp2"]
}`;
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "openai/gpt-oss-120b",
      response_format: { type: "json_object" },
      temperature: 0.5,
      max_tokens: 3000,
    });
    res.json({
      success: true,
      data: JSON.parse(completion.choices[0].message.content),
    });
  } catch (err) {
    handleError(res, 500, "AI Planner failed", err.message);
  }
});

// ═══════════════════════════════════════════════════════════════
// 🤖  AI CHAT
// ═══════════════════════════════════════════════════════════════
app.post("/api/ai-chat", async (req, res) => {
  const { message, history = [] } = req.body;
  if (!message) return handleError(res, 400, "Message is required");
  try {
    const messages = [
      {
        role: "system",
        content: "You are TravioX, an expert Indian travel assistant.",
      },
      ...history.slice(-10),
      { role: "user", content: message },
    ];
    const completion = await groq.chat.completions.create({
      messages,
      model: "openai/gpt-oss-120b",
      temperature: 0.7,
      max_tokens: 500,
    });
    res.json({
      success: true,
      reply: completion.choices[0].message.content,
    });
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
    return res
      .status(400)
      .json({ success: false, error: "Query parameter 'q' is required" });
  }
  try {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: { query: query.trim(), per_page: 8, client_id: UNSPLASH_ACCESS_KEY },
    });
    res.json({
      success: true,
      photos: response.data.results.map((img) => ({
        id: img.id,
        url: img.urls.regular,
        thumb: img.urls.thumb,
        description: img.alt_description || "",
        credit: img.user.name,
      })),
    });
  } catch (err) {
    console.error("Unsplash Error:", err.response?.data || err.message);
    handleError(res, 500, "Failed to fetch images", err.message);
  }
});

// ═══════════════════════════════════════════════════════════════
// ✈️  FLIGHTS
// ═══════════════════════════════════════════════════════════════
app.get("/api/flights", async (req, res) => {
  let { departure_id = "BOM", arrival_id = "DEL" } = req.query;
  if (
    !departure_id ||
    !arrival_id ||
    departure_id.length !== 3 ||
    arrival_id.length !== 3
  ) {
    return res.status(400).json({
      success: false,
      error: "Please use valid 3-letter airport codes (e.g., BOM, DEL)",
    });
  }
  const today = new Date();
  const nextMonth = new Date();
  nextMonth.setDate(today.getDate() + 30);
  const travelDate = nextMonth.toISOString().split("T")[0];
  console.log(
    `[FLIGHTS] Searching: ${departure_id} -> ${arrival_id} on ${travelDate}`
  );
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
      timeout: 15000,
    });
    const results = [
      ...(response.data.best_flights || []),
      ...(response.data.other_flights || []),
    ];
    if (results.length === 0) {
      return res.json({
        success: true,
        flights: [],
        message: "No flights found.",
      });
    }
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
        status: f.type || "Available",
        url: `https://www.google.com/travel/flights?q=flights%20from%20${departure_id}%20to%20${arrival_id}%20on%20${travelDate}`,
      };
    });
    res.json({ success: true, flights: formatted });
  } catch (err) {
    console.error("❌ SerpAPI Error:", err.response?.data || err.message);
    const status = err.response?.status || 500;
    const message = err.response?.data?.error || "Flight search failed";
    res.status(status).json({ success: false, error: message });
  }
});

// ═══════════════════════════════════════════════════════════════
// 📖  TRAVEL MEMORY BUILDER
// ═══════════════════════════════════════════════════════════════
app.post("/api/travel-memory-builder", async (req, res) => {
  const { moments } = req.body;
  if (!moments || moments.length < 2) {
    return res
      .status(400)
      .json({ success: false, error: "Provide at least 2 moments" });
  }
  try {
    const scenePromises = moments.map((m, i) => {
      const cleanBase64 = m.image_base64.replace(/^data:image\/\w+;base64,/, "");
      return groq.chat.completions
        .create({
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: `Look at this travel photo. Traveler's note: "${m.user_note}". Return JSON: {"mood":"One word","mood_emoji":"emoji","scene_description":"1 sentence"}`,
                },
                {
                  type: "image_url",
                  image_url: { url: `data:image/jpeg;base64,${cleanBase64}` },
                },
              ],
            },
          ],
          model: "meta-llama/llama-4-scout-17b-16e-instruct",
          response_format: { type: "json_object" },
          temperature: 0.4,
          max_tokens: 80,
        })
        .then((r) => ({
          index: i,
          user_note: m.user_note,
          ...JSON.parse(r.choices[0].message.content),
        }));
    });
    const scenes = (await Promise.allSettled(scenePromises))
      .filter((r) => r.status === "fulfilled")
      .map((r) => r.value);
    const storyPrompt = `Create a beautiful travel diary from these moments: ${JSON.stringify(scenes)}.
Return JSON:
{
  "trip_title": "4-6 word evocative title",
  "travel_story": "5-7 paragraph story weaving the traveler's notes and scene descriptions naturally.",
  "timeline": [{"moment_index": 0, "social_caption": "Instagram caption with 3 hashtags"}],
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "highlight_quote": "One unforgettable line from the trip"
}`;
    const storyRes = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "Return JSON only." },
        { role: "user", content: storyPrompt },
      ],
      model: "openai/gpt-oss-120b",
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 2500,
    });
    const finalData = JSON.parse(storyRes.choices[0].message.content);
    const timeline = scenes.map((s, i) => ({
      ...s,
      social_caption:
        finalData.timeline?.find((t) => t.moment_index === i)
          ?.social_caption || "Beautiful moment ✨",
    }));
    res.json({
      success: true,
      data: { ...finalData, timeline, created_at: new Date().toISOString() },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Memory builder failed",
      details: err.message,
    });
  }
});

// ═══════════════════════════════════════════════════════════════
// 🎬  CREATOMATE VIDEO GENERATOR
// ═══════════════════════════════════════════════════════════════
app.post("/api/generate-video", async (req, res) => {
  const { imageUrls, captions } = req.body;
  if (!imageUrls || imageUrls.length < 2) {
    return res
      .status(400)
      .json({ success: false, error: "Provide at least 2 image URLs" });
  }
  try {
    const modifications = {};
    imageUrls.slice(0, 4).forEach((url, i) => {
      modifications[`Background-${i + 1}.source`] = url;
    });
    if (captions?.length > 0) {
      captions.slice(0, 4).forEach((caption, i) => {
        modifications[`Text-${i + 1}.text`] = caption.substring(0, 150);
      });
    }
    console.log("🎬 Calling Creatomate API...");
    const response = await axios.post(
      "https://api.creatomate.com/v2/renders",
      { template_id: CREATOMATE_TEMPLATE_ID, modifications },
      {
        headers: {
          Authorization: `Bearer ${CREATOMATE_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 120000,
      }
    );
    const videoUrl = response.data?.url || response.data?.[0]?.url;
    if (videoUrl) {
      console.log("✅ Video Generated:", videoUrl);
      res.json({ success: true, videoUrl });
    } else {
      throw new Error("Could not get video URL from Creatomate response");
    }
  } catch (err) {
    console.error("Video Error:", err.response?.data || err.message);
    res
      .status(500)
      .json({
        success: false,
        error: "Failed to generate video",
        details: err.message,
      });
  }
});

// ═══════════════════════════════════════════════════════════════
// 🏨  HOTELS
// ═══════════════════════════════════════════════════════════════
app.get("/api/hotels", async (req, res) => {
  const { q = "Mumbai" } = req.query;
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
      timeout: 15000,
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
// 🚀  START SERVER
// ═══════════════════════════════════════════════════════════════
app.listen(PORT, () => {
  console.log(`\n✈️  TravioX Server running on port ${PORT}`);
  console.log(`   Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`   Health: http://localhost:${PORT}/api/health\n`);
  console.log(`   Live Map Endpoints:`);
  console.log(`     POST /api/live-map/geocode`);
  console.log(`     POST /api/live-map/route`);
  console.log(`     GET  /api/live-map/reverse\n`);
});























