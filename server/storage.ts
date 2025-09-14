import {
  users,
  colleges,
  assessmentQuestions,
  userAssessments,
  careerPaths,
  timelineEvents,
  userRecommendations,
  type User,
  type UpsertUser,
  type College,
  type InsertCollege,
  type AssessmentQuestion,
  type InsertAssessmentQuestion,
  type UserAssessment,
  type InsertUserAssessment,
  type CareerPath,
  type InsertCareerPath,
  type TimelineEvent,
  type InsertTimelineEvent,
  type UserRecommendation,
  type InsertUserRecommendation,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, asc, like, inArray, gte, lte } from "drizzle-orm";

export interface IStorage {
  // User operations - mandatory for Replit Auth
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // College operations
  getColleges(filters?: {
    state?: string;
    city?: string;
    courses?: string[];
    limit?: number;
    offset?: number;
  }): Promise<College[]>;
  getCollegeById(id: string): Promise<College | undefined>;
  createCollege(college: InsertCollege): Promise<College>;
  searchCollegesByLocation(location: string, radius?: number): Promise<College[]>;
  
  // Assessment operations
  getAssessmentQuestions(category?: string, stream?: string): Promise<AssessmentQuestion[]>;
  createAssessmentQuestion(question: InsertAssessmentQuestion): Promise<AssessmentQuestion>;
  submitUserAssessment(assessment: InsertUserAssessment): Promise<UserAssessment>;
  getUserAssessments(userId: string): Promise<UserAssessment[]>;
  
  // Career path operations
  getCareerPaths(stream?: string, degree?: string): Promise<CareerPath[]>;
  getCareerPathById(id: string): Promise<CareerPath | undefined>;
  createCareerPath(careerPath: InsertCareerPath): Promise<CareerPath>;
  
  // Timeline operations
  getActiveTimelineEvents(limit?: number): Promise<TimelineEvent[]>;
  getUpcomingEvents(userId?: string): Promise<TimelineEvent[]>;
  createTimelineEvent(event: InsertTimelineEvent): Promise<TimelineEvent>;
  
  // Recommendation operations
  getUserRecommendations(userId: string, type?: string): Promise<UserRecommendation[]>;
  createUserRecommendation(recommendation: InsertUserRecommendation): Promise<UserRecommendation>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    if (!user) return undefined;
    
    // Convert JSON strings back to arrays
    return {
      ...user,
      interests: user.interests ? JSON.parse(user.interests) : [],
    };
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    // Convert arrays to JSON strings for SQLite
    const processedData = {
      ...userData,
      interests: userData.interests ? JSON.stringify(userData.interests) : null,
      updatedAt: Date.now(),
    };

    const [user] = await db
      .insert(users)
      .values(processedData)
      .onConflictDoUpdate({
        target: users.id,
        set: processedData,
      })
      .returning();
    
