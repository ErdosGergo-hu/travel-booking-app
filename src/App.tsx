import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuctionsPage from "./pages/AuctionsPage";
import Header from "./components/Header";
import AuctionPage from "./pages/AuctionPage";
import LoginPage from "./components/auth/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <div className="h-screen bg-gray-100 text-gray-900">
        <Header />
        <main className="p-6 overflow-auto px-40 bg-white">
          <Routes>
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
