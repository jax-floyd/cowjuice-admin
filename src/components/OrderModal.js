import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const OrderModal = ({ onUnlock, order }) => {
  const navigate = useNavigate();

  const [status, setStatus] = useState('idle');
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState('');
  const [email, setEmail] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [confidential, setConfidential] = useState(false);
  const [labelUrl, setLabelUrl] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleBuyLabel = async () => {
    setLoading(true);
    try {
      // 🧪 MOCKED response for testing
      const data = {
        tracking_number: 'CJMOCK123456789US',
        label_url: 'https://www.easypost.com/assets/images/easypost-og.png', // Can be any dummy image/PDF
      };

      // Simulate delay to mimic API
      await new Promise(resolve => setTimeout(resolve, 800));

      setTrackingNumber(data.tracking_number);
      setLabelUrl(data.label_url);
      setStatus('success');
    } catch (err) {
      console.error('Error buying label:', err);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };


  const handleFulfillOrder = async () => {
    if (!trackingNumber) {
      alert('You must buy a label first.');
      return;
    }

    setLoading(true);
    try {
      await fetch('/api/shopify/fulfill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order.id,
          trackingNumber,
          trackingCompany: 'USPS',
          lineItems: order.line_items.map(i => ({ id: i.id, quantity: i.quantity })),
        }),
      });

      setStatus('success');
    } catch (err) {
      console.error('Error fulfilling order:', err);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const btnBase = `flex w-full items-center justify-start font-mono text-xs uppercase font-bold py-3 sm:py-4 px-4 rounded-xl border-[0.5px] transition-colors duration-300`;
  const btnIdle = `${review === '' ? 'bg-white text-black border-black hover:bg-cowjuice-gold/20' : 'bg-black text-white border-black'}`;
  const btnError = 'bg-black text-white shake';
  const btnSuccess = 'bg-cowjuice-gold text-white';

  const getButtonClass = () => {
    if (status === 'success') return `${btnBase} ${btnSuccess}`;
    if (status === 'error') return `${btnBase} ${btnError}`;
    return `${btnBase} ${btnIdle}`;
  };

  console.log(order)

  return (
    <div
      onClick={() => onUnlock(null)}
      className={`fixed inset-0 z-50 flex flex-col justify-center space-y-2 px-6 pt-8 pb-6 bg-black/5 backdrop-blur-sm animate-fade animate-delay-[0ms]`}
    >
      <button
        onClick={() => onUnlock(null)}
        className="absolute top-6 right-6 text-xs text-black font-mono"
      >
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-black">
          <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </button>

      <p className="absolute top-6 left-6 text-[10px] uppercase opacity-60 text-black font-mono">[Click anywhere to close & view all orders]</p>

      <motion.div
        layout
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col sm:flex-row border-[0.5px] border-black bg-white rounded-xl w-full max-w-5xl p-6 mx-auto gap-6"
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {/* Main Action Column */}
        <div className="flex-1 flex flex-col space-y-4">
          <div className="space-y-2">
            <p className="font-mono text-[10px] opacity-60 uppercase w-full text-left">Manage Order {order.name}</p>
            <div className="space-y-2">
              <p className="font-mono text-[10px] uppercase text-black opacity-60">Placed On</p>
              <p className="font-mono text-xs uppercase">{new Date(order.created_at).toLocaleString()}</p>

              {order.line_items.map((item) => (
                <div key={item.id} className="space-y-1">
                  <p className="font-mono text-[10px] uppercase text-black opacity-60">Item</p>
                  <p className="font-mono text-xs uppercase">{item.title} × {item.quantity}</p>
                  <p className="font-mono text-xs  uppercaseopacity-60">${Number(item.price).toFixed(2)}</p>
                </div>
              ))}

              <div className="pt-2">
                <p className="font-mono text-[10px] uppercase text-black opacity-60">Total</p>
                <p className="font-mono text-xs font-bold uppercase">${Number(order.total_price).toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-row items-center justify-start space-x-2">
            <button onClick={(e) => { e.stopPropagation(); handleBuyLabel(); }} disabled={loading} className={getButtonClass()}>
              {loading ? (
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 animate-spin">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
              ) : <p className="font-mono text-xs uppercase font-bold">Buy Shipping Label<sup>[1]</sup></p>}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleFulfillOrder(); }}
              disabled={loading || !trackingNumber}
              className={`${getButtonClass()} ${!trackingNumber ? 'opacity-50' : ''}`}
            >
              {loading ? (
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 animate-spin">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <p className="font-mono text-xs uppercase font-bold">Fulfill Order<sup>[2]</sup></p>
              )}
            </button>
          </div>
          {labelUrl && (
              <div className="w-full">
                <p className="font-mono text-[10px] uppercase text-black opacity-60 mb-1">Tracking Number</p>
                <div class="relative">
                  <input
                    className="w-full border-[0.5px] border-black px-4 py-4 rounded-xl bg-white focus:outline-none font-mono text-xs uppercase mb-2"
                    placeholder="Enter or confirm tracking number"
                    value={trackingNumber}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                  />

                  {labelUrl && (
                    <a
                      href={labelUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-mono uppercase"
                    >
                      Download Shipping Label →
                    </a>
                  )}
                </div>
              </div>
            )}

          <p className="font-mono text-[10px] leading-3 uppercase opacity-60">
            <sup>[1]</sup> All reviews are legally binding and spiritually significant.
          </p>
          <p className={`font-mono text-[10px] leading-3 uppercase ${review === '' ? 'opacity-0' : 'opacity-60'} transition-opacity`}>
            <sup>[2]</sup> Fulfilling the order will email the customer with tracking.
          </p>

          {status === 'error' && (
            <p className="text-[10px] text-cowjuice-red font-mono uppercase">An error occurred. Try again.</p>
          )}
          <textarea
              className="w-full border-[0.5px] border-black px-4 py-3 rounded-xl bg-white focus:outline-none font-mono text-xs uppercase resize-none"
              placeholder="Make a note on the order (optional)"
              value={review}
              rows={4}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => setReview(e.target.value)}
            />
        </div>

        {/* Customer Info Panel */}
        <div className="w-full sm:max-w-xs border-t sm:border-t-0 sm:border-l-[0.5px] border-black pt-4 sm:pt-0 sm:pl-4 flex-shrink-0">
          <div className="space-y-4 flex flex-col items-start justify-start">
            {/* Customer */}
            <div className="space-y-1">
              <h2 className="font-mono text-[10px] uppercase text-black opacity-60">Customer</h2>
              <a
                href={`https://admin.shopify.com/store/cow-juice/customers/${order.customer?.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs uppercase bg-cowjuice-gold/20 hover:bg-white px-2 border-[0.5px] border-black rounded-md transition-colors duration-300"
              >
                {order.customer?.first_name} {order.customer?.last_name} →
              </a>
              <p className="font-mono text-[10px] uppercase opacity-60">1 order</p>
              
            </div>

            {/* Contact Info */}
            <div className="space-y-1">
              <h2 className="font-mono text-[10px] uppercase text-black opacity-60">Contact Information</h2>
              <p className="font-mono text-xs uppercase">{order.email}</p>
              <p className="font-mono text-[10px] uppercase text-gray-500">[No phone number]</p>
            </div>

            {/* Shipping Address */}
            <div className="space-y-1">
              <h2 className="font-mono text-[10px] uppercase text-black opacity-60">Shipping Address</h2>
              <p className="font-mono text-xs uppercase">{order.shipping_address?.name}</p>
              <p className="font-mono text-xs">{order.shipping_address?.address1}</p>
              <p className="font-mono text-xs">{order.shipping_address?.city}, {order.shipping_address?.province_code} {order.shipping_address?.zip}</p>
              <p className="font-mono text-xs">{order.shipping_address?.country}</p>
              <p className="font-mono text-xs">{order.shipping_address?.phone || 'No phone number'}</p>
            </div>

            {/* Billing Address */}
            <div className="space-y-1">
              <h2 className="font-mono text-[10px] uppercase text-black opacity-60">Billing Address</h2>
              <p className="font-mono text-xs uppercase">{order.billing_address?.name}</p>
              <p className="font-mono text-xs">{order.billing_address?.address1}</p>
              <p className="font-mono text-xs">{order.billing_address?.city}, {order.billing_address?.province_code} {order.billing_address?.zip}</p>
              <p className="font-mono text-xs">{order.billing_address?.country}</p>
            </div>

            {/* Order Tags */}
            {order.tags && order.tags.trim() !== '' && (
              <div className="space-y-1">
                <h2 className="font-mono text-[10px] uppercase text-black opacity-60">Order Tags</h2>
                <p className="font-mono text-xs">{order.tags}</p>
              </div>
            )}

            {/* Customer Tags */}
            {order.customer?.tags && order.customer.tags.trim() !== '' && (
              <div className="space-y-1">
                <h2 className="font-mono text-[10px] uppercase text-black opacity-60">Customer Tags</h2>
                <p className="font-mono text-xs uppercase bg-cowjuice-gold/20 border-[0.5px] border-black rounded-md px-2 ">{order.customer.tags}</p>
              </div>
            )}

            {/* Email Marketing Status */}
            {order.buyer_accepts_marketing && (
              <div className="space-y-1">
                <h2 className="font-mono text-[10px] uppercase text-black opacity-60">Marketing Opt-in</h2>
                <p className="font-mono text-xs text-cowjuice-gold uppercase">Subscribed</p>
              </div>
            )}

            {/* Order Note */}
            {order.note && (
              <div className="space-y-1">
                <h2 className="font-mono text-[10px] uppercase text-black opacity-60">Order Note</h2>
                <p className="font-mono text-xs">{order.note}</p>
              </div>
            )}


          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderModal;
