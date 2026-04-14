/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Planner from "./pages/Planner";
import Transport from "./pages/Transport";
import Stories from "./pages/Stories";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-bg text-text-main font-sans">
        <Navbar />
        <main className="flex-grow p-6 md:p-10 max-w-[1440px] mx-auto w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/planner" element={<Planner />} />
            <Route path="/transport" element={<Transport />} />
            <Route path="/stories" element={<Stories />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}


