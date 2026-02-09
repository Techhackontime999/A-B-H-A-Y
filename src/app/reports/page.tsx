
"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WalletProvider } from "@/components/veritas/WalletProvider";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, ExternalLink, Calendar, Hash, ShieldCheck, AlertCircle } from "lucide-react";
import Link from "next/link";

const MOCK_REPORTS = [
  {
    id: "v-001",
    title: "Offshore Drilling Leak Cover-up",
    timestamp: "2024-05-12T10:00:00Z",
    status: "Verified",
    category: "Environment",
    hash: "QmXoyp...327",
    summary: "Internal documents show a significant oil leak was detected three months before public disclosure."
  },
  {
    id: "v-002",
    title: "Election Finance Irregularities in District 7",
    timestamp: "2024-05-11T14:30:00Z",
    status: "Pending",
    category: "Government",
    hash: "QmYtz...991",
    summary: "Unlabeled funding sources linked to major development firms for local council campaigns."
  },
  {
    id: "v-003",
    title: "Unsafe Labor Conditions at Textile Hub",
    timestamp: "2024-05-10T09:15:00Z",
    status: "Verification Required",
    category: "Human Rights",
    hash: "QmZr1...554",
    summary: "Leaked safety inspection reports for factory complex B-12 show structural failures."
  }
];

export default function ReportsFeed() {
  return (
    <WalletProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
              <div className="space-y-2">
                <h1 className="text-4xl font-headline font-bold text-white">Truth Registry</h1>
                <p className="text-muted-foreground text-lg">Public, immutable record of all reports broadcasted to the network.</p>
              </div>
              
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search IPFS hashes or titles..." className="pl-10 bg-secondary/50 border-white/10" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {MOCK_REPORTS.map((report) => (
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
                        {report.summary}
                      </p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1.5">
                            {report.status === "Verified" ? (
                              <ShieldCheck className="h-4 w-4 text-green-500" />
                            ) : report.status === "Pending" ? (
                              <AlertCircle className="h-4 w-4 text-yellow-500" />
                            ) : (
                              <AlertCircle className="h-4 w-4 text-muted-foreground" />
                            )}
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${
                              report.status === "Verified" ? "text-green-500" : report.status === "Pending" ? "text-yellow-500" : "text-muted-foreground"
                            }`}>
                              {report.status}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono bg-white/5 px-2 py-0.5 rounded">
                            <Hash className="h-3 w-3" />
                            {report.hash}
                          </div>
                        </div>
                        
                        <Button variant="ghost" size="sm" className="text-accent hover:text-accent hover:bg-accent/10 gap-2">
                          View Report <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20 sticky top-24">
                  <CardHeader>
                    <CardTitle className="text-lg font-headline font-bold text-white">Network Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-1">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Total Reports</p>
                      <p className="text-3xl font-headline font-bold text-white tracking-tighter">1,248</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Verification Rate</p>
                      <p className="text-3xl font-headline font-bold text-white tracking-tighter">64.2%</p>
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
        </main>
        
        <Footer />
      </div>
    </WalletProvider>
  );
}
