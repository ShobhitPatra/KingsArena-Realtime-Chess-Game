import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="bg-slate-950 h-screen md:pt-40 space-y-4 ">
      {/* heading */}
      <div className="flex-col justify-center items-center space-y-4  ">
        <div className="text-center">
          <span className="md:text-lg text-slate-300 ">Welcome to </span>
        </div>
        <div className="text-center">
          <span className="span md:text-7xl font-extrabold text-slate-50">
            King{"'"}s <span className="text-green-500">Arena</span>
          </span>
        </div>
        <div className="text-center">
          <span>
            Enter the realm of strategy and outsmart your opponents.Rise to
            <br></br>claim your crown in the ultimate chess battleground.
          </span>
        </div>
      </div>
      {/* image and buttons */}
      <div>
        <div className="flex justify-center flex-wrap">
          <img
            alt="chessboard"
            className="md:w-1/5 rounded-md mx-6"
            src="chessboard.jpeg"
          ></img>

          <div className="flex-col">
            <div className="pt-8  mb-4">
              <img
                alt="chess-peice"
                className="md:w-44 md:p-4 animate-bounce "
                src="chess-solid.svg"
              ></img>
            </div>

            <button className="btn btn-success my-2  w-full  md:text-2xl text-slate-200 border-lg border-black ">
              Play Random
            </button>

            <button className="btn btn-success my-2 w-full  md:text-2xl text-slate-200 border-lg border-black ">
              Play Friend
            </button>
          </div>
        </div>
      </div>
      {/* additional details  */}
    </div>
  );
};

export default Hero;
