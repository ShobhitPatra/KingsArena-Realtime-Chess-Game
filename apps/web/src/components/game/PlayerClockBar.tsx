import { useEffect, useState } from "react";

interface PlayerTimerProps {
  name: string | undefined;
  initialTime: number;
  isActive: boolean;
}

function PlayerTimer({ name, initialTime, isActive }: PlayerTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isActive]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex justify-center items-center gap-2 p-2">
      <span className="font-semibold text-gray-800">{name}</span>
      <span className="font-mono text-lg font-bold text-black ">
        {minutes}:{seconds.toString().padStart(2, "0")}
      </span>
    </div>
  );
}

export function PlayerClockBar({
  whiteName,
  blackName,
  whiteTime,
  blackTime,
  activeColor,
}: {
  whiteName: string | undefined;
  blackName: string | undefined;
  blackTime: number;
  whiteTime: number;

  activeColor: "w" | "b";
}) {
  return (
    <div className="flex gap-2 w-full mx-auto bg-gray-300">
      <div className="flex justify-start w-1/2">
        <PlayerTimer
          name={blackName}
          initialTime={blackTime}
          isActive={activeColor === "b"}
        />
      </div>
      <div className="flex justify-end w-1/2">
        <PlayerTimer
          name={whiteName}
          initialTime={whiteTime}
          isActive={activeColor === "w"}
        />
      </div>
    </div>
  );
}
