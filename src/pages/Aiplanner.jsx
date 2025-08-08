import React from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai";
const Aiassistant = () => {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const initalPrompt = 'You are a knowledgeable and helpful nutrition teacher. Your purpose is to provide simple, straightforward, and accurate information about food, nutrition, and diet goals. **Persona and Tone:** - You are a nutrition teacher. - Your answers should be simple, clear, and easy to understand. - Do not use overly long, complex, or conversational language. Get straight to the point. - Be encouraging and positive. **Scope and Limitations:** - You will only answer questions directly related to food, nutrition, diet, meal planning, and healthy eating. - If a user asks about any topic outside of this scope (e.g., weather, politics, general knowledge, other health topics, etc.), you will respond with a polite and firm refusal. - Your refusal should be concise and reinforce your purpose. For example, "Im here to help you with your nutrition and diet goals. Please ask me a question about food or healthy eating." **Examples of what to do:** - **User:** "Whats a good source of protein for a vegetarian?" - **Answer:** "Excellent question! Lentils, chickpeas, tofu, and beans are all great sources of protein for a vegetarian diet." - **User:** "How can I eat healthier on a budget?" - **Answer:** "To eat healthier on a budget, focus on buying seasonal produce, cooking at home, and choosing affordable staples like oats, eggs, and frozen vegetables." **Examples of what not to do:** - **User:** "Whats the weather in New York?" - **Answer:** "Im here to assist you with your nutrition and diet goals. Please ask me about food or healthy eating." - **User:** "Can you write me a poem about apples?" - **Answer:** "My expertise is in nutrition. Lets talk about food and diet." -the real question start under this answer them like the rules above question: can u give me the best meal i could make, making avocado and eggs as the main ingredint'
  const run = async (prompt) =>{
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      try{
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      console.log(text)
      return text;
      }catch{
        console.error("API call failed:", error);
        return "Error: Could not get a response from the Gemini API.";
      }
  }
  run()
  return (
    <div className="ai-wrapper">
      <div className="ai-continer">
        <div className="prompt-answer-questions">
          <p className="ai-answer">
            That's a great question! Here are some specific foods packed with
            excellent nutrition: * **Eggs:** A complete protein source, full of
            vitamins and minerals. * **Salmon:** Rich in healthy Omega-3 fats
            and high-quality protein. * **Greek Yogurt:** Excellent for protein
            and probiotics. * **Oats:** A whole grain, great for fiber and
            sustained energy. * **Quinoa:** A complete protein and complex
            carbohydrate, also high in fiber. * **Spinach:** Packed with
            vitamins K, A, and C, and iron. * **Broccoli:** High in fiber,
            vitamin C, and vitamin K. * **Lentils:** A fantastic plant-based
            source of protein and fiber. * **Avocado:** Full of healthy fats,
            fiber, and potassium. * **Blueberries:** Small but mighty, loaded
            with antioxidants.
          </p>
          <p className="user-prompt">What is the best food to eat</p>
        </div>
        <input type="text" placeholder="Plan ur dite" />
      </div>
    </div>
  );
}

export default Aiassistant