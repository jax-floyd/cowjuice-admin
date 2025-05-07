import { createContext, useContext } from "react";
import mixpanel from "mixpanel-browser";

mixpanel.init("01bafa20667b539225ed4e33d383de0f", {
  debug: true,
  track_pageview: true,
  persistence: "localStorage",
});

export const AnalyticsContext = createContext();

export const useAnalyticsContext = () => useContext(AnalyticsContext);

export const AnalyticsContextProvider = ({ children }) => {
  const trackEvent = (eventName, properties = {}) => {
    mixpanel.track(eventName, properties);
  };

  const identifyUser = (email) => {
    mixpanel.identify(email); // Identify user in Mixpanel with their email
    mixpanel.people.set({ $email: email }); // Set email property
  };

  const value = {
    trackEvent,
    identifyUser,
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};
