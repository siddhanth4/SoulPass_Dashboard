import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Award, User, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-background">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-6 text-center">
            <div className="space-y-3">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                CertiChain
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                A secure, decentralized platform for issuing, managing, and verifying academic and professional certificates on the blockchain.
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/admin">Issue a Certificate</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/ledger">View Public Ledger</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 items-start md:grid-cols-3 md:gap-12">
            <Card className="text-center transform hover:scale-105 transition-transform duration-300 shadow-lg">
              <CardHeader>
                <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit">
                   <User className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="font-headline">For Students</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Access, manage, and share your tamper-proof digital certificates with a single click. Your achievements, secured forever.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center transform hover:scale-105 transition-transform duration-300 shadow-lg">
              <CardHeader>
                <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit">
                   <Award className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="font-headline">For Institutions</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Issue secure, blockchain-verified certificates instantly. Reduce fraud and administrative overhead.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center transform hover:scale-105 transition-transform duration-300 shadow-lg">
              <CardHeader>
                <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit">
                  <ShieldCheck className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="font-headline">For Verifiers</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Verify credentials with absolute certainty in seconds. Combat fraud with transparent and immutable records.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
