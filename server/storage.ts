import { type User, type InsertUser, type ChatMessage, type InsertChatMessage, type Analytics, type InsertAnalytics } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Chat message methods
  getChatMessages(sessionId: string): Promise<ChatMessage[]>;
  addChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  clearChatSession(sessionId: string): Promise<void>;
  
  // Analytics methods
  addVisitor(analytics: InsertAnalytics): Promise<Analytics>;
  getVisitorCount(): Promise<number>;
  getTodayVisitors(): Promise<number>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private chatMessages: Map<string, ChatMessage[]>;
  private analytics: Analytics[] = [];

  constructor() {
    this.users = new Map();
    this.chatMessages = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getChatMessages(sessionId: string): Promise<ChatMessage[]> {
    return this.chatMessages.get(sessionId) || [];
  }

  async addChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = randomUUID();
    const message: ChatMessage = {
      ...insertMessage,
      id,
      userId: insertMessage.userId || null,
      timestamp: new Date(),
    };

    const sessionMessages = this.chatMessages.get(insertMessage.sessionId) || [];
    sessionMessages.push(message);
    this.chatMessages.set(insertMessage.sessionId, sessionMessages);

    return message;
  }

  async clearChatSession(sessionId: string): Promise<void> {
    this.chatMessages.delete(sessionId);
  }

  async addVisitor(insertAnalytics: InsertAnalytics): Promise<Analytics> {
    const id = randomUUID();
    const analytics: Analytics = {
      ...insertAnalytics,
      id,
      ipAddress: insertAnalytics.ipAddress || null,
      userAgent: insertAnalytics.userAgent || null,
      referrer: insertAnalytics.referrer || null,
      sessionDuration: insertAnalytics.sessionDuration || null,
      pageViews: insertAnalytics.pageViews || null,
      timestamp: new Date(),
    };
    this.analytics.push(analytics);
    return analytics;
  }

  async getVisitorCount(): Promise<number> {
    return this.analytics.length;
  }

  async getTodayVisitors(): Promise<number> {
    const today = new Date().toDateString();
    return this.analytics.filter(visitor => 
      visitor.timestamp.toDateString() === today
    ).length;
  }
}

export const storage = new MemStorage();
