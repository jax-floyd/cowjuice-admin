// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { MasterContextProvider }   from "./contexts/MasterContext";
import { AnalyticsContextProvider } from "./contexts/AnalyticsContext";

import Ticker         from "./components/Ticker";
import Header         from "./components/Header";
import Footer         from "./components/Footer";

import Transitory     from "./pages/Transitory";

import Revolution     from "./components/Revolution";
import CowJuice       from "./components/CowJuice";

import Scroller       from "./pages/Scroller";
import Error          from "./pages/Error";

import HomeNew          from "./pages/HomeNew";

import Retorted         from "./pages/Retorted";
import Press          from "./pages/Press";
import Questions      from "./pages/Questions";
import Contact        from "./pages/Contact";
import QR             from "./pages/QR";


/* Checkout */
import ContactEntry        from "./pages/checkouts/ContactEntry";
import Payment             from "./pages/checkouts/Payment";

// import Status         from "./pages/orders/Status";

import Products        from "./pages/shopify/Products";
import ProductDetails  from "./pages/shopify/ProductDetails";
import Bag             from "./pages/shopify/Bag";

/* Orders i.e., post-payment, order-placement handling */
import Confirmation from "./pages/orders/Confirmation";
import Status       from "./pages/orders/Status";

/* Internal Cow Juice Inc. Control Panel */
import Login from "./pages/portal/Login";
import Panel from "./pages/portal/Panel";

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
            {/* <Route
              path="/"
              element={
                <div class="flex flex-col min-h-screen p-0">
                  <Ticker />
                  <Header />
                  <Transitory />
                  <Footer />
                </div>
              }
            /> */}

            {/* ---------- storefront ---------- */}
            <Route
              path="/"
              element={
                <div class="flex flex-col min-h-screen p-0">
                  <Ticker />
                  <Header />
                  <CowJuice />
                  <HomeNew />
                  <Retorted />
                  <Revolution />
                  <Footer />
                </div>
              }
            />

            {/* ---------- static ---------- */}
            <Route
              path="/ultra-retorted-milk"
              element={
                <div class="flex flex-col min-h-screen p-0">
                  <Ticker />
                  <Header />
                  <Retorted />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/press"
              element={
                <div class="flex flex-col min-h-screen p-0">
                  <Ticker />
                  <Header />
                  <Press />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/questions"
              element={
                <div class="flex flex-col min-h-screen p-0">
                  <Ticker />
                  <Header />
                  <Questions />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/contact"
              element={
                <div class="flex flex-col min-h-screen p-0">
                  <Ticker />
                  <Header />
                  <Contact />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/qr"
              element={
                <div class="flex flex-col min-h-screen p-0 space-y-4">
                  <QR />
                </div>
              }
            />

            {/* ---------- checkout, payment handling ---------- */}
            <Route 
              path={`/checkouts/:checkoutId/contact-entry/:consumptionCharacterization`}
              element={
                <div class="flex flex-col min-h-screen p-0">
                  <Header />
                  <ContactEntry />
                  <Footer />
                </div>
              }
            />
            <Route 
              path="/checkouts/:checkoutId/payment/:paymentId"
              element={
                <div class="flex flex-col min-h-screen p-0">
                  <Header />
                  <Payment />
                  <Footer />
                </div>
              }
            />

            {/* ---------- order, post-payment handling ---------- */}
            <Route
              path="/orders/:orderId/confirmation"
              element={
                <div class="flex flex-col min-h-screen p-0">
                  <Header />
                  <Confirmation />
                  <Footer />
                </div>
              }
            />
            <Route 
              path="/orders/status/:confirmationNumber?"
              element={
                <div class="flex flex-col min-h-screen p-0">
                  <Header />
                  <Status />
                  <Footer />
                </div>
              }
            />

            {/* ---------- the beginning of the shopify transition, perhaps ---------- */}
            <Route 
              path="/shopify/products"
              element={
                <div class="flex flex-col min-h-screen p-0">
                  <Header />
                  <Products />
                  <Footer />
                </div>
              }
            />
            <Route 
              path="/shopify/products/:productId"
              element={
                <div class="flex flex-col min-h-screen p-0">
                  <Header />
                  <ProductDetails />
                  <Footer />
                </div>
              }
            />
            <Route 
              path="/shopify/bag"
              element={
                <div class="flex flex-col min-h-screen p-0">
                  <Header />
                  <Bag />
                  <Footer />
                </div>
              }
            />

            {/* ---------- internal Cow Juice Inc. control portal ---------- */}
            <Route 
              path="/beta/private/cow-juice-mans-super-secret-internal-control-panel/login"
              element={
                <div class="flex flex-col min-h-screen p-0">
                  <Header />
                  <Login />
                  <Footer />
                </div>
              }
            />
            <Route 
              path="/beta/private/cow-juice-mans-super-secret-internal-control-panel/portal"
              element={
                <div class="flex flex-col min-h-screen p-0">
                  <Header />
                  <Panel />
                  <Footer />
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
