export function storageRetrieve<T>(key: string): Promise<T> {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.get([key], function (result) {
        resolve(result[key]);
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
