import { getDatabase, ref, child, get, set } from 'firebase/database';

export async function readBasicOperation<Type>(path: string): Promise<never | null | Type> {
  const dbRef = ref(getDatabase());
  const dbChild = child(dbRef, path);

  return new Promise((resolve, reject) => {
    try {
      get(dbChild).then((snapshot) => {
        if (snapshot.exists()) {
          const val = snapshot.val();
          resolve(val);
        } else {
          resolve(null);
        }
      });
    } catch (e) {
      reject(e);
    }
  })
}