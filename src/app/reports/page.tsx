
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, ExternalLink, Calendar, Hash, ShieldCheck, AlertCircle } from "lucide-react";
import { useWallet } from "@/components/veritas/WalletProvider";
import Link from "next/link";
import { useState } from "react";

export default function ReportsFeed() {
  const { reports } = useWallet();
  const [search, setSearch] = useState("");

  const filteredReports = reports.filter(r => 
    r.title.toLowerCase().includes(search.toLowerCase()) || 
    r.hash.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div className="space-y-2">
            <h1 className="text-4xl font-headline font-bold text-white">Truth Registry</h1>
            <p className="text-muted-foreground text-lg">Public, immutable record of all reports broadcasted to the network.</p>
          </div>
          
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              placeholder="Search IPFS hashes or titles..." 
              className="w-full h-10 pl-10 pr-4 bg-secondary/50 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {filteredReports.length > 0 ? filteredReports.map((report) => (
              <Card key={report.id} className="bg-card/50 border-white/5 hover:bg-white/[0.04] transition-all group overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="border-accent/30 text-accent font-mono text-[10px] uppercase tracking-widest">
                      {report.category}
                    </Badge>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                      <Calendar className="h-3 w-3" />
                      {new Date(report.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-headline font-bold text-white group-hover:text-accent transition-colors">
                    {report.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {report.content}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-white/5 gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        {report.status === "Verified" ? (
                          <ShieldCheck className="h-4 w-4 text-green-500" />
                        ) : report.status === "Pending" ? (
                          <AlertCircle className="h-4 w-4 text-yellow-500" />
                        ) : report.status === "Flagged" ? (
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${
                          report.status === "Verified" ? "text-green-500" : 
                          report.status === "Pending" ? "text-yellow-500" : 
                          report.status === "Flagged" ? "text-red-500" :
                          "text-muted-foreground"
                        }`}>
                          {report.status}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono bg-white/5 px-2 py-0.5 rounded">
                        <Hash className="h-3 w-3" />
                        {report.hash.slice(0, 12)}...
                      </div>
                    </div>
                    
                    <Button variant="ghost" size="sm" className="text-accent hover:text-accent hover:bg-accent/10 gap-2 w-fit">
                      View Report <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )) : (
              <div className="text-center py-20 bg-white/[0.02] border border-dashed border-white/10 rounded-2xl">
                <p className="text-muted-foreground">No reports matching your search.</p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <Card className="bg-primary/5 border-primary/20 sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg font-headline font-bold text-white">Network Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Total Reports</p>
                  <p className="text-3xl font-headline font-bold text-white tracking-tighter">{reports.length}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Verification Rate</p>
                  <p className="text-3xl font-headline font-bold text-white tracking-tighter">
                    {((reports.filter(r => r.status === 'Verified').length / reports.length) * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Active DAO Reviewers</p>
                  <p className="text-3xl font-headline font-bold text-white tracking-tighter">15,402</p>
                </div>
                <div className="pt-4 border-t border-white/5">
                  <Link href="/verify">
                    <Button className="w-full bg-accent hover:bg-accent/90">Join the DAO</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
