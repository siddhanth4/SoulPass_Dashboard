"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Download, Share2, Loader2, Search, FileQuestion, Send, GraduationCap } from "lucide-react";

interface Certificate {
  txId: string;
  studentId: string;
  studentName: string;
  degree: string;
  institution: string;
  date: string;
  status: string;
  grade?: string;
}

type SearchStatus = "idle" | "loading" | "found" | "not-found";

export default function StudentPage() {
  const [studentId, setStudentId] = useState("");
  const [status, setStatus] = useState<SearchStatus>("idle");
  const [foundCertificate, setFoundCertificate] = useState<Certificate | null>(null);
  const { toast } = useToast();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!studentId) return;
    setStatus("loading");
    setFoundCertificate(null);

    setTimeout(() => {
      try {
        const storedCertsRaw = localStorage.getItem("certificates");
        const allCerts: Certificate[] = storedCertsRaw ? JSON.parse(storedCertsRaw) : [];
        const cert = allCerts.find(c => c.studentId === studentId);
        
        if (cert) {
          setFoundCertificate(cert);
          setStatus("found");
        } else {
          setStatus("not-found");
        }
      } catch (error) {
        console.error("Search failed:", error);
        setStatus("not-found");
      }
    }, 500);
  };

  const handleRequest = () => {
    toast({
      title: "Request Sent",
      description: `Your request for a certificate with Student ID ${studentId} has been sent.`,
    });
  };

  return (
    <div className="container py-10">
      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Student Portal</CardTitle>
          <CardDescription>
            Check the status of your certificate or request a new one.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex items-start md:items-center gap-2 mb-8">
            <Input 
              placeholder="Enter your Student ID to find your certificate" 
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="max-w-md"
            />
            <Button type="submit" disabled={status === 'loading'} style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
              {status === 'loading' ? <Loader2 className="animate-spin" /> : <Search />}
              <span className="ml-2 hidden md:inline">Search</span>
            </Button>
          </form>

          {status === 'loading' && (
            <div className="text-center py-10">
              <Loader2 className="h-12 w-12 animate-spin mx-auto text-muted-foreground" />
              <p className="mt-4">Searching for your certificate...</p>
            </div>
          )}

          {status === 'not-found' && (
            <Card className="bg-amber-50 border-amber-500 border-l-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-800">
                  <FileQuestion />
                  Certificate Not Found
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-amber-900">We couldn't find a certificate with the Student ID: <strong>{studentId}</strong></p>
                <p className="text-sm text-amber-700 mt-2">If you believe this is an error, please double-check your ID. If you have not been issued a certificate yet, you can request one from your institution.</p>
              </CardContent>
              <CardFooter>
                 <Button onClick={handleRequest}>
                    <Send className="mr-2" />
                    Request Certificate Issuance
                  </Button>
              </CardFooter>
            </Card>
          )}

          {status === 'found' && foundCertificate && (
             <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card className="overflow-hidden shadow-lg border-2 border-primary/10">
                    <div className="bg-primary/5 p-8 flex flex-col md:flex-row items-center gap-6 border-b">
                      <div className="p-4 bg-primary/10 rounded-full">
                        <Image src="https://placehold.co/80x80.png" alt="University Logo" data-ai-hint="university logo" width={80} height={80} className="rounded-full" />
                      </div>
                      <div>
                        <CardTitle className="text-3xl font-headline text-primary">Certificate of Completion</CardTitle>
                        <CardDescription className="text-lg">Issued by {foundCertificate.institution}</CardDescription>
                      </div>
                    </div>
                    
                    <CardContent className="p-8">
                      <p className="text-center text-xl mb-6 text-muted-foreground">This is to certify that</p>
                      <h2 className="text-4xl font-bold text-center text-primary font-headline tracking-wide">
                        {foundCertificate.studentName}
                      </h2>
                      <p className="text-center text-xl mt-6 text-muted-foreground">
                        has successfully completed the course
                      </p>
                      <h3 className="text-2xl font-semibold text-center mt-2 text-foreground">
                        {foundCertificate.degree}
                      </h3>
                      <div className="flex justify-between items-center mt-12 pt-6 border-t">
                        <div className="text-center">
                          <p className="font-bold">Issue Date</p>
                          <p className="text-muted-foreground">{format(new Date(foundCertificate.date), "MMMM dd, yyyy")}</p>
                        </div>
                        {foundCertificate.grade && (
                          <div className="text-center">
                            <p className="font-bold">Grade</p>
                            <p className="text-muted-foreground">{foundCertificate.grade}</p>
                          </div>
                        )}
                         <div className="text-center">
                          <p className="font-bold">Certificate ID</p>
                          <p className="font-mono text-xs text-muted-foreground truncate max-w-[100px]">{foundCertificate.txId}</p>
                        </div>
                      </div>
                    </CardContent>
                     <CardFooter className="bg-muted/50 p-4 flex justify-center">
                      <p className="text-xs text-muted-foreground">
                        This certificate is securely stored and verifiable on the blockchain.
                      </p>
                    </CardFooter>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card className="shadow-md">
                    <CardHeader>
                      <CardTitle>Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col space-y-3">
                      <Button style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
                        <Download className="mr-2" />
                        Download PDF
                      </Button>
                      <Button variant="secondary">
                        <Share2 className="mr-2" />
                        Share Verification Link
                      </Button>
                    </CardContent>
                  </Card>
                  <Card className="shadow-md">
                    <CardHeader>
                      <CardTitle>Verification QR Code</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center p-4">
                       <div className="p-4 bg-white rounded-lg shadow-inner">
                        <Image
                          src={`https://placehold.co/200x200.png`}
                          alt="QR Code for certificate verification"
                          data-ai-hint="qr code"
                          width={200}
                          height={200}
                        />
                       </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
          )}

          {status === 'idle' && (
            <div className="text-center py-10 text-muted-foreground">
              <GraduationCap className="mx-auto h-12 w-12" />
              <p className="mt-4 font-semibold">Welcome, Student!</p>
              <p className="text-sm">Please enter your student ID above to find your certificate.</p>
            </div>
          )}

        </CardContent>
      </Card>
    </div>
  );
}
