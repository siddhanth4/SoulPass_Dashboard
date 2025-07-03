"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { AiVerifier } from "@/components/ai-verifier";

interface Certificate {
  txId: string;
  studentName: string;
  degree: string;
  institution: string;
  date: string;
  status: string;
}

type VerificationStatus = "idle" | "loading" | "found" | "not-found";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const idFromQuery = searchParams.get('id');

  const [verificationId, setVerificationId] = useState(idFromQuery || "");
  const [status, setStatus] = useState<VerificationStatus>("idle");
  const [foundCertificate, setFoundCertificate] = useState<Certificate | null>(null);

  const handleVerify = (e?: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!verificationId) return;

    setStatus("loading");
    setFoundCertificate(null);

    // Simulate network delay
    setTimeout(() => {
      try {
        const storedCertsRaw = localStorage.getItem("certificates");
        const allCerts: Certificate[] = storedCertsRaw ? JSON.parse(storedCertsRaw) : [];
        const cert = allCerts.find(c => c.txId.toLowerCase() === verificationId.toLowerCase());
        
        if (cert) {
          setFoundCertificate(cert);
          setStatus("found");
        } else {
          setStatus("not-found");
        }
      } catch (error) {
        console.error("Verification failed:", error);
        setStatus("not-found");
      }
    }, 500);
  };
  
  // Automatically verify if an ID is passed in the query params
  useEffect(() => {
    if (idFromQuery) {
      // We need to wrap this in a timeout to ensure the component has fully mounted
      // and state is ready before initiating the search.
      const timer = setTimeout(() => handleVerify(), 100);
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idFromQuery]);


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
              <form onSubmit={handleVerify} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="verification-id">Certificate Hash / Transaction ID</Label>
                  <Input 
                    id="verification-id" 
                    placeholder="0x..." 
                    value={verificationId}
                    onChange={(e) => setVerificationId(e.target.value)}
                  />
                </div>
                <Button type="submit" disabled={status === 'loading'} className="w-full md:w-auto" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
                   {status === 'loading' ? <Loader2 className="mr-2 animate-spin" /> : null}
                   {status === 'loading' ? 'Verifying...' : 'Verify Now'}
                </Button>
              </form>
            </CardContent>
             {status !== 'idle' && (
              <CardFooter>
                 {status === 'loading' && (
                  <div className="p-4 text-center w-full">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Searching the ledger...</p>
                  </div>
                 )}
                 {status === 'found' && foundCertificate && (
                  <Card className="w-full bg-green-50 border-green-500 border-l-4">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-800">
                        <CheckCircle />
                        Certificate Verified
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-green-900 space-y-2">
                       <p><strong>Student:</strong> {foundCertificate.studentName}</p>
                       <p><strong>Degree:</strong> {foundCertificate.degree}</p>
                       <p><strong>Institution:</strong> {foundCertificate.institution}</p>
                       <p><strong>Issue Date:</strong> {foundCertificate.date}</p>
                       <p><strong>Status:</strong> <span className="font-semibold">{foundCertificate.status}</span></p>
                       <p className="font-mono text-xs pt-2 break-all"><strong>TxID:</strong> {foundCertificate.txId}</p>
                    </CardContent>
                  </Card>
                 )}
                 {status === 'not-found' && (
                    <Card className="w-full bg-red-50 border-red-500 border-l-4">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-red-800">
                          <XCircle />
                           Verification Failed
                        </CardTitle>
                        <CardDescription className="text-red-700">
                          No certificate matching the provided ID was found on the ledger. Please check the ID and try again.
                        </CardDescription>
                      </CardHeader>
                   </Card>
                 )}
              </CardFooter>
            )}
          </Card>
        </div>

        <div className="space-y-8">
          <AiVerifier />
        </div>
      </div>
    </div>
  );
}
