import { Routes, Route } from "react-router-dom";
import { Game } from "./screens/Game";
import { Home } from "./screens/Home";
import { Signup } from "./components/signup/Signup";
import { Signin } from "./components/signin/Signin";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  );
}

export default App;
