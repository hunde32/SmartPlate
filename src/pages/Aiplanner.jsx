import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "../components/Spinner"
import MarkdownRenderer from "../components/MarkdownRenderer";
import UserPrompt from "../components/UserPrompt";
import {
  faPaperPlane,
  faMicrophone,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
const Aiassistant = () => {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const initalPrompt =
    'You are a knowledgeable and helpful nutrition teacher. Your purpose is to provide simple, straightforward, and afaccurate information about food, nutrition, and diet goals. **Persona and Tone:** - You are a nutrition teacher. - Your answers should be simple, clear, and easy to understand. - Do not use overly long, complex, or conversational language. Get straight to the point. - Be encouraging and positive. **Scope and Limitations:** - You will only answer questions directly related to food, nutrition, diet, meal planning, and healthy eating. - If a user asks about any topic outside of this scope (e.g., weather, politics, general knowledge, other health topics, etc.), you will respond with a polite and firm refusal. - Your refusal should be concise and reinforce your purpose. For example, "Im here to help you with your nutrition and diet goals. Please ask me a question about food or healthy eating." **Examples of what to do:** - **User:** "Whats a good source of protein for a vegetarian?" - **Answer:** "Excellent question! Lentils, chickpeas, tofu, and beans are all great sources of protein for a vegetarian diet." **Examples of what not to do:** - **User:** "Whats the weather in New York?" - **Answer:** "Im here to assist you with your nutrition and diet goals. Please ask me about food or healthy eating." -the real question start under this answer them like the rules above question: ';
   
  const [chatHistory, setChatHistory] = useState([]);
  const [userPrompt, setUserPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const run = async (prompt, chatIndex) => {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setChatHistory(prevHistory => {
        const newHistory = [...prevHistory];
        newHistory[chatIndex] = { ...newHistory[chatIndex], ai: text };
        return newHistory;
      });
    } catch (error) {
      console.error("API call failed:", error);
      setChatHistory(prevHistory => {
        const newHistory = [...prevHistory];
        newHistory[chatIndex] = { ...newHistory[chatIndex], ai: "Error: Could not get a response from the Gemini API." };
        return newHistory;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    if (userPrompt.trim() === "") {
      return; 
    }
    
  
    const newChatIndex = chatHistory.length;
    setChatHistory(prevHistory => [
      ...prevHistory,
      { user: userPrompt, ai: null } 
    ]);
    
    setUserPrompt("");
    setIsLoading(true);

    
    run(initalPrompt + userPrompt, newChatIndex);
  };

  return (
    <div className="ai-wrapper">
      <div className="ai-continer">
        <div className="prompt-answer-questions">
          {chatHistory.map((chat, index) => (
            <div key={index}>
              <div className="user-prompt-continer">
                 <UserPrompt text={chat.user} />
              </div>
              <div className="ai-answer-continer">
                <img src="logo.png" alt="logo"/>
                {chat.ai ? <MarkdownRenderer>{chat.ai}</MarkdownRenderer> : <Spinner/>}
              </div>
            </div>
          ))}
        </div>
        <textarea
          name="text"
          id="text"
          placeholder="Ask Smart plate"
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          rows={4}
          cols={10}
        />
        <FontAwesomeIcon
          icon={faPaperPlane}
          className={`send ${isLoading ? 'disabled' : ''}`}
          onClick={handleSend}
        />
        <FontAwesomeIcon icon={faMicrophone} className="mic" />
      </div>
    </div>
  );
};

export default Aiassistant;
