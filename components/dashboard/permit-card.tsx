"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle, XCircle, FileText, Calendar } from "lucide-react"

export type PermitStatus = "pending" | "accepted" | "rejected"

export interface PermitCardProps {
  id: string
  title: string
  description: string
  status: PermitStatus
  submittedDate: string
  type: string
  onView: (id: string) => void
}

export function PermitCard({ id, title, description, status, submittedDate, type, onView }: PermitCardProps) {
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

  const { label, color, icon: Icon } = statusConfig[status]

  return (
    <Card className="overflow-hidden border border-gray-300 rounded-xl">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <Badge className={color} variant="outline">
            <Icon className="h-3.5 w-3.5 mr-1" />
            {label}
          </Badge>
        </div>
        <CardDescription className="text-sm text-gray-500">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center">
            <FileText className="h-4 w-4 mr-2 text-gray-500" />
            <span>{type}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            <span>{submittedDate}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full text-[#0F2251] border border-gray-300 rounded-xl hover:bg-[#0F2251] hover:text-white"
          onClick={() => onView(id)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}
