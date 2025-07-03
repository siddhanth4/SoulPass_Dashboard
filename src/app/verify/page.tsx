import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck } from "lucide-react";
import { AiVerifier } from "@/components/ai-verifier";

export default function VerifyPage() {
  return (
    <div className="container py-10">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        
        <div className="space-y-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-headline flex items-center gap-2">
                <ShieldCheck className="text-primary" />
                Standard Verification
              </CardTitle>
              <CardDescription>
                Enter the certificate's unique hash or transaction ID to verify its authenticity on the blockchain.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="verification-id">Certificate Hash / Transaction ID</Label>
                  <Input id="verification-id" placeholder="0x..." />
                </div>
                <Button type="submit" className="w-full md:w-auto" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>Verify Now</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <AiVerifier />
        </div>
      </div>
    </div>
  );
}
