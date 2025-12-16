import CryptoJS from "crypto-js";

const SECRET_KEY = "your-secret-key";

export const useCryptoLocalStorage = (
  storageKey,
  type,
  objectKey = null,
  valueToStore = null
) => {
  const getDecryptedData = () => {
    const encryptedData = window.localStorage.getItem(storageKey);
    if (!encryptedData) return {};
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData || "{}");
  };

  if (type === "set") {
    // If objectKey is null, set the whole object
    const newData = objectKey
      ? { ...getDecryptedData(), [objectKey]: valueToStore }
      : valueToStore;
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(newData),
      SECRET_KEY
    ).toString();
    window.localStorage.setItem(storageKey, encryptedData);
  } else if (type === "get") {
    const currentData = getDecryptedData();
    return objectKey ? currentData[objectKey] ?? null : currentData;
  }
};

