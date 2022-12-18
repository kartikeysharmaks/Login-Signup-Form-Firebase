import { Route, Routes} from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="App">
      <div className="max-w-[90%] md:max-w-[50%] mx-auto">
        <Routes>
          <Route element={<Login/>} path="/login"/>
          <Route element={<Register/>} path="/register"/>
          <Route element={<HomePage/>} path="/"/>
          <Route element={<Profile/>} path="/profile" />
        </Routes>
      </div>
    </div>
  );
};

export default App;