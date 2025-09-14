// Firebase Seeder Script for Browser Console
// Run this in your browser console to populate Firebase collections

// Firebase configuration (replace with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyCWbBCtQcxL7Zm6Q6Fqqb8iWGiUVc2PYlw",
  authDomain: "edutechadvisor-c5cc7.firebaseapp.com",
  projectId: "edutechadvisor-c5cc7",
  storageBucket: "edutechadvisor-c5cc7.firebasestorage.app",
  messagingSenderId: "1014463785266",
  appId: "1:1014463785266:web:db629ba5338d424e938f2b",
  measurementId: "G-90YE6QMSE3"
};

// Initialize Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, doc, setDoc } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample data for colleges
const collegesData = [
  {
    name: "Indian Institute of Technology Delhi",
    location: "New Delhi",
    state: "Delhi",
    city: "New Delhi",
    courses: ["B.Tech Computer Science", "B.Tech Mechanical", "B.Tech Electrical", "M.Tech", "PhD"],
    facilities: ["Library", "Hostel", "Sports Complex", "Research Labs", "Cafeteria"],
    cutoffs: { general: 95, obc: 90, sc: 85, st: 80 },
    fees: { tuition: 200000, hostel: 50000, total: 250000 },
    stream: "Science",
    established: 1961,
    type: "Public",
    website: "https://www.iitd.ac.in"
  },
  {
    name: "Delhi University",
    location: "New Delhi",
    state: "Delhi", 
    city: "New Delhi",
    courses: ["B.A", "B.Com", "B.Sc", "M.A", "M.Com", "M.Sc", "MBA"],
    facilities: ["Library", "Hostel", "Sports", "Cafeteria", "Computer Labs"],
    cutoffs: { general: 85, obc: 80, sc: 75, st: 70 },
    fees: { tuition: 15000, hostel: 20000, total: 35000 },
    stream: "General",
    established: 1922,
    type: "Public",
    website: "https://www.du.ac.in"
  },
  {
    name: "St. Stephen's College",
    location: "New Delhi",
    state: "Delhi",
    city: "New Delhi", 
    courses: ["B.A English", "B.A Economics", "B.A History", "B.Sc Physics", "B.Sc Chemistry"],
    facilities: ["Library", "Hostel", "Sports", "Cafeteria", "Labs"],
    cutoffs: { general: 98, obc: 95, sc: 90, st: 85 },
    fees: { tuition: 25000, hostel: 30000, total: 55000 },
    stream: "Arts",
    established: 1881,
    type: "Private",
    website: "https://www.ststephens.edu"
  },
  {
    name: "Indian Institute of Management Ahmedabad",
    location: "Ahmedabad",
    state: "Gujarat",
    city: "Ahmedabad",
    courses: ["MBA", "PGP", "FPM", "Executive MBA"],
    facilities: ["Library", "Hostel", "Sports", "Cafeteria", "Research Centers"],
    cutoffs: { general: 99, obc: 97, sc: 95, st: 92 },
    fees: { tuition: 2300000, hostel: 200000, total: 2500000 },
    stream: "Commerce",
    established: 1961,
    type: "Public",
    website: "https://www.iima.ac.in"
  },
  {
    name: "All India Institute of Medical Sciences",
    location: "New Delhi",
    state: "Delhi",
    city: "New Delhi",
    courses: ["MBBS", "MD", "MS", "MCh", "DM", "PhD"],
    facilities: ["Hospital", "Library", "Hostel", "Research Labs", "Cafeteria"],
    cutoffs: { general: 99.5, obc: 98, sc: 96, st: 94 },
    fees: { tuition: 10000, hostel: 15000, total: 25000 },
    stream: "Science",
    established: 1956,
    type: "Public",
    website: "https://www.aiims.edu"
  }
];

