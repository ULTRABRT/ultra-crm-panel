"use client";

import {
  createContext,
  useContext,
  type ReactNode,
} from "react";
import { useChannelSignals } from "../hooks/useChannelSignals";

type ChannelSignalContextValue = ReturnType<typeof useChannelSignals>;

const ChannelSignalContext =
  createContext<ChannelSignalContextValue | null>(null);

type ChannelSignalProviderProps = {
  children: ReactNode;
};

export function ChannelSignalProvider({
  children,
}: ChannelSignalProviderProps) {
  const value = useChannelSignals();

  return (
    <ChannelSignalContext.Provider value={value}>
      {children}
    </ChannelSignalContext.Provider>
  );
}

export function useChannelSignalContext(): ChannelSignalContextValue {
  const context = useContext(ChannelSignalContext);

  if (context === null) {
    throw new Error(
      "useChannelSignalContext must be used within ChannelSignalProvider",
    );
  }

  return context;
}
