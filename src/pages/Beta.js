import React, { useState, useEffect, useRef } from "react";

import triggerGetBetaTesters from "../functions/beta/triggerGetBetaTesters";
import triggerPostToDispositionBetaAccessRequest from "../functions/beta/triggerPostToDispositionBetaAccessRequest";

const Beta = () => {
  const portalRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [testers, setTesters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusMap, setStatusMap] = useState({});
  const [loadingMap, setLoadingMap] = useState({});
  const [refreshCountdown, setRefreshCountdown] = useState(30);
  const [activeTab, setActiveTab] = useState("awaiting");

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

  const fetchTesters = async () => {
    try {
      const data = await triggerGetBetaTesters();
      console.log("Fetched beta testers:", data);
      setTesters(data);
      setLoading(false);
      setRefreshCountdown(30);
    } catch (e) {
      console.error("Failed to fetch beta testers:", e);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTesters();
    const interval = setInterval(fetchTesters, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const countdown = setInterval(() => {
      setRefreshCountdown((prev) => (prev > 0 ? prev - 1 : 30));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const updateStatus = async (username, action) => {
    setLoadingMap(prev => ({ ...prev, [username]: true }));
    try {
      await triggerPostToDispositionBetaAccessRequest(username, action);
      setStatusMap(prev => ({ ...prev, [username]: 'success' }));
      setTesters((prev) =>
        prev.map((r) =>
          r.username === username ? { ...r, status: action } : r
        )
      );
    } catch (err) {
      console.error(`Failed to ${action} user ${username}:`, err);
      setStatusMap(prev => ({ ...prev, [username]: 'error' }));
    } finally {
      setLoadingMap(prev => ({ ...prev, [username]: false }));
    }
  };

  const btnBase = `flex w-full items-center justify-center font-mono text-[10px] sm:text-xs uppercase font-bold py-2 px-3 rounded-lg border-[0.5px] transition-colors duration-300`;
  const btnError = 'bg-black text-white shake';
  const btnSuccess = 'bg-cowjuice-gold text-white';
  const btnIdle = 'bg-white text-black border-black hover:bg-black hover:text-white';

  const getButtonClass = (status) => {
    if (status === 'success') return `${btnBase} ${btnSuccess}`;
    if (status === 'error') return `${btnBase} ${btnError}`;
    return `${btnBase} ${btnIdle}`;
  };

  const renderTesters = (filter) => {
    const filtered = testers.filter(r => r.status === filter);
    return (
      <div className="flex flex-col w-full space-y-2">
        {filtered.length === 0 ? (
          <p className="font-mono text-xs uppercase text-gray-400">
            No {filter} beta testers. Tragic.
          </p>
        ) : (
          filtered.map(({ username, status, timestamp }, idx) => (
            <div
              key={username + timestamp}
              className={`w-full rounded-sm border-[0.5px] border-black p-2 animate-flip-down animate-delay-[${250 + idx * 125}ms]`}
            >
              <div className="font-mono text-[11px] uppercase leading-tight space-y-1">
                <div className="flex flex-row w-full items-center justify-between">
                  <div className="font-bold text-xs">@{username}</div>
                  <a href={`https://tiktok.com/@${username}`} target="_blank" className="font-bold text-[10px] text-cowjuice-gold border-[0.5px] border-cowjuice-gold hover:bg-cowjuice-gold/10 rounded-lg px-2 py-1 transition-colors duration-300">Examine @ on TikTok →</a>
                </div>
                <div className="text-[10px] mt-1">Status: {status}</div>
                <div className="text-[10px] mt-1">Membership requested on: {new Date(timestamp).toLocaleString()} ET</div>
                {status === "awaiting" && (
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => updateStatus(username, "approved")}
                      disabled={loadingMap[username]}
                      className={getButtonClass(statusMap[username])}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(username, "rejected")}
                      disabled={loadingMap[username]}
                      className={getButtonClass(statusMap[username])}
                    >
                      Reject
                    </button>
                  </div>
                )}

                {status === "approved" && (
                  <>
                    <button
                      onClick={() => updateStatus(username, "awaiting")}
                      disabled={loadingMap[username]}
                      className={getButtonClass(statusMap[username])}
                    >
                      Rescind
                    </button>
                    <button
                      onClick={() => updateStatus(username, "rejected")}
                      disabled={loadingMap[username]}
                      className={getButtonClass(statusMap[username])}
                    >
                      Reject
                    </button>
                  </>
                )}

                {status === "rejected" && (
                  <>
                    <button
                      onClick={() => updateStatus(username, "approved")}
                      disabled={loadingMap[username]}
                      className={getButtonClass(statusMap[username])}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(username, "awaiting")}
                      disabled={loadingMap[username]}
                      className={getButtonClass(statusMap[username])}
                    >
                      Reconsider
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    );
  };

  return (
    <div
      ref={portalRef}
      className="inset-0 flex flex-row items-start justify-center flex-1 min-h-screen pt-12 px-6 pb-6 w-full h-full overflow-hidden"
    >
      <div className="flex flex-1 max-w-6xl mx-auto w-full h-full">
        <div className={anim("flex flex-col-reverse sm:grid gap-8 sm:grid-cols-3 h-full items-start justify-center animate-fade")}>
          {/* Left Panel */}
          <div className={anim("flex flex-col flex-1 w-full h-full border-[0.5px] border-black rounded-sm items-start justify-between space-y-2 p-2 sm:p-4 animate-fade-up sm:animate-fade-left")}>
            <div className="flex flex-1 flex-col items-start w-full space-y-1">
              <p className="text-[10px] font-mono uppercase leading-3 font-bold">
                Regulate access to the Cow Juice Private Beta Testing Program.
              </p>
              <div className="flex flex-col items-end justify-center w-full space-y-1">
                <p className="flex text-right animate-pulse font-mono text-[10px] leading-3 uppercase">Refreshing in {refreshCountdown}</p>
                <button
                  onClick={fetchTesters}
                  className="flex w-full items-center justify-center font-mono text-[10px] sm:text-xs uppercase font-bold py-2 px-3 rounded-lg border-[0.5px] border-black bg-white text-black hover:bg-black hover:text-white transition-colors duration-300"
                >
                  Refresh Now
                </button>
              </div>
              <div className="flex flex-col w-full pt-4 space-y-1">
                <button onClick={() => setActiveTab("awaiting")} className={getButtonClass(activeTab === "awaiting" ? 'success' : '')}>Awaiting</button>
                <button onClick={() => setActiveTab("approved")} className={getButtonClass(activeTab === "approve" ? 'success' : '')}>Approved</button>
                <button onClick={() => setActiveTab("rejected")} className={getButtonClass(activeTab === "reject" ? 'success' : '')}>Rejected</button>
              </div>
            </div>
            <p className="flex w-full font-mono py-2 text-[10px] leading-3 uppercase opacity-60 border-t-[0.5px] border-black">
              Internal use only. Violators will be prosecuted according to the universal code of bovine justice.
            </p>
          </div>

          {/* Main Panel */}
          <div className={anim("flex flex-col col-span-2 justify-start items-center space-y-4 w-full animate-fade")}> 
            <h1 className="flex w-full font-mono text-xs uppercase font-bold">
              Cow Juice Private Beta Testing Club - Master Membership Management
            </h1>
            {loading ? (
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 animate-spin">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              renderTesters(activeTab)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Beta;
