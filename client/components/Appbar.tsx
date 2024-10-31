"use client";
import { useAuthenticatedUser } from "@/context/AuthenticatedUserContext";
import { signIn, signOut } from "next-auth/react";
import { IoMdLogOut } from "react-icons/io";
import React from "react";

const Appbar = () => {
  const { user } = useAuthenticatedUser();

  return (
    <div className="mx-auto flex w-full py-4 px-28 items-center justify-between fixed z-50 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10  border-white border-b border-opacity-20 ">
      <div className="flex gap-2">
        <div className="flex justify-center items-center ">
          <img className="md:h-12 md:p-2 " src="chess-solid.svg"></img>
        </div>
        <h1>
          <span className="md:text-4xl font-extrabold label text-white ">
            King{"'"}s <span className="text-green-500 p-2">Arena</span>
          </span>
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <div>
          {user ? (
            <Avatar name={user.name} email={user.email} image={user.image} />
          ) : null}
        </div>
        {!user ? <LoginButton /> : <LogoutButton />}
      </div>
    </div>
  );
};

const LoginButton = () => {
  return (
    <button
      className="btn btn-outline btn-accent rounded-full px-9 text-lg"
      onClick={() => signIn()}
    >
      login
    </button>
  );
};

const LogoutButton = () => {
  return (
    <>
      {}
      <IoMdLogOut
        className="size-7 text-white hover:size-8"
        onClick={() => signOut()}
      />
    </>
  );
};

const Avatar = ({
  name,
  email,
  image,
}: {
  name: string | null | undefined;
  email: string | null | undefined;
  image: string | null | undefined;
}) => {
  return (
    <div className="text-center ">
      <div className="avatar">
        <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring ring-offset-2  ">
          <img src={`${image}`} />
        </div>
      </div>
      <div>{name}</div>
    </div>
  );
};

export default Appbar;
