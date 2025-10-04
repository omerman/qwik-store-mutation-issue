export function updateStoreDeep(storeObject: any, updatedObject: any) {
  for (const key in updatedObject) {
    if (updatedObject[key] !== storeObject[key]) {
      if (
        typeof storeObject[key] !== "object" ||
        // Important addition, typeof null is object, but null is also 'primitive' we dont want to initialize it as [] or {}
        storeObject[key] === null ||
        storeObject[key] === undefined ||
        // Also if the updatedObject is falsy, we should simply apply it.
        !updatedObject[key]
      ) {
        storeObject[key] = updatedObject[key];
      } else {
        updateStoreDeep(storeObject[key], updatedObject[key]);
      }
    }
  }

  // Important addition, without it, Array cells could be left empty after a route change.
  if (Array.isArray(storeObject)) {
    if (storeObject.length !== updatedObject.length) {
      storeObject.length = updatedObject.length;
    }
  } else {
    for (const key in storeObject) {
      if (!updatedObject || !(key in updatedObject)) {
        // Ignore functions(QRLs)
        if (typeof storeObject[key] === "function") continue;

        delete storeObject[key];
      }
    }
  }
}
