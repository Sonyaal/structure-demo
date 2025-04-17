"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/dashboard/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Clock, CheckCircle, XCircle, FileText, Calendar, Building, User } from "lucide-react"
import type { PermitStatus } from "@/components/dashboard/permit-card"

interface PermitDetail {
  id: string
  title: string
  description: string
  status: PermitStatus
  submittedDate: string
  type: string
  applicant: string
  location: string
  complianceIssues: string[]
}

// Sample permit details
const samplePermitDetails: Record<string, PermitDetail> = {
  "permit-001": {
    id: "permit-001",
    title: "Residential Renovation",
    description: "Kitchen and bathroom renovation for single-family home",
    status: "pending",
    submittedDate: "Apr 10, 2025",
    type: "Residential",
    applicant: "John Smith",
    location: "123 Main St, Anytown, USA",
    complianceIssues: [
      "Missing electrical specifications",
      "Bathroom ventilation requirements not met",
      "Unclear dimensions for kitchen island",
    ],
  },
  "permit-002": {
    id: "permit-002",
    title: "Commercial Office Space",
    description: "Interior modifications for office space on 3rd floor",
    status: "accepted",
    submittedDate: "Apr 5, 2025",
    type: "Commercial",
    applicant: "Acme Corporation",
    location: "456 Business Ave, Anytown, USA",
    complianceIssues: [],
  },
  "permit-003": {
    id: "permit-003",
    title: "Electrical System Upgrade",
    description: "Upgrading electrical panel and wiring for residential property",
    status: "rejected",
    submittedDate: "Apr 2, 2025",
    type: "Electrical",
    applicant: "Jane Doe",
    location: "789 Oak St, Anytown, USA",
    complianceIssues: [
      "Electrical load calculations missing",
      "Panel specifications do not meet code requirements",
      "Wiring diagram incomplete",
      "Missing grounding details",
    ],
  },
  "permit-004": {
    id: "permit-004",
    title: "Deck Addition",
    description: "Adding a wooden deck to the back of residential property",
    status: "pending",
    submittedDate: "Apr 8, 2025",
    type: "Residential",
    applicant: "Robert Johnson",
    location: "321 Pine St, Anytown, USA",
    complianceIssues: ["Railing height below minimum requirement", "Foundation details incomplete"],
  },
  "permit-005": {
    id: "permit-005",
    title: "Plumbing Repair",
    description: "Replacing main water line for commercial building",
    status: "accepted",
    submittedDate: "Mar 30, 2025",
    type: "Commercial",
    applicant: "City Plumbing LLC",
    location: "555 Water Way, Anytown, USA",
    complianceIssues: [],
  },
}

export default function PermitDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [permit, setPermit] = useState<PermitDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch permit details
    setTimeout(() => {
      const foundPermit = samplePermitDetails[params.id]
      setPermit(foundPermit || null)
      setLoading(false)
    }, 500)
  }, [params.id])

  const handleBack = () => {
    router.back()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1 container py-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>
          <div className="mt-6 flex justify-center">
            <div className="animate-pulse flex flex-col w-full max-w-4xl">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
              <div className="h-64 bg-gray-200 rounded mb-6"></div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (!permit) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1 container py-6">
          <div className="flex items-center space-x-4 mb-6">
            <Button variant="ghost" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>
          <div className="flex flex-col items-center justify-center h-64">
            <h2 className="text-2xl font-bold text-gray-800">Permit Not Found</h2>
            <p className="text-gray-600 mt-2">The permit you're looking for doesn't exist or has been removed.</p>
            <Button className="mt-4 bg-[#0F2251] hover:bg-[#0F2251]/90" onClick={() => router.push("/dashboard")}>
              Return to Dashboard
            </Button>
          </div>
        </main>
      </div>
    )
  }

  const statusConfig = {
    pending: {
      label: "Pending Review",
      color: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      icon: Clock,
    },
    accepted: {
      label: "Accepted",
      color: "bg-green-100 text-green-800 hover:bg-green-100",
      icon: CheckCircle,
    },
    rejected: {
      label: "Rejected",
      color: "bg-red-100 text-red-800 hover:bg-red-100",
      icon: XCircle,
    },
  }

  const { label, color, icon: Icon } = statusConfig[permit.status]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 container py-6">
        <div className="flex items-center space-x-4 mb-6">
          <Button variant="ghost" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{permit.title}</h1>
            <p className="text-gray-600 mt-1">{permit.description}</p>
          </div>
          <Badge className={color} variant="outline">
            <Icon className="h-3.5 w-3.5 mr-1" />
            {label}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="details">
              <TabsList>
                <TabsTrigger value="details">Permit Details</TabsTrigger>
                <TabsTrigger value="compliance">
                  Compliance Check
                  {permit.complianceIssues.length > 0 && (
                    <span className="ml-2 rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-800">
                      {permit.complianceIssues.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="document">Document</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Permit Information</CardTitle>
                    <CardDescription>Detailed information about this permit application</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Permit ID</h3>
                          <p className="mt-1 text-sm text-gray-900">{permit.id}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Type</h3>
                          <div className="mt-1 flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="text-sm text-gray-900">{permit.type}</span>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Submitted Date</h3>
                          <div className="mt-1 flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="text-sm text-gray-900">{permit.submittedDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Applicant</h3>
                          <div className="mt-1 flex items-center">
                            <User className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="text-sm text-gray-900">{permit.applicant}</span>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Location</h3>
                          <div className="mt-1 flex items-center">
                            <Building className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="text-sm text-gray-900">{permit.location}</span>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Status</h3>
                          <div className="mt-1">
                            <Badge className={color} variant="outline">
                              <Icon className="h-3.5 w-3.5 mr-1" />
                              {label}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="compliance" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Compliance Check Results</CardTitle>
                    <CardDescription>
                      {permit.complianceIssues.length === 0
                        ? "No compliance issues found"
                        : `${permit.complianceIssues.length} compliance issues found`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {permit.complianceIssues.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-6">
                        <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">All Compliance Checks Passed</h3>
                        <p className="mt-1 text-sm text-gray-500">This permit meets all jurisdiction requirements</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {permit.complianceIssues.map((issue, index) => (
                          <div key={index} className="flex items-start p-3 border border-red-200 rounded-md bg-red-50">
                            <XCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
                            <div>
                              <h4 className="text-sm font-medium text-gray-900">Issue #{index + 1}</h4>
                              <p className="mt-1 text-sm text-gray-700">{issue}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="document" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Permit Document</CardTitle>
                    <CardDescription>View and download the permit document</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center justify-center py-6 border-2 border-dashed border-gray-300 rounded-lg">
                      <FileText className="h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900">Permit Document</h3>
                      <p className="mt-1 text-sm text-gray-500 text-center max-w-md">
                        This is where the PDF document would be displayed using PDF.js
                      </p>
                      <Button className="mt-4 bg-[#0F2251] hover:bg-[#0F2251]/90">Download Document</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
                <CardDescription>Available actions for this permit</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-[#0F2251] hover:bg-[#0F2251]/90">Run Compliance Check</Button>
                <Button variant="outline" className="w-full">
                  Download PDF
                </Button>
                <Button variant="outline" className="w-full">
                  Share Permit
                </Button>
                {permit.status === "rejected" && (
                  <Button
                    variant="outline"
                    className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                  >
                    Resubmit with Changes
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