// Sample data for scholarships
const scholarshipsData = [
  {
    name: "Merit Scholarship for Engineering Students",
    category: "Merit-based",
    amount: "50000",
    eligibilityCriteria: "Students with 90%+ in 12th grade",
    applicationDeadline: "2024-03-31",
    description: "Scholarship for meritorious engineering students",
    provider: "Ministry of Education",
    renewable: true,
    maxAmount: 50000
  },
  {
    name: "Girl Child Education Scholarship",
    category: "Gender-based",
    amount: "25000",
    eligibilityCriteria: "Female students from economically weaker sections",
    applicationDeadline: "2024-04-15",
    description: "Supporting girl child education",
    provider: "Women and Child Development Ministry",
    renewable: true,
    maxAmount: 25000
  },
  {
    name: "SC/ST Scholarship",
    category: "Category-based",
    amount: "30000",
    eligibilityCriteria: "Students belonging to SC/ST categories",
    applicationDeadline: "2024-05-01",
    description: "Scholarship for SC/ST students",
    provider: "Social Justice Ministry",
    renewable: true,
    maxAmount: 30000
  },
  {
    name: "Sports Excellence Scholarship",
    category: "Sports",
    amount: "40000",
    eligibilityCriteria: "National/State level sports achievements",
    applicationDeadline: "2024-06-30",
    description: "Supporting sports excellence",
    provider: "Sports Authority of India",
    renewable: true,
    maxAmount: 40000
  },
  {
    name: "Innovation and Research Scholarship",
    category: "Research",
    amount: "75000",
    eligibilityCriteria: "Students with research projects and innovations",
    applicationDeadline: "2024-07-15",
    description: "Encouraging research and innovation",
    provider: "Department of Science and Technology",
    renewable: true,
    maxAmount: 75000
  }
];

// Sample data for courses
const coursesData = [
  {
    name: "Bachelor of Technology in Computer Science",
    degree: "B.Tech",
    stream: "Science",
    duration: "4 years",
    eligibility: "12th grade with Physics, Chemistry, Mathematics",
    requiredSkills: ["Mathematics", "Programming", "Problem Solving", "Logical Thinking"],
    industryAreas: ["Software Development", "Data Science", "AI/ML", "Cybersecurity"],
    higherEducationPaths: ["M.Tech", "MS", "MBA", "PhD"],
    governmentJobs: ["Software Engineer", "System Analyst", "IT Officer"],
    privateJobs: ["Software Developer", "Data Scientist", "Product Manager"],
    entrepreneurialOptions: ["Tech Startup", "Software Consulting", "App Development"],
    averageSalary: "8-15 LPA",
    jobProspects: "Excellent"
  },
  {
    name: "Bachelor of Arts in English Literature",
    degree: "B.A",
    stream: "Arts",
    duration: "3 years",
    eligibility: "12th grade in any stream",
    requiredSkills: ["Language Skills", "Critical Thinking", "Writing", "Analysis"],
    industryAreas: ["Media", "Publishing", "Education", "Content Writing"],
    higherEducationPaths: ["M.A", "M.Phil", "PhD", "Journalism"],
    governmentJobs: ["Teacher", "Content Writer", "Translator"],
    privateJobs: ["Content Manager", "Editor", "Copywriter"],
    entrepreneurialOptions: ["Content Agency", "Publishing House", "Blogging"],
    averageSalary: "3-8 LPA",
    jobProspects: "Good"
  },
  {
    name: "Bachelor of Commerce",
    degree: "B.Com",
    stream: "Commerce",
    duration: "3 years",
    eligibility: "12th grade with Commerce/Mathematics",
    requiredSkills: ["Accounting", "Mathematics", "Business Studies", "Economics"],
    industryAreas: ["Banking", "Finance", "Accounting", "Business"],
    higherEducationPaths: ["M.Com", "MBA", "CA", "CS"],
    governmentJobs: ["Bank Officer", "Accountant", "Auditor"],
    privateJobs: ["Financial Analyst", "Accountant", "Business Analyst"],
    entrepreneurialOptions: ["Trading", "Consulting", "E-commerce"],
    averageSalary: "4-10 LPA",
    jobProspects: "Very Good"
  },
  {
    name: "Bachelor of Science in Physics",
    degree: "B.Sc",
    stream: "Science",
    duration: "3 years",
    eligibility: "12th grade with Physics, Chemistry, Mathematics",
    requiredSkills: ["Mathematics", "Physics", "Problem Solving", "Research"],
    industryAreas: ["Research", "Education", "Technology", "Defense"],
    higherEducationPaths: ["M.Sc", "M.Tech", "PhD", "Research"],
    governmentJobs: ["Scientist", "Teacher", "Research Officer"],
    privateJobs: ["Research Scientist", "Data Analyst", "Technical Writer"],
    entrepreneurialOptions: ["Tech Innovation", "Research Consulting", "Education"],
    averageSalary: "5-12 LPA",
    jobProspects: "Good"
  },
  {
    name: "Master of Business Administration",
    degree: "MBA",
    stream: "Commerce",
    duration: "2 years",
    eligibility: "Bachelor's degree with 50% marks",
    requiredSkills: ["Leadership", "Communication", "Analytics", "Management"],
    industryAreas: ["Management", "Consulting", "Finance", "Marketing"],
    higherEducationPaths: ["PhD", "Executive MBA", "Specialized Masters"],
    governmentJobs: ["Manager", "Administrative Officer", "Policy Analyst"],
    privateJobs: ["Management Consultant", "Product Manager", "Business Analyst"],
    entrepreneurialOptions: ["Business Startup", "Consulting Firm", "Investment"],
    averageSalary: "10-25 LPA",
    jobProspects: "Excellent"
  }
];

