import { getDatabase, ref, set } from 'firebase/database';
import { Database } from "@firebase/database";

export async function writeBasicOperation<Type>(data: Type, path: string): Promise<boolean> {
  const db: Database = getDatabase();
  const dbRef = ref(db, path);

  return new Promise((resolve, reject) => {
    try {
      set(dbRef, data)
        .then(() => resolve(true))
        .catch(error => reject(error));
    } catch (e) {
      reject(e);
    }
  })
}