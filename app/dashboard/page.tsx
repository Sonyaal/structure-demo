"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "@/components/dashboard/navbar"
import { PermitCard, type PermitStatus } from "@/components/dashboard/permit-card"
import { UploadPermitDialog } from "@/components/dashboard/upload-permit-dialog"
import { Clock, CheckCircle, XCircle } from "lucide-react"

interface Permit {
  id: string
  title: string
  description: string
  status: PermitStatus
  submittedDate: string
  type: string
}

// Sample permit data
const samplePermits: Permit[] = [
  {
    id: "permit-001",
    title: "Residential Renovation",
    description: "Kitchen and bathroom renovation for single-family 4-bedroom home",
    status: "pending",
    submittedDate: "Apr 10, 2025",
    type: "Residential",
  },
  {
    id: "permit-002",
    title: "Commercial Office Space",
    description: "Interior modifications for office space on 3rd floor in downtown LA",
    status: "accepted",
    submittedDate: "Apr 5, 2025",
    type: "Commercial",
  },
  {
    id: "permit-003",
    title: "Electrical System Upgrade",
    description: "Upgrading electrical panel and wiring for residential property",
    status: "rejected",
    submittedDate: "Apr 2, 2025",
    type: "Electrical",
  },
  {
    id: "permit-004",
    title: "Deck Addition",
    description: "Adding a wooden deck to the back of residential property",
    status: "pending",
    submittedDate: "Apr 8, 2025",
    type: "Residential",
  },
  {
    id: "permit-005",
    title: "Plumbing Repair",
    description: "Replacing main water line and plumbing system for commercial building",
    status: "accepted",
    submittedDate: "Mar 30, 2025",
    type: "Commercial",
  },
]

export default function DashboardPage() {
  const router = useRouter()
  const [permits] = useState<Permit[]>(samplePermits)

  const handleViewPermit = (id: string) => {
    router.push(`/dashboard/permits/${id}`)
  }

  const pendingPermits = permits.filter((permit) => permit.status === "pending")
  const acceptedPermits = permits.filter((permit) => permit.status === "accepted")
  const rejectedPermits = permits.filter((permit) => permit.status === "rejected")

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 container py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Your Permit Dashboard</h1>
          <UploadPermitDialog />
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all">All Permits</TabsTrigger>
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Clock className="h-4 w-4" /> Pending
              <span className="ml-1 rounded-full bg-yellow-100 px-2 py-0.5 text-xs text-yellow-800">
                {pendingPermits.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="accepted" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" /> Accepted
              <span className="ml-1 rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">
                {acceptedPermits.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="rejected" className="flex items-center gap-2">
              <XCircle className="h-4 w-4" /> Rejected
              <span className="ml-1 rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-800">
                {rejectedPermits.length}
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {permits.map((permit) => (
                <PermitCard key={permit.id} {...permit} onView={handleViewPermit} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pending">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingPermits.map((permit) => (
                <PermitCard key={permit.id} {...permit} onView={handleViewPermit} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="accepted">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {acceptedPermits.map((permit) => (
                <PermitCard key={permit.id} {...permit} onView={handleViewPermit} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rejected">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rejectedPermits.map((permit) => (
                <PermitCard key={permit.id} {...permit} onView={handleViewPermit} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
