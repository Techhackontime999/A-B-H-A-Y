
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Link as LinkIcon, Database, Shield, Activity, Search, TrendingUp } from "lucide-react";
import { useWallet } from "@/components/veritas/WalletProvider";
import { useState, useEffect } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const MOCK_ACTIVITY_DATA = [
  { time: "00:00", broadcasts: 4 },
  { time: "04:00", broadcasts: 7 },
  { time: "08:00", broadcasts: 12 },
  { time: "12:00", broadcasts: 18 },
  { time: "16:00", broadcasts: 14 },
  { time: "20:00", broadcasts: 22 },
  { time: "23:59", broadcasts: 19 },
];

export default function TransparencyPage() {
  const { reports } = useWallet();
  const [filter, setFilter] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filteredReports = reports.filter(r => 
    r.block.includes(filter) || r.txHash.includes(filter) || r.hash.includes(filter)
  );

  if (!isMounted) return null;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-4">
          <h1 className="text-4xl font-headline font-bold text-white uppercase tracking-tight">Public Ledger</h1>
          <p className="text-muted-foreground text-lg font-light max-w-2xl">
            The immutable proof-of-existence layer where report hashes are anchored to the decentralized A-B-H-A-Y network.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          <Card className="bg-card/50 border-white/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Activity className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Network RPS</p>
                  <p className="text-2xl font-headline font-bold text-white">42.5</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-white/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Database className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Active Nodes</p>
                  <p className="text-2xl font-headline font-bold text-white">1,402</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-white/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <LinkIcon className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Anchored Proofs</p>
                  <p className="text-2xl font-headline font-bold text-white">{84291 + reports.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-white/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Shield className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Uptime Integrity</p>
                  <p className="text-2xl font-headline font-bold text-white">99.9%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="lg:col-span-2 bg-card/30 border-white/5 overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                Network Traffic
              </CardTitle>
              <CardDescription>Real-time truth broadcast volume across global shards.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] pt-4">
              <ChartContainer config={{ broadcasts: { label: "Broadcasts", color: "hsl(var(--accent))" } }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={MOCK_ACTIVITY_DATA}>
                    <defs>
                      <linearGradient id="colorBroadcasts" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="time" 
                      stroke="#444" 
                      fontSize={10} 
                      tickLine={false} 
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="#444" 
                      fontSize={10} 
                      tickLine={false} 
                      axisLine={false}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area 
                      type="monotone" 
                      dataKey="broadcasts" 
                      stroke="hsl(var(--accent))" 
                      fillOpacity={1} 
                      fill="url(#colorBroadcasts)" 
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="bg-accent/5 border-accent/20">
            <CardHeader>
              <CardTitle className="text-lg">Shard Integrity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                  <span className="text-muted-foreground">Consensus Latency</span>
                  <span className="text-accent">1.2s</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-accent w-[92%]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                  <span className="text-muted-foreground">IPFS Availability</span>
                  <span className="text-green-500">100%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[100%]" />
                </div>
              </div>
              <Separator className="bg-white/5" />
              <div className="p-4 bg-black/20 rounded-xl space-y-2">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Latest Block</p>
                <p className="text-sm font-mono text-white">#19204124</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card/30 border-white/5">
          <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Recent Anchor Events</CardTitle>
              <CardDescription>Live cryptographic proofs committed to the mainnet registry.</CardDescription>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                placeholder="Filter Block or Hash..." 
                className="w-full h-10 pl-9 pr-4 bg-white/[0.03] border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent text-sm transition-all"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableHead className="text-muted-foreground font-bold uppercase text-[10px] tracking-widest">Block</TableHead>
                  <TableHead className="text-muted-foreground font-bold uppercase text-[10px] tracking-widest">Transaction Hash</TableHead>
                  <TableHead className="text-muted-foreground font-bold uppercase text-[10px] tracking-widest">Content CID</TableHead>
                  <TableHead className="text-muted-foreground font-bold uppercase text-[10px] tracking-widest">Time</TableHead>
                  <TableHead className="text-right text-muted-foreground font-bold uppercase text-[10px] tracking-widest">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((row) => (
                  <TableRow key={row.txHash} className="border-white/5 hover:bg-white/[0.02] transition-colors">
                    <TableCell className="font-mono text-xs text-accent">{row.block}</TableCell>
                    <TableCell className="font-mono text-xs text-white">{row.txHash}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{row.hash.slice(0, 15)}...</TableCell>
                    <TableCell className="text-xs">{new Date(row.timestamp).toLocaleTimeString()}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 text-[10px]">
                        Confirmed
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Simple internal separator for convenience if not already imported
function Separator({ className }: { className?: string }) {
  return <div className={`h-[1px] w-full bg-border ${className}`} />;
}
