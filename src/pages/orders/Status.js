import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import clsx from 'clsx';

import triggerPostToSearchOrders from '../../functions/shopify/triggerPostToSearchOrders.js';

/**
 * Pretty‑print an ISO timestamp in the browser locale.
 */
const fmt = (iso) => new Date(iso).toLocaleString();

/**
 * Translate Shopify order + fulfillment data into a simple UI stage.
 * Returns { label, tone, tracking?, deliveredAt? }
 */
const getOrderStage = (order) => {
  // Nothing shipped yet
  if (!order.fulfillment_status || order.fulfillment_status === 'unfulfilled') {
    return { label: 'Order placed – Preparing for shipment', tone: 'inert' };
  }

  // Take the first fulfillment (typical single‑package flow)
  const f = order.fulfillments?.[0];
  if (!f) return { // No fulfillment object means order is unfulfilled, i.e., PLACED
    label: 'Order placed – Preparing for shipment', tone: 'inert' };

  switch (f.shipment_status) {
    case null: // No status in object tells us order if FULFILLED but not shipped
      return {
        label: 'Order fulfilled – Shipment pending',
        tone: 'info',
        fulfilledAt: f.updated_at,
      };
    case 'label_printed':
    case 'label_purchased':

    case 'in_transit':
    case 'picked_up':
      return { 
        label: 'The Cow Juice is on the way', 
        tone: 'inTransit', 
        tracking: f.tracking_number 
      };

    case 'out_for_delivery':
      return { 
        label: 'The Cow Juice is out for delivery', 
        tone: 'outForDelivery', 
        tracking: f.tracking_number 
      };

    case 'delivered':
      return {
        label: 'Delivered',
        tone: 'delivered',
        tracking: f.tracking_number,
        deliveredAt: f.updated_at,
      };

    case 'failure':
      return { 
        label: 'Delivery issue – please contact support', 
        tone: 'warning' 
      };

    default:
      return { 
        label: `Status: ${f.shipment_status}`, 
        tone: 'info'
      };
  }
};

