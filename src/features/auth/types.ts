export interface User {
  id: string;
  //   name: string;
}

export type SignupDto = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginDto = {
  email: string;
  password: string;
};
