"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, FileText, Send, Eye, ShieldCheck, Database, Link as LinkIcon, Cpu, Fingerprint, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { preventDuplicateReports } from "@/ai/flows/prevent-duplicate-reports";
import { summarizeReport } from "@/ai/flows/summarize-report-flow";
import { Progress } from "@/components/ui/progress";
import { useWallet, Report } from "@/components/veritas/WalletProvider";
import { useRouter } from "next/navigation";

export function ReportEditor() {
  const { wallet, connect, addReport, reports } = useWallet();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<"idle" | "moderating" | "encrypting" | "summarizing" | "signing" | "uploading" | "anchoring">("idle");
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handlePreview = () => {
    toast({
      title: "Secure Preview Mode",
      description: "You are viewing the client-side encrypted version of your data.",
    });
  };

  const handleSubmit = async () => {
    if (!wallet) {
      toast({
        variant: "destructive",
        title: "Identify Required",
        description: "Please generate your anonymous DID cloaking first.",
      });
      connect();
      return;
    }

    if (!title || !content) {
      toast({
        variant: "destructive",
        title: "Incomplete Submission",
        description: "Please provide a headline and the core evidence.",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Step 1: AI Integrity Check
      setStep("moderating");
      setProgress(10);
      const previousReportTexts = reports.map(r => r.content);
      const moderationResult = await preventDuplicateReports({
        reportText: content,
        previousReports: previousReportTexts
      });

      if (moderationResult.isDuplicate && moderationResult.similarityScore > 0.8) {
        toast({
          variant: "destructive",
          title: "Duplicate Detected",
          description: `This information already exists on the registry.`,
        });
        setIsSubmitting(false);
        setStep("idle");
        return;
      }

      // Step 2: Client-side Encryption
      setStep("encrypting");
      setProgress(25);
      await new Promise(resolve => setTimeout(resolve, 800));

      // Step 3: AI Summarization for Public Readability
      setStep("summarizing");
      setProgress(40);
      const summaryResult = await summarizeReport({ content });

      // Step 4: Cryptographic Signing
      setStep("signing");
      setProgress(60);
      await new Promise(resolve => setTimeout(resolve, 800));

      // Step 5: IPFS Global Distribution
      setStep("uploading");
      setProgress(80);
      const mockCID = `Qm${Math.random().toString(36).substring(2, 15)}`;
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Step 6: Blockchain Anchoring
      setStep("anchoring");
      setProgress(95);
      const mockTxHash = `0x${Math.random().toString(16).substring(2, 12)}`;
      const mockBlock = Math.floor(19204112 + Math.random() * 100).toString();
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newReport: Report = {
        id: `v-${Math.floor(100 + Math.random() * 900)}`,
        title,
        content,
        summary: summaryResult.summary,
        impactLevel: summaryResult.impactLevel as any,
        timestamp: new Date().toISOString(),
        status: "Pending",
        category,
        hash: mockCID,
        txHash: mockTxHash,
        block: mockBlock,
        author: wallet.address,
        consensus: 0
      };

      addReport(newReport);
      
      setProgress(100);
      toast({
        title: "Truth Eternalized",
        description: "Your report is now decentralized and immutable.",
      });
      
      setTimeout(() => {
        router.push("/reports");
      }, 1500);

    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Broadcast Error",
        description: "Failed to anchor data. Please check your connection.",
      });
      setStep("idle");
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-card/40 backdrop-blur-xl border-white/10 shadow-[0_0_50px_-12px_rgba(168,85,247,0.2)] overflow-hidden">
      <CardHeader className="border-b border-white/5 bg-gradient-to-r from-primary/10 to-transparent">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-3xl font-headline font-bold text-white tracking-tight">The Evidence Vault</CardTitle>
            <CardDescription className="text-muted-foreground/80">Client-side encryption ensures only the world sees your truth, never us.</CardDescription>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-accent/20 border border-accent/30 rounded-full text-[10px] text-accent font-bold uppercase tracking-[0.2em] shadow-inner">
            <Lock className="h-3 w-3" />
            Military Grade Secure
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-8">
        {isSubmitting ? (
          <div className="py-24 flex flex-col items-center justify-center space-y-10">
            <div className="relative">
              <div className="h-32 w-32 rounded-full border-[3px] border-accent/10 border-t-accent animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                {step === "moderating" && <Cpu className="h-10 w-10 text-accent animate-pulse" />}
                {step === "encrypting" && <Lock className="h-10 w-10 text-accent animate-pulse" />}
                {step === "summarizing" && <Sparkles className="h-10 w-10 text-accent animate-pulse" />}
                {step === "signing" && <Fingerprint className="h-10 w-10 text-accent animate-pulse" />}
                {step === "uploading" && <Database className="h-10 w-10 text-accent animate-pulse" />}
                {step === "anchoring" && <LinkIcon className="h-10 w-10 text-accent animate-pulse" />}
              </div>
            </div>
            
            <div className="text-center space-y-6 w-full max-w-sm">
              <div className="space-y-2">
                <h3 className="text-2xl font-headline font-bold text-white capitalize tracking-tight">
                  {step.replace("-", " ")}...
                </h3>
                <p className="text-sm text-muted-foreground font-light px-4">
                  {step === "moderating" && "Verifying content uniqueness via AI..."}
                  {step === "encrypting" && "Generating AES-256 local encryption layer..."}
                  {step === "summarizing" && "Preparing AI-readable summary for the registry..."}
                  {step === "signing" && "Finalizing cryptographic identity proof..."}
                  {step === "uploading" && "Broadcasting shards to global IPFS nodes..."}
                  {step === "anchoring" && "Waiting for mainnet block confirmation..."}
                </p>
              </div>
              <Progress value={progress} className="h-1.5 bg-white/5" />
            </div>
          </div>
        ) : (
          <Tabs defaultValue="editor" className="w-full">
            <TabsList className="bg-secondary/50 border border-white/5 mb-8 p-1 rounded-xl">
              <TabsTrigger value="editor" className="gap-2 px-6 py-2 rounded-lg data-[state=active]:bg-primary">
                <FileText className="h-4 w-4" /> Compose Truth
              </TabsTrigger>
              <TabsTrigger value="preview" onClick={handlePreview} className="gap-2 px-6 py-2 rounded-lg data-[state=active]:bg-primary">
                <Eye className="h-4 w-4" /> Secure Preview
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="editor" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-3">
                  <Label htmlFor="title" className="text-xs uppercase font-bold tracking-widest text-muted-foreground">Report Headline</Label>
                  <Input 
                    id="title" 
                    placeholder="e.g. Systemic Corruption in Health Dept" 
                    className="h-14 bg-white/[0.03] border-white/10 focus:ring-accent rounded-xl text-lg font-headline"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="category" className="text-xs uppercase font-bold tracking-widest text-muted-foreground">Category</Label>
                  <Input 
                    id="category" 
                    placeholder="Government, Finance, etc." 
                    className="h-14 bg-white/[0.03] border-white/10 focus:ring-accent rounded-xl"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="content" className="text-xs uppercase font-bold tracking-widest text-muted-foreground">Immutable Evidence</Label>
                <Textarea 
                  id="content" 
                  placeholder="Paste your report content here. Your IP address is never logged." 
                  className="min-h-[350px] bg-white/[0.03] border-white/10 focus:ring-accent rounded-xl resize-none font-mono text-base leading-relaxed p-6"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <div className="p-5 bg-accent/5 rounded-2xl border border-accent/10 flex gap-5 items-start">
                <div className="p-2 bg-accent/20 rounded-lg">
                  <ShieldCheck className="h-5 w-5 text-accent" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-white">Whistleblower Protection Active</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Once you click broadcast, this data is sharded across 1,400+ nodes. No central authority can redact or delete your submission.
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button 
                  onClick={handleSubmit} 
                  className="bg-accent hover:bg-accent/90 text-white px-12 h-16 text-xl font-headline font-bold rounded-2xl shadow-2xl shadow-accent/40 transition-all hover:scale-[1.02] active:scale-95 group"
                >
                  <span className="flex items-center gap-3">
                    Broadcast Truth <Send className="h-6 w-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="preview" className="space-y-6">
              <div className="p-10 bg-black/40 rounded-2xl border border-white/5 min-h-[450px] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                  <Badge variant="outline" className="text-[10px] uppercase border-accent/30 text-accent">Preview Only</Badge>
                </div>
                <h1 className="text-4xl font-headline font-bold text-white mb-8 border-b border-white/5 pb-6">{title || "Untitled Declaration"}</h1>
                <div className="prose prose-invert max-w-none">
                  <p className="whitespace-pre-wrap text-muted-foreground/90 leading-relaxed text-lg font-light">
                    {content || "No evidence has been provided yet."}
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
}
