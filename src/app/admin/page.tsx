"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DatePicker } from "@/components/date-picker";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from 'date-fns';

const formSchema = z.object({
  studentName: z.string().min(1, "Student name is required."),
  studentId: z.string().min(1, "Student ID is required."),
  courseName: z.string().min(1, "Course/Degree name is required."),
  institution: z.string().min(1, "Institution is required."),
  issueDate: z.date({ required_error: "An issue date is required." }),
  grade: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function AdminPage() {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentName: "",
      studentId: "",
      courseName: "",
      institution: "",
      grade: "",
    },
  });

  function onSubmit(values: FormValues) {
    const newCertificate = {
      txId: `0x${crypto.randomUUID().replace(/-/g, '')}`,
      studentId: values.studentId,
      studentName: values.studentName,
      degree: values.courseName,
      institution: values.institution,
      date: format(values.issueDate, "yyyy-MM-dd"),
      grade: values.grade,
      status: "Verified",
    };

    try {
      const existingCertsRaw = localStorage.getItem("certificates");
      // Use the initial list if local storage is empty, to keep the demo data
      const initialCerts = [
        { txId: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t", studentId: "111222333", studentName: "Alice Johnson", degree: "B.S. in Computer Science", institution: "Firebase University", date: "2023-10-26", status: "Verified", grade: "A+" },
        { txId: "0x4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a2b3c", studentId: "444555666", studentName: "Bob Williams", degree: "M.A. in Digital Arts", institution: "Google Tech", date: "2023-10-25", status: "Verified", grade: "A" },
      ];
      const existingCerts = existingCertsRaw ? JSON.parse(existingCertsRaw) : initialCerts;
      const updatedCerts = [newCertificate, ...existingCerts];
      localStorage.setItem("certificates", JSON.stringify(updatedCerts));
      
      toast({
        title: "Success!",
        description: "Certificate has been issued and added to the ledger.",
      });
      form.reset();
    } catch (error) {
      console.error("Failed to issue certificate:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to issue certificate. See console for details.",
      });
    }
  }

  return (
    <div className="container py-10">
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Issue New Certificate</CardTitle>
          <CardDescription>
            Fill in the details below to issue a new certificate on the blockchain.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="studentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Jane Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="studentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student ID</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 12345678" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="courseName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course / Degree Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Bachelor of Science in Computer Science" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="institution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issuing Institution</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Firebase University" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <FormField
                  control={form.control}
                  name="issueDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                       <FormLabel className="pt-0">Issue Date</FormLabel>
                      <DatePicker value={field.value} onValueChange={field.onChange} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="grade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grade / GPA (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., A+ or 4.0/4.0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={form.formState.isSubmitting} className="w-full md:w-auto" size="lg" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
                <PlusCircle className="mr-2" />
                {form.formState.isSubmitting ? "Issuing..." : "Issue Certificate"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
