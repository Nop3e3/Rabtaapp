import { Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import InternalSupplier from "./Pages/InteralSupplierpage";
import InternalCommunity from "./Pages/IternalCommunity";
import LearningHub from "./Pages/LearningHub";
import Community from "./Pages/Community";
import Home from "./Pages/Home";
import Form1 from "./Pages/Form1";
import Form2 from "./Pages/Form2";
import Form3 from "./Pages/Form3";
import Mentor from "./Pages/Mentors";
import Messages from "./Pages/Messages";
import Suppliers from "./Pages/Suppliers";
import Course from "./Pages/Course";
import MentorInternal from "./Pages/MentorInternalpage";
function App() {
  return (
    <Routes>
      <Route path="/"                element={<Signup />}           />
       <Route path="/Course"                element={<Course />}           />
      <Route path="/Signin"          element={<Signin />}           />
      <Route path="/home"            element={<Home />}             />
     <Route path="/Form1"            element={<Form1 />}             />
       <Route path="/Form2"            element={<Form2 />}             />
        <Route path="/Form3"            element={<Form3 />}             />
      <Route path="/MentorInternal"            element={<MentorInternal />} />
      <Route path="/InternalCommunity"            element={<InternalCommunity />}             />
      <Route path="/Mentors"            element={<Mentor/>}             />
      <Route path="/Suppliers"       element={<Suppliers />}        />
      <Route path="/InternalSupplier"element={<InternalSupplier />} />
      <Route path="/LearningHub"     element={<LearningHub />}      />
      <Route path="/Community"       element={<Community />}        />
      <Route path="/Messages"        element={<Messages />}         />
    </Routes>
  );
}

export default App;