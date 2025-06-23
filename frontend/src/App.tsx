import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import Register from "./components/Login/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Post from "./components/Post/Post";
import Layout from "./layout/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/post/:id" element={<Post />} />
        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;
