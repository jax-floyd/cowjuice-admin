import React, { useState, useEffect, useRef, useMemo } from "react";

import OrderModal from "../components/OrderModal";

import triggerPostToFetchOrders from "../functions/shopify/triggerPostToFetchOrders";

const Fulfill = () => {
  const portalRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [orders, setOrders] = useState([]);
  const [modal, setModal] = useState(null);

  // Animate-in on scroll
  useEffect(() => {
    const el = portalRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const anim = (cls) => (visible ? cls : "opacity-0");

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true); // Always set loading to true at the beginning
      try {
        const data = await triggerPostToFetchOrders();

        setTimeout(() => {
          if (!data || !Array.isArray(data)) {
            console.error("Invalid data format:", data);
            setLoading(false); // still turn off loading here in case of bad data
            return;
          }
          setOrders(data);
          setLoading(false); // 🔁 move this inside setTimeout
        }, 500);
      } catch (e) {
        console.error("Failed to fetch orders:", e);
        setLoading(false); // handle errors properly
      }
    };


    fetchOrders();
    const interval = setInterval(fetchOrders, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const [activeTab, setActiveTab] = useState("unfulfilled");
  // A simplifcation for now
  const tabs = useMemo(() => ({
    all: orders,
    unfulfilled: orders.filter(order => !order.fulfillment_status),
    fulfilled: orders.filter(order => order.fulfillment_status === "fulfilled"),
  }), [orders]);
  const btnBase = `flex w-full items-center justify-center font-mono text-[10px] sm:text-xs uppercase font-bold py-2 px-3 rounded-lg border-[0.5px] transition-colors duration-300`;
  const btnIdle = 'bg-white text-black border-black hover:bg-black hover:text-white';
  const btnActive = 'bg-cowjuice-gold text-white border-cowjuice-gold';


  return (
    <>
      {modal && (
        <>
            {/* dim + blur the page beneath */}
            <div className="fixed inset-0 z-40 animate-fade animate-delay-[0ms]" />
            {/* modal itself has higher z-index */}
            <OrderModal
                onUnlock={() => setModal(null)}
                order={modal}
                class="z-50"          // give the modal a higher z if needed
            />
        </>
      )}
      <div
        ref={portalRef}
        className="inset-0 flex flex-row items-start justify-center flex-1 min-h-screen pt-12 px-6 pb-6 w-full h-full overflow-hidden"
      >
        <div className="flex flex-1 max-w-6xl mx-auto w-full h-full">
          <div
            className={anim(
              "flex flex-col-reverse sm:grid gap-8 sm:grid-cols-3 h-full items-start justify-center animate-fade"
            )}
          >
            {/* ─── Left Side Footnote Panel ─── */}
            <div className={anim("flex flex-col flex-1 w-full h-full border-[0.5px] border-black rounded-sm items-start justify-between space-y-4 p-2 sm:p-4 animate-fade-up sm:animate-fade-left")}>
              {/* ─── Fulfillment Summary Section ─── */}
              <div className="pt-2 w-full space-y-4">
                
                
              <div className="flex flex-1 flex-col items-start w-full space-y-1">
                <p className="text-[10px] font-mono uppercase leading-3 font-bold">
                  View and manage Cow Juice orders by fulfillment status.
                </p>
                <div className="flex flex-col items-end justify-center w-full space-y-1 pt-2">
                  <div className="flex flex-col w-full space-y-1">
                    <button
                        onClick={() => setActiveTab("all")}
                        className={`${btnBase} ${activeTab === "all" ? btnActive : btnIdle}`}
                      >
                        All Orders [{tabs.all.length}]
                      </button>
                      <button
                        onClick={() => setActiveTab("unfulfilled")}
                        className={`${btnBase} ${activeTab === "unfulfilled" ? btnActive : btnIdle}`}
                      >
                        Unfulfilled Orders [{tabs.unfulfilled.length}]
                      </button>
                      <button
                        onClick={() => setActiveTab("fulfilled")}
                        className={`${btnBase} ${activeTab === "fulfilled" ? btnActive : btnIdle}`}
                      >
                        Fulfilled Orders [{tabs.fulfilled.length}]
                      </button>
                    </div>
                  </div>
                  <button
                    // onClick={() => setActiveTab("archived")}
                    className={`${btnBase} ${activeTab === "archived" ? btnActive : btnIdle}`}
                  >
                    Archived Orders [{tabs.archived?.length}]
                  </button>
                </div>
                <div 
                  onClick={() => setActiveTab("unfulfilled")}
                  class="flex flex-col space-y-1 py-4 px-2 border-[0.5px] border-black rounded-xl bg-cowjuice-gold/10 animate-pulse hover:cowjuice-red transition-colors duration-300 w-full cursor-pointer"
                >
                  <p className="font-mono text-[10px] uppercase leading-3 font-bold">
                    Fulfillment To-Do Summary
                  </p>
                  {(() => {
                    const unfulfilledOrders = tabs.unfulfilled;
                    let sixPacks = 0, eightPacks = 0, twelvePacks = 0;

                    unfulfilledOrders.forEach(order => {
                      order.line_items?.forEach(item => {
                        const name = item.name?.toLowerCase() || "";
                        const qty = item.quantity;
                        if (name.includes("12")) twelvePacks += qty;
                        else if (name.includes("8")) eightPacks += qty;
                        else sixPacks += qty;
                      });
                    });

                    return (
                      <div className="font-mono uppercase text-[10px] leading-tight space-y-[1px]">
                        <p>6-Packs to Fulfill: {sixPacks}</p>
                        <p>8-Packs to Fulfill: {eightPacks}</p>
                        <p>12-Packs to Fulfill: {twelvePacks}</p>
                      </div>
                    );
                  })()}
                </div>
              </div>
              
              <p className="font-mono py-2 text-[10px] leading-3 uppercase opacity-60 border-t-[0.5px] border-black">
                Internal use only. Powered by Cow Juice fulfillment ops.
              </p>
            </div>


            {/* ─── Main Orders Panel ─── */}
            <div className={anim("flex flex-col col-span-2 justify-start items-center space-y-4 w-full animate-fade")}>
              <h1 className="w-full font-mono text-xs uppercase font-bold">
                Shopify Orders
              </h1>

              
              {loading && (
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 animate-spin">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}

              <div className="flex flex-col w-full space-y-2">
                {(!loading && tabs && tabs[activeTab] && tabs[activeTab].length === 0) ? (
                    <p className="font-mono text-xs uppercase text-gray-400">
                      No {activeTab.replaceAll('_', ' ')} orders.
                    </p>
                  ) : (
                    tabs[activeTab].map((order) => {
                      const name = order.customer?.first_name || "Unknown";
                      const last = order.customer?.last_name || "";
                      const email = order.email;
                      const createdAt = new Date(order.created_at).toLocaleString();
                      const shipping = order.shipping_address;
                      const lineItems = order.line_items?.map((item) => `${item.quantity}× ${item.title}`).join(", ");
                      const total = parseFloat(order.total_price).toFixed(2);
                      const status = order.fulfillment_status ? order.fulfillment_status : "UNFULFILLED";

                      return (
                        <div
                          key={order.id}
                          onClick={() => setModal(order)}
                          className="group border-[0.5px] border-black rounded-sm w-full p-3 hover:bg-cowjuice-gold/10 transition animate-fade-down cursor-pointer"
                        >
                          <div className="font-mono text-[11px] uppercase leading-tight space-y-1">
                            <div className="flex items-center justify-between">
                              <div className="font-bold text-xs">Order {order.name}</div>
                              <button
                                href={`https://cowjuice.myshopify.com/admin/orders/${order.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(`https://admin.shopify.com/store/cow-juice/orders/${order.id}`, '_blank');
                                }}
                                className="uppercase leading-3 text-[10px] font-bol border-[0.5px] border-cowjuice-gold rounded-md px-2 py-[1px] text-cowjuice-gold hover:bg-white transition-colors duration-300"
                              >
                                View Order in Shopify &gt;&gt;
                              </button>
                            </div>
                            <div>Customer: {name} {last}</div>
                            <div class="flex flex-row space-x-2">
                              <div>Email: {email}</div>
                              <div>Phone: {shipping?.phone}</div>
                            </div>
                            <div>Address: {shipping?.address1}, {shipping?.city}, {shipping?.zip}</div>
                            <div className="text-[10px] mt-1">Items: {lineItems}</div>
                            <div className="text-[10px] mt-1">Total: ${total}</div>
                            <div className="text-[10px] mt-1">Placed: {createdAt}</div>
                            <div className="text-[10px] mt-1">Status: <span className={`${status === "UNFULFILLED" ? "border-[0.5px] border-black text-black font-bold" : "bg-white text-cowjuice-gold border-[0.5px] border-cowjuice-gold font-bold"} px-1 rounded-sm`}>{status}</span></div>
                          </div>
                        </div>
                      );
                    })
                  )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Fulfill;