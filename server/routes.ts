import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { chatRequestSchema } from "@shared/schema";
import { randomUUID } from "crypto";

export async function registerRoutes(app: Express): Promise<Server> {
  // Chat routes for Shapes AI integration
  
  // Send message to chatbot
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, sessionId, userId } = chatRequestSchema.parse(req.body);
      const finalSessionId = sessionId || randomUUID();

      // Store user message
      await storage.addChatMessage({
        sessionId: finalSessionId,
        userId: userId || null,
        role: "user",
        content: message,
      });

      // Get chat history for context
      const chatHistory = await storage.getChatMessages(finalSessionId);
      
      // Prepare messages for Shapes API with context
      const contextMessage = {
        role: "system" as const,
        content: `You are an AI assistant for Jignesh D. Maru's portfolio website. Jignesh is a passionate web developer from Vadodara, India. He specializes in React, JavaScript, and modern web technologies. He has skills in:

- Web Development: HTML, CSS, JavaScript, React
- Design Tools: Photoshop, Premiere Pro, Canva  
- Office Tools: MS Office, Excel, Tally
- Technical Expertise: Windows, PC Assembly, OBS Studio
- AI & Development: AI Tools, Shapes.inc API, Discord Bots
- Creative Skills: Poster Design, Video Editing, Creative Design

Help visitors learn about Jignesh's work, skills, and experience. Be friendly, professional, and informative about his capabilities and projects.`
      };

      const shapesMessages = [
        contextMessage,
        ...chatHistory.map(msg => ({
          role: msg.role as "user" | "assistant",
          content: msg.content,
        }))
      ];

      // Call Shapes AI API
      const shapesResponse = await fetch("https://api.shapes.inc/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.SHAPESINC_API_KEY}`,
          "Content-Type": "application/json",
          "X-User-Id": userId || "anonymous",
          "X-Channel-Id": finalSessionId,
        },
        body: JSON.stringify({
          model: "shapesinc/zerotwo-darling", // Using your custom Zero Two shape
          messages: shapesMessages,
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!shapesResponse.ok) {
        throw new Error(`Shapes API error: ${shapesResponse.statusText}`);
      }

      const shapesData = await shapesResponse.json();
      const aiResponse = shapesData.choices?.[0]?.message?.content || "I'm sorry, I couldn't process that request.";

      // Store AI response
      await storage.addChatMessage({
        sessionId: finalSessionId,
        userId: userId || null,
        role: "assistant",
        content: aiResponse,
      });

      res.json({
        message: aiResponse,
        sessionId: finalSessionId,
      });

    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({
        error: "Failed to process chat message",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

  // Get chat history
  app.get("/api/chat/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const messages = await storage.getChatMessages(sessionId);
      res.json({ messages });
    } catch (error) {
      console.error("Error fetching chat history:", error);
      res.status(500).json({ error: "Failed to fetch chat history" });
    }
  });

  // Clear chat session
  app.delete("/api/chat/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      await storage.clearChatSession(sessionId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error clearing chat session:", error);
      res.status(500).json({ error: "Failed to clear chat session" });
    }
  });

  // Analytics routes
  app.post("/api/analytics/visit", async (req, res) => {
    try {
      const visitorData = {
        visitorId: req.body.visitorId || randomUUID(),
        ipAddress: req.ip || req.connection.remoteAddress,
        userAgent: req.headers['user-agent'],
        referrer: req.headers['referer'],
        sessionDuration: req.body.sessionDuration,
        pageViews: req.body.pageViews || "1",
      };

      const visitor = await storage.addVisitor(visitorData);
      res.json({ success: true, visitorId: visitor.id });
    } catch (error) {
      console.error("Error tracking visitor:", error);
      res.status(500).json({ error: "Failed to track visitor" });
    }
  });

  app.get("/api/analytics/stats", async (req, res) => {
    try {
      const totalVisitors = await storage.getVisitorCount();
      const todayVisitors = await storage.getTodayVisitors();
      
      res.json({
        totalVisitors,
        todayVisitors,
        onlineNow: Math.floor(Math.random() * 5) + 1, // Simulated for demo
      });
    } catch (error) {
      console.error("Error getting analytics:", error);
      res.status(500).json({ error: "Failed to get analytics" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
