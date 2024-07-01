import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import { editSelfcare } from "./services/selfcare_service";
import OneSelfcare from "./components/OneSelfcare";
import NewSelfcare from "./components/NewSelfcare";
import EditSelfcare from "./components/EditSelfcare";
import RegisterForm from "./components/RegisterForm";
import AuthProvider from "./context/AuthContext";

import ProtectedAllSelfcares from "./components/ProtectedAllSelfcares";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <main className="container py-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/selfcares" element={<ProtectedAllSelfcares />} />
          <Route path="/selfcares/:id" element={<OneSelfcare />} />
          <Route path="/selfcares/new" element={<NewSelfcare />} />
          <Route
            path="/selfcares/:id/edit"
            element={<EditSelfcare />}
            submitFunction={editSelfcare}
          />
        </Routes>
      </main>
    </AuthProvider>
  );
}

export default App;
