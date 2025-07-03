"use server";

import { verifyCertificateMetadata } from "@/ai/flows/verify-certificate-metadata";
import type { VerifyCertificateMetadataInput, VerifyCertificateMetadataOutput } from "@/ai/flows/verify-certificate-metadata";

export async function runVerifyCertificateMetadata(input: VerifyCertificateMetadataInput): Promise<VerifyCertificateMetadataOutput> {
  return await verifyCertificateMetadata(input);
}