const Status = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const { confirmationNumber: confirmationParam } = useParams();
  const [confirmationNumber, setConfirmationNumber] = useState(confirmationParam ?? '');
  const [orders, setOrders] = useState(null);

  const checkOrderStatus = async () => {
    setLoading(true);

    const orderBack = await triggerPostToSearchOrders(email, confirmationNumber);
    setOrders(orderBack?.orders || []);

    setLoading(false);
  };

  useEffect(() => {
    if (confirmationParam) checkOrderStatus();
  }, [confirmationParam]);

  return (
    <div className="flex flex-1 min-h-screen max-w-3xl mx-auto px-6 pb-6 pt-6 w-full h-full">
      <div className="flex flex-col w-full items-center justify-start space-y-4 animate-fade">
        {/* Heading */}
        <p className="font-mono w-full text-left text-xs uppercase font-bold animate-flip-down">
          Check the status of your Cow Juice order.
        </p>
        <p className="font-mono w-full text-left text-xs animate-flip-up">
          Enter the email or confirmation number associated with your purchase(s) of the world's first can of milk.
        </p>

        {/* Inputs */}
        <div className="flex flex-col w-full space-y-4 animate-fade-up">
          <input
            type="email"
            placeholder="Email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && checkOrderStatus()}
            className="text-xs font-mono border-[0.5px] border-black p-2 rounded-sm focus:outline-none focus:bg-black/5 transition-colors duration-300"
          />
          <input
            type="text"
            placeholder="Order Confirmation Number (optional w/ email)"
            value={confirmationNumber}
            onChange={(e) => setConfirmationNumber(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === 'Enter' && checkOrderStatus()}
            className="text-xs font-mono border-[0.5px] border-black p-2 rounded-sm focus:outline-none focus:bg-black/5 transition-colors duration-300"
          />
          <div className="flex flex-col items-center justify-center w-full space-y-2">
            <button
              type="button"
              onClick={checkOrderStatus}
              disabled={loading || (!email && !confirmationNumber)}
              className="font-mono text-xs w-full bg-black disabled:bg-black/50 text-white p-2 rounded-sm animate-flip-up animate-delay-300 flex items-center justify-center space-x-2"
            >
              {loading && (
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 animate-spin"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              )}
              <span>Find my Cow Juice</span>
            </button>
          </div>
        </div>

        {/* Loading spinner between query & results */}
        {loading && (
          <div className="flex flex-col w-full items-center pt-6 animate-fade">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 animate-spin"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        )}

        {/* Results */}
        {!loading && orders && orders.length > 0 && (
          <div className="flex flex-col w-full pt-6 space-y-4 animate-fade-up">
            <p className="text-xs font-mono font-bold uppercase">Your Recent Cow Juice Orders</p>
            <p className="text-xs font-mono uppercase">
              Below is every order matching the info you entered, complete with status history.
            </p>

            {orders.map((order) => {
              const stage = getOrderStage(order);
              const carrier = order.fulfillments?.[0]?.tracking_company;
              const trackingNumber = order.fulfillments?.[0]?.tracking_number;

              return (
                <div
                  key={order.id}
                  className="relative border-[0.5px] border-black p-2 rounded-sm bg-neutral-50 text-xs font-mono space-y-4"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <p className="uppercase">
                      <span className="font-bold">Confirmation ID</span>&nbsp;#{order.confirmation_number}
                    </p>
                    {stage.tracking && (
                      <a
                      // need to handle ups, usps, fedex, etc. tracking links
                        href={carrier === 'UPS' ? `https://www.ups.com/track?tracknum=${stage.tracking}` : carrier === 'FedEx' ? `https://www.fedex.com/fedextrack/?tracknumbers=${stage.tracking}` : carrier === 'usps' ? `https://tools.usps.com/go/TrackConfirmAction?qtc_tLabels1=${stage.tracking}` : ''}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-[0.5px] border-black py-[1px] px-2 rounded-md bg-white hover:bg-black/10 transition-colors duration-300"
                      >
                        Track →
                      </a>
                    )}
                  </div>

                  {/* Status banner */}
                  <div
                    className={clsx(
                      'border-[0.5px] border-black rounded-lg p-2 space-y-1',
                      stage.tone === 'delivered' && 'bg-emerald-100',
                      stage.tone === 'inTransit' && 'bg-pink-100 animate-pulse',
                      stage.tone === 'outForDelivery' && 'bg-teal-100 animate-pulse',
                      stage.tone === 'warning' && 'bg-amber-100',
                      stage.tone === 'info' && 'bg-sky-100 animate-pulse',
                      stage.tone === 'inert' && 'bg-gray-50'
                    )}
                  >
                    <p className="uppercase font-bold">{stage.label}</p>
                    {stage.deliveredAt && (
                      <p className="text-[10px]">Delivered on {fmt(stage.deliveredAt)}</p>
                    )}
                    {stage.fulfilledAt && (
                      <div>
                        <p className="text-[10px]">Fulfilled on {fmt(stage.fulfilledAt)}</p>
                        <p className="text-[10px]">[Tracking info will be added once your order has been shipped.]</p>
                      </div>
                    )}
                    {stage.tracking && (
                      <p className="text-[10px]">{carrier} Tracking # {trackingNumber}</p>
                    )}
                  </div>

                  {/* Order meta */}
                  <div className="border-t-[0.5px] border-black pt-2 space-y-1">
                    <p>
                      <span className="font-bold">Placed:</span>&nbsp;{fmt(order.created_at)}
                    </p>
                    <p>
                      <span className="font-bold">Total:</span>&nbsp;${order.total_price}
                    </p>
                    <p>
                      <span className="font-bold">Payment:</span>&nbsp;{order.financial_status}
                    </p>
                    <p>
                      <span className="font-bold">Item(s):</span>&nbsp;
                      {order.line_items.map((li) => li.title).join(', ')}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Zero results */}
        {!loading && orders && orders.length === 0 && (
          <div className="flex flex-col w-full pt-6 space-y-4 animate-fade-up">
            <p className="text-xs font-mono font-bold uppercase">No orders found</p>
            <p className="text-xs font-mono">
              Please check your email and/or confirmation number and try again.
            </p>
            <p className="text-xs font-mono">
              If you haven't tasted Cow Juice yet … what are you waiting for?
            </p>
            <button
              type="button"
              onClick={() => navigate('/shopify/products')}
              className="font-mono text-xs w-full bg-white border-[0.5px] border-black text-black p-2 rounded-sm animate-flip-up animate-delay-300"
            >
              Buy the world's first can of milk
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Status;