
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WalletProvider } from "@/components/veritas/WalletProvider";
import { ReportEditor } from "@/components/veritas/Editor";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ShieldAlert, Info } from "lucide-react";

export default function SubmitReport() {
  return (
    <WalletProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 space-y-4">
              <h1 className="text-4xl font-headline font-bold text-white">Broadcast Truth</h1>
              <p className="text-muted-foreground text-lg">
                Your report will be cryptographically signed and distributed across the decentralized web.
              </p>
              
              <Alert className="bg-primary/10 border-primary/20">
                <ShieldAlert className="h-4 w-4 text-accent" />
                <AlertTitle className="text-white font-bold">Safety Notice</AlertTitle>
                <AlertDescription className="text-muted-foreground">
                  We recommend using a VPN or Tor Browser when submitting sensitive information to prevent IP tracking before your data hits our relay nodes.
                </AlertDescription>
              </Alert>
            </div>

            <ReportEditor />
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <Info className="h-5 w-5 text-accent shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">Reputation Score</h4>
                  <p className="text-xs text-muted-foreground">Successfully verified reports increase your wallet's reputation, giving your future claims more weight in the DAO verification queue.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <Info className="h-5 w-5 text-accent shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">Censorship Resistance</h4>
                  <p className="text-xs text-muted-foreground">Because Veritas is built on IPFS and Blockchain, once your report is published, it cannot be deleted by any single entity.</p>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </WalletProvider>
  );
}
