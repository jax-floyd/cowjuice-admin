import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import triggerPostToEasypostGetRates from '../functions/easypost/triggerPostToEasypostGetRates'; // Adjust the import path as needed
import triggerPostToShippoGetRates from '../functions/shippo/triggerPostToShippoGetRates';
import triggerPostToFulfillOrder from '../functions/shopify/triggerPostToFulfillOrder'; // Adjust the import path as needed

import BuyLabelModal from './BuyLabelModal';

const OrderModal = ({ onUnlock, order }) => {
  console.log(order)
  const navigate = useNavigate();

  const [status, setStatus] = useState('idle');
  const [loading, setLoading] = useState(false);
  const [orderNote, setOrderNote] = useState('');
  const [email, setEmail] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [confidential, setConfidential] = useState(false);
  const [labelUrl, setLabelUrl] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingCompany, setTrackingCompany] = useState('UPS'); // Default to USPS

  const sanitizePhone = (phone) => {
    if (!phone) return undefined;
    const digits = phone.replace(/\D/g, ''); // Remove non-numeric
    return digits.length >= 10 ? digits : undefined;
  };


  
  const [carrierSource, setCarrierSource] = useState('shippo'); // 'easyship' | 'shippo' | 'easypost'
  const [rates, setRates] = useState([]);
  const [parcel, setParcel] = useState(null);
  const handleGetRates = async () => {
    setLabelStatus('loading');
    try {
      const toAddress = {
        name: order.shipping_address?.name || '',
        street1: order.shipping_address?.address1 || '',
        city: order.shipping_address?.city || '',
        state: order.shipping_address?.province_code || '',
        zip: order.shipping_address?.zip || '',
        country: order.shipping_address?.country_code || 'US',
        email: order.email,
        phone: sanitizePhone(order.shipping_address?.phone) || '+1 555-555-5555',
      };

      let selectedParcel;
      const itemName = order.line_items?.[0]?.name?.toLowerCase() || '';

      if (itemName.includes('12')) {
        selectedParcel = { length: 8.5, width: 6.25, height: 5.5, weight: 120 };
      } else if (itemName.includes('8')) {
        selectedParcel = { length: 7.625, width: 5.25, height: 5.375, weight: 80 };
      } else {
        selectedParcel = { length: 6.25, width: 4.25, height: 5.5, weight: 60 };
      }

      setParcel(selectedParcel);

      let data;
      if (carrierSource === 'easyship') {
        // data = await triggerPostToEasyshipGetRates({ toAddress, parcel: selectedParcel });
        console.log('We have yet to implement Easyship rates fetching');
        data = { rates: [] }; // fallback
      } else if (carrierSource === 'shippo') {
        const res = await triggerPostToShippoGetRates({ toAddress, parcel: selectedParcel });
        console.log('Fetched rates from Shippo:', res);
        data = {
          rates: res.rates.map(rate => ({
            carrier: rate.provider,
            service: rate.servicelevel.name,
            rate: rate.amount,
            delivery_days: rate.estimated_days,
            id: rate.object_id,
            shipment_id: rate.shipment_id,
          })),
        };
      } else if (carrierSource === 'easypost') {
        data = await triggerPostToEasypostGetRates({ toAddress, parcel: selectedParcel });
        console.log('Fetched rates:', data);
      }
      
      if (!data || !data.rates) {
        throw new Error('No rates returned');
      }

      const sortedRates = [...data.rates].sort((a, b) => parseFloat(a.rate) - parseFloat(b.rate));
     setRates(sortedRates);

     // setTrackingNumber(`SELECTED RATE: ${cheapest.provider} ${cheapest.servicelevel.name} - $${cheapest.amount}`);
     setLabelStatus('success');
    } catch (err) {
      console.error('Error fetching shipping rates:', err);
      setLabelStatus('error');
    }
  };

  console.log(rates);

  const handleFulfillOrder = async () => {
    if (!trackingNumber) {
      alert('You must buy a label first.');
      return;
    }

    setFulfillStatus('loading');
    try {
      const data = await triggerPostToFulfillOrder({
          orderId: order.id,
          trackingNumber,
          trackingCompany: 'USPS',
          lineItems: order.line_items.map(i => ({ id: i.id, quantity: i.quantity })),
      });

      setFulfillStatus('success');
    } catch (err) {
      console.error('Error fulfilling order:', err);
      setFulfillStatus('error');
    }
  };

  const handlePostNote = async () => {
    if (!orderNote) {
      alert('Please enter a note before posting.');
      return;
    }
    setNoteStatus('loading');
    try {
      await fetch('/api/shopify/postNote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order.id,
          note: orderNote,
        }),
      });
      setNoteStatus('success');
    } catch (err) {
      console.error('Error posting note:', err);
      setNoteStatus('error');
    } finally {
      setOrderNote('');
      setNoteStatus('idle');
    }
  };

  const getButtonClass = (status) => {
    const btnBase = `flex w-full items-center justify-start font-mono text-xs uppercase font-bold py-3 sm:py-4 px-4 rounded-xl border-[0.5px] transition-colors duration-300`;
    const btnIdle = `${orderNote === '' ? 'bg-white text-black border-black hover:bg-cowjuice-gold/20' : 'bg-black text-white border-black'}`;
    const btnError = 'bg-black text-white shake';
    const btnSuccess = 'bg-cowjuice-gold text-white';
    const btnLoading = 'bg-black text-white opacity-50';

    if (status === 'loading') return `${btnBase} ${btnLoading}`;
    if (status === 'success') return `${btnBase} ${btnSuccess}`;
    if (status === 'error') return `${btnBase} ${btnError}`;
    return `${btnBase} ${btnIdle}`;
  };


  const [labelStatus, setLabelStatus] = useState('idle');
  const [fulfillStatus, setFulfillStatus] = useState('idle');
  const [noteStatus, setNoteStatus] = useState('idle');

  const [showBuyModal, setShowBuyModal] = useState(false);
  const [selectedRate, setSelectedRate] = useState(null);
  const handleRateCLick = (rate) => {
    setSelectedRate(rate);
    setShowBuyModal(true);
  };

  const isFulfilled = order.fulfillment_status === 'fulfilled';
  const fulfillment = order.fulfillments?.[0]; // assuming single fulfillment for now

  // Helper to parse Rate carrier to 'UPS', 'FedEx', etc.
  const parseCarrier = (carrier) => {
    if (!carrier) return 'Unknown';
    // If it contains any of the known carriers as a string, return that
    if (carrier.includes('USPS')) return 'USPS';
    if (carrier.includes('UPS')) return 'UPS';
    if (carrier.includes('FedEx')) return 'FedEx';
    if (carrier.includes('DHL')) return 'DHL';
  };

  return (
    <>
    {showBuyModal && (
      <>
        <div className="fixed inset-0 z-40 animate-fade animate-delay-[0ms]" />
        <BuyLabelModal
          rate={selectedRate}
          carrierSource={carrierSource}
          onClose={() => setShowBuyModal(false)}
          onSuccess={({ tracking_number, label_url }) => {
            setTrackingNumber(tracking_number);
            setLabelUrl(label_url);
            setShowBuyModal(false);
          }}
        />
      </>
    )}

    {!isFulfilled ? (
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
              <div className="space-y-4">
                <div class="flex flex-col space-y-1">
                  <p className="font-mono text-[10px] uppercase text-black opacity-60">Placed On</p>
                  <p className="font-mono text-xs uppercase">{new Date(order.created_at).toLocaleString()}</p>
                </div>
                {order.line_items.map((item) => (
                  <div key={item.id} className="space-y-1">
                    <div class="flex flex-row items-center justify-between space-x-2">
                      <p className="font-mono text-[10px] uppercase text-black opacity-60">Item</p>
                      <p className="font-mono text-[10px] uppercase text-black opacity-60">Unit Price</p>
                    </div>
                    <div class="flex flex-row items-center justify-between space-x-2">
                      <p className="font-mono text-xs uppercase">{item.title} × {item.quantity}</p>
                      <p className="font-mono text-xs  uppercaseopacity-60">${Number(item.price).toFixed(2)}</p>
                    </div>
                  </div>
                ))}

                <div className="">
                  <p className="font-mono text-[10px] uppercase text-black opacity-60">Order Total</p>
                  <p className="font-mono text-xs font-bold uppercase">${Number(order.total_price).toFixed(2)}</p>
                </div>

                <div className=" border-t-[0.5px] border-black flex w-full" />
                {parcel && (
                  <div className="pt-2">
                    <p className="font-mono text-[10px] uppercase text-black opacity-60">Shipping Box</p>
                    <p className="font-mono text-xs uppercase">
                      {parcel.length}" × {parcel.width}" × {parcel.height}" — {parcel.weight} oz
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-row items-center justify-start space-x-2">
              <div className="flex h-full items-center space-x-2">
                <label className="font-mono text-[10px] uppercase text-black opacity-60">Rate Source</label>
                <select
                  value={carrierSource}
                  onChange={(e) => setCarrierSource(e.target.value)}
                  className="font-mono flex h-full text-xs uppercase border-[0.5px] border-black px-2 py-1 rounded-md bg-white hover:bg-cowjuice-gold/10 transition-all duration-200"
                >
                  <option value="easypost">EasyPost</option>
                  <option value="shippo">Shippo</option>
                  <option value="easyship">EasyShip</option>
                </select>
              </div>

              <button onClick={(e) => { e.stopPropagation(); handleGetRates(); }} disabled={labelStatus === 'loading'} className={getButtonClass(labelStatus)}>
                {labelStatus === 'loading' ? (
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 animate-spin">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                ) : <p className="font-mono text-xs uppercase font-bold"><>{labelStatus === 'success' ? 'Rates Procured' : <>View Shipping Rates<sup>[1]</sup></>}</></p>}
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); handleFulfillOrder(); }}
                disabled={fulfillStatus === 'loading' || !trackingNumber}
                className={`${getButtonClass(fulfillStatus)} ${!trackingNumber ? 'opacity-50' : ''}`}
              >
                {fulfillStatus === 'loading' ? (
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 animate-spin">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : <p className="font-mono text-xs uppercase font-bold">Fulfill Order<sup>[2]</sup></p>}
              </button>

            </div>
            {!trackingNumber && (
              <div className="pt-4 w-full">
                <p className="font-mono text-[10px] uppercase opacity-60 mb-2">Available Shipping Rates</p>
                <div className="max-h-64 overflow-y-auto p-2 border-[0.5px] border-black rounded-xl">
                  {rates.length === 0 && (
                    <p class="font-mono text-[10px] uppercase opacity-60 ">Click the big button above to fetch the rates. They will populate here thereafter.</p>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {rates.map((rate, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleRateCLick(rate)}
                        className="border-[0.5px] border-black rounded-xl px-4 py-3 bg-white hover:bg-cowjuice-gold/10 cursor-pointer transition-all duration-200"
                      >
                        <p className="font-mono text-[10px] uppercase text-black opacity-60">Carrier</p>
                        <p className="font-mono text-xs uppercase font-bold">{parseCarrier(rate.carrier)} — {rate.service}</p>

                        <p className="font-mono text-[10px] uppercase text-black opacity-60 pt-1">Price</p>
                        <p className="font-mono text-xs font-bold uppercase">${rate.rate}</p>

                        {rate.delivery_days && (
                          <>
                            <p className="font-mono text-[10px] uppercase text-black opacity-60 pt-1">Est. Delivery</p>
                            <p className="font-mono text-xs uppercase">{rate.delivery_days} day{rate.delivery_days > 1 ? 's' : ''}</p>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}  


            {labelUrl && (
                <div className="w-full flex items-end flex-col space-y-2 pt-4">
                  <p className="w-full font-mono text-xs uppercase text-black opacity-60 mb-1">Shipping Information</p>
                  <p className="w-full font-mono text-[10px] uppercase text-black opacity-60 mb-1">Tracking Number</p>
                  <div class="w-full flex relative space-x-2">
                    <input
                      className="w-full border-[0.5px] border-black px-4 py-4 rounded-xl bg-white focus:outline-none font-mono text-xs uppercase mb-2"
                      placeholder="Enter or confirm tracking number"
                      value={trackingNumber}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                    />

                    {labelUrl ? (
                      <button
                        onClick={() => window.open(labelUrl)}
                        className="w-full border-[0.5px] border-black px-4 py-4 rounded-xl bg-white focus:outline-none font-mono text-xs uppercase mb-2"
                      >
                        Print Label →
                      </button>
                    ) : (
                      <p className="text-[10px] font-mono uppercase text-red-500">Label URL not available – check EasyPost manually</p>
                    )}

                  </div>
                </div>
              )}

            {status === 'error' && (
              <p className="text-[10px] text-cowjuice-red font-mono uppercase">An error occurred. Try again.</p>
            )}
            <textarea
                className="w-full border-[0.5px] border-black px-4 py-3 rounded-xl bg-white focus:outline-none font-mono text-xs uppercase resize-none"
                placeholder="Make a note on the order (optional)"
                value={orderNote}
                rows={4}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => setOrderNote(e.target.value)}
              />

              {orderNote && (
                <button
                  onClick={(e) => { e.stopPropagation(); handlePostNote(); }}
                  disabled={loading || !trackingNumber}
                  className={`${getButtonClass(noteStatus)} animate-flip-down`}
                >
                  {loading ? (
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 animate-spin">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : (
                    <p className="font-mono text-xs uppercase font-bold">Message Customer<sup>[2]</sup></p>
                  )}
                </button>
              )}
              <p className="font-mono text-[10px] leading-3 uppercase opacity-60">
                  <sup>[1]</sup> This modal allows you to fully manage the fulfillment of this order from a Cow Juice native UI with Shopify SST backend.
              </p>
              <p className="font-mono text-[10px] leading-3 uppercase opacity-60">
                  <sup>[2]</sup> When you click "Fulfill Order", it will automatically post the tracking number and label URL to the Shopify order page. The customer will be immediately notified via email.
              </p>

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
                <div className="flex flex-col space-y-1">
                  <a
                    href={`mailto:${order.email}`}
                    className="font-mono text-xs uppercase bg-cowjuice-gold/20 hover:bg-white px-2 border-[0.5px] border-black rounded-md transition-colors duration-300"
                  >
                    <span>{order.email}</span>→
                  </a>
                  {order.shipping_address?.phone ? (
                    <a
                      href={`sms:${order.shipping_address.phone}`}
                      className="font-mono text-xs uppercase bg-cowjuice-gold/20 hover:bg-white px-2 border-[0.5px] border-black rounded-md transition-colors duration-300"
                    >
                      <span>{order.shipping_address.phone}</span>
                    </a>
                  ) : (
                    <p className="font-mono text-[10px] uppercase text-gray-500">[No phone number]</p>
                  )}
                </div>
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

              {/* Customer Notes (if available) */}
              {order.customer?.note && (
                <div className="space-y-1">
                  <h2 className="font-mono text-[10px] uppercase text-black opacity-60">Customer Note</h2>
                  <p className="font-mono text-xs">{order.customer.note}</p>
                </div>
              )}


            </div>
          </div>
        </motion.div>
      </div>

    ) : (
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
          className="flex flex-col sm:flex-row border-[0.5px] border-black bg-cowjuice-gold/50 rounded-xl w-full max-w-5xl p-6 mx-auto gap-6"
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {/* Main Action Column */}
          <div className="flex-1 flex flex-col space-y-4">
            <div className="space-y-2">
              <p className="font-mono text-[10px] opacity-60 uppercase w-full text-left">Manage Order {order.name}</p>
              <div className="space-y-4">
                <div class="flex flex-col space-y-1">
                  <p className="font-mono text-[10px] uppercase text-black opacity-60">Placed On</p>
                  <p className="font-mono text-xs uppercase">{new Date(order.created_at).toLocaleString()} ET</p>
                </div>
                <div class="flex flex-col space-y-1">
                  <p className="font-mono text-[10px] uppercase text-black opacity-60">Fulfilled on</p>
                  <p className="font-mono text-xs uppercase">{new Date(order.fulfillments[0]?.created_at).toLocaleString()} ET</p>
                </div>
                {order.line_items.map((item) => (
                  <div key={item.id} className="space-y-1">
                    <div class="flex flex-row items-center justify-between space-x-2">
                      <p className="font-mono text-[10px] uppercase text-black opacity-60">Item</p>
                      <p className="font-mono text-[10px] uppercase text-black opacity-60">Unit Price</p>
                    </div>
                    <div class="flex flex-row items-center justify-between space-x-2">
                      <p className="font-mono text-xs uppercase">{item.title} × {item.quantity}</p>
                      <p className="font-mono text-xs  uppercaseopacity-60">${Number(item.price).toFixed(2)}</p>
                    </div>
                  </div>
                ))}

                <div className="">
                  <p className="font-mono text-[10px] uppercase text-black opacity-60">Order Total</p>
                  <p className="font-mono text-xs font-bold uppercase">${Number(order.total_price).toFixed(2)}</p>
                </div>

                <div className=" border-t-[0.5px] border-black flex w-full" />
                {parcel && (
                  <div className="pt-2">
                    <p className="font-mono text-[10px] uppercase text-black opacity-60">Shipping Box</p>
                    <p className="font-mono text-xs uppercase">
                      {parcel.length}" × {parcel.width}" × {parcel.height}" — {parcel.weight} oz
                    </p>
                  </div>
                )}
              </div>
            </div>  


          
            {status === 'error' && (
              <p className="text-[10px] text-cowjuice-red font-mono uppercase">An error occurred. Try again.</p>
            )}
              <textarea
                className="w-full border-[0.5px] border-black px-4 py-3 rounded-xl bg-white focus:outline-none font-mono text-xs uppercase resize-none"
                placeholder="Send an email to the customer"
                value={orderNote}
                rows={4}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => setOrderNote(e.target.value)}
              />

              {orderNote && (
                <button
                  onClick={(e) => { e.stopPropagation(); handlePostNote(); }}
                  disabled={loading || !trackingNumber}
                  className={`${getButtonClass(noteStatus)} animate-flip-down`}
                >
                  {loading ? (
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 animate-spin">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : (
                    <p className="font-mono text-xs uppercase font-bold">Post Order Note<sup>[2]</sup></p>
                  )}
                </button>
              )}
              <p className="font-mono text-[10px] leading-3 uppercase opacity-60">
                  <sup>[1]</sup> This order was fulfilled at {new Date(order.fulfilled_at).toLocaleString()}.
              </p>

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
                  className="font-mono text-xs uppercase bg-white hover:bg-cowjuice-gold/10 px-2 border-[0.5px] border-black rounded-md transition-colors duration-300"
                >
                  {order.customer?.first_name} {order.customer?.last_name} →
                </a>
                <p className="font-mono text-[10px] uppercase opacity-60">1 order</p>
                
              </div>

              {/* Contact Info */}
              <div className="space-y-1">
                <h2 className="font-mono text-[10px] uppercase text-black opacity-60">Contact Information</h2>
                <a
                  href={`mailto:${order.email}`}
                  className="font-mono text-xs uppercase text-black hover:underline inline-flex items-center space-x-1"
                >
                  <span>{order.email}</span>
                  <span>→</span>
                </a>
                {order.shipping_address?.phone ? (
                  <a
                    href={`sms:${order.shipping_address.phone}`}
                    className="font-mono text-xs uppercase text-black hover:underline inline-flex items-center space-x-1"
                  >
                    <span>{order.shipping_address.phone}</span>
                    <span>→</span>
                  </a>
                ) : (
                  <p className="font-mono text-[10px] uppercase text-gray-500">[No phone number]</p>
                )}
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
    )}
  
    </>
  );
};

export default OrderModal;
