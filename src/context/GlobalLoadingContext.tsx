"use client"

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface GlobalLoadingContextType {
  globalLoading: boolean;
  setGlobalLoading: (loading: boolean) => void;
  startGlobalLoading: () => void;
  stopGlobalLoading: () => void;
}

const GlobalLoadingContext = createContext<GlobalLoadingContextType | undefined>(undefined);

export function GlobalLoadingProvider({ children }: { children: ReactNode }) {
  const [globalLoading, setGlobalLoadingState] = useState(false);

  const setGlobalLoading = useCallback((loading: boolean) => {
    setGlobalLoadingState(loading);
  }, []);

  const startGlobalLoading = useCallback(() => {
    setGlobalLoadingState(true);
  }, []);

  const stopGlobalLoading = useCallback(() => {
    setGlobalLoadingState(false);
  }, []);

  return (
    <GlobalLoadingContext.Provider value={{
      globalLoading,
      setGlobalLoading,
      startGlobalLoading,
      stopGlobalLoading
    }}>
      {children}
    </GlobalLoadingContext.Provider>
  );
}

export function useGlobalLoading() {
  const context = useContext(GlobalLoadingContext);
  if (context === undefined) {
    throw new Error('useGlobalLoading must be used within a GlobalLoadingProvider');
  }
  return context;
}
