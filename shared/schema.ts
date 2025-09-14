import { sql, relations } from 'drizzle-orm';
import {
  index,
  sqliteTable,
  text,
  integer,
  real,
} from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = sqliteTable(
  "sessions",
  {
    sid: text("sid").primaryKey(),
    sess: text("sess").notNull(),
    expire: integer("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const users = sqliteTable("users", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  email: text("email").unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  profileImageUrl: text("profile_image_url"),
  createdAt: integer("created_at").$defaultFn(() => Date.now()),
  updatedAt: integer("updated_at").$defaultFn(() => Date.now()),
  // Additional fields for education platform
  currentClass: text("current_class"), // 10, 12, Graduate
  interests: text("interests"), // JSON string of interest areas
  assessmentCompleted: integer("assessment_completed", { mode: 'boolean' }).default(false),
});

export const colleges = sqliteTable("colleges", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  location: text("location").notNull(),
  state: text("state").notNull(),
  city: text("city").notNull(),
  type: text("type").notNull(), // Government, Private, etc.
  courses: text("courses"), // JSON string of available courses
  facilities: text("facilities"), // JSON string of facilities
  cutoffs: text("cutoffs"), // JSON string of course-wise cutoff marks
  fees: text("fees"), // JSON string of course-wise fee structure
  website: text("website"),
  phone: text("phone"),
  email: text("email"),
  latitude: real("latitude"),
  longitude: real("longitude"),
  createdAt: integer("created_at").$defaultFn(() => Date.now()),
});

export const assessmentQuestions = sqliteTable("assessment_questions", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  category: text("category").notNull(), // aptitude, interest, personality
  question: text("question").notNull(),
  options: text("options").notNull(), // JSON string of options with weights
  stream: text("stream"), // science, commerce, arts, vocational
  createdAt: integer("created_at").$defaultFn(() => Date.now()),
});

export const userAssessments = sqliteTable("user_assessments", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id").notNull().references(() => users.id),
  questionId: text("question_id").notNull().references(() => assessmentQuestions.id),
  answer: text("answer").notNull(),
  completedAt: integer("completed_at").$defaultFn(() => Date.now()),
});

export const careerPaths = sqliteTable("career_paths", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  degree: text("degree").notNull(), // B.A., B.Sc., B.Com., etc.
  stream: text("stream").notNull(), // Arts, Science, Commerce
  careerTitle: text("career_title").notNull(),
  description: text("description"),
  salaryRange: text("salary_range"),
  growthProspects: text("growth_prospects"),
  requiredSkills: text("required_skills"), // JSON string
  industryAreas: text("industry_areas"), // JSON string
  higherEducationPaths: text("higher_education_paths"), // JSON string
  governmentJobs: text("government_jobs"), // JSON string
  privateJobs: text("private_jobs"), // JSON string
  entrepreneurialOptions: text("entrepreneurial_options"), // JSON string
  createdAt: integer("created_at").$defaultFn(() => Date.now()),
});

export const timelineEvents = sqliteTable("timeline_events", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  description: text("description"),
  eventDate: integer("event_date").notNull(),
  type: text("type").notNull(), // admission, scholarship, exam, counseling
  registrationStart: integer("registration_start"),
  registrationEnd: integer("registration_end"),
  eligibility: text("eligibility"),
  website: text("website"),
  isActive: integer("is_active", { mode: 'boolean' }).default(true),
  createdAt: integer("created_at").$defaultFn(() => Date.now()),
});

export const userRecommendations = sqliteTable("user_recommendations", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id").notNull().references(() => users.id),
  recommendationType: text("recommendation_type").notNull(), // stream, college, career
  recommendedItem: text("recommended_item").notNull(),
  confidence: real("confidence"),
  reasoning: text("reasoning"),
  aiModel: text("ai_model"), // gpt-5
  createdAt: integer("created_at").$defaultFn(() => Date.now()),
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
