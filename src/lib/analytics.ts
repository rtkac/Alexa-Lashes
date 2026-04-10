import ReactGA from "react-ga4";

export const initializeAnalytics = () => {
  if (process.env.NODE_ENV === "production") {
    const apiKey = import.meta.env.VITE_GOOGLE_ANALYTICS_API_KEY;
    if (apiKey) {
      ReactGA.initialize(apiKey);
    }
  }
};