// Function to seed colleges
async function seedColleges() {
  console.log('🌱 Seeding colleges...');
  const collegesRef = collection(db, 'colleges');
  
  for (const college of collegesData) {
    try {
      await addDoc(collegesRef, {
        ...college,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log(`✅ Added college: ${college.name}`);
    } catch (error) {
      console.error(`❌ Error adding college ${college.name}:`, error);
    }
  }
  console.log('🎉 Colleges seeding completed!');
}

// Function to seed scholarships
async function seedScholarships() {
  console.log('🌱 Seeding scholarships...');
  const scholarshipsRef = collection(db, 'scholarships');
  
  for (const scholarship of scholarshipsData) {
    try {
      await addDoc(scholarshipsRef, {
        ...scholarship,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log(`✅ Added scholarship: ${scholarship.name}`);
    } catch (error) {
      console.error(`❌ Error adding scholarship ${scholarship.name}:`, error);
    }
  }
  console.log('🎉 Scholarships seeding completed!');
}

// Function to seed courses
async function seedCourses() {
  console.log('🌱 Seeding courses...');
  const coursesRef = collection(db, 'courses');
  
  for (const course of coursesData) {
    try {
      await addDoc(coursesRef, {
        ...course,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log(`✅ Added course: ${course.name}`);
    } catch (error) {
      console.error(`❌ Error adding course ${course.name}:`, error);
    }
  }
  console.log('🎉 Courses seeding completed!');
}

// Function to seed all data
async function seedAll() {
  console.log('🚀 Starting Firebase seeding process...');
  console.log('Project ID:', firebaseConfig.projectId);
  
  try {
    await seedColleges();
    await seedScholarships();
    await seedCourses();
    console.log('🎉 All data seeded successfully!');
  } catch (error) {
    console.error('💥 Seeding failed:', error);
  }
}

// Function to check existing data
async function checkData() {
  console.log('📊 Checking existing data...');
  
  const { getDocs } = await import('firebase/firestore');
  
  try {
    const collegesSnapshot = await getDocs(collection(db, 'colleges'));
    const scholarshipsSnapshot = await getDocs(collection(db, 'scholarships'));
    const coursesSnapshot = await getDocs(collection(db, 'courses'));
    
    console.log(`📚 Colleges: ${collegesSnapshot.size} documents`);
    console.log(`💰 Scholarships: ${scholarshipsSnapshot.size} documents`);
    console.log(`🎓 Courses: ${coursesSnapshot.size} documents`);
  } catch (error) {
    console.error('❌ Error checking data:', error);
  }
}

// Export functions to global scope for console access
window.seedColleges = seedColleges;
window.seedScholarships = seedScholarships;
window.seedCourses = seedCourses;
window.seedAll = seedAll;
window.checkData = checkData;

console.log('🔥 Firebase Seeder loaded!');
console.log('Available commands:');
console.log('- seedAll() - Seed all collections');
console.log('- seedColleges() - Seed colleges only');
console.log('- seedScholarships() - Seed scholarships only');
console.log('- seedCourses() - Seed courses only');
console.log('- checkData() - Check existing data count');
