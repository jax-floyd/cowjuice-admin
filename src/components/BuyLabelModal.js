import React, { useState } from 'react';
import { motion } from 'framer-motion';

import triggerPostToEasypostBuyLabel from '../functions/easypost/triggerPostToEasypostBuyLabel';
import triggerPostToShippoBuyLabel from '../functions/shippo/triggerPostToShippoBuyLabel';

const BuyLabelModal = ({ rate, carrierSource, onClose, onSuccess }) => {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [manualTracking, setManualTracking] = useState('');
  const [manualLabelUrl, setManualLabelUrl] = useState('');
  const [showConflictRecovery, setShowConflictRecovery] = useState(false);

  console.log(carrierSource, 'carrierSource in BuyLabelModal');
  const handleBuyLabel = async () => {
    setStatus('loading');
    setError(null);
    setShowConflictRecovery(false);

    try {
      const buyFn =
        carrierSource === 'shippo'
          ? triggerPostToShippoBuyLabel
          : triggerPostToEasypostBuyLabel;

      const { ok, status, data } = await buyFn({
        shipmentId: rate.shipment_id,
        rateId: rate.id,
      });

      if (!ok) {
        if (status === 409) {
          setShowConflictRecovery(true);
          throw new Error(data?.error || 'Label already purchased');
        }
        throw new Error(data?.error || 'Failed to buy label');
      }

      if (!data.label_url || !data.tracking_number) {
        throw new Error('Label was purchased but missing data.');
      }

      setStatus('success');
      onSuccess?.(data);
      setTimeout(() => onClose(), 1000);
    } catch (err) {
      console.error('Label purchase error:', err);
      setError(err.message || 'Unknown error');
      setStatus('error');
    }
  };


  const handleManualSubmit = () => {
    if (!manualTracking) return;
    onSuccess?.({ tracking_number: manualTracking, label_url: null });
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="bg-white border-[0.5px] border-black rounded-xl p-6 w-full max-w-2xl shadow-xl animate-fade space-y-4"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xs font-mono uppercase opacity-60">Confirm Label Purchase</h2>
          <button onClick={onClose} className="text-xs font-mono opacity-60">✕</button>
        </div>

        <div className="space-y-1 font-mono text-xs uppercase">
          <p><span className="opacity-60">Carrier:</span> {rate.carrier}</p>
          <p><span className="opacity-60">Service:</span> {rate.service}</p>
          <p><span className="opacity-60">Amount:</span> ${rate.rate}</p>
          <p><span className="opacity-60">Est. Delivery:</span> {rate.delivery_days ? `${rate.delivery_days} day(s)` : 'N/A'}</p>
        </div>

        <button
          onClick={handleBuyLabel}
          disabled={status === 'loading'}
          className={`w-full px-4 py-3 border-[0.5px] border-black rounded-xl font-mono text-xs uppercase font-bold transition-colors ${
            status === 'success'
              ? 'bg-cowjuice-gold text-white'
              : status === 'loading'
              ? 'bg-black text-white opacity-50'
              : 'bg-black text-white hover:bg-cowjuice-gold'
          }`}
        >
          {status === 'loading' ? 'Processing...' : 'Purchase Shipping Label'}
        </button>

        {status === 'error' && (
          <p className="text-cowjuice-red text-[10px] font-mono uppercase mt-2">{error}</p>
        )}

        {status === 'success' && (
          <p className="text-green-600 text-[10px] font-mono uppercase mt-2">Label purchased successfully</p>
        )}

        {showConflictRecovery && (
          <div className="pt-4 space-y-3">
            <p className="text-[10px] font-mono uppercase opacity-60 leading-tight">
              A label has already been purchased for this shipment. Please enter the tracking number below, or retrieve the label manually from the Shopify order page.
            </p>
            <input
              type="text"
              value={manualTracking}
              onChange={(e) => setManualTracking(e.target.value)}
              placeholder="Enter existing tracking number"
              className="w-full border-[0.5px] border-black px-4 py-3 rounded-xl bg-white font-mono text-xs uppercase focus:outline-none"
            />
            <input
                type="text"
                value={manualLabelUrl}
                onChange={(e) => setManualLabelUrl(e.target.value)}
                placeholder="Enter label download URL (optional)"
                className="w-full border-[0.5px] border-black px-4 py-3 rounded-xl bg-white font-mono text-xs uppercase focus:outline-none"
            />

            <button
              onClick={handleManualSubmit}
              disabled={!manualTracking || !manualLabelUrl}
              className="w-full px-4 py-3 border-[0.5px] border-black rounded-xl bg-cowjuice-gold text-white font-mono text-xs uppercase font-bold hover:bg-black transition-colors"
            >
              Submit Tracking Number & Label URL
            </button>
            <a
              href={`https://admin.shopify.com/store/cow-juice/orders`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center font-mono text-[10px] underline uppercase opacity-60 hover:opacity-100"
            >
              Open Shopify Orders →
            </a>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default BuyLabelModal;
