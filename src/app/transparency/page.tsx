
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Link as LinkIcon, Database, Shield, Activity, Search } from "lucide-react";
import { useWallet } from "@/components/veritas/WalletProvider";
import { useState, useEffect } from "react";

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
          <h1 className="text-4xl font-headline font-bold text-white">Public Ledger</h1>
          <p className="text-muted-foreground text-lg">
            The immutable proof-of-existence layer where report hashes are anchored to the decentralized network.
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
                  <p className="text-xs text-muted-foreground font-bold uppercase">Network RPS</p>
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
                  <p className="text-xs text-muted-foreground font-bold uppercase">IPFS Nodes</p>
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
                  <p className="text-xs text-muted-foreground font-bold uppercase">Total Anchors</p>
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
                  <p className="text-xs text-muted-foreground font-bold uppercase">Integrity Score</p>
                  <p className="text-2xl font-headline font-bold text-white">99.9%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card/50 border-white/5">
          <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Recent Anchor Events</CardTitle>
              <CardDescription>Live stream of cryptographic proofs committed to the mainnet.</CardDescription>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                placeholder="Filter by Block or Hash..." 
                className="w-full h-10 pl-9 pr-4 bg-secondary/50 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableHead className="text-muted-foreground font-bold uppercase text-[10px]">Block</TableHead>
                  <TableHead className="text-muted-foreground font-bold uppercase text-[10px]">Transaction Hash</TableHead>
                  <TableHead className="text-muted-foreground font-bold uppercase text-[10px]">IPFS Content CID</TableHead>
                  <TableHead className="text-muted-foreground font-bold uppercase text-[10px]">Time</TableHead>
                  <TableHead className="text-right text-muted-foreground font-bold uppercase text-[10px]">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((row) => (
                  <TableRow key={row.txHash} className="border-white/5 hover:bg-white/[0.02]">
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
