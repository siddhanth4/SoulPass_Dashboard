'use server';

/**
 * @fileOverview A certificate metadata verification AI agent.
 *
 * - verifyCertificateMetadata - A function that handles the certificate metadata verification process.
 * - VerifyCertificateMetadataInput - The input type for the verifyCertificateMetadata function.
 * - VerifyCertificateMetadataOutput - The return type for the verifyCertificateMetadata function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VerifyCertificateMetadataInputSchema = z.object({
  metadata: z
    .string()
    .describe(
      'The certificate metadata to verify, as a string.  Should contain fields like student name, university name, degree, etc.'
    ),
  institutionConventions: z
    .string()
    .describe('A description of the conventions used by the issuing institution for their certificates.'),
});
export type VerifyCertificateMetadataInput = z.infer<typeof VerifyCertificateMetadataInputSchema>;

const VerifyCertificateMetadataOutputSchema = z.object({
  isValid: z.boolean().describe('Whether or not the certificate metadata is valid.'),
  reason: z.string().describe('The reason for the validity determination.'),
});
export type VerifyCertificateMetadataOutput = z.infer<typeof VerifyCertificateMetadataOutputSchema>;

export async function verifyCertificateMetadata(input: VerifyCertificateMetadataInput): Promise<VerifyCertificateMetadataOutput> {
  return verifyCertificateMetadataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'verifyCertificateMetadataPrompt',
  input: {schema: VerifyCertificateMetadataInputSchema},
  output: {schema: VerifyCertificateMetadataOutputSchema},
  prompt: `You are an expert certificate verifier specializing in confirming that certificate metadata conforms to the standards and conventions of the issuing educational institution.

You will use the provided metadata and institution conventions to determine if the certificate is valid or not, and set the isValid output field appropriately.  You must provide a detailed reason for your determination.

Certificate Metadata: {{{metadata}}}

Institution Conventions: {{{institutionConventions}}}`,
});

const verifyCertificateMetadataFlow = ai.defineFlow(
  {
    name: 'verifyCertificateMetadataFlow',
    inputSchema: VerifyCertificateMetadataInputSchema,
    outputSchema: VerifyCertificateMetadataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
