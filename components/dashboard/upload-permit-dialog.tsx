"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Loader2 } from "lucide-react"

export function UploadPermitDialog() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setIsUploading(true)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 300)

    // Simulate processing
    setTimeout(() => {
      clearInterval(interval)
      setIsUploading(false)
      setUploadProgress(0)
      setIsOpen(false)
      setFile(null)
      setTitle("")
      setDescription("")

      // Navigate to the analysis results page
      router.push("/dashboard/analysis-results")
    }, 3000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#0F2251] hover:bg-[#0F2251]/90">
          <Upload className="mr-2 h-4 w-4" /> Upload Permit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Upload New Permit</DialogTitle>
            <DialogDescription>
              Upload a permit document for compliance checking. We'll analyze it and provide feedback.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Permit Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Residential Renovation Permit"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the permit request"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="file">Permit Document (PDF)</Label>
              <Input id="file" type="file" accept=".pdf" onChange={handleFileChange} required />
              {file && (
                <p className="text-sm text-gray-500">
                  Selected file: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isUploading || !file} className="bg-[#0F2251] hover:bg-[#0F2251]/90">
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing ({uploadProgress}%)
                </>
              ) : (
                "Upload & Check Compliance"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
// "use client"

// import { useState } from "react"
// import { Upload, Loader2, FileText } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { AnalysisResults } from "@/components/ui/analysis-results"

// import * as pdfjsLib from "pdfjs-dist"
// pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js"

// async function extractTextFromPDF(file: File): Promise<string> {
//   const arrayBuffer = await file.arrayBuffer()
//   const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
//   let fullText = ""

//   for (let i = 0; i < pdf.numPages; i++) {
//     const page = await pdf.getPage(i + 1)
//     const content = await page.getTextContent()
//     const text = content.items.map((item: any) => item.str).join(" ")
//     fullText += text + "\n"
//   }

//   return fullText.slice(0, 16000)
// }

// export function UploadPermitDialog() {
//   const [isOpen, setIsOpen] = useState(false)
//   const [file, setFile] = useState<File | null>(null)
//   const [title, setTitle] = useState("")
//   const [description, setDescription] = useState("")
//   const [isUploading, setIsUploading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [analysis, setAnalysis] = useState<any>(null)

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0]
//     if (selectedFile && selectedFile.type === "application/pdf") {
//       setFile(selectedFile)
//       setError(null)
//     } else {
//       setFile(null)
//       setError("Please select a valid PDF file")
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!file) return

//     setIsUploading(true)
//     setError(null)

//     try {
//       const text = await extractTextFromPDF(file)

//       const response = await fetch("/api/ollama/route", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ text }),
//       })

//       const data = await response.json()
//       const raw = data.raw.trim()
//       const cleaned = raw.startsWith("```json") ? raw.slice(7, -3).trim() : raw

//       try {
//         const parsed = JSON.parse(cleaned)

//         const analysisFormatted = {
//           score: parsed.complianceScore,
//           issues: [
//             {
//               category: "Grammar Issues",
//               items: parsed.grammarIssues.map((issue: any) => issue.description),
//             },
//             {
//               category: "Ambiguity Issues",
//               items: parsed.ambiguityIssues.map((issue: any) => issue.description),
//             },
//             {
//               category: "Compliance Issues",
//               items: parsed.complianceIssues.map((issue: any) => issue.description),
//             },
//           ].filter((section) => section.items.length > 0),
//         }

//         setAnalysis(analysisFormatted)
//       } catch (err) {
//         console.error("Failed to parse LLM response:", err)
//         setError("There was an error parsing the model's response.")
//       }
//     } catch (err) {
//       console.error("Upload failed:", err)
//       setError("Failed to analyze the PDF. Please try again.")
//     } finally {
//       setIsUploading(false)
//     }
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={setIsOpen}>
//       <DialogTrigger asChild>
//         <Button className="bg-[#0F2251] hover:bg-[#0F2251]/90">
//           <Upload className="mr-2 h-4 w-4" />
//           Upload Permit
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[500px]">
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <DialogHeader>
//             <DialogTitle>Upload New Permit</DialogTitle>
//             <DialogDescription>
//               Upload a construction permit PDF for compliance review and analysis.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <div className="grid gap-2">
//               <Label htmlFor="title">Title</Label>
//               <Input
//                 id="title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 placeholder="e.g., Residential Remodel"
//                 required
//               />
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="description">Description</Label>
//               <Textarea
//                 id="description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 placeholder="Brief summary of the permit details"
//                 required
//               />
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="file">PDF File</Label>
//               <Input id="file" type="file" accept="application/pdf" onChange={handleFileChange} required />
//               {file && (
//                 <p className="text-sm text-gray-500">
//                   Selected file: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
//                 </p>
//               )}
//               {error && <p className="text-sm text-red-500">{error}</p>}
//             </div>
//           </div>
//           <DialogFooter>
//             <Button
//               type="submit"
//               disabled={isUploading || !file}
//               className="bg-[#0F2251] hover:bg-[#0F2251]/90 text-white"
//             >
//               {isUploading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Analyzing...
//                 </>
//               ) : (
//                 "Analyze Permit"
//               )}
//             </Button>
//           </DialogFooter>
//         </form>
//         {analysis && <AnalysisResults analysis={analysis} />}
//       </DialogContent>
//     </Dialog>
//   )
// }
