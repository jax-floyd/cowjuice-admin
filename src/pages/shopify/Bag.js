// Bag.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { useMasterContext } from '../../contexts/MasterContext';

const Bag = () => {
  const navigate       = useNavigate();
  const { bag, setBag } = useMasterContext();

  const [loading, setLoading] = useState(false);

  /* ───────────────────────────── COUNTER VISIBILITY ─────────────────────────── */
  // Any product that has quantity > 0 should start with a visible counter
  const [activeCounters, setActiveCounters] = useState({});
  useEffect(() => {
    const counters = {};
    bag.forEach((item) => {
      if (item.quantity > 0) counters[item.id] = true;
    });
    setActiveCounters(counters);
  }, [bag]);

  /* ───────────────────────────── BAG MUTATORS ──────────────────────────────── */
  const handleAddToBag = (product) => {
    setBag((prev) => {
      const next = [...prev];
      const idx  = next.findIndex((it) => it.id === product.id);

      if (idx === -1) {
        next.push({ ...product, quantity: 1 });
      } else {
        next[idx].quantity += 1;
      }
      return next;
    });

    setActiveCounters((prev) => ({ ...prev, [product.id]: true }));
  };

  const handleIncrement = (productId) => {
    setBag((prev) =>
      prev.map((it) =>
        it.id === productId ? { ...it, quantity: it.quantity + 1 } : it
      )
    );
  };

  const handleDecrement = (productId) => {
    setBag((prev) => {
      const next = prev
        .map((it) =>
          it.id === productId ? { ...it, quantity: it.quantity - 1 } : it
        )
        .filter((it) => it.quantity > 0);

      // hide counter if item dropped to zero
      if (!next.find((it) => it.id === productId)) {
        setActiveCounters((c) => {
          const n = { ...c };
          delete n[productId];
          return n;
        });
      }
      return next;
    });
  };

  const getBagQuantity = (productId) =>
    bag.find((it) => it.id === productId)?.quantity ?? 0;

  /* ───────────────────────────── SUBTOTAL ───────────────────────────────────── */
  const [subtotal, setSubtotal] = useState(0);
  useEffect(() => {
    const total = bag.reduce((acc, it) => {
      const price = it.default_price?.unit_amount ?? 0;
      return acc + price * it.quantity;
    }, 0);
    setSubtotal(total);
  }, [bag]);

  const parsePrice = (cents) =>
    typeof cents === 'number' ? (cents / 100).toFixed(2) : '';

  /* ───────────────────────────── CHECKOUT NAV ───────────────────────────────── */
  const handleProceedCheckout = () => {
    if (!bag.length) return;
    setLoading(true);

    const numericId   = bag[0].id.split('/').pop();
    const suffix      = uuidv4().replace(/-/g, '');
    const checkoutId  = `${numericId}-${suffix}`;

    navigate(
      `/checkouts/${checkoutId}/contact-entry/carted`,
      { state: { products: bag } }
    );
    setTimeout(() => setLoading(false), 1000); // UX spinner only
  };

  /* ───────────────────────────── RENDER ─────────────────────────────────────── */
  return (
    <div className="inset-0 flex flex-1 min-h-screen max-w-3xl mx-auto px-6 pb-6 pt-6 w-full h-full overflow-hidden">
      <div className="flex flex-col items-center justify-start space-y-6 w-full animate-fade">
        {/* 👜 header */}
        <p className="font-mono w-full text-left text-xs uppercase font-bold animate-flip-down">
          You currently have{' '}
          {bag.reduce((sum, it) => sum + it.quantity, 0)} case
          {bag.reduce((sum, it) => sum + it.quantity, 0) !== 1 ? 's' : ''} of Cow Juice in your cart.
        </p>

        {/* 👜 items */}
        <div className="flex flex-col w-full space-y-2">
          {bag.length === 0 ? (
            <p className="font-mono text-xs">Your bag is empty. 🥲</p>
          ) : (
            bag.map((item) => {
              const unit = item.default_price?.unit_amount ?? 0;
              return (
                <div
                  key={item.id}
                  className="flex flex-col border-[0.5px] border-black rounded-sm p-2 space-y-1 animate-flip-down"
                >
                  {/* main row */}
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <span className="font-mono text-xs uppercase">{item.name}</span>
                      <span className="font-mono text-[10px] opacity-70">
                        ${parsePrice(unit)} per case
                      </span>
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="font-mono text-xs">{item.quantity} ×</span>
                      <span className="font-mono text-xs font-bold">
                        ${parsePrice(unit * item.quantity)}
                      </span>
                    </div>
                  </div>

                  {/* counter / add‑button */}
                  <div>
                    {activeCounters[item.id] ? (
                      <div className="flex w-full items-center justify-center space-x-4">
                        <button
                          onClick={() => handleDecrement(item.id)}
                          className="w-6 h-4 flex items-center justify-center border-[0.5px] border-black rounded-full text-xs"
                        >
                          –
                        </button>
                        <span className="font-mono text-xs">{getBagQuantity(item.id)}</span>
                        <button
                          onClick={() => handleIncrement(item.id)}
                          className="w-6 h-4 flex items-center justify-center border-[0.5px] border-black rounded-full text-xs"
                        >
                          ＋
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAddToBag(item)}
                        className="w-full text-[10px] font-mono uppercase border-[0.5px] border-black rounded-full py-1.5"
                      >
                        Add to bag
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* divider */}
        <div className="w-full border-b-[0.25px] border-black" />

        {/* subtotal & checkout */}
        {bag.length > 0 && (
          <div className="flex flex-col w-full space-y-2">
            <div className="flex justify-between font-mono text-xs">
              <span>Subtotal</span>
              <span className="font-bold">${parsePrice(subtotal)}</span>
            </div>

            <p className="font-mono text-[10px] opacity-60">
              Shipping & taxes calculated at next step.
            </p>

            <button
              disabled={loading}
              onClick={handleProceedCheckout}
              className="font-mono text-xs font-bold uppercase p-2 border-[0.5px] border-black rounded-sm animate-flip-up animate-delay-75"
            >
              {loading ? (
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5 animate-spin"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth={1.5}
                >
                  <circle cx="12" cy="12" r="10" strokeOpacity="0.25" strokeWidth="4" />
                  <path d="M4 12a8 8 0 018-8V0" strokeOpacity="0.75" />
                </svg>
              ) : (
                'Proceed to checkout'
              )}
            </button>
            <button
              disabled={loading}
              onClick={() => navigate('/shopify/products')}
              className="font-mono text-xs font-bold uppercase p-2 border-[0.5px] border-black rounded-sm animate-flip-down animate-delay-200"
            >
              {loading ? (
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5 animate-spin"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth={1.5}
                >
                  <circle cx="12" cy="12" r="10" strokeOpacity="0.25" strokeWidth="4" />
                  <path d="M4 12a8 8 0 018-8V0" strokeOpacity="0.75" />
                </svg>
              ) : (
                'Back to products'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bag;
