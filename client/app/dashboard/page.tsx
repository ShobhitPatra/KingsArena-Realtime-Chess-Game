"use client ";
import { useAuthenticatedUser } from "@/context/AuthenticatedUserContext";
import React from "react";
// Adjust the import path

const Dashboard: React.FC = () => {
  const { user, loading } = useAuthenticatedUser();

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No user found. Please sign in.</p>;

  return <h1 className="text-center">Welcome, {user.name}!</h1>;
};

export default Dashboard;
