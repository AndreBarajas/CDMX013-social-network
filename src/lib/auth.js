/* eslint-disable import/no-unresolved */
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, TwitterAuthProvider, GithubAuthProvider, signOut,
} from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js';
import { app } from './config.js';
import { onNavigate } from '../main.js';

export const auth = getAuth();
export const newUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);
export const verify = (email, password) => signInWithEmailAndPassword(auth, email, password);

// Autenticación de Google
const provider = new GoogleAuthProvider();
export const verifyG = () => signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    onNavigate('/wall');
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
  });

// Autenticación de Twitter
const providerTwitter = new TwitterAuthProvider();
export const twitterUser = () => signInWithPopup(auth, providerTwitter)
  .then((result) => {
    // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
    // You can use these server side with your app's credentials to access the Twitter API.
    const credential = TwitterAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const secret = credential.secret;

    // The signed-in user info.
    const user = result.user;
    onNavigate('/wall');
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = TwitterAuthProvider.credentialFromError(error);
  });

// Autenticación con GitHub
const providerGithub = new GithubAuthProvider(); // creando instancia del objeto del proveedor de GitHub
export const verifyGitHub = () => signInWithPopup(auth, providerGithub)
  .then((result) => {
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    // console.log(result); //
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    onNavigate('/wall');
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GithubAuthProvider.credentialFromError(error);
  });

// Obtén la información de perfil de un usuario de un proveedor específico
export const user = auth.currentUser;

// Log Out
export const logOut = () => signOut(auth);
