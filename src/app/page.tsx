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
  ShieldAlert
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent_70%)]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold tracking-widest uppercase mb-4 animate-fade-in">
              <ShieldAlert className="h-3 w-3" />
              A-B-H-A-Y Safety Protocol
            </div>
            
            <h1 className="text-5xl md:text-7xl font-headline font-bold leading-tight tracking-tighter text-white">
              Tell the Truth <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">Without Fear.</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
              The world's first decentralized, end-to-end encrypted reporting protocol. 
              Generate a temporary identity, secure your data on IPFS, and verify it through our global community DAO.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/submit">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-bold h-14 px-8 rounded-xl shadow-lg shadow-accent/20 transition-all hover:scale-105">
                  Submit Secure Report
                </Button>
              </Link>
              <Link href="/verify">
                <Button variant="outline" size="lg" className="border-white/10 hover:bg-white/5 font-medium h-14 px-8 rounded-xl transition-all">
                  Community Verification
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-8 pt-12 text-muted-foreground grayscale opacity-50">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                <span className="text-sm font-headline font-bold">IPFS</span>
              </div>
              <div className="flex items-center gap-2">
                <LinkIcon className="h-5 w-5" />
                <span className="text-sm font-headline font-bold">BLOCKCHAIN</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span className="text-sm font-headline font-bold">DAO</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-card/50 border-white/5 hover:border-accent/30 transition-all group">
              <CardContent className="pt-8 pb-10 px-8 flex flex-col gap-6">
                <div className="p-3 bg-primary/10 rounded-xl w-fit group-hover:bg-accent/10 transition-colors">
                  <Lock className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-2xl font-headline font-bold text-white">Encrypted Editor</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Write and edit reports with full client-side encryption. No raw data ever reaches our servers.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-white/5 hover:border-accent/30 transition-all group">
              <CardContent className="pt-8 pb-10 px-8 flex flex-col gap-6">
                <div className="p-3 bg-primary/10 rounded-xl w-fit group-hover:bg-accent/10 transition-colors">
                  <Eye className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-2xl font-headline font-bold text-white">Anonymity by Design</h3>
                <p className="text-muted-foreground leading-relaxed">
                  No email, no phone, no KYC. We use cryptographic signatures via decentralized wallets to verify you exist without knowing who you are.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-white/5 hover:border-accent/30 transition-all group">
              <CardContent className="pt-8 pb-10 px-8 flex flex-col gap-6">
                <div className="p-3 bg-primary/10 rounded-xl w-fit group-hover:bg-accent/10 transition-colors">
                  <CheckCircle2 className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-2xl font-headline font-bold text-white">Public Auditability</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every report hash is timestamped on the blockchain. Proof of existence is immutable and cannot be deleted by governments or corporations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1 space-y-8">
              <h2 className="text-4xl font-headline font-bold text-white">The Truth Layer for the Modern World.</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-bold">1</div>
                  <div>
                    <h4 className="font-headline font-bold text-white mb-2">Generate Identity</h4>
                    <p className="text-muted-foreground">Connect any wallet to generate a decentralized ID (DID) instantly.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-bold">2</div>
                  <div>
                    <h4 className="font-headline font-bold text-white mb-2">Upload Evidence</h4>
                    <p className="text-muted-foreground">Your report is chunked, encrypted, and distributed across the IPFS network nodes.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-bold">3</div>
                  <div>
                    <h4 className="font-headline font-bold text-white mb-2">DAO Verification</h4>
                    <p className="text-muted-foreground">Community experts review claims and stake reputation to verify the authenticity of reports.</p>
                  </div>
                </div>
              </div>
              <Link href="/submit">
                <Button variant="link" className="text-accent p-0 font-bold gap-2">
                  Start your first broadcast <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="flex-1 relative">
              <div className="relative z-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <Image 
                  src="https://picsum.photos/seed/abhay_dashboard/800/600" 
                  alt="A-B-H-A-Y Dashboard Interface" 
                  width={800} 
                  height={600}
                  className="w-full h-auto"
                  data-ai-hint="data visualization"
                />
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
