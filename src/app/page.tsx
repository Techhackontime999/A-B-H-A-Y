import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Lock, 
  Database, 
  Link as LinkIcon, 
  Users, 
  Eye, 
  CheckCircle2, 
  ArrowRight,
  ShieldAlert,
  MessageSquareQuote,
  Scale
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.15),transparent_70%)]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
              <ShieldAlert className="h-3.5 w-3.5" />
              Privacy-First Justice Support
            </div>
            
            <h1 className="text-5xl md:text-8xl font-headline font-bold leading-tight tracking-tighter text-white">
              Report Injustice <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-purple-400 to-primary">Without Retaliation.</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
              A-B-H-A-Y is an anonymous complaint portal designed to empower truth-seekers. 
              Report misconduct, harassment, or corruption without registration, logins, or identity tracking. 
              Our protocol bridges the gap between fear and justice.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
              <Link href="/submit">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-bold h-16 px-10 rounded-2xl shadow-2xl shadow-accent/20 transition-all hover:scale-105 active:scale-95">
                  Submit Anonymous Report
                </Button>
              </Link>
              <Link href="/reports">
                <Button variant="outline" size="lg" className="border-white/10 hover:bg-white/5 font-medium h-16 px-10 rounded-2xl transition-all">
                  Explore the Registry
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-12 pt-16 text-muted-foreground/60">
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                <span className="text-xs font-headline font-bold uppercase tracking-widest">No Logins</span>
              </div>
              <div className="flex items-center gap-2">
                <Scale className="h-5 w-5" />
                <span className="text-xs font-headline font-bold uppercase tracking-widest">Justice Bridge</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquareQuote className="h-5 w-5" />
                <span className="text-xs font-headline font-bold uppercase tracking-widest">Zero Tracking</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <Card className="bg-card/40 border-white/5 hover:border-accent/20 transition-all group">
              <CardContent className="pt-10 pb-12 px-10 flex flex-col gap-6">
                <div className="p-4 bg-primary/10 rounded-2xl w-fit group-hover:bg-accent/10 transition-colors">
                  <Eye className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-2xl font-headline font-bold text-white">Anonymity by Design</h3>
                <p className="text-muted-foreground leading-relaxed font-light">
                  No personal identity information is collected, stored, or displayed. Each complaint is anchored to a session-based session ID, ensuring no link back to your real world identity.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/40 border-white/5 hover:border-accent/20 transition-all group">
              <CardContent className="pt-10 pb-12 px-10 flex flex-col gap-6">
                <div className="p-4 bg-primary/10 rounded-2xl w-fit group-hover:bg-accent/10 transition-colors">
                  <Scale className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-2xl font-headline font-bold text-white">Decision Support</h3>
                <p className="text-muted-foreground leading-relaxed font-light">
                  We don't judge reports as true or false. Instead, A-B-H-A-Y provides AI-powered decision support tools that help authorized reviewers evaluate credibility responsibly.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/40 border-white/5 hover:border-accent/20 transition-all group">
              <CardContent className="pt-10 pb-12 px-10 flex flex-col gap-6">
                <div className="p-4 bg-primary/10 rounded-2xl w-fit group-hover:bg-accent/10 transition-colors">
                  <Database className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-2xl font-headline font-bold text-white">Correlation Analysis</h3>
                <p className="text-muted-foreground leading-relaxed font-light">
                  Multi-layer assessment analyzes patterns and cross-complaint correlations to help prioritize genuine cases and identify systemic misconduct.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="flex-1 space-y-10">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-headline font-bold text-white leading-tight">The Safe Channel for <br />Fearless Expression.</h2>
                <p className="text-muted-foreground text-lg font-light leading-relaxed">
                  A-B-H-A-Y is built as a supportive bridge between truth-seekers and justice systems, maintaining both anonymity and ethical accountability.
                </p>
              </div>
              
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent font-bold text-xl">1</div>
                  <div>
                    <h4 className="font-headline font-bold text-white text-lg mb-2">Compose Complaint</h4>
                    <p className="text-muted-foreground font-light">Write your report in our secure environment. AES-256 encryption protects your words locally before broadcast.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent font-bold text-xl">2</div>
                  <div>
                    <h4 className="font-headline font-bold text-white text-lg mb-2">Decentralized Anchor</h4>
                    <p className="text-muted-foreground font-light">Your data is sharded and distributed on IPFS, then timestamped on a public ledger for immutable proof-of-existence.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent font-bold text-xl">3</div>
                  <div>
                    <h4 className="font-headline font-bold text-white text-lg mb-2">Community Audit</h4>
                    <p className="text-muted-foreground font-light">The DAO reviewers use AI credibility scores to help investigate and validate systemic issues without exposing the reporter.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 relative group">
              <div className="absolute inset-0 bg-accent/20 rounded-[2rem] blur-3xl opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative z-10 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl transition-transform hover:scale-[1.01]">
                <Image 
                  src="https://picsum.photos/seed/abhay_justice/800/800" 
                  alt="A-B-H-A-Y Justice Interface" 
                  width={800} 
                  height={800}
                  className="w-full h-auto grayscale-[20%] brightness-90"
                  data-ai-hint="justice dashboard"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
