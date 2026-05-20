"use client";

import { useMemo } from "react";
import { channelSignals } from "../data/dna/channelStatus";
import {
  calculateSignalParams,
  getSignalWeight,
} from "../lib/dna/signalEngine";
import type {
  ChannelId,
  ChannelSignal,
  ChannelSignalSnapshot,
  SignalEngineParams,
} from "../types/dna/ChannelSignal";

export function useChannelSignals(): ChannelSignalSnapshot & {
  getSignalById: (id: ChannelId) => ChannelSignal | undefined;
  getSignalParams: (id: ChannelId) => SignalEngineParams | undefined;
} {
  return useMemo(() => {
    const signals = [...channelSignals].sort(
      (a, b) => getSignalWeight(b) - getSignalWeight(a),
    );
    const activeSignals = signals.filter(
      (signal) => signal.status === "connected",
    );
    const errorSignals = signals.filter((signal) => signal.status === "error");
    const disconnectedSignals = signals.filter(
      (signal) => signal.status === "disconnected",
    );
    const attentionSignals = signals.filter(
      (signal) =>
        signal.status === "error" || signal.status === "disconnected",
    );
    const totalThroughput = signals.reduce(
      (total, signal) => total + signal.throughput,
      0,
    );
    const averageHealthScore =
      signals.length === 0
        ? 0
        : Math.round(
            signals.reduce((total, signal) => total + signal.healthScore, 0) /
              signals.length,
          );

    return {
      signals,
      activeSignals,
      errorSignals,
      disconnectedSignals,
      attentionSignals,
      totalThroughput,
      averageHealthScore,
      getSignalById: (id: ChannelId) =>
        signals.find((signal) => signal.id === id),
      getSignalParams: (id: ChannelId) => {
        const signal = signals.find((item) => item.id === id);
        return signal ? calculateSignalParams(signal) : undefined;
      },
    };
  }, []);
}
