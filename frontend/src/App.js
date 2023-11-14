import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Upload from "./components/Upload";
import RegistrationPage from "./components/RegistrationPage";
import LoginPage from "./components/LoginPage";

import RequireAuth from "./components/RequireAuth";
import RedirectRoute from "./components/RedirectRoute";
import PersistLogin from "./components/persistLogin";
import Missing from "./components/Missing";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<PersistLogin />}>
          {/* public route */}
          <Route element={<RedirectRoute />}>
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>

          {/* private route */}

          <Route element={<RequireAuth />}>
            <Route path="/" element={<Upload />} />
          </Route>
        </Route>

        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
