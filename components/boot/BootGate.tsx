"use client";

import type { ReactNode } from "react";
import { useLayoutEffect, useRef, useState } from "react";
import { BootScreen } from "./BootScreen";

type BootPhase = "checking" | "splash" | "exiting" | "ready";

type BootGateProps = {
  children: ReactNode;
};

const BOOT_STORAGE_KEY = "arqon_booted";
const FULL_SEQUENCE_MS = 2600;
const EXIT_START_MS = 2200;
const REDUCED_MOTION_MS = 160;

export function BootGate({ children }: BootGateProps) {
  const [phase, setPhase] = useState<BootPhase>("checking");
  const [reducedMotion, setReducedMotion] = useState(false);
  const timersRef = useRef<number[]>([]);

  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const clearTimers = () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
      timersRef.current = [];
    };

    const completeBoot = () => {
      clearTimers();

      try {
        window.sessionStorage.setItem(BOOT_STORAGE_KEY, "1");
      } catch {
        // Ignore storage write failures and continue into the app.
      }

      setPhase("ready");
    };

    const startSequence = (useReducedMotion: boolean) => {
      setReducedMotion(useReducedMotion);
      setPhase("splash");

      if (useReducedMotion) {
        timersRef.current.push(window.setTimeout(completeBoot, REDUCED_MOTION_MS));
        return;
      }

      timersRef.current.push(
        window.setTimeout(() => setPhase("exiting"), EXIT_START_MS),
      );
      timersRef.current.push(window.setTimeout(completeBoot, FULL_SEQUENCE_MS));
    };

    const syncReducedMotion = () => {
      setReducedMotion(mediaQuery.matches);
    };

    syncReducedMotion();

    let hasBooted = false;

    try {
      hasBooted = window.sessionStorage.getItem(BOOT_STORAGE_KEY) === "1";
    } catch {
      hasBooted = false;
    }

    if (hasBooted) {
      setPhase("ready");
    } else {
      startSequence(mediaQuery.matches);
    }

    const handleMotionChange = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleMotionChange);

    return () => {
      clearTimers();
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  const handleSkip = () => {
    try {
      window.sessionStorage.setItem(BOOT_STORAGE_KEY, "1");
    } catch {
      // Ignore storage write failures and continue into the app.
    }

    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
    setPhase("ready");
  };

  return (
    <>
      {children}
      {phase !== "ready" ? (
        <BootScreen
          isExiting={phase === "exiting"}
          reducedMotion={reducedMotion}
          onSkip={handleSkip}
        />
      ) : null}
    </>
  );
}
