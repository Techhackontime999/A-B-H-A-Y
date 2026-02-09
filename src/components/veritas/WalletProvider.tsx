
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type VeritasWallet = {
  address: string;
  reputation: number;
  isStaked: boolean;
};

type WalletContextType = {
  wallet: VeritasWallet | null;
  connect: () => void;
  disconnect: () => void;
  stake: () => void;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [wallet, setWallet] = useState<VeritasWallet | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('veritas_wallet');
    if (saved) setWallet(JSON.parse(saved));
  }, []);

  const connect = () => {
    // Simulated wallet generation
    const mockAddress = '0x' + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    const newWallet = { address: mockAddress, reputation: 50, isStaked: false };
    setWallet(newWallet);
    localStorage.setItem('veritas_wallet', JSON.stringify(newWallet));
  };

  const disconnect = () => {
    setWallet(null);
    localStorage.removeItem('veritas_wallet');
  };

  const stake = () => {
    if (wallet) {
      const updated = { ...wallet, isStaked: true };
      setWallet(updated);
      localStorage.setItem('veritas_wallet', JSON.stringify(updated));
    }
  };

  return (
    <WalletContext.Provider value={{ wallet, connect, disconnect, stake }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
