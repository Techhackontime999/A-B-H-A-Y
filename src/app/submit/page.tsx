
import { ReportEditor } from "@/components/veritas/Editor";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ShieldAlert, Info, CheckCircle2, ShieldCheck, EyeOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SubmitReport() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Editor Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
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
          </div>

          {/* Instructions and Checklist Sidebar */}
          <div className="space-y-6">
            <Card className="bg-card/50 border-white/5">
              <CardHeader>
                <CardTitle className="text-lg font-headline font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-accent" />
                  Whistleblower Checklist
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground">Ensure you have connected your wallet to generate a temporary <b>Decentralized ID (DID)</b>.</p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground">Check the <b>Secure Preview</b> tab to verify the AES-256 encryption state before broadcasting.</p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground">Remove any EXIF data or metadata from attachments if you are pasting raw document text.</p>
                </div>
                <div className="flex gap-3">
                  <EyeOff className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground">Your IP address is hidden from the final IPFS record, but local ISPs may see you accessing this protocol.</p>
                </div>
              </CardContent>
            </Card>

            <div className="p-6 rounded-xl bg-accent/10 border border-accent/20 space-y-4">
              <h4 className="font-headline font-bold text-white flex items-center gap-2">
                <Info className="h-5 w-5 text-accent" />
                Protocol Benefits
              </h4>
              <div className="space-y-4">
                <div>
                  <h5 className="text-sm font-bold text-white mb-1">Reputation Score</h5>
                  <p className="text-xs text-muted-foreground">Verified reports increase your reputation, giving your claims more weight in the DAO.</p>
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white mb-1">Censorship Resistance</h5>
                  <p className="text-xs text-muted-foreground">Once anchored to the blockchain, your report is immutable and cannot be deleted.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
