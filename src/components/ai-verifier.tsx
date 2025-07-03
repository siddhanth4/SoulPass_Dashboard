"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { runVerifyCertificateMetadata } from '@/app/actions';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, Bot, Loader2 } from "lucide-react";
import type { VerifyCertificateMetadataOutput } from '@/ai/flows/verify-certificate-metadata';

const formSchema = z.object({
  metadata: z.string().min(10, "Metadata must be at least 10 characters long."),
  institutionConventions: z.string().min(10, "Conventions must be at least 10 characters long."),
});

export function AiVerifier() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<VerifyCertificateMetadataOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      metadata: "",
      institutionConventions: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const res = await runVerifyCertificateMetadata(values);
      setResult(res);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to run AI verification. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-headline flex items-center gap-2">
          <Bot className="text-primary" />
          AI-Powered Metadata Check
        </CardTitle>
        <CardDescription>
          Our AI tool checks if certificate metadata conforms to the institution's known conventions and standards.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="metadata"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Certificate Metadata</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Paste the certificate metadata here (e.g., in JSON format)."
                      rows={6}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="institutionConventions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institution Conventions</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the issuing institution's conventions (e.g., 'Student IDs are 8 digits long, course names include the department code')."
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full md:w-auto" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify with AI"
              )}
            </Button>
          </form>
        </Form>
        {result && (
          <Card className="mt-6 bg-muted/50 border-l-4" style={{borderColor: result.isValid ? 'hsl(142.1 76.2% 36.3%)' : 'hsl(var(--destructive))'}}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {result.isValid ? (
                  <CheckCircle className="text-green-600" />
                ) : (
                  <XCircle className="text-destructive" />
                )}
                Verification Result
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`font-semibold ${result.isValid ? 'text-green-700' : 'text-destructive'}`}>
                {result.isValid ? 'The metadata appears to be valid.' : 'The metadata appears to be invalid.'}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                <span className="font-semibold">Reason:</span> {result.reason}
              </p>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
