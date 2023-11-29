import { User } from "next-auth";

interface CustomUser extends User {
  id: string;
  email: string;
}

type AuthResponse = {
  user: CustomUser;
  token: string;
};

export const authenticate = (email: string, password: string): AuthResponse => {
  return {
    user: {
      id: "123",
      email: email,
    },
    token: "12345",
  };
};
