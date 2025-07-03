"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { GanttChartSquare, FileQuestion } from 'lucide-react'

const initialCertificates = [
  {
    txId: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
    studentId: "111222333",
    studentName: "Alice Johnson",
    degree: "B.S. in Computer Science",
    institution: "Firebase University",
    date: "2023-10-26",
    status: "Verified",
    grade: "A+",
  },
  {
    txId: "0x4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a2b3c",
    studentId: "444555666",
    studentName: "Bob Williams",
    degree: "M.A. in Digital Arts",
    institution: "Google Tech",
    date: "2023-10-25",
    status: "Verified",
    grade: "A",
  },
  {
    txId: "0x7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a2b3c4d5e6f",
    studentId: "777888999",
    studentName: "Charlie Brown",
    degree: "Ph.D. in Physics",
    institution: "Firebase University",
    date: "2023-10-22",
    status: "Verified",
    grade: "B+",
  },
  {
    txId: "0xj1k2l3m4n5o6p7q8r9s0t1a2b3c4d5e6f7g8h9i",
    studentId: "123123123",
    studentName: "Diana Prince",
    degree: "B.A. in Journalism",
    institution: "Metropolis University",
    date: "2023-09-15",
    status: "Verified",
    grade: "A-",
  },
  {
    txId: "0xm4n5o6p7q8r9s0t1a2b3c4d5e6f7g8h9i0j1k2l",
    studentId: "456456456",
    studentName: "Eve Adams",
    degree: "Certificate in Cloud Engineering",
    institution: "Google Tech",
    date: "2023-09-01",
    status: "Verified",
    grade: "Pass",
  },
   {
    txId: "0xp7q8r9s0t1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o",
    studentId: "789789789",
    studentName: "Frank Miller",
    degree: "B.S. in Electrical Engineering",
    institution: "Firebase University",
    date: "2023-08-11",
    status: "Verified",
    grade: "B",
  },
];

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

export default function LedgerPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    try {
      const storedCertsRaw = localStorage.getItem("certificates");
      const storedCerts = storedCertsRaw ? JSON.parse(storedCertsRaw) : [];

      if (storedCerts.length > 0 && storedCerts[0].studentId) {
        setCertificates(storedCerts);
      } else {
        setCertificates(initialCertificates);
        localStorage.setItem("certificates", JSON.stringify(initialCertificates));
      }
    } catch (error) {
      console.error("Could not load certificates from localStorage", error);
      setCertificates(initialCertificates);
    }
  }, []);

  return (
    <div className="container py-10">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <GanttChartSquare className="h-8 w-8 text-primary" />
            <div>
              <CardTitle className="text-2xl font-headline">Public Certificate Ledger</CardTitle>
              <CardDescription>
                A transparent and immutable record of all issued certificates on the blockchain.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            {certificates.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[250px]">Transaction ID</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Degree/Course</TableHead>
                    <TableHead>Institution</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {certificates.map((cert) => (
                    <TableRow key={cert.txId}>
                      <TableCell className="font-mono text-xs truncate max-w-xs">{cert.txId}</TableCell>
                      <TableCell className="font-medium">{cert.studentName}</TableCell>
                      <TableCell>{cert.degree}</TableCell>
                      <TableCell>{cert.institution}</TableCell>
                      <TableCell>{cert.date}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="default" className="bg-green-600 text-green-50 hover:bg-green-700">
                          {cert.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button asChild variant="outline" size="sm">
                           <Link href={`/verify?id=${cert.txId}`}>Verify</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
               <div className="text-center py-10 text-muted-foreground">
                 <FileQuestion className="mx-auto h-12 w-12" />
                 <p className="mt-4">No certificates found in the ledger.</p>
                 <p className="text-sm">Certificates issued by an admin will appear here.</p>
               </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
