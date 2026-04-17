import { Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin"
import InternalSupplier from "./Pages/InteralSupplierpage"
import LearningHub from "./Pages/LearningHub"

import Home from "./Pages/Home";
import Messages from "./Pages/Messages"

import Suppliers from "./Pages/Suppliers";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup/>} />
        <Route path="/LearningHub" element={<LearningHub/>} />
       <Route path="/InternalSupplier" element={<InternalSupplier/>} />
              <Route path="/Messages" element={<Messages/>} />
      <Route path="/Suppliers" element={<Suppliers/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/Signin" element={<Signin/>} />
    </Routes>
  );
}

export default App;