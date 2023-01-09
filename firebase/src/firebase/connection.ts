import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';

import { FirebaseConfig } from "./config/firebase.config";

export const app = initializeApp(FirebaseConfig);
export const database = getDatabase(app);