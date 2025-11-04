// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   const { question } = await req.json();

//   console.log("🧠 Incoming question:", question);

// const systemPrompt = `
// You are an AI math tutor teaching like in a classroom.
// You always explain the concept clearly AND provide corresponding whiteboard drawing steps.

// Your response MUST be valid JSON in this format:
// {
//   "answer": "A classroom-style spoken explanation for the student",
//   "annotations": [
//     { "op": "drawText", "x": 10, "y": 10, "text": "a² + b² = c²" },
//     { "op": "drawLine", "points": [{"x":10,"y":90},{"x":90,"y":90}] },
//     { "op": "drawText", "x": 50, "y": 95, "text": "a" },
//     { "op": "drawLine", "points": [{"x":90,"y":90},{"x":90,"y":30}] },
//     { "op": "drawText", "x": 95, "y": 60, "text": "b" },
//     { "op": "drawLine", "points": [{"x":10,"y":90},{"x":90,"y":30}] },
//     { "op": "drawText", "x": 40, "y": 50, "text": "c" }
//   ]
// }

// Rules:
// 1. ALWAYS fill both "answer" and "annotations".
// 2. The "answer" should sound like a teacher speaking:
//    - Start simple: "Alright, imagine a right triangle..."
//    - Use conversational tone.
//    - Include real-world examples if relevant.
// 3. The "annotations" are what the teacher would draw while explaining:
//    - Use lines, arrows, labels, formulas.
//    - Use coordinates in range 0–100.
//    - Draw progressively relevant parts (like first the triangle, then the formula, then labels).
// 4. If the concept involves math, geometry, algebra, or physics, always illustrate it.
// 5. Return **only valid JSON** (no markdown, no extra text).

// Examples:

// Question: "Explain Pythagoras theorem"
// →
// {
//   "answer": "Alright, imagine a right-angled triangle. The two shorter sides are a and b, and the longest side is c, called the hypotenuse. The Pythagorean theorem says the area of the square on side c equals the sum of the areas of the squares on sides a and b. This means a² + b² = c².",
//   "annotations": [
//     { "op": "drawLine", "points": [{"x":10,"y":90},{"x":90,"y":90}] },
//     { "op": "drawText", "x": 50, "y": 95, "text": "a" },
//     { "op": "drawLine", "points": [{"x":90,"y":90},{"x":90,"y":30}] },
//     { "op": "drawText", "x": 95, "y": 60, "text": "b" },
//     { "op": "drawLine", "points": [{"x":10,"y":90},{"x":90,"y":30}] },
//     { "op": "drawText", "x": 50, "y": 50, "text": "c" },
//     { "op": "drawText", "x": 20, "y": 20, "text": "a² + b² = c²" }
//   ]
// }

// Question: "Explain area of a circle"
// →
// {
//   "answer": "Let’s visualize a circle with radius r. The area is the space inside the circle, which is π times the square of the radius — written as πr².",
//   "annotations": [
//     { "op": "drawCircle", "center": {"x":50,"y":50}, "radius":40 },
//     { "op": "drawText", "x":50, "y":50, "text": "r" },
//     { "op": "drawText", "x":20, "y":90, "text": "Area = πr²" }
//   ]
// }

// Respond ONLY with JSON, no extra text or formatting.
// `;



//   try {
//     const resp = await fetch("https://api.openai.com/v1/responses", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model: "gpt-4o-mini",
//         temperature: 0.7,
//         input: [
//           { role: "system", content: systemPrompt },
//           { role: "user", content: question },
//         ],
//       }),
//     });

//     const data = await resp.json();

//     console.log("📩 Full OpenAI response object:");
//     console.dir(data, { depth: null });

//     // Extract the text content safely
//     const text =
//       data.output_text ||
//       data.output?.[0]?.content?.[0]?.text ||
//       data.output?.[0]?.content?.text ||
//       JSON.stringify(data, null, 2);

//     console.log("📝 Model text output:");
//     console.log(text);

//     // Try to parse JSON portion
//     const match = text.match(/\{[\s\S]*\}/);
//     let json = { answer: "Here’s the explanation.", annotations: [] };

//     if (match) {
//       try {
//         json = JSON.parse(match[0]);
//         console.log("✅ Parsed JSON:", json);
//       } catch (err) {
//         console.error("❌ JSON parse error:", err);
//       }
//     } else {
//       console.warn("⚠️ No JSON detected in model output.");
//     }

//     return NextResponse.json(json);
//   } catch (error: any) {
//     console.error("🔥 Error in /api/solve:", error);
//     return NextResponse.json(
//       { answer: "Server error", annotations: [] },
//       { status: 500 }
//     );
//   }
// }
