import { useSyncExternalStore } from "react";

export const EMAIL_STORAGE_KEY = "yadm-user-email" as const;
export const AUTH_KEY_STORAGE_KEY = "yadm-auth-key" as const;
export const PASSWORD_STORAGE_KEY = "yadm-pwd" as const;

const getUserEmailDataFromStorage = () =>
  localStorage.getItem(EMAIL_STORAGE_KEY);

const getUserAuthKeyDataFromStorage = () =>
  localStorage.getItem(AUTH_KEY_STORAGE_KEY);

const getUserPasswordDataFromStorage = () =>
  localStorage.getItem(PASSWORD_STORAGE_KEY);

const subscribe = (callback: () => void): (() => void) => {
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("storage", callback);
  };
};

const useUserStore = () => {
  const email = useSyncExternalStore(subscribe, getUserEmailDataFromStorage);
  const authKey = useSyncExternalStore(
    subscribe,
    getUserAuthKeyDataFromStorage
  );
  const password = useSyncExternalStore(
    subscribe,
    getUserPasswordDataFromStorage
  );

  const setEmail = (email: string | null) => {
    if (email === null) {
      localStorage.removeItem(EMAIL_STORAGE_KEY);
    } else {
      localStorage.setItem(EMAIL_STORAGE_KEY, email);
    }
    window.dispatchEvent(new Event("storage"));
  };

  const setAuthKey = (authKey: string | null) => {
    if (authKey === null) {
      localStorage.removeItem(AUTH_KEY_STORAGE_KEY);
    } else {
      localStorage.setItem(AUTH_KEY_STORAGE_KEY, authKey);
    }
    window.dispatchEvent(new Event("storage"));
  };

  const setPassword = (password: string | null) => {
    if (password === null) {
      localStorage.removeItem(PASSWORD_STORAGE_KEY);
    } else {
      localStorage.setItem(PASSWORD_STORAGE_KEY, password);
    }
    window.dispatchEvent(new Event("storage"));
  };

  return {
    user: { email, authKey, password },
    isAuthenticated: !!authKey,
    setEmail,
    setAuthKey,
    setPassword,
  };
};

export default useUserStore;
