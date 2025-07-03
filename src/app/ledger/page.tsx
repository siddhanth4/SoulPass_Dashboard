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
import { GanttChartSquare } from 'lucide-react'

const certificates = [
  {
    txId: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
    studentName: "Alice Johnson",
    degree: "B.S. in Computer Science",
    institution: "Firebase University",
    date: "2023-10-26",
    status: "Verified",
  },
  {
    txId: "0x4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a2b3c",
    studentName: "Bob Williams",
    degree: "M.A. in Digital Arts",
    institution: "Google Tech",
    date: "2023-10-25",
    status: "Verified",
  },
  {
    txId: "0x7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a2b3c4d5e6f",
    studentName: "Charlie Brown",
    degree: "Ph.D. in Physics",
    institution: "Firebase University",
    date: "2023-10-22",
    status: "Verified",
  },
  {
    txId: "0xj1k2l3m4n5o6p7q8r9s0t1a2b3c4d5e6f7g8h9i",
    studentName: "Diana Prince",
    degree: "B.A. in Journalism",
    institution: "Metropolis University",
    date: "2023-09-15",
    status: "Verified",
  },
  {
    txId: "0xm4n5o6p7q8r9s0t1a2b3c4d5e6f7g8h9i0j1k2l",
    studentName: "Eve Adams",
    degree: "Certificate in Cloud Engineering",
    institution: "Google Tech",
    date: "2023-09-01",
    status: "Verified",
  },
   {
    txId: "0xp7q8r9s0t1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o",
    studentName: "Frank Miller",
    degree: "B.S. in Electrical Engineering",
    institution: "Firebase University",
    date: "2023-08-11",
    status: "Verified",
  },
];

export default function LedgerPage() {
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
                    <TableCell className="font-mono text-xs truncate">{cert.txId}</TableCell>
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
