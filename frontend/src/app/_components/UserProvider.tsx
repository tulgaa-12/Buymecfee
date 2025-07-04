"use client";
import {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
  useContext,
} from "react";

import axios from "axios";
import { useRouter } from "next/navigation";

type UserData = {
  userId: string;
};

type AuthContextType = {
  user: UserData | null;
  tokenChecker: (_token: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserData | null>(null);

  const router = useRouter();

  const tokenChecker = async (token: string) => {
    try {
      const response = await axios.post("http://localhost:8000/user/verify", {
        token: token,
      });
      setUser({
        userId: response.data.destruck.userId,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenChecker(token);
    } else {
      // router.push("/login");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, tokenChecker }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext<AuthContextType>(AuthContext);
