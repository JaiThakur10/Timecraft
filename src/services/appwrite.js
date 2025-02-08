import { Client, Account, Databases, OAuthProvider } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // Use environment variable
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Use environment variable

export const account = new Account(client);
export const databases = new Databases(client);

// Use environment variables for Database and Collection IDs
export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
export const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
export const COLLECTION_ID_TODOS = import.meta.env
  .VITE_APPWRITE_COLLECTION_ID_TODOS; // Added COLLECTION_ID_TODOS
export const COLLECTION_ID_PLANNER = import.meta.env
  .VITE_APPWRITE_COLLECTION_ID_PLANNER; // Added COLLECTION_ID_PLANNER

// GitHub Login
export const githubLogin = () => {
  account.createOAuth2Session(
    OAuthProvider.Github,
    "http://localhost:5173/dashboard", // Redirect on success
    "http://localhost:5173/login" // Redirect on failure
  );
};
