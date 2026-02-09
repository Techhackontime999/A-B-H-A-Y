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
  Clock,
  Sparkles,
  TrendingUp,
  Filter
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
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-16">
          <div className="space-y-4 max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-headline font-bold text-white tracking-tight">The Registry</h1>
            <p className="text-muted-foreground text-xl font-light leading-relaxed">
              Explore the immutable history of humanity's courage. Verified and anchored to the global truth layer.
            </p>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-fit">
            <div className="relative flex-grow md:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
              <input 
                placeholder="Search CIDs or keywords..." 
                className="w-full h-14 pl-12 pr-4 bg-white/[0.03] border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent text-base transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="h-14 w-14 rounded-2xl border-white/10 hover:bg-white/5">
              <Filter className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-3 space-y-8">
            {filteredReports.length > 0 ? filteredReports.map((report) => (
              <Card key={report.id} className="bg-card/30 backdrop-blur-md border-white/5 hover:border-accent/40 transition-all group overflow-hidden cursor-pointer" onClick={() => setSelectedReport(report)}>
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="bg-primary/20 text-accent border-none text-[10px] uppercase font-bold tracking-widest px-3">
                        {report.category}
                      </Badge>
                      {report.impactLevel && (
                        <Badge variant="outline" className={`text-[10px] uppercase font-bold tracking-widest px-3 ${
                          report.impactLevel === 'Critical' ? 'border-red-500 text-red-500' :
                          report.impactLevel === 'High' ? 'border-orange-500 text-orange-500' :
                          'border-blue-500 text-blue-500'
                        }`}>
                          {report.impactLevel} Impact
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(report.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                  <CardTitle className="text-3xl font-headline font-bold text-white group-hover:text-accent transition-colors leading-tight">
                    {report.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {report.summary ? (
                    <div className="bg-accent/5 p-4 rounded-xl border border-accent/10 flex gap-4">
                      <Sparkles className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <p className="text-sm text-white/90 leading-relaxed italic">
                        {report.summary}
                      </p>
                    </div>
                  ) : (
                    <p className="text-base text-muted-foreground line-clamp-3 leading-relaxed font-light">
                      {report.content}
                    </p>
                  )}
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-6 border-t border-white/5 gap-6">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        {report.status === "Verified" ? (
                          <ShieldCheck className="h-5 w-5 text-green-500" />
                        ) : report.status === "Pending" ? (
                          <TrendingUp className="h-5 w-5 text-yellow-500" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        )}
                        <span className={`text-xs font-bold uppercase tracking-[0.2em] ${
                          report.status === "Verified" ? "text-green-500" : 
                          report.status === "Pending" ? "text-yellow-500" : 
                          "text-red-500"
                        }`}>
                          {report.status}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-muted-foreground/60 font-mono bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                        <Hash className="h-3.5 w-3.5" />
                        {report.hash.slice(0, 16)}...
                      </div>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      className="text-accent hover:text-accent hover:bg-accent/10 font-bold gap-2 text-sm group/btn"
                    >
                      Audit Record <ExternalLink className="h-4 w-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )) : (
              <div className="text-center py-32 bg-white/[0.02] border border-dashed border-white/10 rounded-3xl">
                <p className="text-muted-foreground text-lg">No records match your current audit criteria.</p>
              </div>
            )}
          </div>

          <div className="space-y-8">
            <Card className="bg-primary/5 border-primary/20 sticky top-28 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-[80px]" />
              <CardHeader>
                <CardTitle className="text-xl font-headline font-bold text-white tracking-tight">Protocol Vitals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8 relative z-10">
                <div className="space-y-2">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-bold">Anchored Truths</p>
                  <p className="text-5xl font-headline font-bold text-white tracking-tighter">{reports.length}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-bold">Consensus Ratio</p>
                  <p className="text-5xl font-headline font-bold text-white tracking-tighter">
                    {reports.length > 0 ? ((reports.filter(r => r.status === 'Verified').length / reports.length) * 100).toFixed(0) : 0}%
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-bold">Active Nodes</p>
                  <p className="text-5xl font-headline font-bold text-white tracking-tighter">1,402</p>
                </div>
                <Separator className="bg-white/10" />
                <Button className="w-full h-14 bg-accent hover:bg-accent/90 text-lg font-bold rounded-xl shadow-xl shadow-accent/20" asChild>
                  <a href="/verify">Audit the Network</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={!!selectedReport} onOpenChange={(open) => !open && setSelectedReport(null)}>
        {selectedReport && (
          <DialogContent className="max-w-4xl bg-card border-white/10 p-0 overflow-hidden rounded-3xl">
            <div className="bg-gradient-to-br from-primary/20 to-transparent p-10 border-b border-white/5">
              <DialogHeader className="text-left">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="secondary" className="bg-accent/20 text-accent font-bold text-[10px] uppercase tracking-[0.2em] px-4 py-1">
                    {selectedReport.category}
                  </Badge>
                  <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1 border-white/20 text-white">
                    {selectedReport.status}
                  </Badge>
                </div>
                <DialogTitle className="text-4xl font-headline font-bold text-white leading-tight mb-2">
                  {selectedReport.title}
                </DialogTitle>
                <div className="flex items-center gap-6 text-xs font-mono text-muted-foreground pt-4">
                  <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> {new Date(selectedReport.timestamp).toLocaleString()}</span>
                  <span className="flex items-center gap-2"><Hash className="h-4 w-4" /> CID: {selectedReport.hash.slice(0, 12)}...</span>
                </div>
              </DialogHeader>
            </div>

            <div className="p-10 space-y-10 max-h-[60vh] overflow-y-auto custom-scrollbar">
              {selectedReport.summary && (
                <div className="bg-primary/10 p-6 rounded-2xl border border-primary/20 space-y-3">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent flex items-center gap-2">
                    <Sparkles className="h-3 w-3" /> AI Summary for Public Insight
                  </h4>
                  <p className="text-lg text-white font-light leading-relaxed italic">
                    "{selectedReport.summary}"
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Original Encrypted Evidence</h4>
                <div className="bg-white/[0.02] p-8 rounded-2xl border border-white/5">
                  <p className="text-muted-foreground/90 leading-relaxed whitespace-pre-wrap font-body text-lg font-light">
                    {selectedReport.content}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="p-6 rounded-2xl bg-secondary/30 border border-white/5 space-y-3 group hover:border-accent/30 transition-colors">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
                    <Database className="h-4 w-4" /> IPFS Decentralized Storage
                  </div>
                  <p className="font-mono text-xs break-all text-white/80 leading-relaxed">{selectedReport.hash}</p>
                </div>
                <div className="p-6 rounded-2xl bg-secondary/30 border border-white/5 space-y-3 group hover:border-accent/30 transition-colors">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
                    <LinkIcon className="h-4 w-4" /> Proof of Existence Anchor
                  </div>
                  <p className="font-mono text-xs break-all text-white/80 leading-relaxed">TX: {selectedReport.txHash}</p>
                  <p className="font-mono text-xs text-accent font-bold">Block Confirmation: {selectedReport.block}</p>
                </div>
              </div>
            </div>

            <DialogFooter className="p-8 bg-black/40 border-t border-white/5">
              <Button variant="outline" onClick={() => setSelectedReport(null)} className="h-12 px-8 rounded-xl border-white/10 hover:bg-white/5 font-bold">
                Close Registry Entry
              </Button>
              <Button className="h-12 px-8 rounded-xl bg-accent hover:bg-accent/90 font-bold">
                Download Cryptographic Proof
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
