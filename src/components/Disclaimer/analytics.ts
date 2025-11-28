import ReactGA from "react-ga4";

export function initializeAnalytics() {
  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV === "production") {
    ReactGA.initialize("G-PDDJLQ8NLZ");
  }
}
