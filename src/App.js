// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { MasterContextProvider }   from "./contexts/MasterContext";
import { AnalyticsContextProvider } from "./contexts/AnalyticsContext";

import Header         from "./components/Header";
import Footer         from "./components/Footer";

import Interstitial   from "./pages/Interstitial";
import Transitory     from "./pages/Transitory";

import Retort         from "./components/Retort";

import Scroller       from "./pages/Scroller";
import Error          from "./pages/Error";
import Home           from "./pages/Home";
// import Preorder       from "./pages/Preorder";
// import Thanks         from "./pages/Thanks";
// import Welcome        from "./pages/Welcome";
import HomeNew          from "./pages/HomeNew";
// import Products       from "./pages/Products";
// import ProductDetails from "./pages/ProductDetails";
// import Bag            from "./pages/Bag";
import Press          from "./pages/Press";
import Questions      from "./pages/Questions";
import Contact        from "./pages/Contact";
import QR             from "./pages/QR";


/* Checkout */
import ContactEntry        from "./pages/checkouts/ContactEntry";
import Payment from "./pages/checkouts/Payment";

// import Status         from "./pages/orders/Status";

import Products        from "./pages/shopify/Products";
import ProductDetails  from "./pages/shopify/ProductDetails";
import Bag        from "./pages/shopify/Bag";

/* Orders i.e., post-payment, order-placement handling */
import Confirmation from "./pages/orders/Confirmation";
import Status       from "./pages/orders/Status";

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
            <Route
              path="/"
              element={
                <div class="flex flex-col w-screen h-screen">
                  <Header />
                  <Transitory />
                </div>
              }
            />

            {/* ---------- storefront ---------- */}
            {/* <Route
              path="/"
              element={
                <div class="flex flex-col min-h-screen p-0 space-y-4">
                  <Header />
                  <HomeNew />
                  <Retort />
                  <Footer />
                </div>
              }
            /> */}

            {/* ---------- static ---------- */}
            {/* <Route
              path="/press"
              element={
                <div class="flex flex-col min-h-screen p-0 space-y-4">
                  <Header />
                  <Press />
                  <Footer />
                </div>
              }
            /> */}
            <Route
              path="/questions"
              element={
                <div class="flex flex-col min-h-screen p-0 space-y-4">
                  <Header />
                  <Questions />
                  <Footer />
                </div>
              }
            />
            {/* <Route
              path="/contact"
              element={
                <div class="flex flex-col min-h-screen p-0 space-y-4">
                  <Header />
                  <Contact />
                  <Footer />
                </div>
              }
            /> */}
            <Route
              path="/qr"
              element={
                <div class="flex flex-col min-h-screen p-0 space-y-4">
                  <QR />
                </div>
              }
            />

            {/* ---------- checkout, payment handling ---------- */}
            {/* <Route 
              path={`/checkouts/:checkoutId/contact-entry/:consumptionCharacterization`}
              element={
                <div class="flex flex-col min-h-screen p-0 space-y-4">
                  <Header />
                  <ContactEntry />
                  <Footer />
                </div>
              }
            />
            <Route 
              path="/checkouts/:checkoutId/payment/:paymentId"
              element={
                <div class="flex flex-col min-h-screen p-0 space-y-4">
                  <Header />
                  <Payment />
                  <Footer />
                </div>
              }
            /> */}

            {/* ---------- order, post-payment handling ---------- */}
            {/* <Route
              path="/orders/:orderId/confirmation"
              element={
                <div class="flex flex-col min-h-screen p-0 space-y-4">
                  <Header />
                  <Confirmation />
                  <Footer />
                </div>
              }
            />
            <Route 
              path="/orders/status/:confirmationNumber?"
              element={
                <div class="flex flex-col min-h-screen p-0 space-y-4">
                  <Header />
                  <Status />
                  <Footer />
                </div>
              }
            /> */}

            {/* ---------- the beginning of the shopify transition, perhaps ---------- */}
            {/* <Route 
              path="/shopify/products"
              element={
                <div class="flex flex-col min-h-screen p-0 space-y-4">
                  <Header />
                  <Products />
                  <Footer />
                </div>
              }
            />
            <Route 
              path="/shopify/products/:productId"
              element={
                <div class="flex flex-col min-h-screen p-0 space-y-4">
                  <Header />
                  <ProductDetails />
                  <Footer />
                </div>
              }
            />
            <Route 
              path="/shopify/bag"
              element={
                <div class="flex flex-col min-h-screen p-0 space-y-4">
                  <Header />
                  <Bag />
                  <Footer />
                </div>
              }
            /> */}
            
          </Routes>
        </div>
      </AnalyticsContextProvider>
    </MasterContextProvider>
  </Router>
);

export default App;
