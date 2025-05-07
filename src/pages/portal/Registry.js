import React, { useEffect, useState, useRef } from 'react';
import triggerPostToListCharges from '../../functions/triggerPostToListCharges';
import triggerPostToListCustomers from '../../functions/triggerPostToListCustomers';

const Registry = () => {
  const [charges, setCharges] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFrame, setActiveFrame] = useState("crm");
  const [activeTab, setActiveTab] = useState('charges');
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const containerRef = useRef(null);

  charges.length != 0 && console.log(charges[0])

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [chargesRes, customersRes] = await Promise.all([
          triggerPostToListCharges(),
          triggerPostToListCustomers(),
        ]);
        const succeededCharges = (chargesRes?.charges || []).filter(
          (c) => c.status === 'succeeded'
        );
        setCharges(succeededCharges);
        setCustomers(customersRes?.customers || []);
        setHasMore(chargesRes?.has_more);
      } catch (err) {
        console.error('Error fetching initial data:', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const loadMoreCharges = async () => {
    if (!hasMore || isFetchingMore || charges.length === 0) return;
    setIsFetchingMore(true);
    try {
      const lastChargeId = charges[charges.length - 1].id;
      const res = await triggerPostToListCharges(lastChargeId);
      const newSucceeded = (res?.charges || []).filter(
        (c) => c.status === 'succeeded'
      );
      setCharges((prev) => [...prev, ...newSucceeded]);
      setHasMore(res?.has_more);
    } catch (err) {
      console.error('Error loading more charges:', err);
    } finally {
      setIsFetchingMore(false);
    }
  };

  const styles = (tab, frame) =>
    `px-4 py-2 border-b-2 cursor-pointer transition-all duration-200 ${
      activeTab === tab || activeFrame === frame
        ? 'border-black font-bold'
        : 'border-transparent text-gray-400'
    }`;

  return (
    <div
      ref={containerRef}
      className="w-full h-[80vh] overflow-y-auto flex flex-col flex-1 max-w-7xl mx-auto p-4 items-center justify-start animate-fade font-mono text-xs"
    >
    <div className="flex space-x-6 mb-4 border-b w-full">
        <div
          className={styles('', 'crm')}
          onClick={() => setActiveFrame('crm')}
        >
          Customer Relations Manager (CRM)
        </div>
        <div
          className={styles('', 'oms')}
          onClick={() => setActiveFrame('oms')}
        >
          Order Management System (OMS)
        </div>
        <div
          className={styles('', 'payments')}
          onClick={() => setActiveFrame('payments')}
        >
          Payments & Finances
        </div>
      </div>
      {
        
      }
      <div className="flex space-x-6 mb-4 border-b w-full">
        <div
          className={styles('charges')}
          onClick={() => setActiveTab('charges')}
        >
          983 Club
        </div>
        <div
          className={styles('customers')}
          onClick={() => setActiveTab('customers')}
        >
          Customers
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && activeTab === 'charges' && (
        <>
          <div className="w-full animate-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 ">
            {charges.map((charge) => (
              <div class="flex flex-row  border-[0.5px] border-black rounded-sm p-2 hover:bg-slate-100 transition-colors duration-300">
                    <li
                        key={charge.id}
                        className="flex flex-col w-full cursor-pointer"
                    >
                        <p>
                        <strong>Name:</strong> {charge.shipping ? charge.shipping.name : ""}
                        </p>
                        <p>
                        <strong>Email:</strong> {charge.metadata.email}
                        </p>
                        <p>
                        <strong>ID:</strong> {charge.id}
                        </p>
                        <p>
                        <strong>Created:</strong>{' '}
                        {new Date(charge.created * 1000).toLocaleString()}
                        </p>
                        <div>
                            <strong>Shipping:</strong>
                            {charge.shipping ? (
                                <div className="">
                                    <p>{charge.shipping.name}</p>
                                    <p>{charge.shipping.address?.line1}</p>
                                    {charge.shipping.address?.line2 && <p>{charge.shipping.address.line2}</p>}
                                    <p>
                                        {charge.shipping.address?.city}, {charge.shipping.address?.state}{' '}
                                        {charge.shipping.address?.postal_code}
                                    </p>
                                    <p>{charge.shipping.address?.country}</p>
                                </div>
                            ) : (
                                <p className="pl-2 italic text-gray-400">No shipping info</p>
                            )}
                        </div>
                    </li>
                    {}
                    <div class="flex flex-col">
                        <a class="text-xs border-[0.25px] border-black rounded-lg p-1 hover:bg-white transition-colors duration-300 cursor-pointer">get shipping quote</a>
                    </div>
                </div>
            ))}
          </div>

          {hasMore && (
            <button
              onClick={loadMoreCharges}
              disabled={isFetchingMore}
              className="mt-6 px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors duration-300 text-sm"
            >
              {isFetchingMore ? 'Loading...' : 'Load More'}
            </button>
          )}
        </>
      )}

      {!loading && !error && activeTab === 'customers' && (
        <ul className="w-full space-y-4 animate-fade">
          {customers.map((customer) => (
            <li
              key={customer.id}
              className="p-2 border-[0.5px] border-black rounded-md w-full cursor-pointer hover:bg-slate-100 transition-colors duration-300"
            >
              <p>
                <strong>Email:</strong> {customer.email || 'N/A'}
              </p>
              <p>
                <strong>Name:</strong> {customer.name || 'N/A'}
              </p>
              <p>
                <strong>ID:</strong> {customer.id}
              </p>
              <p>
                <strong>Created:</strong>{' '}
                {new Date(customer.created * 1000).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Registry;