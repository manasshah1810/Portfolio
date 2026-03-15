"use client";

import React, { useState, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import MacDesktop from "@/components/MacDesktop";
import PhoneLoader from "@/components/mobile/PhoneLoader";
import PhoneUI from "@/components/mobile/PhoneUI";
import ProfessionalView from "@/components/ProfessionalView";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [showProfessionalView, setShowProfessionalView] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // Standard tablet/mobile breakpoint
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile === null) return;

    // Check local session for whether the respective platform's loader has been shown
    const visitKey = `hasVisited_${isMobile ? 'mobile' : 'desktop'}`;
    const hasVisited = sessionStorage.getItem(visitKey);

    if (hasVisited) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [isMobile]);

  const handleLoadingComplete = () => {
    setLoading(false);
    if (isMobile !== null) {
      sessionStorage.setItem(`hasVisited_${isMobile ? 'mobile' : 'desktop'}`, "true");
    }
  };

  // Prevent hydration errors by returning null initially
  if (isMobile === null) {
    return null;
  }

  // Professional View Overlay
  if (showProfessionalView) {
    return <ProfessionalView onBack={() => setShowProfessionalView(false)} />;
  }

  // Mobile experience
  if (isMobile) {
    if (loading) {
      return <PhoneLoader onComplete={handleLoadingComplete} />;
    }
    return <PhoneUI onToggleProfessional={() => setShowProfessionalView(true)} />;
  }

  // Desktop experience
  if (loading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return <MacDesktop onToggleProfessional={() => setShowProfessionalView(true)} />;
}
