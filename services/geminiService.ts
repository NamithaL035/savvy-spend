import { GoogleGenAI, Type } from "@google/genai";
import { GROCERY_PLANNER_SYSTEM_INSTRUCTION } from '../constants';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;

export interface GroceryItem {
    name: string;
    quantity: string;
    approx_cost: number;
    category: string;
}

export interface GroceryList {
    total_budget: number;
    estimated_total: number;
    items: GroceryItem[];
}

export const getGroceryAdvice = async (query: string): Promise<GroceryList> => {
    if (!apiKey) {
        throw new Error("Missing VITE_GEMINI_API_KEY. Create a .env.local with VITE_GEMINI_API_KEY=your_key.");
    }
    const ai = new GoogleGenAI({ apiKey });
    let rawText = '';
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: query,
            config: {
                systemInstruction: GROCERY_PLANNER_SYSTEM_INSTRUCTION,
                temperature: 0.3,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        total_budget: { type: Type.NUMBER },
                        estimated_total: { type: Type.NUMBER },
                        items: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    name: { type: Type.STRING },
                                    quantity: { type: Type.STRING },
                                    approx_cost: { type: Type.NUMBER },
                                    category: { type: Type.STRING }
                                },
                                required: ['name', 'quantity', 'approx_cost', 'category']
                            }
                        }
                    },
                    required: ['total_budget', 'estimated_total', 'items']
                }
            }
        });
        
        rawText = response.text;
        // The response text is now a guaranteed JSON string due to responseMimeType and responseSchema.
        return JSON.parse(rawText);

    } catch (error) {
        console.error("Error getting advice from Gemini API. Raw text was:", rawText, "Error:", error);
        if (error instanceof Error) {
             throw new Error(`Failed to parse AI response as JSON: ${error.message}`);
        }
        throw new Error("An unexpected error occurred while communicating with the AI.");
    }
};
