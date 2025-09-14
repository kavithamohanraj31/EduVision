import { sql, relations } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  integer,
  boolean,
  decimal,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  // Additional fields for education platform
  currentClass: varchar("current_class"), // 10, 12, Graduate
  interests: text("interests").array(), // Array of interest areas
  assessmentCompleted: boolean("assessment_completed").default(false),
});

export const colleges = pgTable("colleges", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  location: varchar("location").notNull(),
  state: varchar("state").notNull(),
  city: varchar("city").notNull(),
  type: varchar("type").notNull(), // Government, Private, etc.
  courses: text("courses").array(), // Array of available courses
  facilities: text("facilities").array(), // Array of facilities
  cutoffs: jsonb("cutoffs"), // Course-wise cutoff marks
  fees: jsonb("fees"), // Course-wise fee structure
  website: varchar("website"),
  phone: varchar("phone"),
  email: varchar("email"),
  latitude: decimal("latitude"),
  longitude: decimal("longitude"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const assessmentQuestions = pgTable("assessment_questions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  category: varchar("category").notNull(), // aptitude, interest, personality
  question: text("question").notNull(),
  options: jsonb("options").notNull(), // Array of options with weights
  stream: varchar("stream"), // science, commerce, arts, vocational
  createdAt: timestamp("created_at").defaultNow(),
});

export const userAssessments = pgTable("user_assessments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  questionId: varchar("question_id").notNull().references(() => assessmentQuestions.id),
  answer: varchar("answer").notNull(),
  completedAt: timestamp("completed_at").defaultNow(),
});

export const careerPaths = pgTable("career_paths", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  degree: varchar("degree").notNull(), // B.A., B.Sc., B.Com., etc.
  stream: varchar("stream").notNull(), // Arts, Science, Commerce
  careerTitle: varchar("career_title").notNull(),
  description: text("description"),
  salaryRange: varchar("salary_range"),
  growthProspects: text("growth_prospects"),
  requiredSkills: text("required_skills").array(),
  industryAreas: text("industry_areas").array(),
  higherEducationPaths: text("higher_education_paths").array(),
  governmentJobs: text("government_jobs").array(),
  privateJobs: text("private_jobs").array(),
  entrepreneurialOptions: text("entrepreneurial_options").array(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const timelineEvents = pgTable("timeline_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title").notNull(),
  description: text("description"),
  eventDate: timestamp("event_date").notNull(),
  type: varchar("type").notNull(), // admission, scholarship, exam, counseling
  registrationStart: timestamp("registration_start"),
  registrationEnd: timestamp("registration_end"),
  eligibility: text("eligibility"),
  website: varchar("website"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const userRecommendations = pgTable("user_recommendations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  recommendationType: varchar("recommendation_type").notNull(), // stream, college, career
  recommendedItem: varchar("recommended_item").notNull(),
  confidence: decimal("confidence", { precision: 3, scale: 2 }),
  reasoning: text("reasoning"),
  aiModel: varchar("ai_model"), // gpt-5
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  assessments: many(userAssessments),
  recommendations: many(userRecommendations),
}));

export const assessmentQuestionsRelations = relations(assessmentQuestions, ({ many }) => ({
  userAnswers: many(userAssessments),
}));

export const userAssessmentsRelations = relations(userAssessments, ({ one }) => ({
  user: one(users, {
    fields: [userAssessments.userId],
    references: [users.id],
  }),
  question: one(assessmentQuestions, {
    fields: [userAssessments.questionId],
    references: [assessmentQuestions.id],
  }),
}));

export const userRecommendationsRelations = relations(userRecommendations, ({ one }) => ({
  user: one(users, {
    fields: [userRecommendations.userId],
    references: [users.id],
  }),
}));

// Export types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export type InsertCollege = typeof colleges.$inferInsert;
export type College = typeof colleges.$inferSelect;

export type InsertAssessmentQuestion = typeof assessmentQuestions.$inferInsert;
export type AssessmentQuestion = typeof assessmentQuestions.$inferSelect;

export type InsertUserAssessment = typeof userAssessments.$inferInsert;
export type UserAssessment = typeof userAssessments.$inferSelect;

export type InsertCareerPath = typeof careerPaths.$inferInsert;
export type CareerPath = typeof careerPaths.$inferSelect;

export type InsertTimelineEvent = typeof timelineEvents.$inferInsert;
export type TimelineEvent = typeof timelineEvents.$inferSelect;

export type InsertUserRecommendation = typeof userRecommendations.$inferInsert;
export type UserRecommendation = typeof userRecommendations.$inferSelect;

// Zod schemas
export const insertCollegeSchema = createInsertSchema(colleges);
export const insertAssessmentQuestionSchema = createInsertSchema(assessmentQuestions);
export const insertUserAssessmentSchema = createInsertSchema(userAssessments);
export const insertCareerPathSchema = createInsertSchema(careerPaths);
export const insertTimelineEventSchema = createInsertSchema(timelineEvents);
export const insertUserRecommendationSchema = createInsertSchema(userRecommendations);
