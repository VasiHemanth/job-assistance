import { app } from "./init.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAdditionalUserInfo,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export const auth = getAuth(app);

// export const getCurrentUser = async () => {
//   const promisifiedOnAuthStateChanged = (auth) => {
//     return new Promise((resolve, reject) => {
//       auth.onAuthStateChanged((user) => {
//         if (user) {
//           resolve(user);
//         } else {
//           resolve(null);
//         }
//       });
//     });
//   };

//   const user = await promisifiedOnAuthStateChanged(auth);
//   return user;
// };

export const signUpUserWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // console.log(userCredential.user);
    // console.log(auth);
  } catch (error) {
    // console.log(error);
  }
};

export const signInUserWithEmailAndPassword = async (email, password) => {
  try {
    // console.log("hi");
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // console.log(userCredential.user);
  } catch (error) {
    // console.log(error);
  }
};

export const signInWithGithub = async () => {
  const provider = new GithubAuthProvider();
  try {
    const githubUser = await signInWithPopup(auth, provider);
    // console.log(githubUser);
    return githubUser;
  } catch (error) {
    // console.log("Error from auth JS file", error);
    return error;
  }
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const googleUser = await signInWithPopup(auth, provider);
    // console.log(googleUser);
    return googleUser;
  } catch (error) {
    // console.log("Error from auth JS file", error);
    return error;
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    // console.log(error);
  }
};
