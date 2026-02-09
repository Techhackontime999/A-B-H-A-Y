
"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WalletProvider, useWallet } from "@/components/veritas/WalletProvider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ShieldCheck, Scale, Info, Users, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function VerificationDashboard() {
  const { wallet, stake } = useWallet();
  const { toast } = useToast();

  const handleStake = () => {
    stake();
    toast({
      title: "Successfully Joined DAO",
      description: "You are now eligible to review reports and earn reputation.",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12 space-y-4">
        <h1 className="text-4xl font-headline font-bold text-white">DAO Consensus</h1>
        <p className="text-muted-foreground text-lg">Community verification prevents fake news and preserves platform integrity.</p>
      </div>

      {!wallet || !wallet.isStaked ? (
        <Card className="bg-primary/10 border-accent/20 border-dashed py-12 px-8 text-center max-w-2xl mx-auto">
          <div className="flex flex-col items-center gap-6">
            <div className="p-4 bg-accent/20 rounded-full">
              <Scale className="h-12 w-12 text-accent" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-headline font-bold text-white">Join the Verification Council</h2>
              <p className="text-muted-foreground">
                To prevent spam, Veritas requires reviewers to stake a small amount of reputation or tokens. 
                This ensures everyone in the council has skin in the game.
              </p>
            </div>
            <Button size="lg" className="bg-accent px-8" onClick={handleStake} disabled={!wallet}>
              {wallet ? "Stake & Start Verifying" : "Connect Wallet to Join"}
            </Button>
            {!wallet && <p className="text-xs text-muted-foreground">Generating a DID is required before joining the DAO.</p>}
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h3 className="font-headline font-bold text-white text-xl flex items-center gap-2">
              <Users className="h-5 w-5 text-accent" /> Active Verification Queue
            </h3>
            
            <Card className="bg-card/50 border-white/5 overflow-hidden">
              <CardHeader className="bg-white/5 border-b border-white/5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono text-muted-foreground">CASE ID: #VER-77291</span>
                  <div className="flex items-center gap-1 text-[10px] text-yellow-500 font-bold uppercase">
                    <AlertTriangle className="h-3 w-3" />
                    High Priority
                  </div>
                </div>
                <CardTitle className="text-xl font-headline font-bold text-white">Leak of National Surveillance Protocol</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This report claims to show a new biometric tracking algorithm deployed across public transport hubs in District C. 
                  Multiple technical diagrams are attached to the IPFS hash QmRT91...xP.
                </p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                    <span className="text-white">Consensus Progress</span>
                    <span className="text-accent">72%</span>
                  </div>
                  <Progress value={72} className="h-2" />
                  <p className="text-[10px] text-muted-foreground text-center">Threshold for verification: 85% consensus</p>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold h-12">Verify Authenticity</Button>
                  <Button variant="outline" className="flex-1 border-white/10 text-white font-bold h-12">Flag as Misinformation</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-white/5 overflow-hidden opacity-80">
              <CardHeader className="bg-white/5 border-b border-white/5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono text-muted-foreground">CASE ID: #VER-77292</span>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-bold uppercase">
                    <Users className="h-3 w-3" />
                    Pending Review
                  </div>
                </div>
                <CardTitle className="text-xl font-headline font-bold text-white">Corporate Tax Evasion Documents</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Ledger snapshots from a multinational conglomerate suggesting shell company transfers.
                </p>
                <div className="flex gap-4">
                  <Button disabled className="flex-1">Verify</Button>
                  <Button disabled variant="outline" className="flex-1 border-white/10">Flag</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-secondary/50 border-white/5">
              <CardHeader>
                <CardTitle className="text-lg font-headline font-bold">Your Reputation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-center pb-8">
                <div className="w-24 h-24 rounded-full border-4 border-accent mx-auto flex items-center justify-center">
                  <span className="text-4xl font-headline font-bold text-white">50</span>
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Level 1 Reviewer</p>
                <div className="text-left bg-black/20 p-4 rounded-lg space-y-2 mt-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Successful Reviews:</span>
                    <span className="text-white">0</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Staked Tokens:</span>
                    <span className="text-white">10.0 VRT</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="p-4 bg-accent/10 rounded-xl border border-accent/20 space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-accent" />
                <h4 className="text-sm font-bold text-white">Proof of Stake</h4>
              </div>
              <p className="text-xs text-muted-foreground">Your stake ensures you are financially or reputationally incentivized to tell the truth. Malicious actors have their stakes slashed by the DAO.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function VerifyPage() {
  return (
    <WalletProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16">
          <VerificationDashboard />
        </main>
        <Footer />
      </div>
    </WalletProvider>
  );
}
