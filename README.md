# EduAdvisorX - Educational Career Guidance Platform

A comprehensive educational advisory platform that helps students discover career paths, explore colleges, and find scholarships based on their interests and academic performance.

## 🚀 Features

- **Interactive Assessment**: 5-question career assessment quiz
- **College Directory**: Detailed information about top colleges with cutoffs, fees, and courses
- **Career Path Analysis**: Comprehensive career guidance with salary ranges and growth prospects
- **Scholarship Information**: Available scholarship opportunities
- **No Login Required**: Direct access to all features

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Components**: shadcn/ui + Tailwind CSS
- **Backend**: Express.js + TypeScript
- **Database**: Static data (no external dependencies)
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd EduAdvisorX
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Open in Browser
Visit `http://localhost:5000` in your browser

## 📁 Project Structure

```
EduAdvisorX/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Main application pages
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utility functions
├── server/                # Express backend
│   ├── routes.ts          # API routes
│   ├── index.ts           # Server entry point
│   └── services/          # Business logic
├── package.json           # Project dependencies
└── README.md             # This file
```

## 🎯 Available Pages

- **Dashboard** (`/`) - Overview and navigation
- **Assessment** (`/assessment`) - Career assessment quiz
- **Colleges** (`/colleges`) - College directory with detailed information
- **Career Paths** (`/career-paths`) - Career guidance and analysis
- **Scholarships** (`/scholarships`) - Scholarship opportunities

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - TypeScript type checking

## 📊 Data Sources

All data is embedded in the application components:
- **Assessment Questions**: Hardcoded in `client/src/components/assessment-quiz.tsx`
- **College Data**: Static data in `client/src/pages/colleges.tsx`
- **Career Paths**: Comprehensive data in `client/src/pages/career-paths.tsx`

## 🎨 Key Features

### Assessment System
- 5 comprehensive questions covering academic performance, interests, and goals
- Real-time progress tracking
- Personalized recommendations based on responses

### College Directory
- 6 top colleges with complete information
- Cutoff percentages for all categories (General, OBC, SC, ST, EWS)
- Fee structures and course details
- Facilities and placement statistics
- Advanced search and filtering

### Career Path Analysis
- Stream-based career guidance (Science, Commerce, Arts)
- Salary ranges and growth prospects
- Required skills and top companies
- Higher education options
- Government job opportunities
- Entrepreneurial pathways

## 🚨 Troubleshooting

### Common Issues

1. **"Missing script: 'dev'" error**
   - Make sure you're in the `EduAdvisorX` directory
   - Check if `package.json` exists in the current directory

2. **Port already in use**
   - Kill the process using port 5000: `npx kill-port 5000`
   - Or restart your terminal

3. **Dependencies not installing**
   - Clear npm cache: `npm cache clean --force`
   - Delete `node_modules` and `package-lock.json`, then run `npm install`

### Verification Steps

```bash
# Check current directory
pwd

# Verify package.json exists
ls package.json

# Check dev script
cat package.json | grep "dev"

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Verify you're following the setup steps correctly
3. Make sure you're in the correct directory (`EduAdvisorX`)
4. Check that all dependencies are installed properly

## 🎉 Success!

Once everything is set up correctly, you should see:
- Development server running on port 5000
- No database connection errors
- All pages loading with static data
- Interactive assessment and college browsing features

Happy coding! 🚀

