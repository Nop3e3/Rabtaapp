import { Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import InternalSupplier from "./Pages/InteralSupplierpage";
import LearningHub from "./Pages/LearningHub";
import Community from "./Pages/Community";
import Home from "./Pages/Home";
import Messages from "./Pages/Messages";
import Suppliers from "./Pages/Suppliers";

function App() {
  return (
    <Routes>
      <Route path="/"                element={<Signup />}           />
      <Route path="/Signin"          element={<Signin />}           />
      <Route path="/home"            element={<Home />}             />
      <Route path="/Suppliers"       element={<Suppliers />}        />
      <Route path="/InternalSupplier"element={<InternalSupplier />} />
      <Route path="/LearningHub"     element={<LearningHub />}      />
      <Route path="/Community"       element={<Community />}        />
      <Route path="/Messages"        element={<Messages />}         />
    </Routes>
  );
}

export default App;