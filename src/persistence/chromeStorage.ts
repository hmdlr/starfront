import { Paths } from "../redux/paths";

export function storageRetrieve<T>(key: string | null): Promise<T> {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.get(key ? [key] : null, function (result) {
        resolve(key ? result[key] : result);
      });
    } catch (e) {
      reject(e);
    }
  });
}

export function storageStore<T>(key: string, value: T): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.set({ [key]: value }, function () {
        resolve();
      });
    } catch (e) {
      reject(e);
    }
  });
}

export function storageRemove(key: string): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.remove(key, function () {
        resolve();
      });
    } catch (e) {
      reject(e);
    }
  });
}

export async function storageCleanupTTL(): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      const storage = await storageRetrieve<Record<string, any>>(null);
      // get all keys in storage for paths
      const keys = Object.keys(storage)
        .filter((key) => Object.values(Paths).includes(key as any));

      // We'll save the objects here and then recursively clean all properties inside
      // that have expired ttl
      const cleanupObjects: Array<Record<string, any>> = [];

      // loop through each key
      for (const key of keys) {
        cleanupObjects.push(storage[key]);
      }

      // clean up the objects
      await Promise.all(cleanupObjects.map(deleteExpiredTTL));

      // save the cleaned up objects back to storage
      for (const key of keys) {
        await storageRemove(key);
        await storageStore(key, cleanupObjects.shift());
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
}

// This function will recursively clean all properties inside an object that have expired ttl
// Will change the objects in place
async function deleteExpiredTTL<T extends Record<string, any>>(cleanupObject: T): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      const keys = Object.keys(cleanupObject);

      for (const key of keys) {
        if (cleanupObject[key]._ttl && cleanupObject[key]._ttl < Date.now()) {
          delete cleanupObject[key];
        } else if (typeof cleanupObject[key] === "object") {
          await deleteExpiredTTL(cleanupObject[key]);
        }
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
}
