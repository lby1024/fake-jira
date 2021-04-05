import { http } from 'utils/http';

export interface IUserInfo {
    id: number;
    name: string;
    email: string;
    title: string;
    organization: string;
    token: string;
}
export interface UserForm {
    username: string,
    password: string
}

const apiUrl = process.env.REACT_APP_API_URL;

class User {

    static localStorageKey = "__auth_provider_token__";

    static login(data: UserForm) {
        return fetch(`${apiUrl}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }).then(async (response) => {
            if (response.ok) {
              return User.handleRes(await response.json());
            } else {
              return Promise.reject(await response.json());
            }
          });
    }

    static registry(data: UserForm) {
        return fetch(`${apiUrl}/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }).then(async (response) => {
            if (response.ok) {
              return User.handleRes(await response.json());
            } else {
              return Promise.reject(await response.json());
            }
          });
    }

    static async logout() {
        window.localStorage.removeItem(User.localStorageKey);
    }

    static handleRes({ user }: { user: IUserInfo }) {
        window.localStorage.setItem(User.localStorageKey, user.token || "");
        return user;
    }

    static getToken() {
      return window.localStorage.getItem(User.localStorageKey);
    }

    static async bootstrapUser() {
      let user = null;
      const token = User.getToken();
      if (token) {
        const data = await http("me", { token });
        user = data.user;
      }
      return user;
    }
}

export default User