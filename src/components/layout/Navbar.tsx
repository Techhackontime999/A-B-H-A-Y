
"use client";

import Link from "next/link";
import { Shield, Menu, X, Wallet, ShieldCheck, FileText, BarChart3, PlusCircle, Trophy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/components/veritas/WalletProvider";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { wallet, connect, disconnect } = useWallet();

  const navLinks = [
    { name: "Registry", href: "/reports", icon: FileText },
    { name: "Verify", href: "/verify", icon: ShieldCheck },
    { name: "Elite", href: "/leaderboard", icon: Trophy },
    { name: "Transparency", href: "/transparency", icon: BarChart3 },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-primary/20 p-2 rounded-lg group-hover:bg-primary/30 transition-colors">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <span className="text-xl font-headline font-bold tracking-tighter text-white uppercase">A-B-H-A-Y</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/submit" 
              className="flex items-center gap-2 text-sm font-bold text-accent hover:text-accent/80 transition-colors"
            >
              <PlusCircle className="h-4 w-4" />
              Broadcast Truth
            </Link>
            
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
            
            {wallet ? (
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className="text-[8px] text-muted-foreground uppercase font-bold tracking-[0.2em]">Identified</span>
                  <span className="text-xs font-mono text-accent">{wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}</span>
                </div>
                <Button variant="outline" size="sm" onClick={disconnect} className="border-white/10 hover:bg-white/5 h-8 rounded-lg px-3 text-[10px] font-bold uppercase">
                  Exit
                </Button>
              </div>
            ) : (
              <Button onClick={connect} size="sm" className="bg-primary hover:bg-primary/80 text-white gap-2 h-9 px-4 rounded-xl text-xs font-bold">
                <Wallet className="h-4 w-4" />
                Generate DID
              </Button>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-muted-foreground">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn("md:hidden bg-secondary border-b border-white/5", isOpen ? "block" : "hidden")}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/submit"
            className="block px-3 py-2 text-base font-bold text-accent"
          >
            Broadcast Truth
          </Link>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-white"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 px-3">
            {!wallet ? (
              <Button onClick={connect} className="w-full bg-primary gap-2">
                <Wallet className="h-4 w-4" />
                Generate DID
              </Button>
            ) : (
              <Button onClick={disconnect} variant="outline" className="w-full border-white/10">
                Exit Protocol
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
