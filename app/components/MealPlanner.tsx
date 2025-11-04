"use client";
import { useState } from "react";
import { UtensilsCrossed, Sparkles, TrendingUp } from "lucide-react";
import MealPlanCard from "./MealPlanCard";

export default function MealPlanner() {
  const [calories, setCalories] = useState("");
  const [preferences, setPreferences] = useState("");
  const [mealPlan, setMealPlan] = useState<any>(null);
  const [loading, setLoading] = useState(false);

async function generatePlan() {
  setLoading(true);
  try {
    const res = await fetch("/api/generateMealPlan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ calories, preferences }),
    });

    const data = await res.json();

    if (data.error) throw new Error(data.error);

    setMealPlan(data);
  } catch (err) {
    console.error("Error generating plan:", err);
    alert("Something went wrong while generating your plan.");
  } finally {
    setLoading(false);
  }
}


  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl mb-6 shadow-lg">
            <UtensilsCrossed className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-3">
            AI Meal Planner
          </h1>
          <p className="text-gray-600 text-lg">
            Personalized nutrition plans powered by intelligence
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-8 border border-white/20">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                Daily Calorie Goal
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="e.g., 2000"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors text-gray-800 text-lg"
                />
                <TrendingUp className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                Dietary Preferences
              </label>
              <input
                type="text"
                placeholder="e.g., vegetarian, gluten-free, Indian"
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors text-gray-800 text-lg"
              />
            </div>

            <button
              onClick={generatePlan}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  Generating Your Plan...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Meal Plan
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results */}
        {mealPlan && (
          <div className="animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Your Personalized Plan</h2>
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-2xl font-bold text-lg shadow-lg">
                {mealPlan.totalCalories} cal/day
              </div>
            </div>
            
            <div className="space-y-4">
              {mealPlan.meals?.map((meal: any, idx: number) => (
                <MealPlanCard key={idx} meal={meal} />
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-500 text-sm">
                💡 Tip: Adjust portions to match your exact calorie goals
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
