
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Search, 
  ExternalLink, 
  Calendar, 
  Hash, 
  ShieldCheck, 
  AlertCircle, 
  Lock, 
  Database, 
  Link as LinkIcon, 
  Clock 
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { useWallet, Report } from "@/components/veritas/WalletProvider";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

export default function ReportsFeed() {
  const { reports } = useWallet();
  const [search, setSearch] = useState("");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

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
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-accent hover:text-accent hover:bg-accent/10 gap-2 w-fit"
                      onClick={() => setSelectedReport(report)}
                    >
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
                    {reports.length > 0 ? ((reports.filter(r => r.status === 'Verified').length / reports.length) * 100).toFixed(1) : 0}%
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Active DAO Reviewers</p>
                  <p className="text-3xl font-headline font-bold text-white tracking-tighter">15,402</p>
                </div>
                <div className="pt-4 border-t border-white/5">
                  <Button className="w-full bg-accent hover:bg-accent/90" asChild>
                    <a href="/verify">Join the DAO</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={!!selectedReport} onOpenChange={(open) => !open && setSelectedReport(null)}>
        {selectedReport && (
          <DialogContent className="max-w-3xl bg-card border-white/10 max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-accent border-accent/20 font-mono text-[10px] uppercase">
                  {selectedReport.category}
                </Badge>
                <Badge variant="secondary" className="text-[10px] font-bold uppercase">
                  {selectedReport.status}
                </Badge>
              </div>
              <DialogTitle className="text-3xl font-headline font-bold text-white">
                {selectedReport.title}
              </DialogTitle>
              <DialogDescription className="flex items-center gap-4 text-xs font-mono pt-2">
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {new Date(selectedReport.timestamp).toLocaleString()}</span>
                <span className="flex items-center gap-1"><Hash className="h-3 w-3" /> CID: {selectedReport.hash.slice(0, 10)}...</span>
              </DialogDescription>
            </DialogHeader>

            <Separator className="bg-white/5 my-4" />

            <div className="space-y-6">
              <div className="bg-white/[0.02] p-6 rounded-xl border border-white/5">
                <div className="flex items-center gap-2 text-accent mb-4 font-bold text-xs uppercase tracking-widest">
                  <Lock className="h-3 w-3" /> Decrypted Evidence
                </div>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap font-body">
                  {selectedReport.content}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-secondary/30 border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    <Database className="h-3 w-3" /> IPFS Storage
                  </div>
                  <p className="font-mono text-[10px] break-all text-white/70">{selectedReport.hash}</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/30 border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    <LinkIcon className="h-3 w-3" /> Blockchain Anchor
                  </div>
                  <p className="font-mono text-[10px] break-all text-white/70">TX: {selectedReport.txHash}</p>
                  <p className="font-mono text-[10px] text-accent">Block: {selectedReport.block}</p>
                </div>
              </div>
            </div>

            <DialogFooter className="mt-8">
              <Button variant="outline" onClick={() => setSelectedReport(null)} className="border-white/10">
                Close Registry Entry
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
