
"use client";

import { Shield } from "lucide-react";
import { useState, useEffect } from "react";

export function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-background border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-accent" />
              <span className="text-xl font-headline font-bold text-white uppercase">A-B-H-A-Y</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Censorship-resistant truth protocol. Powered by IPFS and Blockchain.
            </p>
          </div>
          
          <div>
            <h4 className="font-headline text-sm font-bold text-white mb-4 uppercase tracking-widest">Protocol</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-accent transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">DAO Governance</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Smart Contracts</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline text-sm font-bold text-white mb-4 uppercase tracking-widest">Network Status</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span>IPFS Node Clusters Online</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span>Blockchain Proofing Layer Active</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {year || "...."} A-B-H-A-Y Protocol. No central authority.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Ethical Guidelines</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
