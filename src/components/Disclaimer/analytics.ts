import ReactGA from "react-ga4";

export function initializeAnalytics() {
  if (process.env.NODE_ENV === "production") {
    ReactGA.initialize(import.meta.env.VITE_GOOGLE_ANALYTICS_API_KEY);
  }
}
