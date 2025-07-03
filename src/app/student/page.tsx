import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Download, Share2 } from "lucide-react";
import Image from "next/image";

export default function StudentPage() {
  return (
    <div className="container py-10">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="overflow-hidden shadow-lg border-2 border-primary/10">
            <div className="bg-primary/5 p-8 flex flex-col md:flex-row items-center gap-6 border-b">
               <div className="p-4 bg-primary/10 rounded-full">
                <Image src="https://placehold.co/80x80.png" alt="University Logo" data-ai-hint="university logo" width={80} height={80} className="rounded-full" />
              </div>
              <div>
                <CardTitle className="text-3xl font-headline text-primary">Certificate of Completion</CardTitle>
                <CardDescription className="text-lg">Issued by Firebase University</CardDescription>
              </div>
            </div>
            
            <CardContent className="p-8">
              <p className="text-center text-xl mb-6 text-muted-foreground">This is to certify that</p>
              <h2 className="text-4xl font-bold text-center text-primary font-headline tracking-wide">
                Alex Doe
              </h2>
              <p className="text-center text-xl mt-6 text-muted-foreground">
                has successfully completed the course
              </p>
              <h3 className="text-2xl font-semibold text-center mt-2 text-foreground">
                Advanced Next.js Development
              </h3>
              <div className="flex justify-between items-center mt-12 pt-6 border-t">
                <div className="text-center">
                  <p className="font-bold">Issue Date</p>
                  <p className="text-muted-foreground">October 26, 2023</p>
                </div>
                 <div className="text-center">
                  <p className="font-bold">Certificate ID</p>
                  <p className="font-mono text-xs text-muted-foreground">0x123...abc</p>
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
              <CardDescription>
                Share for instant verification.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center p-4">
              <div className="p-4 bg-white rounded-lg shadow-inner">
                <Image
                  src="https://placehold.co/200x200.png"
                  alt="QR Code for certificate verification"
                  width={200}
                  height={200}
                  data-ai-hint="qr code"
                  className="rounded"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
