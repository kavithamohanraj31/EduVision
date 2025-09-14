// =================================================================================
//                    FIREBASE DATABASE SEEDER - BROWSER CONSOLE SCRIPT
// =================================================================================
// Copy and paste this entire script into your browser console to seed Firebase data
// Make sure you're on your application's domain (localhost:5173 or your deployed URL)

// Step 1: Load Firebase SDK
const script1 = document.createElement('script');
script1.src = 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
document.head.appendChild(script1);

const script2 = document.createElement('script');
script2.src = 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
document.head.appendChild(script2);

// Wait for scripts to load, then initialize
setTimeout(() => {
    // Firebase configuration
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
    const app = firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    console.log('🔥 Firebase initialized successfully!');

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

    // Sample data for assessment questions
    const assessmentQuestionsData = [
      {
        id: 'academic_1',
        question: 'What is your current academic performance?',
        category: 'academic',
        stream: 'all',
        options: [
          { value: 'excellent', text: 'Excellent (90%+)', score: { academic: 5, analytical: 4 } },
          { value: 'very_good', text: 'Very Good (80-89%)', score: { academic: 4, analytical: 3 } },
          { value: 'good', text: 'Good (70-79%)', score: { academic: 3, analytical: 2 } },
          { value: 'average', text: 'Average (60-69%)', score: { academic: 2, analytical: 1 } },
          { value: 'below_average', text: 'Below Average (<60%)', score: { academic: 1, analytical: 1 } }
        ],
        type: 'single_choice',
        required: true
      },
      {
        id: 'academic_2',
        question: 'Which subjects do you enjoy the most?',
        category: 'academic',
        stream: 'all',
        options: [
          { value: 'mathematics', text: 'Mathematics', score: { analytical: 5, logical: 5, science: 4 } },
          { value: 'science', text: 'Science (Physics, Chemistry, Biology)', score: { science: 5, analytical: 4, research: 3 } },
          { value: 'languages', text: 'Languages (English, Literature)', score: { communication: 5, creative: 4, social: 3 } },
          { value: 'social_studies', text: 'Social Studies (History, Geography, Civics)', score: { social: 5, communication: 4, analytical: 3 } },
          { value: 'commerce', text: 'Commerce (Economics, Business Studies)', score: { business: 5, analytical: 4, communication: 3 } },
          { value: 'arts', text: 'Arts (Fine Arts, Music, Drama)', score: { creative: 5, artistic: 5, communication: 3 } }
        ],
        type: 'multiple_choice',
        required: true
      },
      {
        id: 'interest_1',
        question: 'What activities do you enjoy in your free time?',
        category: 'interest',
        stream: 'all',
        options: [
          { value: 'reading', text: 'Reading books/articles', score: { analytical: 4, communication: 3, research: 3 } },
          { value: 'problem_solving', text: 'Solving puzzles and problems', score: { analytical: 5, logical: 5, technical: 4 } },
          { value: 'creative_arts', text: 'Drawing, painting, or creative arts', score: { creative: 5, artistic: 5, communication: 3 } },
          { value: 'sports', text: 'Sports and physical activities', score: { leadership: 4, teamwork: 4, physical: 5 } },
          { value: 'technology', text: 'Working with computers and technology', score: { technical: 5, analytical: 4, innovation: 4 } },
          { value: 'social_activities', text: 'Social activities and meeting people', score: { social: 5, communication: 5, leadership: 3 } }
        ],
        type: 'multiple_choice',
        required: true
      },
      {
        id: 'career_1',
        question: 'What are your primary career goals?',
        category: 'career',
        stream: 'all',
        options: [
          { value: 'financial_security', text: 'Financial security and stability', score: { business: 4, practical: 4, security: 5 } },
          { value: 'social_impact', text: 'Making a positive social impact', score: { social: 5, communication: 4, service: 5 } },
          { value: 'innovation', text: 'Innovation and creating new things', score: { innovation: 5, creative: 4, technical: 4 } },
          { value: 'leadership', text: 'Leadership and management roles', score: { leadership: 5, communication: 4, business: 4 } },
          { value: 'research', text: 'Research and academic pursuits', score: { research: 5, analytical: 5, academic: 4 } },
          { value: 'entrepreneurship', text: 'Starting my own business', score: { business: 5, leadership: 4, innovation: 4 } }
        ],
        type: 'multiple_choice',
        required: true
      },
      {
        id: 'future_1',
        question: 'What are your plans after 12th grade?',
        category: 'future',
        stream: 'all',
        options: [
          { value: 'engineering', text: 'Engineering', score: { technical: 5, analytical: 4, science: 4 } },
          { value: 'medicine', text: 'Medicine', score: { service: 5, science: 4, research: 3 } },
          { value: 'commerce', text: 'Commerce/Business', score: { business: 5, analytical: 3, communication: 3 } },
          { value: 'arts', text: 'Arts/Humanities', score: { creative: 4, communication: 4, social: 3 } },
          { value: 'law', text: 'Law', score: { communication: 5, analytical: 4, social: 4 } },
          { value: 'design', text: 'Design/Architecture', score: { creative: 5, artistic: 4, technical: 3 } },
          { value: 'not_sure', text: 'Not sure yet', score: { exploration: 5, flexibility: 4, curiosity: 4 } }
        ],
        type: 'single_choice',
        required: true
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
        const collegesRef = db.collection('colleges');
        
        for (const college of collegesData) {
            try {
                await collegesRef.add({
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
        const scholarshipsRef = db.collection('scholarships');
        
        for (const scholarship of scholarshipsData) {
            try {
                await scholarshipsRef.add({
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
        const coursesRef = db.collection('courses');
        
        for (const course of coursesData) {
            try {
                await coursesRef.add({
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

    // Function to seed assessment questions
    async function seedAssessmentQuestions() {
        console.log('🌱 Seeding assessment questions...');
        const questionsRef = db.collection('assessmentQuestions');
        
        for (const question of assessmentQuestionsData) {
            try {
                await questionsRef.add({
                    ...question,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
                console.log(`✅ Added question: ${question.question}`);
            } catch (error) {
                console.error(`❌ Error adding question ${question.question}:`, error);
            }
        }
        console.log('🎉 Assessment questions seeding completed!');
    }

    // Function to seed all data
    async function seedAll() {
        console.log('🚀 Starting Firebase seeding process...');
        console.log(`Project ID: ${firebaseConfig.projectId}`);
        
        try {
            await seedAssessmentQuestions();
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
        
        try {
            const questionsSnapshot = await db.collection('assessmentQuestions').get();
            const collegesSnapshot = await db.collection('colleges').get();
            const scholarshipsSnapshot = await db.collection('scholarships').get();
            const coursesSnapshot = await db.collection('courses').get();
            
            console.log(`❓ Assessment Questions: ${questionsSnapshot.size} documents`);
            console.log(`📚 Colleges: ${collegesSnapshot.size} documents`);
            console.log(`💰 Scholarships: ${scholarshipsSnapshot.size} documents`);
            console.log(`🎓 Courses: ${coursesSnapshot.size} documents`);
        } catch (error) {
            console.error('❌ Error checking data:', error);
        }
    }

    // Make functions available globally
    window.seedAssessmentQuestions = seedAssessmentQuestions;
    window.seedColleges = seedColleges;
    window.seedScholarships = seedScholarships;
    window.seedCourses = seedCourses;
    window.seedAll = seedAll;
    window.checkData = checkData;

    console.log('🔥 Firebase Seeder loaded!');
    console.log('Available commands:');
    console.log('- seedAll() - Seed all collections');
    console.log('- seedAssessmentQuestions() - Seed assessment questions only');
    console.log('- seedColleges() - Seed colleges only');
    console.log('- seedScholarships() - Seed scholarships only');
    console.log('- seedCourses() - Seed courses only');
    console.log('- checkData() - Check existing data count');
    console.log('');
    console.log('🚀 Ready to seed! Run seedAll() to start...');

}, 2000); // Wait 2 seconds for Firebase scripts to load
