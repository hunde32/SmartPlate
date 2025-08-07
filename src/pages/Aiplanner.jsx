import React from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai";
const Aiassistant = () => {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
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
  run("does this gemini api remember old texts")
  return (
    <div>

    </div>
  )
}

export default Aiassistant