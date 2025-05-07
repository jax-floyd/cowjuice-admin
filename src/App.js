// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { MasterContextProvider }   from "./contexts/MasterContext";
import { AnalyticsContextProvider } from "./contexts/AnalyticsContext";

import Header         from "./components/Header";
import Footer         from "./components/Footer";

import Error          from "./pages/Error";
import Home           from "./pages/Home";
// import Preorder       from "./pages/Preorder";
// import Thanks         from "./pages/Thanks";
// import Welcome        from "./pages/Welcome";
import Order          from "./pages/Order";
// import Products       from "./pages/Products";
// import ProductDetails from "./pages/ProductDetails";
// import Bag            from "./pages/Bag";
import About          from "./pages/About";
import Contact        from "./pages/Contact";


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
                  <Home />
                </div>
              }
            />

            {/* <Route
              path="/preorder"
              element={
                <div class="flex flex-col min-h-screen p-4 space-y-4 overflow-hidden">
                  <Preorder />
                </div>
              }
            />

            <Route
              path="/thanks"
              element={
                <div class="flex flex-col min-h-screen p-4 space-y-4">
                  <Thanks />
                </div>
              }
            />

            <Route
              path="/welcome"
              element={
                <div class="flex flex-col min-h-screen p-4 space-y-4">
                  <Welcome />
                </div>
              }
            /> */}

            {/* ---------- storefront ---------- */}
            <Route
              path="/order"
              element={
                <div class="flex flex-col min-h-screen p-0 space-y-4">
                  <Header />
                  <Order />
                  <Footer />
                </div>
              }
            />

            {/* <Route
              path="/products"
              element={
                <div class="flex flex-col min-h-screen p-0 space-y-4">
                  <Header />
                  <Products />
                </div>
              }
            /> */}

            {/* <Route
              path="/products/:productId"
              element={
                <div class="flex flex-col min-h-screen p-0 space-y-4">
                  <Header />
                  <ProductDetails />
                </div>
              }
            /> */}

            {/* <Route
              path="/bag"
              element={
                <div class="flex flex-col min-h-screen p-0 space-y-4">
                  <Header />
                  <Bag />
                </div>
              }
            /> */}

            {/* ---------- static ---------- */}
            <Route
              path="/about"
              element={
                <div class="flex flex-col min-h-screen p-0 space-y-4">
                  <Header />
                  <About />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/contact"
              element={
                <div class="flex flex-col min-h-screen p-0 space-y-4">
                  <Header />
                  <Contact />
                  <Footer />
                </div>
              }
            />

            {/* ---------- checkout, payment handling ---------- */}
          
            <Route 
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
            />

            {/* ---------- order, post-payment handling ---------- */}
            <Route
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
            />

            {/* ---------- the beginning of the shopify transition, perhaps ---------- */}
            <Route 
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
            />
            
          </Routes>

          
          

        </div>
      </AnalyticsContextProvider>
    </MasterContextProvider>
  </Router>
);

export default App;