    // Convert JSON strings back to arrays
    return {
      ...user,
      interests: user.interests ? JSON.parse(user.interests) : [],
    };
  }

  // College operations
  async getColleges(filters?: {
    state?: string;
    city?: string;
    courses?: string[];
    limit?: number;
    offset?: number;
  }): Promise<College[]> {
    let query = db.select().from(colleges);
    
    const conditions = [];
    if (filters?.state) {
      conditions.push(eq(colleges.state, filters.state));
    }
    if (filters?.city) {
      conditions.push(eq(colleges.city, filters.city));
    }
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }
    
    query = query.orderBy(asc(colleges.name));
    
    if (filters?.limit) {
      query = query.limit(filters.limit);
    }
    if (filters?.offset) {
      query = query.offset(filters.offset);
    }
    
    const results = await query;
    
    // Convert JSON strings back to objects/arrays
    return results.map(college => ({
      ...college,
      courses: college.courses ? JSON.parse(college.courses) : [],
      facilities: college.facilities ? JSON.parse(college.facilities) : [],
      cutoffs: college.cutoffs ? JSON.parse(college.cutoffs) : {},
      fees: college.fees ? JSON.parse(college.fees) : {},
    }));
  }

  async getCollegeById(id: string): Promise<College | undefined> {
    const [college] = await db.select().from(colleges).where(eq(colleges.id, id));
    return college;
  }

  async createCollege(college: InsertCollege): Promise<College> {
    // Convert arrays to JSON strings for SQLite
    const processedCollege = {
      ...college,
      courses: college.courses ? JSON.stringify(college.courses) : null,
      facilities: college.facilities ? JSON.stringify(college.facilities) : null,
      cutoffs: college.cutoffs ? JSON.stringify(college.cutoffs) : null,
      fees: college.fees ? JSON.stringify(college.fees) : null,
    };

    const [newCollege] = await db.insert(colleges).values(processedCollege).returning();
    
    // Convert JSON strings back to objects/arrays
    return {
      ...newCollege,
      courses: newCollege.courses ? JSON.parse(newCollege.courses) : [],
      facilities: newCollege.facilities ? JSON.parse(newCollege.facilities) : [],
      cutoffs: newCollege.cutoffs ? JSON.parse(newCollege.cutoffs) : {},
      fees: newCollege.fees ? JSON.parse(newCollege.fees) : {},
    };
  }

  async searchCollegesByLocation(location: string, radius?: number): Promise<College[]> {
    return await db
      .select()
      .from(colleges)
      .where(
        and(
          like(colleges.location, `%${location}%`),
        )
      )
      .orderBy(asc(colleges.name))
      .limit(20);
  }

  // Assessment operations
  async getAssessmentQuestions(category?: string, stream?: string): Promise<AssessmentQuestion[]> {
    let query = db.select().from(assessmentQuestions);
    
    const conditions = [];
    if (category) {
      conditions.push(eq(assessmentQuestions.category, category));
    }
    if (stream) {
      conditions.push(eq(assessmentQuestions.stream, stream));
    }
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }
    
    return await query.orderBy(asc(assessmentQuestions.createdAt));
  }

  async createAssessmentQuestion(question: InsertAssessmentQuestion): Promise<AssessmentQuestion> {
    const [newQuestion] = await db.insert(assessmentQuestions).values(question).returning();
    return newQuestion;
  }

  async submitUserAssessment(assessment: InsertUserAssessment): Promise<UserAssessment> {
    const [newAssessment] = await db.insert(userAssessments).values(assessment).returning();
    return newAssessment;
  }

  async getUserAssessments(userId: string): Promise<UserAssessment[]> {
    return await db
      .select()
      .from(userAssessments)
      .where(eq(userAssessments.userId, userId))
      .orderBy(desc(userAssessments.completedAt));
  }

  // Career path operations
  async getCareerPaths(stream?: string, degree?: string): Promise<CareerPath[]> {
    let query = db.select().from(careerPaths);
    
    const conditions = [];
    if (stream) {
      conditions.push(eq(careerPaths.stream, stream));
    }
    if (degree) {
      conditions.push(eq(careerPaths.degree, degree));
    }
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }
    
    return await query.orderBy(asc(careerPaths.careerTitle));
  }

  async getCareerPathById(id: string): Promise<CareerPath | undefined> {
    const [careerPath] = await db.select().from(careerPaths).where(eq(careerPaths.id, id));
    return careerPath;
  }

  async createCareerPath(careerPath: InsertCareerPath): Promise<CareerPath> {
    const [newCareerPath] = await db.insert(careerPaths).values(careerPath).returning();
    return newCareerPath;
  }

  // Timeline operations
  async getActiveTimelineEvents(limit = 50): Promise<TimelineEvent[]> {
    return await db
      .select()
      .from(timelineEvents)
      .where(eq(timelineEvents.isActive, true))
      .orderBy(asc(timelineEvents.eventDate))
      .limit(limit);
  }

  async getUpcomingEvents(userId?: string): Promise<TimelineEvent[]> {
    const now = new Date();
    return await db
      .select()
      .from(timelineEvents)
      .where(
        and(
          eq(timelineEvents.isActive, true),
          gte(timelineEvents.eventDate, now)
        )
      )
      .orderBy(asc(timelineEvents.eventDate))
      .limit(10);
  }

  async createTimelineEvent(event: InsertTimelineEvent): Promise<TimelineEvent> {
    const [newEvent] = await db.insert(timelineEvents).values(event).returning();
    return newEvent;
  }

  // Recommendation operations
  async getUserRecommendations(userId: string, type?: string): Promise<UserRecommendation[]> {
    let query = db
      .select()
      .from(userRecommendations)
      .where(eq(userRecommendations.userId, userId));
    
    if (type) {
      query = query.where(
        and(
          eq(userRecommendations.userId, userId),
          eq(userRecommendations.recommendationType, type)
        )
      );
    }
    
    return await query.orderBy(desc(userRecommendations.createdAt));
  }

  async createUserRecommendation(recommendation: InsertUserRecommendation): Promise<UserRecommendation> {
    const [newRecommendation] = await db.insert(userRecommendations).values(recommendation).returning();
    return newRecommendation;
  }
}

export const storage = new DatabaseStorage();
