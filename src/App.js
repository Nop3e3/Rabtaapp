import { Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin"
import Home from "./Pages/Home";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/Signin" element={<Signin/>} />
    </Routes>
  );
}

export default App;