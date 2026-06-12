import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuctionsPage from "./pages/AuctionsPage";
import Header from "./components/Header";
import AuctionPage from "./pages/AuctionPage";
import LoginPage from "./components/auth/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import RegisterPage from "./components/auth/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import AuctionCreatePage from "./components/auction/AuctionCreatePage";
import { ProfileUpdatePage } from "./components/auth/ProfileUpdatePage";

function App() {
  return (
    <BrowserRouter>
      <div className="h-screen">
        <Header />
        <main className="min-h-full p-6 overflow-auto px-40 bg-[#0D0D0D]">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/auctions" element={<AuctionsPage />} />
            <Route path="/auction/:id" element={<AuctionPage />} />
            <Route path="/auctions/create" element={<AuctionCreatePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/update" element={<ProfileUpdatePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
