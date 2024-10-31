"use client";

import { User } from "next-auth";
import React, { useContext, useEffect, useState } from "react";

interface AuthenticatedUserContextType {
  user: User | null;
  loading: boolean;
}

const AuthenticatedUserContext =
  React.createContext<AuthenticatedUserContextType>({
    user: null,
    loading: true,
  });

interface AuthenticatedUserContextI {
  children: React.ReactNode;
}

export const AuthenticatedUserContextProvider = ({
  children,
}: AuthenticatedUserContextI) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("api/user");
        const data = await res.json();
        if (data) {
          setUser(data.user);
        }
      } catch (error) {
        console.log("error while fetching auth user ", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthenticatedUserContext.Provider value={{ user, loading }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

export const useAuthenticatedUser = () => {
  const context = useContext(AuthenticatedUserContext);
  if (!context) {
    throw new Error(
      "useAuthenticatedUser must be used within an AuthenticatedUserContextProvider"
    );
  }
  return context;
};
