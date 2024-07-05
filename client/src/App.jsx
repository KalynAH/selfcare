import { useContext } from "react";
import { AuthContext } from "./context/AuthProvider";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import ProtectedEditSelfcare from "./protected/ProtectedEditSelfcare";
import ProtectedNewSelfcare from "./protected/ProtectNewSelfcare";
import ProtectedOneSelfcare from "./protected/ProtectedOneSelfcare";
import RegisterForm from "./components/RegisterForm";

import ProtectedAllSelfcares from "./components/ProtectedAllSelfcares";
import UserBar from "./components/Userbar";

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <>
      <Navbar />
      {isAuthenticated && <UserBar />}
      <main className="container py-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/selfcares" element={<ProtectedAllSelfcares />} />
          <Route path="/selfcares/:id" element={<ProtectedOneSelfcare />} />
          <Route path="/selfcares/new" element={<ProtectedNewSelfcare />} />
          <Route
            path="/selfcares/:id/edit"
            element={<ProtectedEditSelfcare />}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
