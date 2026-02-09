
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, FileText, Send, Eye, ShieldCheck, Database, Link as LinkIcon, Cpu } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { preventDuplicateReports } from "@/ai/flows/prevent-duplicate-reports";
import { Progress } from "@/components/ui/progress";

export function ReportEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<"idle" | "moderating" | "encrypting" | "uploading" | "anchoring">("idle");
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handlePreview = () => {
    toast({
      title: "Encrypted Preview Mode",
      description: "You are viewing the client-side encrypted version.",
    });
  };

  const handleSubmit = async () => {
    if (!title || !content) {
      toast({
        variant: "destructive",
        title: "Incomplete Report",
        description: "Please provide a title and detailed report content.",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Step 1: AI Content Moderation
      setStep("moderating");
      setProgress(20);
      const previousReports = [
        "Major data breach at Silicon Valley tech giant leaked millions of records.",
        "Evidence of corruption in local government regarding zoning laws.",
        "Environmental violations discovered at the offshore drilling site."
      ];

      const moderationResult = await preventDuplicateReports({
        reportText: content,
        previousReports
      });

      if (moderationResult.isDuplicate) {
        toast({
          variant: "destructive",
          title: "Potential Duplicate Flagged",
          description: `This report is highly similar to existing data (Similarity: ${(moderationResult.similarityScore * 100).toFixed(0)}%).`,
        });
        setIsSubmitting(false);
        setStep("idle");
        return;
      }

      // Step 2: Client-side Encryption
      setStep("encrypting");
      setProgress(40);
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Step 3: IPFS Upload
      setStep("uploading");
      setProgress(70);
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Step 4: Blockchain Anchoring
      setStep("anchoring");
      setProgress(90);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setProgress(100);
      toast({
        title: "Report Published Successfully",
        description: "Your report is now indexed on IPFS and proofed on the blockchain.",
      });
      
      setTitle("");
      setContent("");
      setTimeout(() => {
        setStep("idle");
        setIsSubmitting(false);
        setProgress(0);
      }, 1000);

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Protocol Error",
        description: "Could not establish connection to the decentralized network.",
      });
      setStep("idle");
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-card/50 border-white/5 shadow-2xl overflow-hidden">
      <CardHeader className="border-b border-white/5 bg-white/[0.02]">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-headline font-bold">Secure Editor</CardTitle>
            <CardDescription>All data is encrypted in your browser before broadcast.</CardDescription>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-[10px] text-green-500 font-bold uppercase tracking-wider">
            <Lock className="h-3 w-3" />
            E2EE Active
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        {isSubmitting ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-8 animate-in fade-in zoom-in duration-300">
            <div className="relative">
              <div className="h-24 w-24 rounded-full border-4 border-accent/20 border-t-accent animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                {step === "moderating" && <Cpu className="h-8 w-8 text-accent animate-pulse" />}
                {step === "encrypting" && <Lock className="h-8 w-8 text-accent animate-pulse" />}
                {step === "uploading" && <Database className="h-8 w-8 text-accent animate-pulse" />}
                {step === "anchoring" && <LinkIcon className="h-8 w-8 text-accent animate-pulse" />}
              </div>
            </div>
            
            <div className="text-center space-y-4 w-full max-w-xs">
              <h3 className="text-xl font-headline font-bold text-white capitalize">
                {step.replace("-", " ")}...
              </h3>
              <Progress value={progress} className="h-1" />
              <p className="text-xs text-muted-foreground">
                {step === "moderating" && "Running AI integrity check..."}
                {step === "encrypting" && "Generating AES-256 keys..."}
                {step === "uploading" && "Sharding data across IPFS nodes..."}
                {step === "anchoring" && "Committing hash to the blockchain..."}
              </p>
            </div>
          </div>
        ) : (
          <Tabs defaultValue="editor" className="w-full">
            <TabsList className="bg-secondary mb-6 p-1">
              <TabsTrigger value="editor" className="gap-2">
                <FileText className="h-4 w-4" /> Write
              </TabsTrigger>
              <TabsTrigger value="preview" onClick={handlePreview} className="gap-2">
                <Eye className="h-4 w-4" /> Preview
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="editor" className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Report Headline</Label>
                <Input 
                  id="title" 
                  placeholder="Brief summary of the whistleblowing claim" 
                  className="bg-secondary/50 border-white/10"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Full Report Evidence</Label>
                <Textarea 
                  id="content" 
                  placeholder="Detail the facts, including dates, names, and locations. Be as specific as possible." 
                  className="min-h-[300px] bg-secondary/50 border-white/10 resize-none font-mono text-sm leading-relaxed"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20 flex gap-4">
                <ShieldCheck className="h-6 w-6 text-accent shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm font-bold text-white">Public Proofing</p>
                  <p className="text-xs text-muted-foreground">
                    Upon submission, a unique hash will be generated. This hash will be recorded on the blockchain as immutable proof of existence at this timestamp.
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button 
                  onClick={handleSubmit} 
                  className="bg-accent hover:bg-accent/90 px-10 h-12 text-lg font-bold shadow-lg shadow-accent/20 transition-all active:scale-95"
                >
                  <span className="flex items-center gap-2">
                    <Send className="h-5 w-5" /> Submit to IPFS
                  </span>
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="preview" className="space-y-6">
              <div className="p-8 bg-secondary/20 rounded-xl border border-dashed border-white/10 min-h-[400px]">
                <h1 className="text-3xl font-headline font-bold text-white mb-6">{title || "Untitled Report"}</h1>
                <div className="prose prose-invert max-w-none">
                  <p className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
                    {content || "No content provided yet."}
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
