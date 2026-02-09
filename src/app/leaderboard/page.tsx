
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Trophy, ShieldCheck, Zap, Users, Star, ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";

const LEADERBOARD_DATA = [
  { rank: 1, address: "0x4e...21a3", reputation: 4850, verified: 142, role: "Council Elder" },
  { rank: 2, address: "0x8a...f92d", reputation: 4120, verified: 118, role: "Truth Seeker" },
  { rank: 3, address: "0x12...c09e", reputation: 3940, verified: 95, role: "Master Auditor" },
  { rank: 4, address: "0xbc...7761", reputation: 2850, verified: 64, role: "Verifier" },
  { rank: 5, address: "0xfe...1102", reputation: 2100, verified: 52, role: "Verifier" },
  { rank: 6, address: "0x34...88a9", reputation: 1950, verified: 48, role: "Auditor" },
  { rank: 7, address: "0x9d...22b1", reputation: 1800, verified: 45, role: "Auditor" },
];

export default function LeaderboardPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
          <div className="space-y-4">
            <h1 className="text-5xl font-headline font-bold text-white tracking-tighter uppercase">TRUST ELITE</h1>
            <p className="text-muted-foreground text-xl font-light">
              Top community verifiers who maintain the integrity of the A-B-H-A-Y protocol.
            </p>
          </div>
          <div className="flex gap-4">
            <Card className="bg-primary/10 border-primary/20 p-4 flex items-center gap-4">
              <Users className="h-8 w-8 text-accent" />
              <div>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Active Members</p>
                <p className="text-2xl font-headline font-bold text-white">1,402</p>
              </div>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Top 3 Podium */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {LEADERBOARD_DATA.slice(0, 3).map((user) => (
              <Card key={user.rank} className={`relative overflow-hidden border-white/5 transition-all hover:scale-[1.02] ${
                user.rank === 1 ? 'bg-gradient-to-b from-accent/20 to-card border-accent/30' : 'bg-card/50'
              }`}>
                {user.rank === 1 && (
                  <div className="absolute top-4 right-4 p-2 bg-accent rounded-full animate-bounce">
                    <Trophy className="h-5 w-5 text-white" />
                  </div>
                )}
                <CardContent className="pt-10 pb-8 text-center space-y-4">
                  <div className="relative inline-block">
                    <Avatar className="h-24 w-24 mx-auto border-4 border-white/5">
                      <AvatarImage src={`https://picsum.photos/seed/${user.address}/200`} />
                      <AvatarFallback>0x</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-accent flex items-center justify-center font-bold text-sm text-white">
                      {user.rank}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-headline font-bold text-white font-mono">{user.address}</h3>
                    <Badge variant="secondary" className="bg-primary/20 text-accent font-bold uppercase tracking-widest text-[10px]">
                      {user.role}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                    <div>
                      <p className="text-[8px] text-muted-foreground uppercase font-bold tracking-[0.2em] mb-1">Reputation</p>
                      <p className="text-lg font-headline font-bold text-white">{user.reputation}</p>
                    </div>
                    <div>
                      <p className="text-[8px] text-muted-foreground uppercase font-bold tracking-[0.2em] mb-1">Verified</p>
                      <p className="text-lg font-headline font-bold text-white">{user.verified}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* List View */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xl font-headline font-bold text-white flex items-center gap-2 mb-6">
              <Zap className="h-5 w-5 text-accent" /> Global Standings
            </h3>
            {LEADERBOARD_DATA.slice(3).map((user) => (
              <div key={user.rank} className="group flex items-center justify-between p-6 bg-card/30 border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-all cursor-pointer">
                <div className="flex items-center gap-6">
                  <span className="text-lg font-headline font-bold text-muted-foreground w-6">{user.rank}</span>
                  <Avatar className="h-12 w-12 border border-white/10">
                    <AvatarImage src={`https://picsum.photos/seed/${user.address}/100`} />
                    <AvatarFallback>0x</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-mono text-white font-bold">{user.address}</p>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{user.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-12 text-right">
                  <div className="hidden sm:block">
                    <p className="text-[8px] text-muted-foreground uppercase font-bold tracking-[0.2em]">Verified</p>
                    <p className="text-sm font-headline font-bold text-white">{user.verified}</p>
                  </div>
                  <div className="w-24">
                    <p className="text-[8px] text-muted-foreground uppercase font-bold tracking-[0.2em]">Reputation</p>
                    <div className="flex items-center justify-end gap-2">
                      <Star className="h-3 w-3 text-accent fill-accent" />
                      <p className="text-sm font-headline font-bold text-white">{user.reputation}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Info */}
          <div className="space-y-8">
            <Card className="bg-accent/5 border-accent/20">
              <CardHeader>
                <CardTitle className="text-lg font-headline font-bold text-white">How to Rank Up</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-4">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <ShieldCheck className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Verify Truths</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">Participate in consensus votes. Correct votes increase reputation.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Star className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Stake Assets</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">Staking reputation tokens gives you a higher weight in DAO votes.</p>
                  </div>
                </div>
                <Separator className="bg-white/5" />
                <div className="p-4 bg-black/20 rounded-xl space-y-3">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Your Current Rank</p>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold">Unranked</span>
                    <Badge className="bg-white/5 border-white/10 text-white">Connect Wallet</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
