import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuctionsPage from "./pages/AuctionsPage";
import Header from "./components/Header";
import AuctionPage from "./pages/AuctionPage";
import LoginPage from "./components/auth/LoginPage";
import DashboardPage from "./pages/DashboardPage";

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
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
