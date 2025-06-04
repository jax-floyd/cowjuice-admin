import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { MasterContextProvider }   from "./contexts/MasterContext";
import { AnalyticsContextProvider } from "./contexts/AnalyticsContext";

/* Master Components */
import Ticker         from "./components/Ticker";
import Header         from "./components/Header";
import Footer         from "./components/Footer";

/* Helpers */
import Scroller       from "./pages/Scroller";
import Error          from "./pages/Error";


/* Internal Cow Juice Inc. Control Panel */
import Dashboard      from "./pages/Dashboard";
import Login from "./pages/Login";
import Fulfill from "./pages/Fulfill";
import Beta from "./pages/Beta";

const App = () => (
  <Router>
    <MasterContextProvider>
      <AnalyticsContextProvider>
        <Scroller />   {/* helper component to catch all navs & scroll to top of each newly navigated to page */}
        <div class="bg-white text-black dark:bg-black dark:text-white overflow-hidden">
   
          {/* ─────────────── all non-checkout pages ─────────────── */}
          <Routes>
            <Route
              path="*"
              element={
                <div class="flex flex-col min-h-screen p-4 space-y-4">
                  <Error />
                </div>
              }
            />
            
            {/* ---------- internal Cow Juice Inc. control portal; we will add auth ---------- */}
            <Route 
              path="/"
              element={
                <div class="flex flex-col min-h-screen p-0">
                  <Ticker />
                  <Header />
                  <Dashboard />
                  <Footer />
                  <Ticker />
                </div>
              }
            />
            <Route 
              path="/login"
              element={
                <div class="flex flex-col min-h-screen p-0">
                  <Header />
                  <Login />
                  <Footer />
                  <Ticker />
                </div>
              }
            />
            <Route 
              path="/fulfill"
              element={
                <div class="flex flex-col min-h-screen p-0">
                  <Ticker />
                  <Header />
                  <Fulfill />
                  <Footer />
                  <Ticker />
                </div>
              }
            />
            <Route 
              path="/beta/manage"
              element={
                <div class="flex flex-col min-h-screen p-0">
                  <Ticker />
                  <Header />
                  <Beta />
                  <Footer />
                  <Ticker />
                </div>
              }
            />

          </Routes>
        </div>
      </AnalyticsContextProvider>
    </MasterContextProvider>
  </Router>
);

export default App;
