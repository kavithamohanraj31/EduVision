import { db } from './firebase';
import fs from 'fs';
import path from 'path';

export async function seedCSVData() {
  try {
    console.log('Seeding CSV data to Firebase...');
    
    // Seed colleges
    await seedColleges();
    
    // Seed career paths
    await seedCareerPaths();
    
    // Seed scholarships
    await seedScholarships();
    
    // Seed courses
    await seedCourses();
    
    console.log('✅ CSV data seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding CSV data:', error);
    throw error;
  }
}

async function seedColleges() {
  try {
    const csvPath = path.join(process.cwd(), 'client/public/colleges_dataset.csv');
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const lines = csvContent.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    
    console.log('Seeding colleges...');
    const collegesRef = db.collection('colleges');
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      const college: any = {};
      
      headers.forEach((header, index) => {
        let value = values[index] || '';
        
        // Parse JSON fields
        if (['courses', 'facilities', 'cutoffs', 'fees'].includes(header)) {
          try {
            value = value ? JSON.parse(value) : [];
          } catch {
            value = [];
          }
        }
        
        college[header] = value;
      });
      
      // Add metadata
      college.createdAt = new Date();
      college.updatedAt = new Date();
      
      await collegesRef.add(college);
    }
    
    console.log(`✅ Seeded ${lines.length - 1} colleges`);
  } catch (error) {
    console.error('❌ Error seeding colleges:', error);
    throw error;
  }
}

async function seedCareerPaths() {
  try {
    const csvPath = path.join(process.cwd(), 'client/public/courses_dataset.csv');
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const lines = csvContent.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    
    console.log('Seeding career paths...');
    const careerPathsRef = db.collection('careerPaths');
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      const careerPath: any = {};
      
      headers.forEach((header, index) => {
        let value = values[index] || '';
        
        // Parse JSON fields
        if (['requiredSkills', 'industryAreas', 'higherEducationPaths', 'governmentJobs', 'privateJobs', 'entrepreneurialOptions'].includes(header)) {
          try {
            value = value ? JSON.parse(value) : [];
          } catch {
            value = [];
          }
        }
        
        careerPath[header] = value;
      });
      
      // Add metadata
      careerPath.createdAt = new Date();
      careerPath.updatedAt = new Date();
      
      await careerPathsRef.add(careerPath);
    }
    
    console.log(`✅ Seeded ${lines.length - 1} career paths`);
  } catch (error) {
    console.error('❌ Error seeding career paths:', error);
    throw error;
  }
}

async function seedScholarships() {
  try {
    const csvPath = path.join(process.cwd(), 'client/public/scholarships_dataset.csv');
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const lines = csvContent.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    
    console.log('Seeding scholarships...');
    const scholarshipsRef = db.collection('scholarships');
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      const scholarship: any = {};
      
      headers.forEach((header, index) => {
        scholarship[header] = values[index] || '';
      });
      
      // Add metadata
      scholarship.createdAt = new Date();
      scholarship.updatedAt = new Date();
      
      await scholarshipsRef.add(scholarship);
    }
    
    console.log(`✅ Seeded ${lines.length - 1} scholarships`);
  } catch (error) {
    console.error('❌ Error seeding scholarships:', error);
    throw error;
  }
}

async function seedCourses() {
  try {
    const csvPath = path.join(process.cwd(), 'client/public/courses_dataset.csv');
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const lines = csvContent.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    
    console.log('Seeding courses...');
    const coursesRef = db.collection('courses');
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      const course: any = {};
      
      headers.forEach((header, index) => {
        let value = values[index] || '';
        
        // Parse JSON fields
        if (['requiredSkills', 'industryAreas', 'higherEducationPaths', 'governmentJobs', 'privateJobs', 'entrepreneurialOptions'].includes(header)) {
          try {
            value = value ? JSON.parse(value) : [];
          } catch {
            value = [];
          }
        }
        
        course[header] = value;
      });
      
      // Add metadata
      course.createdAt = new Date();
      course.updatedAt = new Date();
      
      await coursesRef.add(course);
    }
    
    console.log(`✅ Seeded ${lines.length - 1} courses`);
  } catch (error) {
    console.error('❌ Error seeding courses:', error);
    throw error;
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedCSVData()
    .then(() => {
      console.log('CSV data seeding completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('CSV data seeding failed:', error);
      process.exit(1);
    });
}
