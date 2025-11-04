"use client";
import React from "react";

export default function MealPlanCard({ meal }: { meal: any }) {
  return (
    <div className="p-4 rounded-2xl shadow bg-white mb-4">
      <h3 className="font-semibold text-lg mb-2">{meal.name}</h3>
      <ul className="list-disc ml-6 text-gray-700">
        {meal.items.map((item: string, idx: number) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
      <p className="text-sm text-gray-500 mt-2">
        Total Calories: {meal.totalCalories}
      </p>
    </div>
  );
}
