import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, IndianRupee, Clock, MapPin, Loader2, ChevronRight } from "lucide-react";
import { GoogleGenAI } from "@google/genai";

export default function Planner() {
  const [budget, setBudget] = useState(5000);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<any>(null);

  const handlePlan = async () => {
    setLoading(true);
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not configured");
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Create a detailed Mumbai travel itinerary for a budget of ${budget} INR. 
      Return the response ONLY as a JSON object with the following structure:
      {
        "itinerary": [
          {
            "day": 1,
            "activities": [
              { "time": "09:00 AM", "activity": "Visit Gateway of India", "cost": 0, "location": "Colaba" }
            ]
          }
        ],
        "totalEstimatedCost": number,
        "tips": [string]
      }`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      const text = response.text;
      if (text) {
        setPlan(JSON.parse(text));
      }
    } catch (err) {
      console.error("Planning failed:", err);
      alert("Failed to generate plan. Please check your API key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header className="text-center">
        <h1 className="text-3xl font-extrabold text-text-main tracking-tight">AI Trip Planner</h1>
        <p className="text-text-muted mt-1">Let Gemini craft your perfect Mumbai experience</p>
      </header>

      <div className="panel">
        <h2 className="panel-h2">
          <Sparkles size={18} className="text-accent" />
          Plan Your Trip
        </h2>
        
        <div className="space-y-6">
          <div>
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2 block">
              Daily Budget (INR)
            </span>
            <div className="border-2 border-border p-4 rounded-xl text-3xl font-bold text-accent text-center bg-bg/50">
              ₹ {budget.toLocaleString()}
            </div>
          </div>

          <div className="space-y-4">
            <input
              type="range"
              min="1000"
              max="50000"
              step="500"
              value={budget}
              onChange={(e) => setBudget(+e.target.value)}
              className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-accent"
            />
            
            <button
              onClick={handlePlan}
              disabled={loading}
              className="btn-primary flex items-center justify-center"
            >
              {loading ? (
                <Loader2 className="animate-spin mr-2" size={20} />
              ) : (
                "Generate Itinerary"
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {plan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {plan.itinerary.map((day: any, idx: number) => (
              <div key={idx} className="space-y-5">
                <h2 className="text-xl font-bold flex items-center text-text-main">
                  <div className="w-8 h-8 bg-text-main text-white rounded-lg flex items-center justify-center text-sm mr-3 shadow-sm">
                    {day.day}
                  </div>
                  Day {day.day}
                </h2>
                <div className="space-y-4">
                  {day.activities.map((act: any, i: number) => (
                    <div key={i} className="flex gap-4 group">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-accent mt-2 shadow-[0_0_0_4px_rgba(242,125,38,0.1)]" />
                        {i !== day.activities.length - 1 && <div className="w-px h-full bg-border" />}
                      </div>
                      <div className="flex-1 panel p-5 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-bold text-accent flex items-center bg-accent/5 px-2 py-1 rounded-md">
                            <Clock size={12} className="mr-1" /> {act.time}
                          </span>
                          {act.cost > 0 && (
                            <span className="text-xs font-bold bg-green-50 text-green-700 px-2 py-1 rounded-md">
                              ₹{act.cost}
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold text-text-main text-lg">{act.activity}</h3>
                        {act.location && (
                          <div className="flex items-center text-xs text-text-muted mt-2 font-medium">
                            <MapPin size={12} className="mr-1" /> {act.location}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="bg-text-main text-white p-8 rounded-3xl shadow-xl">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Sparkles size={22} className="mr-3 text-accent" />
                Local Insights
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plan.tips.map((tip: string, i: number) => (
                  <li key={i} className="flex items-start text-sm text-white/80 leading-relaxed">
                    <ChevronRight size={18} className="mr-2 text-accent shrink-0 mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

