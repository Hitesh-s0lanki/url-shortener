import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home/page";
import AuthModal from "./modals/auth-dialog";
import DashboardPage from "./pages/dashboard/page";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { JSX } from "react";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = useSelector((state: RootState) => state.auth.token);
  return token ? children : <Navigate to="/" replace />;
}

function App() {
  const token = useSelector((state: RootState) => state.auth.token);

  return (
    <>
      <BrowserRouter>
        <AuthModal />
        <Routes>
          {/* Redirect home if authenticated */}
          <Route path="/" element={<HomePage />} />

          {/* Dashboard protected */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Catch-all redirect based on auth */}
          <Route
            path="*"
            element={<Navigate to={token ? "/dashboard" : "/"} replace />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
