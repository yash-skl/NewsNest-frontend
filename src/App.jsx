import Navbar from "./component/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./auth/Login";
import RegisterPage from "./auth/Register";
import BookmarksPage from "./pages/BookmarksPage";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const { pathname } = useLocation();
  const isAuthPage = pathname === "/login" || pathname === "/register";

  return (
    <div className="min-h-screen bg-[#050814] text-white">
      <Navbar />
      <main className={isAuthPage ? "" : "mx-auto max-w-7xl px-4 py-10"}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/bookmarks"
            element={
              <ProtectedRoute>
                <BookmarksPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;