import { db } from './firebase';

// User operations
export async function upsertUser(user: any) {
  const userRef = db.collection('users').doc(user.id);
  await userRef.set({
    ...user,
    updatedAt: new Date(),
  }, { merge: true });
  return user;
}

export async function getUser(id: string) {
  const userRef = db.collection('users').doc(id);
  const userSnap = await userRef.get();
  return userSnap.exists ? { id: userSnap.id, ...userSnap.data() } : null;
}

// Assessment operations
export async function getAssessmentQuestions(category?: string, stream?: string) {
  let questionsRef = db.collection('assessmentQuestions');
  
  if (category) {
    questionsRef = questionsRef.where('category', '==', category);
  }
  
  if (stream) {
    questionsRef = questionsRef.where('stream', 'in', [stream, 'all']);
  }
  
  const snapshot = await questionsRef.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function saveAssessmentResult(userId: string, result: any) {
  const resultRef = db.collection('assessmentResults').doc(`${userId}_${Date.now()}`);
  await resultRef.set({
    ...result,
    userId,
    createdAt: new Date(),
  });
  return result;
}

export async function getAssessmentResult(userId: string) {
  const resultsRef = db.collection('assessmentResults');
  const q = resultsRef.where('userId', '==', userId).orderBy('createdAt', 'desc').limit(1);
  const snapshot = await q.get();
  return snapshot.docs[0]?.data() || null;
}

// College operations
export async function getAllColleges() {
  const collegesRef = db.collection('colleges');
  const snapshot = await collegesRef.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getCollegesByStream(stream: string) {
  const collegesRef = db.collection('colleges');
  const q = collegesRef.where('stream', '==', stream).orderBy('cutoff', 'asc');
  const snapshot = await q.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function saveUserRecommendations(userId: string, type: string, recommendations: any[]) {
  const recRef = db.collection('userRecommendations').doc(`${userId}_${type}`);
  await recRef.set({
    userId,
    type,
    recommendations,
    createdAt: new Date(),
  });
  return recommendations;
}

export async function getUserRecommendations(userId: string, type: string) {
  const recRef = db.collection('userRecommendations').doc(`${userId}_${type}`);
  const recSnap = await recRef.get();
  return recSnap.exists ? recSnap.data() : null;
}

// Career path operations
export async function getAllCareerPaths() {
  const careerPathsRef = db.collection('careerPaths');
  const snapshot = await careerPathsRef.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getCareerPathByStream(stream: string) {
  const careerPathsRef = db.collection('careerPaths');
  const q = careerPathsRef.where('stream', '==', stream);
  const snapshot = await q.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Scholarship operations
export async function getAllScholarships() {
  const scholarshipsRef = db.collection('scholarships');
  const snapshot = await scholarshipsRef.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getScholarshipsByCriteria(criteria: any) {
  const scholarshipsRef = db.collection('scholarships');
  const q = scholarshipsRef.where('eligibilityCriteria', '==', criteria);
  const snapshot = await q.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Course operations
export async function getAllCourses() {
  const coursesRef = db.collection('courses');
  const snapshot = await coursesRef.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getCoursesByStream(stream: string) {
  const coursesRef = db.collection('courses');
  const q = coursesRef.where('stream', '==', stream);
  const snapshot = await q.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export const storage = {
  upsertUser,
  getUser,
  getAssessmentQuestions,
  saveAssessmentResult,
  getAssessmentResult,
  getAllColleges,
  getCollegesByStream,
  saveUserRecommendations,
  getUserRecommendations,
  getAllCareerPaths,
  getCareerPathByStream,
  getAllScholarships,
  getScholarshipsByCriteria,
  getAllCourses,
  getCoursesByStream,
};
