// src/pages/LandingPage.jsx
import React from "react";
import LandingNavbar from "../components/common/LandingNavbar";
import Dashboard from "./Dashboard"; // this contains sections with ids: home, courses, faqs, contact

export default function LandingPage() {
  return (
    <>
      <LandingNavbar />
      <Dashboard />
    </>
  );
}
