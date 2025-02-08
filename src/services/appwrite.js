import { Client, Account, Databases } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // Use environment variable
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Use environment variable

export const account = new Account(client);
export const databases = new Databases(client);

// Use environment variables for Database and Collection IDs
export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
export const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
export const COLLECTION_ID_TODOS = import.meta.env
  .VITE_APPWRITE_COLLECTION_ID_TODOS;
export const COLLECTION_ID_PLANNER = import.meta.env
  .VITE_APPWRITE_COLLECTION_ID_PLANNER;

// GitHub Login
export const githubLogin = async () => {
  await account.createOAuth2Session(
    "github", // Use lowercase string
    `${window.location.origin}/dashboard`, // Redirect on success
    `${window.location.origin}/login` // Redirect on failure
  );
};

// Google Login
export const googleLogin = async () => {
  await account.createOAuth2Session(
    "google", // Use lowercase string
    `${window.location.origin}/dashboard`, // Redirect on success
    `${window.location.origin}/login` // Redirect on failure
  );
};

//Discord login
export const discordLogin = async () => {
  await account.createOAuth2Session(
    "discord",
    `${window.location.origin}/dashboard`, // Redirect on success
    `${window.location.origin}/login` // Redirect on failure
  );
};
