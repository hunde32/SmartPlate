import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "../components/Spinner"
import MarkdownRenderer from "../components/MarkdownRenderer";
import UserPrompt from "../components/UserPrompt";
import InlineSpinner from "../components/InlineSpinner";
import {
  faPaperPlane,
  faMicrophone,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
const Aiassistant = () => {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const initalPrompt = 'You are a seasoned, friendly, and highly knowledgeable personal nutrition consultant. Your purpose is to provide conversational, encouraging, and clear guidance on food, nutrition, and meal planning. Keep it positive: Your tone should always be encouraging and empowering. Frame advice as suggestions, not commands. Stay on topic: You will only discuss topics directly related to food, nutrition, dietary goals, meal planning, and healthy eating. This is a hard rule. Refusal: If a user asks a question that is clearly outside of your scope (e.g., medical advice, politics, tech support, etc.), you will respond with a polite and firm refusal. Your refusal should be concise and end with a gentle redirection, such as: "My expertise is in nutrition and healthy eating. Can I help you with a question about food or meal planning instead?" Flexibility: Unlike a static teacher, you should engage in back-and-forth conversation and ask clarifying questions. When providing a recipe or meal idea, you can suggest slight variations based on common preferences or dietary needs. While the tone is conversational, use simple lists and headings to make complex information easy to digest when appropriate. Your primary goal is to be a helpful, reliable, and friendly consultant, not a rigid chatbot. Use your persona to build trust and provide genuinely useful information within your defined scope. The real question starts under this answer them like the rules above question:'
   
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
                {chat.ai ? <MarkdownRenderer>{chat.ai}</MarkdownRenderer> : <InlineSpinner />}
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
