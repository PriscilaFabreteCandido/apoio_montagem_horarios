export interface UserData {
  login: string;
  token: string;
  userType: string;
}

export class User {
  login: string;
  token: string;
  userType: string;

  constructor(userData: UserData) {
      this.login = userData.login;
      this.token = userData.token;
      this.userType = userData.userType;
  }

}

export const saveLoggedInUser = (user: User): void => {
  localStorage.setItem('userLogado', JSON.stringify(user));
};

export const getLoggedInUser = (): User | null => {
  const userJSON = localStorage.getItem('userLogado');
  if (userJSON) {
    return JSON.parse(userJSON);
  } else {
    return null;
  }
};

export const clearLoggedInUser = (): void => {
  localStorage.removeItem('userLogado');
};