
"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WalletProvider } from "@/components/veritas/WalletProvider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Link as LinkIcon, Database, Shield, Activity, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const MOCK_LEDGER = [
  {
    block: "19,204,112",
    hash: "0x7d...a41",
    ipfsCid: "QmXoyp...327",
    timestamp: "2 mins ago",
    status: "Confirmed"
  },
  {
    block: "19,204,110",
    hash: "0x2e...f12",
    ipfsCid: "QmYtz...991",
    timestamp: "15 mins ago",
    status: "Confirmed"
  },
  {
    block: "19,204,105",
    hash: "0x9a...b88",
    ipfsCid: "QmZr1...554",
    timestamp: "1 hour ago",
    status: "Confirmed"
  },
  {
    block: "19,204,098",
    hash: "0x44...c31",
    ipfsCid: "QmPq2...110",
    timestamp: "3 hours ago",
    status: "Confirmed"
  }
];

export default function TransparencyPage() {
  return (
    <WalletProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 space-y-4">
              <h1 className="text-4xl font-headline font-bold text-white">Public Ledger</h1>
              <p className="text-muted-foreground text-lg">
                The immutable proof-of-existence layer where report hashes are anchored to the Solana & Ethereum networks.
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
                      <p className="text-2xl font-headline font-bold text-white">84,291</p>
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
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Anchor Events</CardTitle>
                  <CardDescription>Live stream of cryptographic proofs committed to the mainnet.</CardDescription>
                </div>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Filter by Block..." className="pl-9 bg-secondary/50 border-white/10" />
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
                    {MOCK_LEDGER.map((row) => (
                      <TableRow key={row.hash} className="border-white/5 hover:bg-white/[0.02]">
                        <TableCell className="font-mono text-xs text-accent">{row.block}</TableCell>
                        <TableCell className="font-mono text-xs text-white">{row.hash}</TableCell>
                        <TableCell className="font-mono text-xs text-muted-foreground">{row.ipfsCid}</TableCell>
                        <TableCell className="text-xs">{row.timestamp}</TableCell>
                        <TableCell className="text-right">
                          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 text-[10px]">
                            {row.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
        
        <Footer />
      </div>
    </WalletProvider>
  );
}
