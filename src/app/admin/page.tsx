import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/date-picker";
import { PlusCircle } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="container py-10">
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Issue New Certificate</CardTitle>
          <CardDescription>
            Fill in the details below to issue a new certificate on the blockchain.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="student-name">Student Name</Label>
              <Input id="student-name" placeholder="e.g., Jane Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="student-id">Student ID</Label>
              <Input id="student-id" placeholder="e.g., 12345678" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="course-name">Course / Degree Name</Label>
            <Input id="course-name" placeholder="e.g., Bachelor of Science in Computer Science" />
          </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="issue-date">Issue Date</Label>
              <DatePicker />
            </div>
            <div className="space-y-2">
              <Label htmlFor="grade">Grade / GPA</Label>
              <Input id="grade" placeholder="e.g., A+ or 4.0/4.0" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="certificate-file">Certificate Document (Optional)</Label>
            <Input id="certificate-file" type="file" className="pt-2 file:text-foreground" />
            <p className="text-xs text-muted-foreground">Upload a PDF copy of the certificate.</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full md:w-auto" size="lg" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
            <PlusCircle className="mr-2" />
            Issue Certificate
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
