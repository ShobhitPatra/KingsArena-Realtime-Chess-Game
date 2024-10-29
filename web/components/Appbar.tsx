"use client";
import { signIn } from "next-auth/react";
import React from "react";

const Appbar = () => {
  return (
    <div className="mx-auto flex w-full md:py-4 md:px-28 items-center justify-between fixed z-50 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10  border-white border-b border-opacity-20 ">
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
      <div>
        <button
          className="btn btn-outline btn-accent rounded-full px-9 text-lg"
          onClick={() => signIn()}
        >
          login
        </button>
      </div>
    </div>
  );
};

export default Appbar;
