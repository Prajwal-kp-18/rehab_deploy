"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
interface DietPlan {
  focus: string;
  keyNutrients: string[];
  foodsToLimit: string[];
  mealPlan: {
    breakfast: { option: string }[];
    lunch: { option: string }[];
    dinner: { option: string }[];
    snacks: { option: string }[];
  };
  importantConsiderations: Record<string, string>;
}
export default function Diet() {
  const [diet, setDiet] = useState<DietPlan| null>(null);
  const searchParams = useSearchParams(); 

  const disease = searchParams.get("disease") || ""; 
  const responsesString = searchParams.get("responses");

  let responses = {};
  try {
    responses = responsesString ? JSON.parse(decodeURIComponent(responsesString)) : {};
  } catch (error) {
    console.error("Error parsing responses:", error);
  }


  useEffect(() => {
    const fetchDiet = async () => {


      try {
        const res = await fetch("http://127.0.0.1:8000/diet", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ disease, responses }),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const result=await res.json();
        console.log("API Response:", result); 

        if (result.diet_plan) {
          const cleanedDietPlan = result.diet_plan.replace(/^```json\n|\n```$/g, "");
          console.log("Cleaned Diet Plan:", cleanedDietPlan); 
        
          const parsedDiet: DietPlan = JSON.parse(cleanedDietPlan);
          setDiet(parsedDiet);
        } else {
          console.error("Invalid response format: No diet_plan found");
        }
        

      } catch (error) {
        console.error("Error fetching diet plan:", error);
      } 
    };

    if (disease) fetchDiet();
  }, []);

  return (
    <div className="p-4">
    <h2 className="text-lg font-bold">Diet Chart</h2>

    {diet ? (
      <div>
        {/* Focus */}
        <h3 className="text-md font-semibold">Focus</h3>
        <p>{diet.focus || "No focus information available."}</p>

        {/* Key Nutrients */}
        <h3 className="text-md font-semibold mt-2">Key Nutrients</h3>
        <ul className="list-disc pl-4">
          {diet.keyNutrients?.length ? (
            diet.keyNutrients.map((nutrient, index) => <li key={index}>{nutrient}</li>)
          ) : (
            <li>No key nutrients available</li>
          )}
        </ul>

        {/* Foods to Limit */}
        <h3 className="text-md font-semibold mt-2">Foods to Limit</h3>
        <ul className="list-disc pl-4">
          {diet.foodsToLimit?.length ? (
            diet.foodsToLimit.map((food, index) => <li key={index}>{food}</li>)
          ) : (
            <li>No foods to limit available</li>
          )}
        </ul>

        {/* Meal Plan */}
        <h3 className="text-md font-semibold mt-2">Meal Plan</h3>
        {diet.mealPlan &&
          Object.entries(diet.mealPlan).map(([mealType, options]) => (
            <div key={mealType} className="mt-2">
              <h4 className="text-sm font-bold capitalize">{mealType}</h4>
              <ul className="list-disc pl-4">
                {options.length ? (
                  options.map(({ option }, index) => <li key={index}>{option}</li>)
                ) : (
                  <li>No options available</li>
                )}
              </ul>
            </div>
          ))}

        {/* Important Considerations */}
        <h3 className="text-md font-semibold mt-2">Important Considerations</h3>
        <ul className="list-disc pl-4">
          {diet.importantConsiderations &&
            Object.entries(diet.importantConsiderations).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
        </ul>
      </div>
    ) : (
      <p>Loading diet plan...</p>
    )}
  </div>
  );
  
};

