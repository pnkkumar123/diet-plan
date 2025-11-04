"use server"
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { calories, preferences } = await req.json();

  const prompt = `
You are an expert AI nutritionist. Create a one-day meal plan that totals EXACTLY ${calories} calories (within ±20 calories maximum).

Rules:
- Include 4–5 meals: Breakfast, Lunch, Dinner, and 1–2 Snacks.
- Each meal must have:
  - "name"
  - "items" (array of 2–4 food names)
  - "totalCalories" (integer)
- Distribute calories sensibly:
  - Breakfast ~25%
  - Lunch ~30%
  - Dinner ~30%
  - Snacks ~15%
- Consider user preferences: ${preferences || "none"}.
- Ensure that totalCalories = sum of all meal.totalCalories and the difference must NOT exceed 20.
- Adjust portion sizes slightly if necessary to meet the exact target.

Return ONLY valid JSON (no markdown, no text outside JSON), formatted like this:
{
  "meals": [
    { "name": "Breakfast", "items": ["Oats", "Berries"], "totalCalories": 480 },
    { "name": "Lunch", "items": ["Chicken", "Rice"], "totalCalories": 600 },
    { "name": "Dinner", "items": ["Salmon", "Quinoa"], "totalCalories": 700 },
    { "name": "Snack", "items": ["Yogurt", "Nuts"], "totalCalories": 220 }
  ],
  "totalCalories": 2000
}
`;


    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.7,
      messages: [{ role: "user", content: prompt }],
    });

    // Extract content safely
    const raw = completion.choices[0].message?.content ?? "";

    // GPT sometimes adds markdown or text → extract JSON only
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) {
      throw new Error("No valid JSON found in model response");
    }

    const mealPlan = JSON.parse(match[0]);
    return NextResponse.json(mealPlan);
  } catch (err: any) {
    console.error("❌ Error generating meal plan:", err);
    return NextResponse.json(
      { error: "Failed to generate meal plan", details: err.message },
      { status: 500 }
    );
  }
}
