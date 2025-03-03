import { isValidCUID } from "./defaultFunctions";

const STORAGE_KEY = "accessToken";

const isLogged = () => sessionStorage.getItem(STORAGE_KEY) !== null;

const login = (token: string, callback: () => void) => {
    if (!isValidCUID(token)) {
      callback();
      return;
    }
    sessionStorage.setItem(STORAGE_KEY, token);
    // window.location.href = "/dashboard";
  };

const getToken = () => {
    return sessionStorage.getItem(STORAGE_KEY);
}

const logout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    window.location.href = "/";
}


export { isLogged, login, getToken, logout }