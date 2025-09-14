import session from "express-session";
import { storage } from "./firebaseStorage";

function getSession() {
  return session({
    secret: process.env.SESSION_SECRET || 'local-development-secret-key',
    // No store specified - uses memory store by default
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Set to false for local development
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    }
  });
}

async function setupAuth(app: any) {
  app.set("trust proxy", 1);
  app.use(getSession());
  
  // Simple login endpoint for local development
  app.get("/api/login", async (req: any, res: any) => {
    try {
      // Create a demo user for local development
      const demoUser = {
        id: 'demo-user-123',
        email: 'demo@example.com',
        firstName: 'Demo',
        lastName: 'User',
        profileImageUrl: null,
        currentClass: '12',
        interests: ['science', 'technology'],
        assessmentCompleted: false
      };
      
      // Save user to database
      await storage.upsertUser(demoUser);
      
      // Set session
      req.session.user = demoUser;
      req.session.save((err: any) => {
        if (err) {
          console.error('Session save error:', err);
          return res.status(500).json({ message: 'Login failed' });
        }
        res.json({ 
          message: 'Logged in successfully',
          user: demoUser,
          redirect: '/'
        });
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Login failed' });
    }
  });
  
  // Logout endpoint
  app.get("/api/logout", (req: any, res: any) => {
    req.session.destroy((err: any) => {
      if (err) {
        console.error('Logout error:', err);
        return res.status(500).json({ message: 'Logout failed' });
      }
      res.json({ message: 'Logged out successfully' });
    });
  });
  
  // Get current user endpoint
  app.get("/api/auth/user", (req: any, res: any) => {
    if (req.session.user) {
      res.json(req.session.user);
    } else {
      res.status(401).json({ message: 'Not authenticated' });
    }
  });
}

const isAuthenticated = async (req: any, res: any, next: any) => {
  if (req.session.user) {
    return next();
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export { getSession, isAuthenticated, setupAuth };
