import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC-_IwD2cHRzCUiVOLE23o7JHvGrHne0YU",
  authDomain: "the-acyu-global.firebaseapp.com",
  projectId: "the-acyu-global",
  storageBucket: "the-acyu-global.appspot.com",
  messagingSenderId: "822035355747",
  appId: "1:822035355747:web:6867c6ad995298a8828056",
  measurementId: "G-YWB529SZTM"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

export const fetchUserDocument = async () => {
  try {
    const userDocRef = db.collection('members').doc(auth.currentUser.uid);
    const userDataSnapshot = await userDocRef.get();
    if (userDataSnapshot.exists) {
      // console.log(userDataSnapshot.data())
      return userDataSnapshot.data();
    } else {
      return null;
    }
  } catch (error) {
    // console.log('Error fetching user document:', error);
    return null;
  }
};

export const fetchApplications = async () => {
  try {
    const applicationsSnapshot = await db.collection('applications').get();
    const applications = [];

    applicationsSnapshot.forEach(doc => {
      const applicationData = doc.data();
      applications.push({
        id: doc.id,
        userId: applicationData.userId,
        benefit: applicationData.benefit,
        vision: applicationData.vision,
      });
    });

    return applications;
  } catch (error) {
    // console.log('Error fetching applications:', error);
    return [];
  }
};

export function translateFirebaseError(errorCode) {
    const errorTranslations = {
        'auth/app-deleted': 'The authentication app was deleted.',
        'auth/email-already-in-use': 'The provided email is already in use.',
        'auth/invalid-email': 'The provided email is not valid.',
        'auth/user-not-found': 'The user corresponding to the provided email was not found.',
        'auth/too-many-requests': 'Too many requests. Try again later.',
    };
  
    return errorTranslations[errorCode] || 'An unknown error occurred. Please contact support for assistance.';
  }

export const createApplication = async (userId, benefit, vision) => {
  const authUser = await auth.currentUser;

  const applicationDocRef = db.collection('applications').doc(userId);
  const userDataSnapshot = await applicationDocRef.get();

  if (userDataSnapshot.exists) {
    return 'Already applied';
  }

  const data = {
    userId,
    benefit,
    vision,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  };

  await applicationDocRef.set(data)
}

export const createUser = async (email,password,userData) => {

  const authUser = await auth.createUserWithEmailAndPassword(email, password);

  const id = authUser.user.uid;

  const userdocref = db.collection("members").doc(id);
  // console.log("-----------DOC REF------------" + userdocref)
  await userdocref.set(userData);
}; 

export const getFirestoreInstance = () => db;
export const getFirebaseInstance = () => app;
export const getAuthInstance = () => auth;

export async function b_CanUserAccessPage(user, item) {
  if (!user || !item) {
    return false;
  }

  var use = auth.currentUser;
  if(use) {
    // console.log("User is Authenticated");
  } else {
    // console.log("User is not authenticated.")
    return false;
  }

  const userDocRef = db.collection('members').doc(user);
  const userDataSnapshot = await userDocRef.get();

  if (!userDataSnapshot.exists) {
    // console.log("no snapshot");
    return false;
  }

  // console.log("passed snapshot test");

  const userData = userDataSnapshot.data();

  const hasAllRequiredKeys =
    (!item.requiredKeys || item.requiredKeys.trim() === '') ||
    item.requiredKeys.split(',').every(key => {
      // console.log(`Checking required key: ${key}`);
      return userData.keys.includes(key.trim());
    });  

  const hasDiscouragingKeys = 
    item.discouragingKeys !== '' &&
    item.discouragingKeys.split(',').some(key => {
      // console.log(`Checking discouraging key: ${key}`);
      return userData.keys.includes(key.trim());
    });

  // console.log('hasAllRequiredKeys:', hasAllRequiredKeys);
  // console.log('hasDiscouragingKeys:', hasDiscouragingKeys);

  return hasAllRequiredKeys && !hasDiscouragingKeys;
}

const fetchChapterById = async (chapterId) => {
  try {
    const chapterDoc = await db.collection('chapters').doc(chapterId).get();

    if (chapterDoc.exists) {
      return chapterDoc.data();
    } else {
      throw new Error('Chapter not found');
    }
  } catch (error) {
    console.error('Error fetching chapter:', error);
    return null;
  }
};

export default fetchChapterById;

export const fetchAnnouncements = async () => {
  try {
    const announcementsCollection = await db.collection('announcements').orderBy('date', 'desc').get();

    const announcements = announcementsCollection.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title || 'No Title',
        content: data.desc || 'No Content',
        date: data.date || new Date(),
        author: data.author || "ACYU Member"
      };
    });

    return announcements;
  } catch (error) {
    console.error('Error fetching announcements:', error);
    return [];
  }
};