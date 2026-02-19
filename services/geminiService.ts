import { GoogleGenAI, Chat } from "@google/genai";
import { RESUME_CONTEXT } from '../constants';

let ai: GoogleGenAI | null = null;
let chatSession: Chat | null = null;

const getAIClient = () => {
  if (!ai && process.env.API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

export const initializeChat = () => {
  const client = getAIClient();
  if (!client) return null;

  chatSession = client.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are the AI portfolio assistant for Finley. 
      Your goal is to answer questions about Finley's work, skills, and experience in a professional yet friendly tone.
      Keep answers concise (under 50 words) unless asked for details.
      Use the following context about Finley:
      ${RESUME_CONTEXT}`,
    },
  });
  return chatSession;
};

export const sendMessageStream = async function* (message: string) {
  if (!chatSession) {
    initializeChat();
  }
  
  if (!chatSession) {
    yield "I'm sorry, I'm not configured correctly (Missing API Key).";
    return;
  }

  try {
    const result = await chatSession.sendMessageStream({ message });
    for await (const chunk of result) {
      const text = chunk.text;
      if (text) {
        yield text;
      }
    }
  } catch (error) {
    console.error("Gemini Error:", error);
    yield "Sorry, I encountered an error processing your request.";
  }
};