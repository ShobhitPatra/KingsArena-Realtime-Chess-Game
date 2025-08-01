import { Routes, Route } from "react-router-dom";
import { Game } from "./screens/Game";
import { Home } from "./screens/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  );
}

export default App;
