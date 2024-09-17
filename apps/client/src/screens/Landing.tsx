import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen bg-slate-950 flex justify-center items-center ">
      <div className="bg-slate-900 flex md:h-[34rem] md:w-[70rem] ">
        <div className=" w-1/2 flex">
          <img src="chessboard.jpeg" className="w-full"></img>
        </div>
        <div className="flex flex-col w-1/2  ">
          <h2 className="flex justify-center items-center p-3 md:mb-10">
            <span className="text-4xl font-bold">Chess Platform</span>
          </h2>
          <Button
            onClickHandler={() => {
              navigate("/game");
            }}
            buttonLabel="PLAY ONLINE"
          />
          <Button
            buttonLabel="PLAY ONLINE"
            onClickHandler={() => {
              console.log("sdflkhfh");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
