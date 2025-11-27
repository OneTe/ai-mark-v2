import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini AI client
// Note: In a real production environment, ensure process.env.API_KEY is properly set.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || 'YOUR_API_KEY' });

export const generateTagsForImage = async (
  promptText: string,
  modelName: string = 'gemini-2.5-flash'
): Promise<string> => {
  try {
    // Determine the model to use based on selection or default
    const model = modelName;

    // Simulate an image input for now as we don't have a real file upload in this mock service call
    // In a real app, we would pass base64 image data.
    // Here we will just use text to test the prompt logic if no image is actually provided in the context of this specific function call demo.
    // However, to strictly follow the prompt testing scenario:
    
    const response = await ai.models.generateContent({
      model: model,
      contents: promptText, // In a real scenario, this would include the image part
    });

    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export const testPromptWithMock = async (prompt: string, model: string): Promise<string> => {
    // This is a mock function to simulate API delay and response if no key is present or for UI testing
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`[Mock Gemini Response for model ${model}]\nBased on the prompt: "${prompt.substring(0, 20)}..."\n\nDetected Tags: urban, skyscraper, sunny, traffic, pedestrians, modern architecture.`);
        }, 1500);
    });
}
