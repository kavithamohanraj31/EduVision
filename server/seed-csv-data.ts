import { db } from "./db";
import { colleges, careerPaths } from "@shared/schema";
import * as fs from "fs";
import * as path from "path";

// Parse CSV data
function parseCSV(csvContent: string): any[] {
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const obj: any = {};
    headers.forEach((header, index) => {
      obj[header.trim()] = values[index]?.trim() || '';
    });
    return obj;
  });
}

// Seed colleges from CSV
async function seedColleges() {
  console.log("Seeding colleges from CSV...");
  
  try {
    const csvPath = path.join(__dirname, '../client/public/colleges_dataset.csv');
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const collegeData = parseCSV(csvContent);
    
    // Clear existing colleges
    await db.delete(colleges);
    
    // Insert colleges
    for (const college of collegeData) {
      const courses = college.Courses_Offered ? college.Courses_Offered.split(',').map((c: string) => c.trim()) : [];
      
      await db.insert(colleges).values({
        id: college.College_ID,
        name: college.College_Name,
        location: `${college.District}, Tamil Nadu`,
        state: "Tamil Nadu",
        city: college.District,
        type: "Government",
        courses: JSON.stringify(courses),
        facilities: JSON.stringify(["Library", "Laboratory", "Computer Lab", "Sports Complex"]),
        cutoffs: JSON.stringify({
          general: parseInt(college.Cutoff) || 0
        }),
        fees: JSON.stringify({
          annual: parseInt(college.Fees) || 0
        }),
        website: `https://${college.College_Name.toLowerCase().replace(/\s+/g, '')}.edu.in`,
        phone: "+91-44-XXXX-XXXX",
        email: `info@${college.College_Name.toLowerCase().replace(/\s+/g, '')}.edu.in`,
        latitude: 13.0827,
        longitude: 80.2707
      });
    }
    
    console.log(`Successfully seeded ${collegeData.length} colleges`);
  } catch (error) {
    console.error("Error seeding colleges:", error);
    throw error;
  }
}

// Seed career paths from CSV
async function seedCareerPaths() {
  console.log("Seeding career paths from CSV...");
  
  try {
    const csvPath = path.join(__dirname, '../client/public/courses_dataset.csv');
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const courseData = parseCSV(csvContent);
    
    // Clear existing career paths
    await db.delete(careerPaths);
    
    // Insert career paths
    for (const course of courseData) {
      const careerPathsList = course.Career_Paths ? course.Career_Paths.split(',').map((c: string) => c.trim()) : [];
      
      // Determine stream based on course
      let stream = "science";
      if (course.Course_Name.includes("B.Com") || course.Course_Name.includes("BBA") || course.Course_Name.includes("MBA")) {
        stream = "commerce";
      } else if (course.Course_Name.includes("B.A")) {
        stream = "arts";
      } else if (course.Course_Name.includes("Diploma")) {
        stream = "vocational";
      }
      
      await db.insert(careerPaths).values({
        id: course.Course_ID,
        degree: course.Course_Name,
        stream: stream,
        careerTitle: careerPathsList[0] || "Professional",
        description: `Career opportunities for ${course.Course_Name} graduates include various roles in both government and private sectors.`,
        salaryRange: "₹3-15 LPA",
        growthProspects: "Good growth prospects with experience and specialization",
        requiredSkills: JSON.stringify(["Communication", "Problem Solving", "Technical Skills"]),
        industryAreas: JSON.stringify(careerPathsList.slice(0, 3)),
        higherEducationPaths: JSON.stringify(["Master's Degree", "Professional Certifications", "PhD"]),
        governmentJobs: JSON.stringify(careerPathsList.filter(cp => cp.includes("Government") || cp.includes("Officer"))),
        privateJobs: JSON.stringify(careerPathsList.filter(cp => !cp.includes("Government") && !cp.includes("Officer"))),
        entrepreneurialOptions: JSON.stringify(["Start your own business", "Freelancing", "Consulting"])
      });
    }
    
    console.log(`Successfully seeded ${courseData.length} career paths`);
  } catch (error) {
    console.error("Error seeding career paths:", error);
    throw error;
  }
}

// Main seeding function
export async function seedCSVData() {
  console.log("Starting CSV data seeding...");
  
  try {
    await seedColleges();
    await seedCareerPaths();
    console.log("CSV data seeding completed successfully");
  } catch (error) {
    console.error("CSV data seeding failed:", error);
    throw error;
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedCSVData()
    .then(() => {
      console.log("CSV data seeding completed");
      process.exit(0);
    })
    .catch((error) => {
      console.error("CSV data seeding failed:", error);
      process.exit(1);
    });
}
