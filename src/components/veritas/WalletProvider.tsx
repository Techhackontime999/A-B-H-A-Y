
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export type ReportStatus = 'Pending' | 'Verified' | 'Flagged' | 'Verification Required';

export type Report = {
  id: string;
  title: string;
  content: string;
  summary?: string;
  impactLevel?: 'Low' | 'Medium' | 'High' | 'Critical';
  timestamp: string;
  status: ReportStatus;
  category: string;
  hash: string;
  txHash: string;
  block: string;
  author: string;
  consensus: number;
};

type AbhayWallet = {
  address: string;
  reputation: number;
  isStaked: boolean;
};

type WalletContextType = {
  wallet: AbhayWallet | null;
  reports: Report[];
  connect: () => void;
  disconnect: () => void;
  stake: () => void;
  sign: (message: string) => Promise<string>;
  addReport: (report: Report) => void;
  verifyReport: (id: string, isPositive: boolean) => void;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const INITIAL_REPORTS: Report[] = [
  {
    id: "v-001",
    title: "Offshore Drilling Leak Cover-up",
    content: "Internal documents show a significant oil leak was detected three months before public disclosure at the Northern Rig site.",
    summary: "Evidence of a 3-month cover-up regarding a major oil leak at the Northern Rig site.",
    impactLevel: "High",
    timestamp: "2024-03-01T10:00:00.000Z",
    status: "Verified",
    category: "Environment",
    hash: "QmXoyp88219327",
    txHash: "0x7d219327a41",
    block: "19204112",
    author: "0x1234...abcd",
    consensus: 92
  },
  {
    id: "v-002",
    title: "Election Finance Irregularities in District 7",
    content: "Unlabeled funding sources linked to major development firms discovered in local council campaign ledgers.",
    summary: "Illegal campaign funding from development firms discovered in local election records.",
    impactLevel: "Critical",
    timestamp: "2024-03-02T14:30:00.000Z",
    status: "Pending",
    category: "Government",
    hash: "QmYtz9910283",
    txHash: "0x2e831028f12",
    block: "19204110",
    author: "0x5678...efgh",
    consensus: 45
  }
];

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [wallet, setWallet] = useState<AbhayWallet | null>(null);
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const savedWallet = localStorage.getItem('abhay_wallet');
    if (savedWallet) setWallet(JSON.parse(savedWallet));

    const savedReports = localStorage.getItem('abhay_reports');
    if (savedReports) {
      setReports(JSON.parse(savedReports));
    } else {
      setReports(INITIAL_REPORTS);
    }
  }, []);

  useEffect(() => {
    if (reports.length > 0) {
      localStorage.setItem('abhay_reports', JSON.stringify(reports));
    }
  }, [reports]);

  const connect = () => {
    const mockAddress = '0x' + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    const newWallet = { 
      address: mockAddress, 
      reputation: 50, 
      isStaked: false 
    };
    setWallet(newWallet);
    localStorage.setItem('abhay_wallet', JSON.stringify(newWallet));
  };

  const disconnect = () => {
    setWallet(null);
    localStorage.removeItem('abhay_wallet');
  };

  const stake = () => {
    if (wallet) {
      const updated = { ...wallet, isStaked: true };
      setWallet(updated);
      localStorage.setItem('abhay_wallet', JSON.stringify(updated));
    }
  };

  const sign = async (message: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return `sig_${Math.random().toString(36).substring(2, 11)}`;
  };

  const addReport = (report: Report) => {
    setReports(prev => [report, ...prev]);
  };

  const verifyReport = (id: string, isPositive: boolean) => {
    setReports(prev => prev.map(r => {
      if (r.id === id) {
        const newConsensus = isPositive ? Math.min(100, r.consensus + 5) : Math.max(0, r.consensus - 5);
        let newStatus = r.status;
        if (newConsensus >= 85) newStatus = 'Verified';
        if (newConsensus <= 15) newStatus = 'Flagged';
        return { ...r, consensus: newConsensus, status: newStatus };
      }
      return r;
    }));
    
    if (wallet) {
      const updated = { ...wallet, reputation: wallet.reputation + (isPositive ? 1 : -1) };
      setWallet(updated);
      localStorage.setItem('abhay_wallet', JSON.stringify(updated));
    }
  };

  return (
    <WalletContext.Provider value={{ wallet, reports, connect, disconnect, stake, sign, addReport, verifyReport }}>
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
