import { getDatabase, ref, update } from 'firebase/database';
import { Database } from "@firebase/database";

export async function updateBasicOperator<Type>(data: object, path: string): Promise<boolean> {
  const db: Database = getDatabase();
  const dbRef = ref(db, path);

  return new Promise((resolve, reject) => {
    try {
      update(dbRef, data)
        .then(() => resolve(true))
        .catch(error => reject(error))
    } catch (e) {
      reject(e);
    }
  });
}