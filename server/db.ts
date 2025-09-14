import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from "@shared/schema";
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import path from 'path';

// Create SQLite database file in the project root
const dbPath = path.join(process.cwd(), 'local.db');
const sqlite = new Database(dbPath);

// Enable foreign keys
sqlite.pragma('foreign_keys = ON');

export const db = drizzle(sqlite, { schema });

// Database is ready - tables will be created automatically when data is inserted
console.log('SQLite database initialized successfully');

// Auto-seed database on first run
let isSeeded = false;
export async function ensureSeeded() {
  if (isSeeded) return;
  
  try {
    // Import schema tables
    const { assessmentQuestions } = await import('@shared/schema');
    
    // Check if we have any questions
    const questions = await db.select().from(assessmentQuestions).limit(1);
    if (questions.length > 0) {
      isSeeded = true;
      return;
    }
    
    console.log('Seeding database with sample data...');
    
    // Import and run seeding
    const { seedAssessmentQuestions } = await import('./seed-assessment-questions');
    const { seedCSVData } = await import('./seed-csv-data');
    
    await seedAssessmentQuestions();
    await seedCSVData();
    
    isSeeded = true;
    console.log('✅ Database seeded successfully!');
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
  }
}