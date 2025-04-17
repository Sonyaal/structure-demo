"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/dashboard/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

interface ComplianceIssue {
  type: string
  description: string
}

export default function AnalysisResultsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [score] = useState(92)

  useEffect(() => {
    // Simulate loading time for analysis
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleBack = () => {
    router.push("/dashboard")
  }

  const grammarIssues: ComplianceIssue[] = [
    {
      type: "grammar",
      description:
        "The document is well-structured and easy to read, but there are a few instances of missing articles (e.g., 'a' or 'the') that could be improved for clarity.",
    },
    {
      type: "grammar",
      description:
        "Some sentences are wordy or contain unnecessary words, which can make them harder to understand. For example, the sentence 'I certify that: I accept all the declarations above namely the Owner-Builder Declaration, Workers' Compensation Declaration, Asbestos Removal Declaration / Lead Hazard Warning, and Final Declaration;' could be condensed for better readability.",
    },
  ]
  
  const ambiguityIssues: ComplianceIssue[] = [
    {
      type: "ambiguity",
      description:
        "Some sections of the document are unclear or open to interpretation. For example, the section 'I certify that notification of asbestos removal is either not applicable or has been submitted to the AQMD or EPA as per section 19827.5 of the Health and Safety Code.' could be clarified with more specific language.",
    },
    {
      type: "ambiguity",
      description:
        "The document assumes a certain level of knowledge about building codes and regulations, which may not be familiar to all readers. For example, the phrase 'lead safe construction practices' is not explicitly defined in the document.",
    },
  ]
  

  if (loading) {
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
          <div className="flex flex-col items-center justify-center h-64">
            <div className="w-16 h-16 border-4 border-[#0F2251] border-t-transparent rounded-full animate-spin"></div>
            <h2 className="mt-6 text-xl font-semibold text-gray-800">Analyzing Permit Document...</h2>
            <p className="mt-2 text-gray-600">This may take a few moments</p>
          </div>
        </main>
      </div>
    )
  }

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

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Analysis Results</h1>

          <div className="flex justify-center mb-8">
            <div className="bg-green-50 rounded-full px-8 py-6 text-center">
              <div className="text-sm text-green-700 font-medium">Compliance Score</div>
              <div className="text-4xl font-bold text-green-600">{score}/100</div>
            </div>
          </div>

          <Card className="mb-8">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-xl">Compliance Issues</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Grammar Issues</h3>
                  <ul className="space-y-4 list-disc pl-6">
                    {grammarIssues.map((issue, index) => (
                      <li key={`grammar-${index}`} className="text-gray-800">
                        {issue.description}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Ambiguity Issues</h3>
                  <ul className="space-y-4 list-disc pl-6">
                    {ambiguityIssues.map((issue, index) => (
                      <li key={`ambiguity-${index}`} className="text-gray-800">
                        {issue.description}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              Return to Dashboard
            </Button>
            <Button className="bg-[#0F2251] hover:bg-[#0F2251]/90">Download Full Report</Button>
          </div>
        </div>
      </main>
    </div>
  )
}
