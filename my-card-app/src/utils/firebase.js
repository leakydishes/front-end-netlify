import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { getStorage } from 'firebase/storage';
import { getFirestore, collection, getDocs, addDoc, doc, getDoc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const firebaseApp = initializeApp(firebaseConfig); // Initialize Firebase

// Initialize Firebase Auth, Firestore, and Storage
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);


const provider = new GoogleAuthProvider(); // Instance of Google Provider
    provider.setCustomParameters ({
        prompt:"select_account"
    });

// Sign in Google Auth
export const signInwithGooglePopup = () => signInWithPopup(auth, provider);

// Sign in add user with email and password
export const signInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

// Create user in db
// export const createUserDocFromAuth= async (userAuth) =>{
export const createUserDocFromAuth= async (userAuth, additionalInformation ={}) =>{
  // if (!userAuth.email) return; //check email first

  const userDocRef = doc (db, 'users', userAuth.uid ); //Save user in FireStore db
  // console.log(userDocRef);

  // Check user data against data from document
  const userSnapshot = await getDoc(userDocRef);
  // console.log(userSnapshot);
  // console.log(userSnapshot.exists())

  // Store data from document
  if (! userSnapshot.exists()){
    const {displayName, email} = userAuth;
    const createdAt = new Date();

  try{
    await setDoc(userDocRef, {
      displayName,
      email,
      createdAt,
      ...additionalInformation
    })
  }
  catch (error){
    console.log('Error Creating User: ', error.message)
  }
}
return userDocRef;
}

// Sign in add user with email and password
export const createAuthUserWithEmailandPassword = async (email, password) =>{
  // check user info
  if (!email || !password) return;
  
  return await createUserWithEmailAndPassword(auth, email, password)
}

// Get Posts
export const getPostsFromFirestore = async () => {
  const postsCollection = collection(db, 'form-data'); // Firestore 'form-data'
  const postsSnapshot = await getDocs(postsCollection);
  const postsList = postsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return postsList;
};

// Add Posts
export const addPostToFirestore = async (formData) => {
  try {
    await addDoc(collection(db, 'form-data'), {
      ...formData,
      timestamp: serverTimestamp(), // Add time auto
    });
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};

// Delete Posts
export const deletePostFromFirestore = async (postId) => {
  try {
    await deleteDoc(doc(db, "form-data", postId)); // Delete using postId
    console.log("Post deleted successfully");
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};
